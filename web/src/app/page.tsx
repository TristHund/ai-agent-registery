import * as React from "react";

import { Input } from "@/components/ui/input";
import { AccordionForm } from "@/components/default/accordionForm";
import PhantomWalletButton from "@/components/default/phantomButton";

export default function Home() {
  return (
    <div className="bg-zinc-950 dark:bg-white text-center min-h-[100vh] p-20 flex items-center content-center flex-col">
      <h1 className="scroll-m-20 text-4xl text-white font-extrabold tracking-tight lg:text-5xl">
        CRCT - Agent Registry
      </h1>
      <PhantomWalletButton />
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
