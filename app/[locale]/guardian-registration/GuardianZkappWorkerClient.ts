import { fetchAccount, PublicKey, Field, UInt32, PrivateKey } from "snarkyjs";

import type {
  GuardianZkappWorkerRequest,
  GuardianZkappWorkerReponse,
  GuardianWorkerFunctions,
} from "./GuardianZkappWorker";

export default class GuardianZkappWorkerClient {
  // ---------------------------------------------------------------------------------------

  setActiveInstanceToBerkeley() {
    return this._call("setActiveInstanceToBerkeley", {});
  }

  loadContract() {
    return this._call("loadContract", {});
  }

  compileContract() {
    return this._call("compileContract", {});
  }

  fetchAccount(
    publicKey: PublicKey,
    isGuardian: boolean,
    nullifierMessage: string
  ): ReturnType<typeof fetchAccount> {
    const result = this._call("fetchAccount", {
      publicKey58: publicKey.toBase58(),
      isGuardian: isGuardian,
      nullifierMessage: nullifierMessage,
    });
    return result as ReturnType<typeof fetchAccount>;
  }

  initZkappInstance(publicKey: PublicKey) {
    return this._call("initZkappInstance", {
      publicKey58: publicKey.toBase58(),
    });
  }

  async getOwner(): Promise<PublicKey> {
    const result = await this._call("getOwner", {});
    return PublicKey.fromBase58(JSON.parse(result as string));
  }

  async getNullifierRoot(): Promise<Field> {
    const result = await this._call("getNullifierRoot", {});
    return Field.fromJSON(JSON.parse(result as string));
  }

  async getCommittedGuardians(): Promise<Field> {
    const result = await this._call("getCommittedGuardians", {});
    return Field.fromJSON(JSON.parse(result as string));
  }

  async getApprovedGuardians(): Promise<Field> {
    const result = await this._call("getApprovedGuardians", {});
    return Field.fromJSON(JSON.parse(result as string));
  }

  async getGuardiansCounter(): Promise<UInt32> {
    const result = await this._call("getGuardiansCounter", {});
    return UInt32.fromJSON(JSON.parse(result as string));
  }

  createRegisterGuardianTransaction(
    privateKey: PrivateKey,
    feePayer: PublicKey
  ) {
    return this._call("createRegisterGuardianTransaction", {
      privateKey58: privateKey.toBase58(),
      feePayerAddress58: feePayer.toBase58(),
    });
  }

  createApproveGuardianTransaction(
    privateKey: PrivateKey,
    feePayer: PublicKey
  ) {
    return this._call("createApproveGuardianTransaction", {
      privateKey58: privateKey.toBase58(),
      guardianAccount58: feePayer.toBase58(),
    });
  }

  proveUpdateTransaction() {
    return this._call("proveUpdateTransaction", {});
  }

  async getTransactionJSON() {
    const result = await this._call("getTransactionJSON", {});
    return result;
  }

  // ---------------------------------------------------------------------------------------

  worker: Worker;

  promises: {
    [id: number]: { resolve: (res: any) => void; reject: (err: any) => void };
  };

  nextId: number;

  constructor() {
    this.worker = new Worker(
      new URL("./guardianZkappWorker.ts", import.meta.url)
    );
    this.promises = {};
    this.nextId = 0;

    this.worker.onmessage = (
      event: MessageEvent<GuardianZkappWorkerReponse>
    ) => {
      this.promises[event.data.id].resolve(event.data.data);
      delete this.promises[event.data.id];
    };
  }

  _call(fn: GuardianWorkerFunctions, args: any) {
    return new Promise((resolve, reject) => {
      this.promises[this.nextId] = { resolve, reject };

      const message: GuardianZkappWorkerRequest = {
        id: this.nextId,
        fn,
        args,
      };

      this.worker.postMessage(message);

      this.nextId++;
    });
  }
}
