#!/bin/bash

# Function to check if validator is running and responding
check_validator() {
    solana cluster-version &>/dev/null
    return $?
}

echo "Waiting for validator to be ready..."

# More robust validator check with timeout
TIMEOUT=30
ELAPSED=0
while ! check_validator; do
    if [ $ELAPSED -gt $TIMEOUT ]; then
        echo "Error: Validator failed to start within $TIMEOUT seconds"
        exit 1
    fi
    echo "Waiting for validator... ($ELAPSED/$TIMEOUT seconds)"
    sleep 2
    ELAPSED=$((ELAPSED+2))
done

echo "Validator is ready!"

# Configure Solana
solana config set --url http://localhost:8899

# Generate keypair if needed
if [ ! -f ~/.config/solana/id.json ]; then
    echo "Generating new keypair..."
    solana-keygen new --no-bip39-passphrase -o ~/.config/solana/id.json
fi

# Generate program keypair if it doesn't exist
if [ ! -f target/deploy/ai_registry-keypair.json ]; then
    echo "Generating program keypair..."
    solana-keygen new --no-bip39-passphrase -o target/deploy/ai_registry-keypair.json
fi

# Ensure we have SOL
echo "Requesting airdrop..."
solana airdrop 2 || {
    echo "Airdrop failed, retrying in 2 seconds..."
    sleep 2
    solana airdrop 2
}

# Build and deploy
echo "Building program..."
anchor build

echo "Deploying program..."
PROGRAM_ID=$(solana address -k target/deploy/ai_registry-keypair.json)
echo "Program ID will be: $PROGRAM_ID"

solana program deploy target/deploy/ai_registry.so

echo "Deployment complete! Program ID: $PROGRAM_ID"

# Keep logs visible
echo "Tailing validator logs..."
tail -f test-ledger/validator.log
