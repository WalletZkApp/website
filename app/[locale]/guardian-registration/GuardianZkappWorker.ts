import {
  AccountUpdate,
  Field,
  MerkleTree,
  Mina,
  PrivateKey,
  PublicKey,
  UInt32,
  fetchAccount,
} from "snarkyjs";

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------
import { Guardian } from "../../../zk-keyless-wallet-contracts/src/guardians/Guardian";
import { GuardianZkApp } from "../../../zk-keyless-wallet-contracts/src/guardians/GuardianZkApp";
import { MerkleWitness32 } from "../../../zk-keyless-wallet-contracts/src/storage/offchain-storage";

const GUARDIAN_SERVICE_PRIVATE_KEY =
  process.env.GUARDIAN_SERVICE_PRIVATE_KEY ||
  "EKEviwcuN5yafPnPvroeeR3L9zbYUgkqvYMXaqqWz4KMNQpgUKy5";

const state: any = {
  Guardian: null as null | typeof Guardian,
  GuardianZkApp: null as null | typeof GuardianZkApp,
  MerkleWitness32: null as null | typeof MerkleWitness32,
  zkapp: null as null | GuardianZkApp,
  transaction: null as null | Transaction,
  guardian: null as null | Guardian,
  guardianTree: null as null | MerkleTree,
  guardianWitness: null as null | MerkleWitness32,
};

// ---------------------------------------------------------------------------------------

const functions = {
  setActiveInstanceToBerkeley: async (args: {}) => {
    const Berkeley = Mina.Network(
      "https://proxy.berkeley.minaexplorer.com/graphql"
    );
    console.log("Berkeley Instance Created");
    Mina.setActiveInstance(Berkeley);
  },
  loadContract: async (args: {}) => {
    const { GuardianZkApp } = await import(
      "../../../zk-keyless-wallet-contracts/build/src/guardians/index"
    );
    state.GuardianZkApp = GuardianZkApp;
    state.guardianTree = new MerkleTree(32);
  },
  compileContract: async (args: {}) => {
    await state.GuardianZkApp!.compile();
  },
  fetchAccount: async (args: {
    publicKey58: string;
    isGuardian: boolean;
    nullifierMessage: string;
  }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    let guardian: Guardian | null = null;
    if (args.isGuardian) {
      const { Guardian } = await import(
        "../../../zk-keyless-wallet-contracts/build/src/guardians/Guardian.js"
      );
      const { MerkleWitness32 } = await import(
        "../../../zk-keyless-wallet-contracts/build/src/storage/offchain-storage.js"
      );
      state.Guardian = Guardian;
      state.MerkleWitness32 = MerkleWitness32;
      const nullifierMessageField: Field = Field(args.nullifierMessage);
      guardian = Guardian.from(publicKey, nullifierMessageField);
      state.guardian = guardian;
      console.log("guardian hash", guardian.hash().toString());

      const counter = state.zkapp!.counter.getAndAssertEquals();
      console.log("counter", counter.toString());
      const newGuardianTree: MerkleTree = state.guardianTree!;
      newGuardianTree.setLeaf(counter.toBigint(), guardian.hash());
      state.guardianTree = newGuardianTree;
      console.log("guardian tree", state.guardianTree!.getRoot().toString());

      let w = newGuardianTree.getWitness(counter.toBigint());
      let witness = new MerkleWitness32(w);
      state.guardianWitness = witness;
      console.log("guardian witness", state.guardianWitness!.toJSON());
    }
    return await fetchAccount({ publicKey });
  },
  initZkappInstance: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    state.zkapp = new state.GuardianZkApp!(publicKey);
  },
  getOwner: async (args: {}) => {
    const owner = await state.zkapp!.owner.getAndAssertEquals();
    return JSON.stringify(owner.toJSON());
  },
  getNullifierRoot: async (args: {}) => {
    const nullifierRoot = await state.zkapp!.nullifierRoot.getAndAssertEquals();
    return JSON.stringify(nullifierRoot.toJSON());
  },
  getCommittedGuardians: async (args: {}) => {
    const committedGuardians =
      await state.zkapp!.committedGuardians.getAndAssertEquals();
    return JSON.stringify(committedGuardians.toJSON());
  },
  getApprovedGuardians: async (args: {}) => {
    const approvedGuardians =
      await state.zkapp!.approvedGuardians.getAndAssertEquals();
    return JSON.stringify(approvedGuardians.toJSON());
  },
  getGuardiansCounter: async (args: {}) => {
    const counter: UInt32 = await state.zkapp!.counter.getAndAssertEquals();
    return JSON.stringify(counter.toJSON());
  },
  createRegisterGuardianTransaction: async (args: {
    privateKey58: string;
    feePayerAddress58: string;
  }) => {
    const feePayer: PublicKey = PublicKey.fromBase58(args.feePayerAddress58);
    console.log("feePayer", feePayer);
    const randomPrivateKey: PrivateKey = PrivateKey.fromBase58(
      args.privateKey58
    );
    console.log("randomPrivateKey", randomPrivateKey);
    const transaction = await Mina.transaction(feePayer, async () => {
      const response = await fetchAccount({ publicKey: feePayer });
      if (response.error) {
        AccountUpdate.fundNewAccount(feePayer);
      }
      state.zkapp!.registerGuardian(
        state.guardian!.hash(),
        state.guardianTree!.getRoot()
      );
    });
    transaction.sign([randomPrivateKey]);
    state.transaction = transaction;
  },
  createApproveGuardianTransaction: async (args: {
    privateKey58: string;
    feePayerAddress58: string;
  }) => {
    const feePayer: PublicKey = PublicKey.fromBase58(args.feePayerAddress58);
    console.log("feePayer", feePayer);
    const randomPrivateKey: PrivateKey = PrivateKey.fromBase58(
      args.privateKey58
    );
    console.log("randomPrivateKey", randomPrivateKey);
    const guardianServicePrivateKey: PrivateKey = PrivateKey.fromBase58(
      GUARDIAN_SERVICE_PRIVATE_KEY
    );
    const transaction = await Mina.transaction(feePayer, async () => {
      const response = await fetchAccount({ publicKey: feePayer });
      if (response.error) {
        AccountUpdate.fundNewAccount(feePayer);
      }
      state.zkapp!.approveGuardian(
        guardianServicePrivateKey,
        state.guardian!.hash(),
        state.guardianTree!.getRoot()
      );
    });
    transaction.sign([randomPrivateKey]);
    state.transaction = transaction;
  },
  proveUpdateTransaction: async (args: {}) => {
    await state.transaction!.prove();
  },
  getTransactionJSON: async (args: {}) => {
    return state.transaction!.toJSON();
  },
};

// ---------------------------------------------------------------------------------------

export type GuardianWorkerFunctions = keyof typeof functions;

export type GuardianZkappWorkerRequest = {
  id: number;
  fn: GuardianWorkerFunctions;
  args: any;
};

export type GuardianZkappWorkerReponse = {
  id: number;
  data: any;
};

if (typeof window !== "undefined") {
  addEventListener(
    "message",
    async (event: MessageEvent<GuardianZkappWorkerRequest>) => {
      const returnData = await functions[event.data.fn](event.data.args);

      const message: GuardianZkappWorkerReponse = {
        id: event.data.id,
        data: returnData,
      };
      postMessage(message);
    }
  );
}

console.log("Web Worker Successfully Initialized.");
