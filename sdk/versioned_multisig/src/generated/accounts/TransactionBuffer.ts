/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from '@solana/web3.js'
import * as beetSolana from '@metaplex-foundation/beet-solana'
import * as beet from '@metaplex-foundation/beet'

/**
 * Arguments used to create {@link TransactionBuffer}
 * @category Accounts
 * @category generated
 */
export type TransactionBufferArgs = {
  multisig: web3.PublicKey
  creator: web3.PublicKey
  bufferIndex: number
  vaultIndex: number
  finalBufferHash: number[] /* size: 32 */
  finalBufferSize: number
  buffer: Uint8Array
}

export const transactionBufferDiscriminator = [
  90, 36, 35, 219, 93, 225, 110, 96,
]
/**
 * Holds the data for the {@link TransactionBuffer} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class TransactionBuffer implements TransactionBufferArgs {
  private constructor(
    readonly multisig: web3.PublicKey,
    readonly creator: web3.PublicKey,
    readonly bufferIndex: number,
    readonly vaultIndex: number,
    readonly finalBufferHash: number[] /* size: 32 */,
    readonly finalBufferSize: number,
    readonly buffer: Uint8Array
  ) {}

  /**
   * Creates a {@link TransactionBuffer} instance from the provided args.
   */
  static fromArgs(args: TransactionBufferArgs) {
    return new TransactionBuffer(
      args.multisig,
      args.creator,
      args.bufferIndex,
      args.vaultIndex,
      args.finalBufferHash,
      args.finalBufferSize,
      args.buffer
    )
  }

  /**
   * Deserializes the {@link TransactionBuffer} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0
  ): [TransactionBuffer, number] {
    return TransactionBuffer.deserialize(accountInfo.data, offset)
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link TransactionBuffer} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig
  ): Promise<TransactionBuffer> {
    const accountInfo = await connection.getAccountInfo(
      address,
      commitmentOrConfig
    )
    if (accountInfo == null) {
      throw new Error(`Unable to find TransactionBuffer account at ${address}`)
    }
    return TransactionBuffer.fromAccountInfo(accountInfo, 0)[0]
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey(
      'wegmivK2TiR2dbNxMAtR48Y2tVq2hGzp6iK8j3FbUU7'
    )
  ) {
    return beetSolana.GpaBuilder.fromStruct(programId, transactionBufferBeet)
  }

  /**
   * Deserializes the {@link TransactionBuffer} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [TransactionBuffer, number] {
    return transactionBufferBeet.deserialize(buf, offset)
  }

  /**
   * Serializes the {@link TransactionBuffer} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return transactionBufferBeet.serialize({
      accountDiscriminator: transactionBufferDiscriminator,
      ...this,
    })
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link TransactionBuffer} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */
  static byteSize(args: TransactionBufferArgs) {
    const instance = TransactionBuffer.fromArgs(args)
    return transactionBufferBeet.toFixedFromValue({
      accountDiscriminator: transactionBufferDiscriminator,
      ...instance,
    }).byteSize
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link TransactionBuffer} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    args: TransactionBufferArgs,
    connection: web3.Connection,
    commitment?: web3.Commitment
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      TransactionBuffer.byteSize(args),
      commitment
    )
  }

  /**
   * Returns a readable version of {@link TransactionBuffer} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      multisig: this.multisig.toBase58(),
      creator: this.creator.toBase58(),
      bufferIndex: this.bufferIndex,
      vaultIndex: this.vaultIndex,
      finalBufferHash: this.finalBufferHash,
      finalBufferSize: this.finalBufferSize,
      buffer: this.buffer,
    }
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const transactionBufferBeet = new beet.FixableBeetStruct<
  TransactionBuffer,
  TransactionBufferArgs & {
    accountDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['multisig', beetSolana.publicKey],
    ['creator', beetSolana.publicKey],
    ['bufferIndex', beet.u8],
    ['vaultIndex', beet.u8],
    ['finalBufferHash', beet.uniformFixedSizeArray(beet.u8, 32)],
    ['finalBufferSize', beet.u16],
    ['buffer', beet.bytes],
  ],
  TransactionBuffer.fromArgs,
  'TransactionBuffer'
)
