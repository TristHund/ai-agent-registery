#!/bin/bash

echo "Validating development environment..."

# Function to check command exists
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 not found"
        return 1
    else
        echo "✅ $1 found: $($1 --version)"
        return 0
    fi
}

# Function to validate Rust setup
validate_rust() {
    echo "Checking Rust installation..."
    if ! check_command rustc; then return 1; fi
    if ! check_command cargo; then return 1; fi
    
    # Verify specific Rust version
    if ! rustc --version | grep -q "1.80.1"; then
        echo "❌ Wrong Rust version. Expected 1.80.1"
        return 1
    fi
    
    # Verify sbf-solana target
    if ! rustup target list | grep -q "sbf-solana"; then
        echo "❌ sbf-solana target not installed"
        return 1
    fi
    
    echo "✅ Rust setup validated"
    return 0
}

# Function to validate Solana setup
validate_solana() {
    echo "Checking Solana installation..."
    if ! check_command solana; then return 1; fi
    if ! check_command solana-test-validator; then return 1; fi
    
    # Verify validator can start
    echo "Testing validator..."
    solana-test-validator --no-bpf-jit --quiet &
    VALIDATOR_PID=$!
    sleep 5
    
    if ! kill -0 $VALIDATOR_PID 2>/dev/null; then
        echo "❌ Validator failed to start"
        return 1
    fi
    
    kill $VALIDATOR_PID
    echo "✅ Solana setup validated"
    return 0
}

# Function to validate Anchor setup
validate_anchor() {
    echo "Checking Anchor installation..."
    if ! check_command anchor; then return 1; fi
    
    # Verify Anchor version
    if ! anchor --version | grep -q "0.30.1"; then
        echo "❌ Wrong Anchor version. Expected 0.30.1"
        return 1
    fi
    
    echo "✅ Anchor setup validated"
    return 0
}

# Run all validations
validate_rust && validate_solana && validate_anchor

if [ $? -eq 0 ]; then
    echo "✅ All validations passed!"
    exit 0
else
    echo "❌ Validation failed!"
    exit 1
fi
