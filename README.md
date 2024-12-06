# Anchor Vault 

This repository contains a **Vault** program built using the **Anchor Framework** on the Solana blockchain. The vault is a secure on-chain storage solution for managing tokens or assets under programmatic control.

---

## Getting Started

Follow these steps to set up, build, and test the program on your local machine.

### Prerequisites

1. [Install Rust](https://www.rust-lang.org/tools/install) 
2. [Install Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
3. [Install Anchor Framework](https://github.com/coral-xyz/anchor)

### Clone the Repository

```bash
git clone https://github.com/<your-username>/<repository-name>.git
cd <repository-name>
```

### Build and run tests

```bash
cd <repository-name>
anchor build
anchor test
```

### Deploy the program

Before deploying the program, decide whether to deploy to the Devnet (public testing network) or a local validator (local development environment). Follow the steps below:

#### Deploy to Devnet

Set the Cluster to Devnet: Configure Solana CLI to use the Devnet cluster:
```bash
solana config set --url https://api.devnet.solana.com
```

Deploy the Program: Use Anchor's deployment command to deploy to Devnet:
```bash
anchor deploy --provider.cluster devnet
```

#### Deploy to Local Validator

If you want to test the program in a local environment, you can run a local Solana validator and deploy the program there.

1. Run the Local Validator: In one terminal, start a local Solana validator:
```bash
solana-test-validator
```

2. Set the Cluster to Localhost: In another terminal, configure Solana CLI to use the local validator:
```bash
solana config set --url http://localhost:8899
```

3. Deploy the Program to Local Validator: Skip starting a local validator again by using:
```bash
anchor deploy --skip-local-validator
```