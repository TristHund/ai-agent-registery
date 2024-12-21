#!/bin/bash

# Configure Solana to use local validator
solana config set --url http://localhost:8899

# Generate a keypair if one doesn't exist
if [ ! -f ~/.config/solana/id.json ]; then
    solana-keygen new --no-bip39-passphrase -o ~/.config/solana/id.json
fi

# Build and deploy
anchor build
solana program deploy target/deploy/your_program.so

echo "Deployment complete!"
