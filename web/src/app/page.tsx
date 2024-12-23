import * as React from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
require("@solana/wallet-adapter-react-ui/styles.css");

import { Input } from "@/components/ui/input";
import { AccordionForm } from "@/components/default/accordionForm";
import PhantomWalletButton from "@/components/default/phantomButton";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";

export default function Home() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  return (
    <div className="bg-zinc-950 dark:bg-white text-center min-h-[100vh] p-20 flex items-center content-center flex-col">
      {/* <Image
        src="/picture1.jpeg"
        alt=""
        width={500}
        height={500}
        style={{ filter: "grayscale(100%)" }}
        className="mb-7 absolute"
      /> */}
      <div className="absolute top-5 right-5">
        <PhantomWalletButton />
      </div>
      <div className="flex gap-5">
        <h1 className="scroll-m-20 text-4xl text-white font-extrabold tracking-tight lg:text-5xl">
          AgentNet
        </h1>
        <Avatar>
          <AvatarImage src="/picture1.jpeg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <p className="text-xl text-muted-foreground">
        On-chain AI agent registry on Solana
      </p>
      <h2 className="scroll-m-20 text-white pb-2 text-3xl font-semibold tracking-tight mt-12">
        Search for agents registered
      </h2>
      <p className="text-xl text-muted-foreground">
        Enter the public key address to search for the agents
      </p>
      <div className="grid w-full max-w-sm items-center gap-1.5 text-white mt-2">
        <Input type="search" id="email" placeholder="Public key" />
      </div>
      <h2 className="scroll-m-20 text-white pb-2 text-3xl font-semibold tracking-tight mt-24">
        Instructions to register and modify your own agent
      </h2>
      <AccordionForm />
    </div>
  );
}
