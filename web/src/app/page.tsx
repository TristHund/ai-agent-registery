import * as React from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { AgentBanner } from "@/components/svgs/agentBanner";
import { AccordionForm } from "@/components/default/accordionForm";
import PhantomWalletButton from "@/components/default/phantomButton";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Code, Bot, Activity, Users, BarChart } from 'lucide-react';

require("@solana/wallet-adapter-react-ui/styles.css");

const BannerSection = () => {
  return (
    <div className="relative">
      <AgentBanner />
      <div className="relative z-10 flex justify-center gap-5 mb-4">
        <h1 className="scroll-m-20 text-4xl text-white font-extrabold tracking-tight lg:text-5xl">
          AgentNet
        </h1>
        <Avatar>
          <AvatarImage src="/picture1.jpeg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <p className="relative z-10 text-xl text-muted-foreground">
        On-chain AI agent registry on Solana
      </p>
    </div>
  );
};

const FeaturedContent = () => {
  const mockAgents = [
    {
      name: "CodeAssist GPT",
      description: "Specialized in code review and debugging",
      category: "Development",
      icon: Code,
      usage: "2.5k",
    },
    {
      name: "DataAnalyst AI",
      description: "Expert in data analysis and visualization",
      category: "Analytics",
      icon: BarChart,
      usage: "1.8k",
    },
    {
      name: "Trading Bot",
      description: "Automated trading strategies assistant",
      category: "Finance",
      icon: Bot,
      usage: "3.2k",
    }
  ];

  const platformStats = [
    { label: "Total Agents", value: "150+", icon: Brain },
    { label: "Active Users", value: "2.5k", icon: Users },
    { label: "Weekly Transactions", value: "12k", icon: Activity }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      {/* Platform Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {platformStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-zinc-900 border-zinc-800">
              <CardContent className="flex items-center p-6">
                <Icon className="w-8 h-8 text-green-500 mr-4" />
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-zinc-400">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Featured Agents */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Featured Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockAgents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <Card key={index} className="bg-zinc-900 border-zinc-800 hover:border-blue-500 transition-all duration-300">
                <CardHeader>
<div className="p-20 bg-green-500 rounded-lg">
                      <Icon className="" />
                    </div>
                  <div className="flex items-center space-x-4">
                    
                    <div>
                      <CardTitle className="text-lg text-white">{agent.name}</CardTitle>
                      <p className="text-sm text-zinc-400">{agent.category}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 mb-4">{agent.description}</p>
                  <div className="flex items-center text-zinc-400">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{agent.usage} users</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  return (
    <div className="bg-zinc-950 text-center min-h-screen">
      <div className="absolute top-5 right-5">
        <PhantomWalletButton />
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="flex justify-center gap-5 mb-4">
          <BannerSection/>
        </div>
        <div className="mt-12">
          <h2 className="scroll-m-20 text-white pb-2 text-3xl font-semibold tracking-tight">
            Search for agents registered
          </h2>
          <div className="grid w-full max-w-sm mx-auto items-center gap-1.5 text-white mt-2">
            <Input type="search" id="email" placeholder="Public key" />
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="py-16 bg-zinc-900/50">
        <FeaturedContent />
      </section>

      {/* Instructions Section */}
      <section className="py-16 px-4">
        <h2 className="scroll-m-20 text-white pb-2 text-3xl font-semibold tracking-tight mb-8">
          Instructions to register and modify your own agent
        </h2>
        <div className="max-w-4xl mx-auto">
          <AccordionForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-zinc-500">
        <p>Built on Solana</p>
      </footer>
    </div>
  );
}
