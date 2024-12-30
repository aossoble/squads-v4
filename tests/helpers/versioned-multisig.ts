import { Connection, Keypair, PublicKey, TransactionInstruction, TransactionMessage } from "@solana/web3.js";
import * as versionedMultisig from "../../sdk/versioned_multisig/";
import { VersionedMember } from "../../sdk/versioned_multisig/lib/generated";
import { Permissions } from "../../sdk/versioned_multisig/lib/types";
import { getVersionedTestProgramId } from "../suites/versioned_multisig/versioned-utils";
import { generateFundedKeypair } from "../utils";

export class VersionedMultisigTestHelper {

    private connection: Connection;
    constructor( connection: Connection) {
        this.connection = connection;
    }
    async createVersionedMultisig(
        members: VersionedMember[],
        threshold: number,
        timeLock: number = 0
    ) {
        const programConfigPda = versionedMultisig.getProgramConfigPda({ programId: getVersionedTestProgramId() })[0];
        const programConfig =
            await versionedMultisig.accounts.ProgramConfig.fromAccountAddress(
                this.connection,
                programConfigPda
            );
        // console.log("programConfig", JSON.stringify(programConfig, null, 2));
        const creator = await generateFundedKeypair(this.connection);
            const [multisigPda, multisigBump] = versionedMultisig.getMultisigPda({
                createKey: creator.publicKey,
                programId: getVersionedTestProgramId(),
            });
            console.log("multisigPda", multisigPda.toBase58());
            const [signature, blockhash] = await versionedMultisig.rpc.versionedMultisigCreate({
                connection: this.connection,
                treasury: programConfig.treasury,
                createKey: creator,
                creator,
                multisigPda,
                configAuthority: programConfig.authority,
                threshold,
                members: members,
                rentCollector: null,
                timeLock,
                programId: getVersionedTestProgramId(),
            });
            console.log("versionedMultisigCreate - sig", signature);
            await this.connection.confirmTransaction({
                signature,
                blockhash: blockhash.blockhash,
                lastValidBlockHeight: blockhash.lastValidBlockHeight,
            });
        return { multisigPda, createKey: creator };
    }

    async getVersionedProposalPda(multisig: PublicKey, index: number) {
        return PublicKey.findProgramAddressSync(
            [
                Buffer.from("proposal"),
                multisig.toBuffer(),
                Buffer.from(index.toString())
            ],
            getVersionedTestProgramId()
        );
    }

    async createVersionedProposal(
        multisig: PublicKey,
        creator: Keypair,
        index: number
    ) {
        const [proposalPda, _] = await this.getVersionedProposalPda(multisig, index);

        await versionedMultisig.rpc.versionedProposalCreate({
            connection: this.connection,
            multisigPda: multisig,
            creator: creator,
            transactionIndex: BigInt(index),
            programId: getVersionedTestProgramId(),
        });

        return proposalPda;
    }

    async vote(
        multisig: PublicKey,
        proposal: PublicKey,
        voter: Keypair,
        approve: boolean
    ) {
        await versionedMultisig.rpc.versionedProposalVote({
            connection: this.connection,
            multisigPda: multisig,
            proposalPda: proposal,
            voter: voter,
            approve: approve,
            programId: getVersionedTestProgramId(),
        });
    }

    // Helper to generate test members
    generateMembers(count: number, permissions: Permissions = Permissions.all(), joinProposalIndex: number = 0): VersionedMember[] {
        return Array(count)
            .fill(0)
            .map(() => ({
                key: Keypair.generate().publicKey,
                permissions,
                joinProposalIndex
            }));
    }

    async createProposalWithInstruction(
        multisig: PublicKey,
        creator: Keypair,
        index: number,
        instruction: TransactionInstruction
    ) {
        return this.createVersionedProposalWithInstructions(multisig, creator, index, [instruction]);
    }

    async createVersionedProposalWithInstructions(
        multisig: PublicKey,
        creator: Keypair,
        index: number,
        instructions: TransactionInstruction[]
    ) {
        const [proposalPda] = await this.getVersionedProposalPda(multisig, index);
        await this.createVersionedProposal(multisig, creator, index);
        await versionedMultisig.rpc.versionedProposalCreate({
            connection: this.connection,
            multisigPda: multisig,
            creator: creator,
            transactionIndex: BigInt(index),
            programId: getVersionedTestProgramId(),
        });
        await versionedMultisig.rpc.vaultTransactionCreate({
            connection: this.connection,
            feePayer: creator,
            multisigPda: multisig,
            transactionIndex: BigInt(index),
            creator: creator.publicKey,
            vaultIndex: 0,
            ephemeralSigners: 0,
            transactionMessage: new TransactionMessage({
                payerKey: creator.publicKey,
                recentBlockhash: (await this.connection.getLatestBlockhash()).blockhash,
                instructions: instructions,
            }),
            programId: getVersionedTestProgramId(),
        });
        
        return proposalPda;
    }


    async executeVaultTransaction(
        multisig: PublicKey,
        transactionIndex: number,
        executor: Keypair
    ) {
        await versionedMultisig.rpc.vaultTransactionExecute({
            connection: this.connection,
            feePayer: executor,
            multisigPda: multisig,
            transactionIndex: BigInt(transactionIndex),
            member: executor.publicKey,
            programId: getVersionedTestProgramId(),
        });
    }
}