/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
export type VersionedMultisigSetTimeLockArgs = {
  timeLock: number
  memo: beet.COption<string>
}

/**
 * @category userTypes
 * @category generated
 */
export const versionedMultisigSetTimeLockArgsBeet =
  new beet.FixableBeetArgsStruct<VersionedMultisigSetTimeLockArgs>(
    [
      ['timeLock', beet.u32],
      ['memo', beet.coption(beet.utf8String)],
    ],
    'VersionedMultisigSetTimeLockArgs'
  )