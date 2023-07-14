"use client";

import { createContext, useState } from "react";

export const WalletContext = createContext({
  smartcontract: "",
  account: "",
  getAccounts: () => {},
});

export default function WalletProvider({ children }) {
  const [mina, setMina] = useState([]);
  const [isAuroInstalled, setIsAuroInstalled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState();
  const [smartcontract, setSmartcontract] = useState("");

  async function connectWallet() {
    if (isAuroInstalled) {
      let accounts;
      // Accounts is an array of string Mina addresses.
      accounts = await mina.requestAccounts();
      setAccounts(accounts);
      // Show first 6 and last 4 characters of user's Mina account.
      const display = `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`;
      setAccount(accounts[0]);
      setSmartcontract(display);
      console.log(`Connected to ${display}`);
    }
  }

  async function getAccounts() {
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
  }

  return (
    <WalletContext.Provider value={{ smartcontract, getAccounts, account }}>
      {children}
    </WalletContext.Provider>
  );
}
