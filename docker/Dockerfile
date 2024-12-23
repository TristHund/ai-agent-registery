# Start with Ubuntu 22.04 as base
FROM ubuntu:22.04

# Prevent interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install essential packages
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    pkg-config \
    libudev-dev \
    libssl-dev \
    ca-certificates \
    gnupg \
    python3 \
    bzip2 \
    cmake \
    libclang-dev \
    gcc-multilib \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Install Solana CLI, which includes the necessary Rust and SBF tools
ARG SOLANA_VERSION=v1.18.22
RUN sh -c "$(curl -sSfL https://release.solana.com/"$SOLANA_VERSION"/install)"

# Set PATH for Rust and Solana
ENV PATH="/root/.local/share/solana/install/active_release/bin:${PATH}"

# Verify Solana installation
RUN solana --version

# Install specific version of Anchor
RUN npm i -g @coral-xyz/anchor-cli@0.30.1 && \
    anchor --version

# Setup Solana Configuration
RUN mkdir -p ~/.config/solana && \
    solana-keygen new --no-bip39-passphrase -o ~/.config/solana/id.json && \
    solana config set --url http://127.0.0.1:8899

# Create working directory and validator directory
WORKDIR /app
RUN mkdir -p test-ledger

# Copy project files
COPY . .

# Copy the health check script
COPY healthcheck.sh /app/healthcheck.sh
RUN chmod +x /app/healthcheck.sh

# Expose validator port
EXPOSE 8899

# Add health check for validator
HEALTHCHECK --interval=5s --timeout=3s --start-period=5s --retries=3 \
    CMD /app/healthcheck.sh

# Startup script with robust error handling
CMD ["sh", "-c", "\
    echo 'Removing existing ledger...' && \
    rm -rf ./test-ledger && \
    echo 'Starting Solana validator...' && \
    solana-test-validator \
    --ledger ./test-ledger \
    --bind-address 0.0.0.0 \
    --rpc-port 8899 \
    --limit-ledger-size \
    --quiet \
    & \
    echo 'Waiting for validator to start...' && \
    sleep 60 && \
    echo 'Validator is up' && \
    echo 'Airdropping SOL...' && \
    solana-keygen new --force --no-bip39-passphrase -o /app/new-keypair.json && \
    solana airdrop 10 $(solana address -k /app/new-keypair.json) && \
    echo 'No deploy.sh found. Validator is running.'; \
    tail -f /dev/null \
"]
