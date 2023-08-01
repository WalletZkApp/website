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

function Page() {
  const { theme } = useContext(ThemeContext);
  const { accounts, isAuroInstalled } = useContext(WalletContext);
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations("Index");

  useEffect(() => {
    if (!isAuroInstalled) {
      toast("Aura wallet not found", { type: "error" });
    }
  }, [isAuroInstalled]);

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
          password: event.target.password.value,
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
                  type="number"
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
                  maxLength={50}
                  minLength={5}
                />
                <input
                  type="number"
                  className="p-5 border bg-transparent"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  autoComplete="off"
                  required
                  maxLength={15}
                  minLength={5}
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
                <input
                  type="password"
                  className="p-5 border bg-transparent"
                  id="password"
                  placeholder="Password"
                  required
                  minLength={6}
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
