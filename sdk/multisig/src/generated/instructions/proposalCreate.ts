/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import {
  ProposalCreateArgs,
  proposalCreateArgsBeet,
} from '../types/ProposalCreateArgs'

/**
 * @category Instructions
 * @category ProposalCreate
 * @category generated
 */
export type ProposalCreateInstructionArgs = {
  args: ProposalCreateArgs
}
/**
 * @category Instructions
 * @category ProposalCreate
 * @category generated
 */
export const proposalCreateStruct = new beet.BeetArgsStruct<
  ProposalCreateInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['args', proposalCreateArgsBeet],
  ],
  'ProposalCreateInstructionArgs'
)
/**
 * Accounts required by the _proposalCreate_ instruction
 *
 * @property [] multisig
 * @property [_writable_] proposal
 * @property [_writable_, **signer**] creator
 * @category Instructions
 * @category ProposalCreate
 * @category generated
 */
export type ProposalCreateInstructionAccounts = {
  multisig: web3.PublicKey
  proposal: web3.PublicKey
  creator: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const proposalCreateInstructionDiscriminator = [
  220, 60, 73, 224, 30, 108, 79, 159,
]

/**
 * Creates a _ProposalCreate_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category ProposalCreate
 * @category generated
 */
export function createProposalCreateInstruction(
  accounts: ProposalCreateInstructionAccounts,
  args: ProposalCreateInstructionArgs,
  programId = new web3.PublicKey('SQDS4ep65T869zMMBKyuUq6aD6EgTu8psMjkvj52pCf')
) {
  const [data] = proposalCreateStruct.serialize({
    instructionDiscriminator: proposalCreateInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.multisig,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.proposal,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.creator,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
  ]

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc)
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  })
  return ix
}
