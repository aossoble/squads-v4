/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import {
  VersionedMultisigAddMemberArgs,
  versionedMultisigAddMemberArgsBeet,
} from '../types/VersionedMultisigAddMemberArgs'

/**
 * @category Instructions
 * @category AddMember
 * @category generated
 */
export type AddMemberInstructionArgs = {
  args: VersionedMultisigAddMemberArgs
}
/**
 * @category Instructions
 * @category AddMember
 * @category generated
 */
export const addMemberStruct = new beet.FixableBeetArgsStruct<
  AddMemberInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['args', versionedMultisigAddMemberArgsBeet],
  ],
  'AddMemberInstructionArgs'
)
/**
 * Accounts required by the _addMember_ instruction
 *
 * @property [_writable_] multisig
 * @property [**signer**] configAuthority
 * @property [_writable_, **signer**] rentPayer (optional)
 * @category Instructions
 * @category AddMember
 * @category generated
 */
export type AddMemberInstructionAccounts = {
  multisig: web3.PublicKey
  configAuthority: web3.PublicKey
  rentPayer?: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const addMemberInstructionDiscriminator = [
  13, 116, 123, 130, 126, 198, 57, 34,
]

/**
 * Creates a _AddMember_ instruction.
 *
 * Optional accounts that are not provided default to the program ID since
 * this was indicated in the IDL from which this instruction was generated.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category AddMember
 * @category generated
 */
export function createAddMemberInstruction(
  accounts: AddMemberInstructionAccounts,
  args: AddMemberInstructionArgs,
  programId = new web3.PublicKey('5XyhmmQ2dRFpnLtjbWZYkNH46YkEBzaKodnjTR7Cm9er')
) {
  const [data] = addMemberStruct.serialize({
    instructionDiscriminator: addMemberInstructionDiscriminator,
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