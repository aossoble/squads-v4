import {
  Connection,
  PublicKey,
  SendOptions,
  Signer,
  TransactionSignature,
  VersionedTransaction,
} from "@solana/web3.js";
import * as transactions from "../transactions";
import { translateAndThrowAnchorError } from "../errors";

/**
 *  Execute the multisig transaction.
 *  The transaction must be `ExecuteReady`.
 */
export async function vaultTransactionExecute({
  connection,
  feePayer,
  multisigPda,
  transactionIndex,
  member,
  signers,
  sendOptions,
  programId,
}: {
  connection: Connection;
  feePayer: Signer;
  multisigPda: PublicKey;
  transactionIndex: bigint;
  member: PublicKey;
  signers?: Signer[];
  sendOptions?: SendOptions;
  programId?: PublicKey;
}): Promise<TransactionSignature> {
  const blockhash = (await connection.getLatestBlockhash()).blockhash;

  const tx = await transactions.vaultTransactionExecute({
    connection,
    blockhash,
    feePayer: feePayer.publicKey,
    multisigPda,
    transactionIndex,
    member,
    programId,
  });
  
  const transaction = new VersionedTransaction(tx);

  transaction.sign([feePayer, ...(signers ?? [])]);

  try {
    return await connection.sendTransaction(transaction, sendOptions);
  } catch (err) {
    console.log("err", err);
    translateAndThrowAnchorError(err);
  }
}
