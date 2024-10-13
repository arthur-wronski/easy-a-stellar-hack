import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import reforestation from '@/assets/reforestation.png'
import ocean from '@/assets/ocean.png'
import energy from '@/assets/energy.png'
import { requestAccess} from "@stellar/freighter-api";
import StellarSdk from 'stellar-sdk';


const projectsData = [
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
    image: energy, 
  },
];
const handleFreighterConnect = async () => {
  try {
    const { address, error } = await requestAccess();

    if (error) {
      console.error("Error connecting to Freighter:", error);
      alert("Failed to connect to Freighter Wallet. Please try again.");
      return;
    } 

    if (address) {
      console.log("Connected to Freighter with address:", address);
      alert(`Connected! Your public address is: ${address}`);
      
      // Fetch the XLM balance for the connected address
      fetchXLMBalance(address);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    alert("An unexpected error occurred while connecting to Freighter.");
  }
};

const fetchXLMBalance = async (address) => {
  StellarSdk.Network.useTestNetwork();

  const server = new StellarSdk.Server('https://horizon.testnet.stellar.org');

  try {
    const account = await server.loadAccount(address);
    
    // Get the balance
    const balance = account.balances.find((b) => b.asset_type === 'native');
    const xlmBalance = balance ? balance.balance : 0;

    console.log(`XLM Balance for ${address}: ${xlmBalance}`);
    alert(`Your XLM Balance: ${xlmBalance} XLM`);
  } catch (error) {
    console.error("Error fetching balance:", error);
    alert("Failed to fetch the XLM balance. Please try again.");
  }
};

export function FundProgress() {
  return (
      <div className="flex flex-wrap justify-center gap-6">
        {projectsData.map((project) => {
          const percentage = ((project.current / project.goal) * 100).toFixed(2); // Calculate percentage

          return (
            <Card key={project.id} className="w-80 bg-white shadow-md rounded-lg">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <img src={project.image} alt={project.name} className="h-32 w-full object-cover rounded-t-lg" />
                </div>
                <CardTitle className="text-center">{project.name}</CardTitle>
                <CardDescription className="text-center mb-4">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <div className="px-4">
                <Progress value={parseFloat(percentage)} className="h-4 bg-gray-300" />
                <p className="text-center mt-2">{percentage}% of {project.goal.toLocaleString()} XLM</p>
              </div>
              <CardFooter className="flex justify-center">
                <Button onClick={handleFreighterConnect} className="bg-green-700 text-gray-100 hover:bg-green-900 hover:text-gray-100 font-semibold" variant="outline">
                  Fund {project.name}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
  );
}
