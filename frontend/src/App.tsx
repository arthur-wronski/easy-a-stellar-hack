import './App.css';
import { TabMenu } from './components/TabMenu';
import { Button } from "@/components/ui/button";
import stellarImage from '@/assets/stellar.png';
import { useState, useEffect } from 'react';
import * as StellarSdk from '@stellar/stellar-sdk';
import { requestAccess } from "@stellar/freighter-api";
import tokenImage from "@/assets/file.png";

function App() {
  const [address, setAddress] = useState('Connect Wallet');
  const [balance, setBalance] = useState('Link for balance');

  const handleFreighterConnect = async () => {
    try {
      const response = await requestAccess();
      console.log("Response from requestAccess:", response); // Log the entire response
      
      const { address: connectedAddress, error } = response; // Destructure connectedAddress

      if (error) {
        console.error("Error connecting to Freighter:", error);
        alert("Failed to connect to Freighter Wallet. Please try again.");
        return;
      }

      if (connectedAddress) {
        console.log("Connected to Freighter with address:", connectedAddress);
        alert(`Connected! Your public address is: ${connectedAddress}`);

        // Update the state with the crumbled address format
        setAddress(crumbleAddress(connectedAddress));
        
        // Fetch the balance from the Stellar network
        const fetchedBalance = await fetchBalance(connectedAddress);
        setBalance(`${fetchedBalance} XLM`);

        // Call the function again to check for balance updates or any errors
        checkAddressValidity(connectedAddress);
      } else {
        console.warn("No address returned, retrying...");
        // Retry to fetch the address after a short delay
        setTimeout(handleFreighterConnect, 200); // Retry after 2 seconds
      }

    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred while connecting to Freighter.");
    }
  };

  // Function to check if the address is valid and refresh balance if needed
  const checkAddressValidity = async (connectedAddress) => {
    const balance = await fetchBalance(connectedAddress);
    setBalance(`${balance} XLM`);
    // You can add further logic if needed, e.g., checking balance periodically
  };

  // Function to fetch balance from Stellar network
  const fetchBalance = async (address) => {
    try {
      const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
      const account = await server.loadAccount(address);
      console.log('Account:', account);
      const balance = account.balances.find((b) => b.asset_type === 'native');
      return balance ? balance.balance : '0';
    } catch (error) {
      console.error("Error fetching balance:", error);
      return '0'; // Return '0' if there's an error
    }
  };

  // Function to crumble the address into a shorter format
  const crumbleAddress = (addr) => {
    if (addr.length > 8) {
      return `${addr.slice(0, 4)}...${addr.slice(-4)}`; // e.g., 'GAIR...NRU3'
    }
    return addr; // Return the address as is if it's too short
  };

  return (
    <div className='flex flex-col h-full w-full'>
      <h1 className='text-green-600 text-9xl font-semibold font-shadows'>KALE</h1>
      <div className='flex flex-col absolute top-8 right-8 space-y-3'>
        <Button onClick={handleFreighterConnect} variant="outline" className='font-semibold w-32'> {address} </Button>
        {/* <img src={tokenImage} className='h-16 w-12' alt="Token" /> */}
        <p className='font-semibold mt-5 mr-6'>{balance} </p>
      </div>
      <p className='text-center text-[#888888] font-semibold mb-4 font-shadows text-xl'>
        The World's on us
      </p>
     
      <div className='flex flex-row justify-center'><TabMenu/></div>
      <div className='absolute bottom-3 right-3 text-center text-[#888888] font-semibold mb-4'>
        Powered by
        <img src={stellarImage} className='w-20 h-6' alt="Stellar" />
      </div>
    </div>
  );
}

export default App;
