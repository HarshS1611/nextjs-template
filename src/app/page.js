"use client";

import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useDisconnect } from "wagmi";
import { useEffect, useState } from "react";
import { Wallet, LogOut, User } from "lucide-react";
import ContractInteraction from "@/components/ContractInteraction";
import { Toaster } from 'react-hot-toast';
import Image from "next/image";

export default function Home() {
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle the disconnect action
  const handleDisconnect = () => {
    try {
      disconnect();
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error("Disconnect error:", error);
    }
  };

  // Handler for the connect button
  const handleConnect = () => {
    try {
      console.log("Connecting wallet...");
      open();
    } catch (error) {
      console.error("Connect error:", error);
    }
  };

  if (!mounted)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white animate-pulse">Loading...</div>
      </div>
    );

  return (
    <div className="">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            Millionaire’s Dilemma : Yacht Edition 🚤
          </h1>
          <div>
            {isConnected ? (
              <div className="flex items-center gap-4 bg-[#4589EE] p-2 rounded-lg border border-blue shadow-xl">
                <div className="flex items-center gap-2">
                  <User className="text-white w-5 h-5" />
                  <span className="text-sm text-white truncate max-w-[150px]">
                    {address?.substring(0, 6)}...
                    {address?.substring(address.length - 4)}
                  </span>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="bg-red-500 hover:bg-red-700 text-white px-3 py-1.5 rounded-md transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2"
              >
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </button>
            )}
          </div>
        </div>

        {isConnected ? (
          <div className=" gap-6 mt-20">
            <ContractInteraction />
          </div>
        ) : (
          <div className="bg-[#4589EE] bg-opacity-20 rounded-xl p-10 text-center">
            <Wallet className="mx-auto mb-4 w-12 h-12 text-blue-400" />
            <p className="text-white text-lg mb-4">
              Connect your wallet to access the Richest Revealer contract.
            </p>
            <button
              onClick={handleConnect}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors"
            >
              Connect Wallet
            </button>
            <div className="flex flex-col gap-2 justify-center py-10 w-full text-gray-100  mt-4">
              <p>🔐 Submit your wealth anonymously. </p>
              <p>🥇 Compete without revealing a thing.</p>
              <p> 🧠 Powered by @Inco.</p>
              <p> 🚀 Let the chain decide who’s the richest — not the loudest.</p>
              <span onClick={handleConnect} className="text-blue-300 cursor-pointer underline "> Join the revolution!</span>
            </div>

            <Image
              src="/images/ui.png"
              alt="Hero Image"
              width={800}
              height={800}
              className="mt-8 mx-auto"
            />
          </div>
        )}
      </div>
      <Toaster position="bottom-right" />

    </div>
  );
}
