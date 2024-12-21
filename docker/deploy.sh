#!/bin/bash

# Wait for validator
echo "Waiting for validator to be ready..."
sleep 10

# Configure Solana
solana config set --url http://localhost:8899

# Generate keypair if needed
if [ ! -f ~/.config/solana/id.json ]; then
    solana-keygen new --no-bip39-passphrase -o ~/.config/solana/id.json
fi

# Verify validator is running
if ! solana cluster-version; then
    echo "Error: Validator not running"
    exit 1
fi

# Initialize anchor project if not already initialized
if [ ! -f Anchor.toml ]; then
    echo "Initializing new Anchor project..."
    anchor init your_project_name
    cd your_project_name
fi

# Build and deploy
echo "Building program..."
anchor build

echo "Deploying program..."
solana program deploy target/deploy/your_program.so

echo "Deployment complete!"

# Keep container running
tail -f /dev/null
