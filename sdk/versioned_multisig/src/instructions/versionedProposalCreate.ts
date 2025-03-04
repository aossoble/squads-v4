import { PublicKey } from "@solana/web3.js";
import { createCreateVersionedProposalInstruction, PROGRAM_ID } from "../generated";
import { getProposalPda } from "../pda";

export function versionedProposalCreate({
  multisigPda,
  creator,
  payer,
  transactionIndex,
  programId = PROGRAM_ID,
}: {
  multisigPda: PublicKey;
  /** Member of the multisig that is creating the proposal. */
  creator: PublicKey;
  /** Payer of the proposal. */
  payer: PublicKey;
  transactionIndex: bigint;
  programId?: PublicKey;
}) {
  const [proposalPda] = getProposalPda({
    multisigPda,
    transactionIndex,
    programId,
  });

  if (transactionIndex > Number.MAX_SAFE_INTEGER) {
    throw new Error("transactionIndex is too large");
  }

  return createCreateVersionedProposalInstruction(
    {
      creator,
      multisig: multisigPda,
      proposal: proposalPda,
      payer
    },
    {
      args: {
        transactionIndex: Number(transactionIndex),
      },
    },
    programId
  );
}
