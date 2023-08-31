"use client";

import Navigation from "@/components/layout/navigation";

// Mui
import WalletIcon from "@mui/icons-material/Wallet";
import { IconButton } from "@mui/material";

// Translation
import { useTranslations } from "next-intl";

// Context
import { ThemeContext } from "@/context/theme_context";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "@/context/wallet_context";
import Footer from "@/components/layout/footer";
import { toast } from "react-toastify";

import "./reactCOIServiceWorker";
import GuardianZkappWorkerClient from "./GuardianZkappWorkerClient";
import { PublicKey, Field, UInt32, PrivateKey } from "snarkyjs";

let transactionFee = 0.1;

interface SignedData {
  publicKey: string;
  data: string;
  signature: {
    field: string;
    scalar: string;
  };
}

function Page() {
  const { theme } = useContext(ThemeContext);
  const { accounts, isAuroInstalled } = useContext(WalletContext);
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations("Index");

  const [state, setState] = useState({
    guardian: null as null | any,
    zkappWorkerClient: null as null | GuardianZkappWorkerClient,
    hasWallet: null as null | boolean,
    hasBeenSetup: false,
    accountExists: false,
    owner: null as null | PublicKey,
    nullifierRoot: null as null | Field,
    committedGuardians: null as null | Field,
    approvedGuardians: null as null | Field,
    guardiansCounter: null as null | UInt32,
    publicKey: null as null | PublicKey,
    privateKey: null as null | PrivateKey,
    signature: null as null | SignedData,
    zkappPublicKey: null as null | PublicKey,
    createRegisterGuardianTransaction: false,
    createApproveGuardianTransaction: false,
  });

  const [displayText, setDisplayText] = useState("");
  const [transactionlink, setTransactionLink] = useState("");

  const guardianZkAppAddress: string =
    process.env.NEXT_PUBLIC_GUARDIAN_ZKAPP?.toString() ||
    "B62qmq5NbjES5Lmi3g7YtP2FddjrxB9Zvu8PLp4kvC45ji9ezNFPJka";

  // -------------------------------------------------------
  // Do Setup

  useEffect(() => {
    async function timeout(seconds: number): Promise<void> {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, seconds * 1000);
      });
    }

    console.log(state);

    async () => {
      if (!state.hasBeenSetup) {
        setDisplayText("Loading web worker...");
        console.log("Loading web worker...");
        // const zkappWorkerClient = new GuardianZkappWorkerClient();
        await timeout(5);
      }
    };

    // (async () => {
    // if (!state.hasBeenSetup) {
    //     setDisplayText("Loading web worker...");
    //     console.log("Loading web worker...");
    //     const zkappWorkerClient = new GuardianZkappWorkerClient();
    //     await timeout(5);

    //     setDisplayText("Done loading web worker");
    //     console.log("Done loading web worker");

    //     await zkappWorkerClient.setActiveInstanceToBerkeley();

    //     const mina = (window as any).mina;

    //     if (mina == null) {
    //       setState({ ...state, hasWallet: false });
    //       return;
    //     }

    //     console.log("checking AURO connection");
    //     const network = await mina.requestNetwork();
    //     console.log("network:", network.toString()); //  'Mainnet' , 'Devnet' , 'Berkeley' or 'Unknown'
    //     setDisplayText(`Network: ${network.toString()}`);

    //     const accounts = await mina.requestAccounts();
    //     console.log(`From requestAccounts:${accounts.toString()}`);
    //     setDisplayText(`From requestAccounts:${accounts.toString()}`);
    //     const newSignature: SignedData = await mina.signMessage({
    //       message: "Register as guardian",
    //     });
    //     //const newSignature: SignedFieldsData = await mina.signFields({ message: [777]})
    //     console.log(`From signMessage:${JSON.stringify(newSignature)}`);
    //     if (newSignature == null) {
    //       setState({ ...state, signature: newSignature });
    //     }
    //     const publicKey = PublicKey.fromBase58(newSignature.publicKey);

    //     console.log(`Using key:${publicKey.toBase58()}`);
    //     setDisplayText(`Using key:${publicKey.toBase58()}`);

    //     await zkappWorkerClient.loadContract();

    //     console.log("Compiling zkApp...");
    //     setDisplayText("Compiling zkApp...");
    //     await zkappWorkerClient.compileContract();
    //     console.log("zkApp compiled");
    //     setDisplayText("zkApp compiled...");

    //     console.log("guardianZkAppAddress: " + guardianZkAppAddress);

    //     const zkappPublicKey = PublicKey.fromBase58(guardianZkAppAddress);

    //     await zkappWorkerClient.initZkappInstance(zkappPublicKey);

    //     console.log("Getting zkApp state...");
    //     setDisplayText("Getting zkApp state...");
    //     await zkappWorkerClient.fetchAccount(zkappPublicKey, false, "0");
    //     const owner: PublicKey = await zkappWorkerClient.getOwner();
    //     console.log(`Current state in zkApp, owner: ${owner.toBase58()}`);
    //     setDisplayText(`Current state in zkApp, owner: ${owner.toBase58()}`);

    //     const nullifierRoot: Field = await zkappWorkerClient.getNullifierRoot();
    //     console.log(
    //       `Current state in zkApp, nullifierRoot: ${nullifierRoot.toString()}`
    //     );
    //     setDisplayText(
    //       `Current state in zkApp, nullifierRoot: ${nullifierRoot.toString()}`
    //     );

    //     const committedGuardians: Field =
    //       await zkappWorkerClient.getCommittedGuardians();
    //     console.log(
    //       `Current state in zkApp, committedGuardians: ${committedGuardians.toString()}`
    //     );
    //     setDisplayText(
    //       `Current state in zkApp, committedGuardians: ${committedGuardians.toString()}`
    //     );

    //     const guardiansCounter: UInt32 =
    //       await zkappWorkerClient.getGuardiansCounter();
    //     console.log(
    //       `Current state in zkApp, guardiansCounter: ${guardiansCounter.toString()}`
    //     );
    //     setDisplayText(
    //       `Current state in zkApp, guardiansCounter: ${guardiansCounter.toString()}`
    //     );

    //     setDisplayText("Checking if fee payer account exists...");
    //     console.log("Checking if fee payer account exists...");

    //     const res = await zkappWorkerClient.fetchAccount(
    //       publicKey!,
    //       true,
    //       "777"
    //     );
    //     const accountExists = res.error == null;

    //     setState({
    //       ...state,
    //       zkappWorkerClient,
    //       hasWallet: true,
    //       hasBeenSetup: true,
    //       publicKey,
    //       zkappPublicKey,
    //       accountExists,
    //       owner,
    //       nullifierRoot,
    //       committedGuardians,
    //       guardiansCounter,
    //     });
    //   }
    // })();
  }, []);

  // -------------------------------------------------------
  // Wait for account to exist, if it didn't

  useEffect(() => {
    (async () => {
      if (state.hasBeenSetup && !state.accountExists) {
        for (;;) {
          setDisplayText("Checking if fee payer account exists...");
          console.log("Checking if fee payer account exists...");
          const res = await state.zkappWorkerClient!.fetchAccount(
            state.publicKey!,
            true,
            "777"
          );
          const accountExists = res.error == null;
          if (accountExists) {
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
        setState({ ...state, accountExists: true });
      }
    })();
  }, [state.hasBeenSetup]);

  async function formSubmit(event: any): Promise<void> {
    event.preventDefault();
    if (accounts.length > 0) {
      const BASE_URL = process.env.ZK_WALLET_USER_SERVICE;
      const API_URL = BASE_URL + "/api/v1/auth/guardian/email/register";

      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          companyName: event.target.companyName.value,
          displayName: event.target.companyName.value,
          registrationNumber: event.target.registrationNumber.value,
          description: event.target.companyShortDescription.value,
          phonenumber: event.target.phoneNumber.value,
          address: event.target.address.value,
          city: event.target.city.value,
          state: event.target.state.value,
          zip: event.target.zip.value,
          country: event.target.country.value,
          email: event.target.emailAddress.value,
          website: event.target.website.value,
          walletAddress: accounts[0],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        toast("Aura wallet not found", { type: "error" });
      }
    }
  }

  const transactionClick = () => {
    console.log("test");
  };

  return (
    <>
      <div
        className={`${
          theme === "light" ? "bg-white" : "bg-background"
        } transition-all`}
      >
        <Navigation />
        {isAuroInstalled ? (
          <div className="min-h-screen flex items-center justify-center text-center">
            <div className="flex flex-col max-w-7xl p-5 md:py-12 mx-auto w-full">
              <div className="text-gd text-[1.25rem] md:text-[2rem] font-semibold">
                {t("Connect Your Wallet And Register")}
              </div>
              <div className="flex justify-center">
                <div className="bg-primary rounded-full flex justify-center mt-5">
                  <IconButton>
                    <WalletIcon sx={{ fontSize: "3rem", color: "white" }} />
                  </IconButton>
                </div>
              </div>
              <div className="text-gd text-[1.25rem] md:text-[2rem] font-semibold mt-6">
                {t("Guardian Registration")}
              </div>
              <form
                className={`flex flex-col space-y-6 mt-12 ${
                  theme === "light" ? "text-black" : "text-white"
                }`}
                onSubmit={formSubmit}
              >
                <input
                  className="p-5 border bg-transparent"
                  id="companyName"
                  placeholder="Company Name"
                  autoComplete="off"
                  required
                  maxLength={40}
                  minLength={5}
                />
                <input
                  className="p-5 border bg-transparent"
                  id="registrationNumber"
                  placeholder="Registration Number"
                  autoComplete="off"
                  required
                  maxLength={15}
                  minLength={5}
                />
                <input
                  className="p-5 border bg-transparent"
                  id="companyShortDescription"
                  placeholder="Company Short Description"
                  autoComplete="off"
                  required
                  maxLength={100}
                  minLength={5}
                />
                <input
                  className="p-5 border bg-transparent"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  autoComplete="off"
                  required
                  maxLength={10}
                  minLength={10}
                />
                <input
                  className="p-5 border bg-transparent"
                  id="address"
                  placeholder="Address"
                  autoComplete="off"
                  required
                  maxLength={120}
                  minLength={5}
                />
                <input
                  className="p-5 border bg-transparent"
                  id="city"
                  placeholder="City"
                  autoComplete="off"
                  required
                  maxLength={30}
                  minLength={3}
                />
                <input
                  className="p-5 border bg-transparent"
                  id="state"
                  placeholder="State / Province"
                  autoComplete="off"
                  required
                  maxLength={30}
                  minLength={3}
                />
                <input
                  type="number"
                  className="p-5 border bg-transparent"
                  id="zip"
                  placeholder="ZIP / Postal Code"
                  autoComplete="off"
                  required
                  maxLength={10}
                  minLength={3}
                />
                <input
                  className="p-5 border bg-transparent"
                  id="country"
                  placeholder="Country"
                  autoComplete="off"
                  required
                  maxLength={40}
                  minLength={3}
                />
                <input
                  type="email"
                  className="p-5 border bg-transparent"
                  id="emailAddress"
                  placeholder="Email Address"
                  required
                  maxLength={40}
                  minLength={5}
                />
                <input
                  type="text"
                  className="p-5 border bg-transparent"
                  id="website"
                  placeholder="Website https://"
                  required
                  maxLength={40}
                  minLength={5}
                />
                <button
                  type="submit"
                  className="py-4 bg-primary hover:brightness-[1.1] text-white rounded-md"
                >
                  Register
                </button>
                <button
                  // type="submit"
                  className="py-4 bg-primary hover:brightness-[1.1] text-white rounded-md"
                  onClick={transactionClick}
                >
                  TRANSFER
                </button>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className="min-h-screen flex items-center justify-center text-center">
              <div className="flex flex-col max-w-7xl p-5 md:py-12 mx-auto w-full">
                <div className="text-gd text-[1.25rem] md:text-[2rem] font-semibold">
                  {t("Aura wallet is not installed")}
                </div>
                <div className="text-gd text-[0.75rem] md:text-[1rem] font-semibold mt-6">
                  {t(
                    "You need to sign with your wallet to register as a guardian"
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        <Footer />
      </div>
    </>
  );
}

export default Page;
