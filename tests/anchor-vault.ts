import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { AnchorVault } from "../target/types/anchor_vault";

describe("vault", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const connection = provider.connection;
  const program = anchor.workspace.AnchorVault as Program<AnchorVault>;

  const confirm = async (signature: string): Promise<string> => {
    const block = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
      signature,
      blockhash: block.blockhash,
      lastValidBlockHeight: block.lastValidBlockHeight,
    });

    return signature;
  };

  const log = async (signature: string): Promise<string> => {
    if (connection.rpcEndpoint === "https://api.devnet.solana.com") {
      console.log(
        `Your transaction signature: https://explorer.solana.com/transaction/${signature}?cluster=devnet`
      );
    } else {
      console.log(
        `Your transaction signature: https://explorer.solana.com/transaction/${signature}?cluster=custom&customUrl=${connection.rpcEndpoint}`
      );
    }

    return signature;
  };

  let user = Keypair.generate();
  let vault_state: PublicKey;
  let vault: PublicKey;
  let accountsPublicKeys: any = {};

  it("setup", async () => {
    await connection.confirmTransaction(
      await connection.requestAirdrop(user.publicKey, 5 * LAMPORTS_PER_SOL),
      "confirmed"
    );

    console.log("user balance: ", await connection.getBalance(user.publicKey) )

    vault_state = PublicKey.findProgramAddressSync(
      [Buffer.from("state", "utf-8"), user.publicKey.toBuffer()],
      program.programId
    )[0];

    console.log("vault state: ", vault_state);

    vault = PublicKey.findProgramAddressSync(
      [Buffer.from("vault", "utf-8"), vault_state.toBuffer()],
      program.programId
    )[0];

    console.log("vault: ", vault);

    accountsPublicKeys = {
      user: user.publicKey,
      vault_state: vault_state,
      vault: vault,
    };
  });

  it("initialize", async () => {
    const accounts = {
      user: accountsPublicKeys["user"],
      vaultState: accountsPublicKeys["vault_state"],
      vault: accountsPublicKeys["vault"],
    };

    await program.methods
      .initialize()
      .accounts(accounts)
      .signers([user])
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("deposit", async () => {
    const accounts = {
      user: accountsPublicKeys["user"],
      vaultState: accountsPublicKeys["vault_state"],
      vault: accountsPublicKeys["vault"],
    };

    await program.methods
      .deposit(new BN(0.02 * LAMPORTS_PER_SOL))
      .accounts(accounts)
      .signers([user])
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("withdraw", async () => {
    const accounts = {
      user: accountsPublicKeys["user"],
      vaultState: accountsPublicKeys["vault_state"],
      vault: accountsPublicKeys["vault"],
    };

    await program.methods
      .withdraw(new BN(0.01 * LAMPORTS_PER_SOL))
      .accounts(accounts)
      .signers([user])
      .rpc()
      .then(confirm)
      .then(log);
  });

  it("close", async () => {
    const accounts = {
      user: accountsPublicKeys["user"],
      vaultState: accountsPublicKeys["vault_state"],
      vault: accountsPublicKeys["vault"],
    };

    await program.methods
      .close()
      .accounts(accounts)
      .signers([user])
      .rpc()
      .then(confirm)
      .then(log);
  });
});
