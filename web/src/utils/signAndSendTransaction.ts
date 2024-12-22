import { Connection, Transaction, VersionedTransaction } from "@solana/web3.js";

import { PhantomProvider } from "../types";
import { sign } from "crypto";

/**
 * Signs and sends transaction
 * @param   {PhantomProvider} provider    a Phantom Provider
 * @param   {Transaction}     transaction a transaction to sign
 * @returns {Transaction}                 a signed transaction
 */
const signAndSendTransaction = async (
  provider: PhantomProvider,
  transaction: Transaction,
  connection: Connection
): Promise<string> => {
  try {
    console.log("tsx: ", transaction);
    const signedTransaction = await provider.signTransaction(transaction);
    console.log("signed tsx: ", signedTransaction.compileMessage().accountKeys);
    signedTransaction
      .compileMessage()
      .accountKeys.map((key) => console.log(key.toBase58()));
    const signature = await connection.sendRawTransaction(
      signedTransaction.serialize(),
      {
        skipPreflight: true,
      }
    );
    return signature;
  } catch (error) {
    console.warn(error);
    throw new Error();
  }
};

export default signAndSendTransaction;
