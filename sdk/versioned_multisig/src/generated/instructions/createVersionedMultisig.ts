/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import {
  VersionedMultisigCreateArgsV2,
  versionedMultisigCreateArgsV2Beet,
} from '../types/VersionedMultisigCreateArgsV2'

/**
 * @category Instructions
 * @category CreateVersionedMultisig
 * @category generated
 */
export type CreateVersionedMultisigInstructionArgs = {
  args: VersionedMultisigCreateArgsV2
}
/**
 * @category Instructions
 * @category CreateVersionedMultisig
 * @category generated
 */
export const createVersionedMultisigStruct = new beet.FixableBeetArgsStruct<
  CreateVersionedMultisigInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['args', versionedMultisigCreateArgsV2Beet],
  ],
  'CreateVersionedMultisigInstructionArgs'
)
/**
 * Accounts required by the _createVersionedMultisig_ instruction
 *
 * @property [] programConfig
 * @property [_writable_] treasury
 * @property [_writable_] multisig
 * @property [**signer**] createKey
 * @property [_writable_, **signer**] creator
 * @category Instructions
 * @category CreateVersionedMultisig
 * @category generated
 */
export type CreateVersionedMultisigInstructionAccounts = {
  programConfig: web3.PublicKey
  treasury: web3.PublicKey
  multisig: web3.PublicKey
  createKey: web3.PublicKey
  creator: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const createVersionedMultisigInstructionDiscriminator = [
  183, 3, 104, 187, 252, 182, 210, 134,
]

/**
 * Creates a _CreateVersionedMultisig_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category CreateVersionedMultisig
 * @category generated
 */
export function createCreateVersionedMultisigInstruction(
  accounts: CreateVersionedMultisigInstructionAccounts,
  args: CreateVersionedMultisigInstructionArgs,
  programId = new web3.PublicKey('wegmizLs3pRye1rBuAjJ8VqW8zmCVN1q97CvW6wVxhY')
) {
  const [data] = createVersionedMultisigStruct.serialize({
    instructionDiscriminator: createVersionedMultisigInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.programConfig,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.treasury,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.multisig,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.createKey,
      isWritable: false,
      isSigner: true,
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
