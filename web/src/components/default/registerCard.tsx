"use client";
import * as React from "react";
import * as web3 from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import signAndSendTransaction from "@/utils/signAndSendTransaction";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";
import getProvider from "@/utils/getProvider";
import { send } from "process";

export default function RegisterCard() {
  const { toast } = useToast();
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  const PROGRAM_ID = new web3.PublicKey(
    "Gr8hr3nbHioGawTorNpJv6YT9xpf31qT3ePKMJmha3Vp"
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    agentPublicKey: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    console.log(e.target.value);
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.agentPublicKey) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    try {
      setIsLoading(true);
      const provider = getProvider();
      const resp = await provider!.connect();
      const sender = resp.publicKey;

      // Create the agent PDA
      const [agentPDA] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("agent"), sender.toBuffer(), Buffer.from(formData.name)],
        PROGRAM_ID
      );
      console.log("agent pda: ", agentPDA.toBase58());

      // Calculate space for the account
      const space =
        8 + // discriminator
        4 +
        formData.name.length + // name
        4 +
        formData.description.length + // description
        32 + // agent_key
        32 + // owner
        1 + // status
        8 + // created_at
        8 + // updated_at
        32; // reserved

      const rentExemptionAmount =
        await connection.getMinimumBalanceForRentExemption(space);

      const transaction = new web3.Transaction();
      // transaction.add(
      //   web3.SystemProgram.createAccount({
      //     fromPubkey: sender,
      //     newAccountPubkey: agentPDA,
      //     space: space,
      //     lamports: rentExemptionAmount,
      //     programId: PROGRAM_ID,
      //   })
      // );
      // Add register instruction
      transaction.add(
        new web3.TransactionInstruction({
          programId: PROGRAM_ID,
          keys: [
            {
              pubkey: agentPDA,
              isSigner: false,
              isWritable: true,
            },
            {
              pubkey: sender,
              isSigner: true,
              isWritable: true,
            },
            {
              pubkey: web3.SystemProgram.programId,
              isSigner: false,
              isWritable: false,
            },
          ],
          data: Buffer.concat([
            Buffer.from("879d42c30271af1e", "hex"),
            Buffer.from(
              JSON.stringify({
                name: formData.name,
                description: formData.description,
                agentKey: formData.agentPublicKey,
              })
            ),
          ]),
        })
      );

      transaction.feePayer = sender;
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      const signature = await signAndSendTransaction(
        provider!,
        transaction,
        connection
      );
      console.log("signature:", signature);
      toast({
        title: "Success",
        description: `Agent registered successfully! Tx: ${signature.slice(
          0,
          8
        )}...`,
      });

      // reset form
      setFormData({
        name: "",
        description: "",
        agentPublicKey: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Card className="w-[380px] mt-4">
        <CardHeader>
          <CardTitle>Agent Details</CardTitle>
          <CardDescription>Specify your agent details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name of your agent"
                  maxLength={100}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="message">Description</Label>
                <Textarea
                  placeholder="Provide a description for your agent"
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  maxLength={500}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="pubkey">Agent Public key</Label>
                <Input
                  id="agentPublicKey"
                  value={formData.agentPublicKey}
                  onChange={handleInputChange}
                  placeholder="Enter agent's public key"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Registering..." : "Register Agent"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
