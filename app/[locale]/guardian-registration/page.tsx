"use client";

import Navigation from "@/components/layout/navigation";

// Mui
import WalletIcon from "@mui/icons-material/Wallet";
import { IconButton } from "@mui/material";

// Translation
import { useTranslations } from "next-intl";

// Context
import { ThemeContext } from "@/context/theme_context";
import { FormEvent, useContext, useEffect } from "react";
import { WalletContext } from "@/context/wallet_context";
import Footer from "@/components/layout/footer";

function Page() {
  const { theme } = useContext(ThemeContext);
  const { smartcontract, getAccounts } = useContext(WalletContext);

  const t = useTranslations("Index");

  useEffect(() => {
    getAccounts();
  }, []);

  async function formSubmit(event: any): Promise<void> {
    event.preventDefault();
    if (smartcontract !== "") {
      const response = await fetch("/api/guardian", {
        method: "POST",
        body: JSON.stringify({
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
          walletAddress: smartcontract,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
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
              onSubmit={formSubmit}
            >
              <input
                className="p-5 border bg-transparent"
                id="companyName"
                placeholder="Company Name"
                autoComplete="off"
              />
              <input
                type="number"
                className="p-5 border bg-transparent"
                id="registrationNumber"
                placeholder="Registration Number"
                autoComplete="off"
              />
              <input
                className="p-5 border bg-transparent"
                id="companyShortDescription"
                placeholder="Company Short Description"
                autoComplete="off"
              />
              <input
                type="number"
                className="p-5 border bg-transparent"
                id="phoneNumber"
                placeholder="Phone Number"
                autoComplete="off"
              />
              <input
                className="p-5 border bg-transparent"
                id="address"
                placeholder="Address"
                autoComplete="off"
              />
              <input
                className="p-5 border bg-transparent"
                id="city"
                placeholder="City"
                autoComplete="off"
              />
              <input
                className="p-5 border bg-transparent"
                id="state"
                placeholder="State / Province"
                autoComplete="off"
              />
              <input
                type="number"
                className="p-5 border bg-transparent"
                id="zip"
                placeholder="ZIP / Postal Code"
                autoComplete="off"
              />
              <input
                className="p-5 border bg-transparent"
                id="country"
                placeholder="Country"
                autoComplete="off"
              />
              <input
                type="email"
                className="p-5 border bg-transparent"
                id="emailAddress"
                placeholder="Email Address"
              />
              <input
                type="text"
                className="p-5 border bg-transparent"
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
        <Footer />
      </div>
    </>
  );
}

export default Page;
