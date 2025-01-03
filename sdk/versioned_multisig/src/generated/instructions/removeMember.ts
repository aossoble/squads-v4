/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import {
  VersionedMultisigRemoveMemberArgs,
  versionedMultisigRemoveMemberArgsBeet,
} from '../types/VersionedMultisigRemoveMemberArgs'

/**
 * @category Instructions
 * @category RemoveMember
 * @category generated
 */
export type RemoveMemberInstructionArgs = {
  args: VersionedMultisigRemoveMemberArgs
}
/**
 * @category Instructions
 * @category RemoveMember
 * @category generated
 */
export const removeMemberStruct = new beet.FixableBeetArgsStruct<
  RemoveMemberInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['args', versionedMultisigRemoveMemberArgsBeet],
  ],
  'RemoveMemberInstructionArgs'
)
/**
 * Accounts required by the _removeMember_ instruction
 *
 * @property [_writable_] multisig
 * @property [**signer**] configAuthority
 * @property [_writable_, **signer**] rentPayer (optional)
 * @category Instructions
 * @category RemoveMember
 * @category generated
 */
export type RemoveMemberInstructionAccounts = {
  multisig: web3.PublicKey
  configAuthority: web3.PublicKey
  rentPayer?: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const removeMemberInstructionDiscriminator = [
  171, 57, 231, 150, 167, 128, 18, 55,
]

/**
 * Creates a _RemoveMember_ instruction.
 *
 * Optional accounts that are not provided default to the program ID since
 * this was indicated in the IDL from which this instruction was generated.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category RemoveMember
 * @category generated
 */
export function createRemoveMemberInstruction(
  accounts: RemoveMemberInstructionAccounts,
  args: RemoveMemberInstructionArgs,
  programId = new web3.PublicKey('5XyhmmQ2dRFpnLtjbWZYkNH46YkEBzaKodnjTR7Cm9er')
) {
  const [data] = removeMemberStruct.serialize({
    instructionDiscriminator: removeMemberInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.multisig,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.configAuthority,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: accounts.rentPayer ?? programId,
      isWritable: accounts.rentPayer != null,
      isSigner: accounts.rentPayer != null,
    },
    {
      pubkey: accounts.systemProgram ?? programId,
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