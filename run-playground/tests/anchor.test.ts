describe('ai_registry', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.AiRegistry as Program<AiRegistry>;
  
  const agentAccount = Keypair.generate();
  
  it('Can register an AI agent', async () => {
    try {
      const name = "TestAgent";
      const description = "Test Description";
      
      await program.methods
        .registerAgent(
          name,
          description,
          provider.wallet.publicKey
        )
        .accounts({
          agent: agentAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([agentAccount])
        .rpc();
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  });

  it('Can update an AI agent', async () => {
    try {
      await program.methods
        .updateAgent(
          // Use type coercion for Option types
          { some: "UpdatedAgent" },
          { some: "Updated Description" },
          null
        )
        .accounts({
          agent: agentAccount.publicKey,
          user: provider.wallet.publicKey,
        })
        .rpc();
    } catch (error) {
      console.error('Update error:', error);
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
    } catch (error) {
      console.error('Status update error:', error);
      throw error;
    }
  });
});
