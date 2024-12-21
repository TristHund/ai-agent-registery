import assert from "assert";
import * as web3 from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { Program } from '@project-serum/anchor';
import { AiRegistry } from '../target/types/ai_registry';
import { PublicKey, Keypair, SystemProgram } from '@solana/web3.js';
import type { AiRegistry } from "../target/types/ai_registry";

describe('ai_registry', () => {
  // Configure the client to use the local cluster
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.AiRegistry as anchor.Program<AiRegistry>;
  
  // Configure the client to use the local cluster
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.AiRegistry as Program<AiRegistry>;
  
  // Test accounts
  const agentAccount = Keypair.generate();
  const agentKey = Keypair.generate().publicKey;
  
  it('Can register an AI agent', async () => {
    try {
      await program.methods
        .registerAgent(
          'TestAI',
          'A test AI agent for validation',
          agentKey
        )
        .accounts({
          agent: agentAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([agentAccount])
        .rpc();

      // Fetch the account details
      const account = await program.account.agent.fetch(agentAccount.publicKey);
      
      console.log('Agent registered successfully');
      console.log('Name:', account.name);
      console.log('Description:', account.description);
      console.log('Agent Key:', account.agentKey.toString());
      console.log('Status:', account.status);
      
      // Basic assertions
      assert.equal(account.name, 'TestAI');
      assert.equal(account.description, 'A test AI agent for validation');
      assert.equal(account.agentKey.toString(), agentKey.toString());
      
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });

  it('Can update an AI agent', async () => {
    try {
      const newName = 'UpdatedAI';
      const newDescription = 'Updated test AI agent';
      
      await program.methods
        .updateAgent(
          newName,
          newDescription,
          null
        )
        .accounts({
          agent: agentAccount.publicKey,
          user: provider.wallet.publicKey,
        })
        .rpc();

      const account = await program.account.agent.fetch(agentAccount.publicKey);
      
      console.log('Agent updated successfully');
      console.log('New Name:', account.name);
      console.log('New Description:', account.description);
      
      // Basic assertions
      assert.equal(account.name, newName);
      assert.equal(account.description, newDescription);
      
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });

  it('Can update agent status', async () => {
    try {
      await program.methods
        .updateStatus({ inactive: {} })
        .accounts({
          agent: agentAccount.publicKey,
          user: provider.wallet.publicKey,
        })
        .rpc();

      const account = await program.account.agent.fetch(agentAccount.publicKey);
      
      console.log('Status updated successfully');
      console.log('New Status:', account.status);
      
      // Basic assertion
      assert(account.status.inactive);
      
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });
});