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

function Page() {
  const { theme } = useContext(ThemeContext);
  const t = useTranslations("Index");
  const [mina, setMina] = useState();
  const [isAuroInstalled, setIsAuroInstalled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  
  useEffect(() => {
    // Using an IIFE
    (async function getAccounts() {
      if (typeof window !== undefined) {
        // start by checking if window.ethereum is mina, indicating a wallet extension
        const ethereumProviderInjected = typeof window.mina !== "undefined";
        const isAuroInstalled = ethereumProviderInjected && window.mina.isAuro;
        console.log("isAuroInstalled", isAuroInstalled);
        setIsAuroInstalled(isAuroInstalled);
        setMina(window.mina);
        if (isAuroInstalled) {
          connectWallet();
        }
      }
    })();
  }, [mina]);

  async function connectWallet() {
    if (isAuroInstalled) {
      let accounts;
      // Accounts is an array of string Mina addresses.
      accounts = await mina.requestAccounts();
      setAccounts(accounts);
        
      // Show first 6 and last 4 characters of user's Mina account.
      const display = `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`;
      console.log(`Connected to ${display}`);
    }
  }
  
  return (
    <>
      <div
        className={`${
          theme === "light" ? "bg-white" : "bg-background"
        } transition-all`}
      >
        <Navigation />
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
            >
              <input
                className="p-5 border bg-transparent"
                required
                id="companyName"
                placeholder="Company Name"
              />
              <input
                type="number"
                className="p-5 border bg-transparent"
                required
                id="registrationNumber"
                placeholder="Registration Number"
              />
              <input
                className="p-5 border bg-transparent"
                required
                id="companyShortDescription"
                placeholder="Company Short Description"
              />
              <input
                type="number"
                className="p-5 border bg-transparent"
                required
                id="phoneNumber"
                placeholder="Phone Number"
              />
              <input
                className="p-5 border bg-transparent"
                required
                id="address"
                placeholder="Address"
              />
              <input
                className="p-5 border bg-transparent"
                required
                id="city"
                placeholder="City"
              />
              <input
                className="p-5 border bg-transparent"
                required
                id="state"
                placeholder="State / Province"
              />
              <input
                type="number"
                className="p-5 border bg-transparent"
                required
                id="zip"
                placeholder="ZIP / Postal Code"
              />
              <input
                className="p-5 border bg-transparent"
                required
                id="country"
                placeholder="Country"
              />
              <input
                type="email"
                className="p-5 border bg-transparent"
                required
                id="emailAddress"
                placeholder="Email Address"
              />
              <input
                type="email"
                className="p-5 border bg-transparent"
                required
                id="website"
                placeholder="Website https://"
              />
              <button
                type="submit"
                className="py-4 bg-primary hover:brightness-[1.1] text-white rounded-md"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
