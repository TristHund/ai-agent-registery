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
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Install Solana CLI
RUN sh -c "$(curl -sSfL https://release.solana.com/v1.17.6/install)"
ENV PATH="/root/.local/share/solana/install/active_release/bin:${PATH}"

# Install Anchor
RUN npm i -g @coral-xyz/anchor-cli@0.28.0

# Set up working directory
WORKDIR /app
COPY . .

# Create validator directory
RUN mkdir -p test-ledger

# Expose port
EXPOSE 8899

# Start validator with correct params
CMD ["sh", "-c", "solana-test-validator --ledger ./test-ledger --bind-address 0.0.0.0 & sleep 5 && ./deploy.sh"]
