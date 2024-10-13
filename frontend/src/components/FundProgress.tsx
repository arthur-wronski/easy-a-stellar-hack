import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import reforestation from '@/assets/reforestation.png';
import ocean from '@/assets/ocean.png';
import chris from '@/assets/chris.png';
import { useState } from 'react';
import { isConnected, requestAccess, signTransaction, getAddress } from "@stellar/freighter-api";
import * as StellarSdk from '@stellar/stellar-sdk';

// Project data
const initialProjectsData = [
  {
    id: 1,
    name: 'Reforestation Project',
    goal: 10000,
    current: 3000,
    description: 'Help plant trees in deforested areas',
    link: 'https://reforestation.com',
    image: reforestation,
  },
  {
    id: 2,
    name: 'Ocean Cleanup',
    goal: 20000,
    current: 12000,
    description: 'Support the cleanup of our oceans',
    link: 'https://oceancleanup.com',
    image: ocean,
  },
  {
    id: 3,
    name: 'Clean Energy Initiative',
    goal: 30000,
    current: 15000,
    description: 'Fund renewable energy projects',
    link: 'https://cleanenergy.com',
    image: chris,
  },
];

// Modal Component
const Modal = ({ project, onClose, onFund }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount) {
      onFund(project.id, amount);
      onClose(); // Close modal after submission
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">{project.name}</h2>
        <img src={project.image} alt={project.name} className="h-32 w-full object-cover mb-4 rounded-lg" />
        <p className="mb-4">{project.description}</p>
        <p className="mb-4">Goal: {project.goal.toLocaleString()} XLM</p>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in XLM"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
            required
          />
          <div className="flex justify-between">
            <Button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white">Close</Button>
            <Button type="submit" className="bg-green-700 hover:bg-green-900 text-white">Fund</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main FundProgress Component
export function FundProgress() {
  const [projectsData, setProjectsData] = useState(initialProjectsData);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCardClick = (project) => {
    setSelectedProject(project);
  };

  const handleModalClose = () => {
    setSelectedProject(null);
  };

  const handleFundProject = async (projectId, amount) => {
    const contractAddress = 'GBFAIH5WKAJQ77NG6BZG7TGVGXHPX4SQLIJ7BENJMCVCZSUZPSISCLU5'; // Your contract address
    const amountXLM = parseFloat(amount).toFixed(7); // Stellar uses up to 7 decimals

    try {
        // Check if Freighter is connected
        const isConnectedResponse = await isConnected();
        if (!isConnectedResponse) {
            alert("Please install Freighter and connect it to this app.");
            return;
        }

        // Request access to Freighter
        const accessResponse = await requestAccess();
        if (accessResponse.error) {
            throw new Error(accessResponse.error);
        }

        const userAddress = await getAddress();
        console.log('User Address:', userAddress);

        const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
        const sourceAccount = await server.loadAccount(userAddress.address);
        console.log('Source Account:', sourceAccount);

        const fee = await server.fetchBaseFee();

        // Validate contract address
        if (!StellarSdk.StrKey.isValidEd25519PublicKey(contractAddress)) {
            console.error("Contract address validation failed.");
            alert("Invalid contract address");
            return;
        }

        // Ensure sufficient balance before proceeding
        const balance = sourceAccount.balances.find(b => b.asset_type === 'native')?.balance;
        if (parseFloat(balance) < (parseFloat(amountXLM) + fee)) {
            alert("Insufficient funds. Please ensure you have enough XLM.");
            return;
        }

        // Build the transaction
        const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
            fee: fee.toString(),
            networkPassphrase: StellarSdk.Networks.TESTNET,
        })
        .addOperation(StellarSdk.Operation.payment({
            destination: contractAddress,
            asset: StellarSdk.Asset.native(), // Using XLM
            amount: amountXLM,
        }))
        .setTimeout(30)
        .build();

        // Convert to XDR for signing
        const xdr = transaction.toXDR();

        // Sign the transaction using Freighter
        const signedTransactionResponse = await signTransaction(xdr, {
            networkPassphrase:  StellarSdk.Networks.TESTNET,
            address: userAddress.address,
        });

        // Check for errors in the signing process
        if (signedTransactionResponse.error) {
            throw new Error(signedTransactionResponse.error);
        }

        // Extract the signed transaction XDR
        const signedXdr = signedTransactionResponse.signedTxXdr;

        // Create a transaction from the signed XDR
        const signedTransaction = StellarSdk.TransactionBuilder.fromXDR(signedXdr, StellarSdk.Networks.TESTNET);

        // Submit the signed transaction
        const response = await server.submitTransaction(signedTransaction);
        console.log('Transaction successful!', response);
        alert('Transaction successful!');

        // Update the project's current amount after successful transaction
        setProjectsData(prevProjects =>
          prevProjects.map(project => {
            if (project.id === projectId) {
              return { ...project, current: project.current + parseFloat(amountXLM) };
            }
            return project;
          })
        );

    } catch (error) {
        console.error("Transaction error:", error);
        alert(`Transaction failed! ${error.message}`);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {projectsData.map((project) => {
        const percentage = ((project.current / project.goal) * 100).toFixed(2); // Calculate percentage

        return (
          <Card key={project.id} className="w-80 bg-white shadow-md rounded-lg" onClick={() => handleCardClick(project)}>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <img src={project.image} alt={project.name} className="h-32 w-full object-cover rounded-t-lg" />
              </div>
              <CardTitle className="text-center">{project.name}</CardTitle>
              <CardDescription className="text-center mb-4">{project.description}</CardDescription>
            </CardHeader>
            <div className="px-4">
              <Progress value={parseFloat(percentage)} className="h-4 bg-gray-300" />
              <p className="text-center my-2">{percentage}% of {project.goal.toLocaleString()} XLM</p>
            </div>
            <CardFooter className="flex justify-center">
              <Button className="bg-green-700 text-gray-100 hover:bg-green-900 hover:text-gray-100 font-semibold" variant="outline">
                Fund {project.name}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
      {selectedProject && (
        <Modal 
          project={selectedProject} 
          onClose={handleModalClose} 
          onFund={handleFundProject} 
        />
      )}
    </div>
  );
}
