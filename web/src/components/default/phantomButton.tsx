"use client";
import { useState, useEffect } from "react";

interface PhantomWindow extends Window {
  solana?: {
    isPhantom?: boolean;
    connect: () => Promise<{ publicKey: { toString: () => string } }>;
    disconnect: () => Promise<void>;
  };
}

declare const window: PhantomWindow;

const PhantomWalletButton = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        if ("solana" in window) {
          const solana = window.solana;
          if (solana?.isPhantom) {
            console.log("Phantom wallet found!");
          }
        } else {
          console.log("Phantom wallet not found! Get a phantom wallet");
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (!window.solana) {
      window.open("https://phantom.app/", "_blank");
      return;
    }

    try {
      setIsConnecting(true);
      const response = await window.solana.connect();
      const address = response.publicKey.toString();
      setWalletAddress(address);
      console.log("Connected with Public Key:", address);
    } catch (error) {
      console.error(error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    if (window.solana) {
      try {
        await window.solana.disconnect();
        setWalletAddress("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      {walletAddress ? (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-600">
            Connected: {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
          </p>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="px-4 py-2 bg-white text-black rounded-lg hover:bg-slate-300 transition-colors disabled:bg-gray-400"
        >
          {isConnecting ? "Connecting..." : "Connect Phantom Wallet"}
        </button>
      )}
    </div>
  );
};

export default PhantomWalletButton;
