"use client";

import { ThemeContext } from "@/context/theme_context";
import { ChangeEvent, useContext, useState } from "react";
import { useSearchParams } from "next/navigation";

function Page() {
  // Smart Contract Parameter
  const searchParams = useSearchParams();

  //   Value User Wallet Address
  const smartcontract = searchParams.get("smartcontract");

  // Theme Mode
  const { theme } = useContext(ThemeContext);

  // Input Value
  const [inputData, setInputData] = useState({
    ownerAddress: "",
  });

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const submitHandler = () => {};

  return (
    <div
      className={`${
        theme === "light" ? "bg-white text-black" : "bg-background text-white"
      } transition-all`}
    >
      <div className="max-w-7xl mx-auto p-5 min-h-screen flex flex-col justify-center text-center">
        <div className="text-[1.5rem] md:text-[3rem] text-primary font-medium">
          Guardian Recovery
        </div>
        <div className="md:text-[1.5rem] mt-5">
          DAPP ZKWallet Guardian Recovery. Connect Your Wallet to Recover !
        </div>
        <form
          onSubmit={submitHandler}
          className="flex flex-col space-y-8 mt-10"
        >
          <div className="flex flex-col space-y-5 text-left">
            <label>User Wallet Address</label>
            <div
              id="walletAddress"
              className="p-5 border bg-transparent text-left h-[4rem]"
            >
              {smartcontract?.toString() || "User Wallet Address Not Found !"}
            </div>
          </div>
          <div className="flex flex-col space-y-5 text-left">
            <label>New Owner Address</label>
            <input
              value={inputData.ownerAddress}
              onChange={inputHandler}
              id="ownerAddress"
              required
              placeholder="New Owner Address"
              alt=""
              className="p-5 border bg-transparent h-[4rem]"
            />
          </div>
          <div className="flex space-x-5">
            <button
              className="hover:brightness-[1.1] transition-all bg-primary p-4 w-full text-white"
              type="submit"
            >
              Sign Identity
            </button>
            <button
              onClick={() => {
                setInputData({
                  ownerAddress: "",
                });
              }}
              className="hover:brightness-[1.1] transition-all w-full border border-primary"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
