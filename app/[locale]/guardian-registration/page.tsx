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

// Form Validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

type GuardianInput = {
  registrationNumber: string,
  companyName: string,
  description: string,
  wallet?: string,
  address: string,
  city: string,
  state: string,
  zip: string,
  country: string,
  email: string,
  phonenumber: number,
  website: string,
  identityCommitment?: string
}

interface SignedData {
  publicKey: string,
  payload: string,
  signature: {
    field: string,
    scalar: string
  }
}
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
      console.log("mina", mina);
      setAccounts(accounts);
        
      // Show first 6 and last 4 characters of user's Mina account.
      const display = `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`;
      console.log(`Connected to ${display}`);
    }
  }

  // form validation rules
  const validationSchema = Yup.object().shape({
    registrationNumber: Yup.string()
        .required('Registration number is required'),
    companyName: Yup.string()
      .required('Display name is required'),
    description: Yup.string()
      .required('Description is required'),
    address: Yup.string()
      .required('Address is required'),
    city: Yup.string()
      .required('City is required'),
    state: Yup.string()
      .required('State is required'),
    zip: Yup.string()
      .required('Zip is required'),
    country: Yup.string()
      .required('Country is required'),
    email: Yup.string().email('Invalid emailadress')
      .required('Email is required'),
    phonenumber: Yup.number()
      .required('Phone number is required')
      .positive('Phone number must be a positive number'),
    website: Yup.string().url('Invalid website url')
      .required('Website is required'),
  })

  const formOptions = {
    resolver: yupResolver(validationSchema),
  }

  const { handleSubmit, register, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmitHandler = (input: any) => {
    signAndRegister(input);
  }

  async function signAndRegister(input: any) {
    const registrationNumber = input.registrationNumber
    const displayName = input.displayName
    const description = input.description
    const address = input.address
    const city = input.city
    const state = input.state
    const zip = input.zip
    const country = input.country
    const email = input.email
    const phonenumber = (input.phonenumber).toString()
    const website = input.website
    let newSignature: SignedData;
    if (isAuroInstalled) {
      const message = "Sign this message to prove ownership of your Mina account.";
      try {
        const signature = await mina.signMessage({
          message: message,
        });
        console.log("signature", signature);
        const field = signature.signature.field;
        console.log("field", field);
        const scalar = signature.signature.scalar;
        console.log("scalar", scalar);
        // assume signing with accounts[0]
        newSignature = {
          publicKey: accounts[0],
          payload: message,
          signature: {
            field: field,
            scalar: scalar,
          }
        }
        console.log("newSignature", newSignature);

        try {
          const messageVerifyResult: boolean = await window.mina.verifyMessage(newSignature);
          console.log("messageVerifyResult", messageVerifyResult);
          if (messageVerifyResult) {
            // send to backend
          } else {
            // wrong wallet?
          }
          
        } catch(err: any) {
          console.log(error.message, error.code)
        }
      } catch(error: any) {
        console.log(error.message, error.code)
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
            <form onSubmit={handleSubmit(onSubmitHandler)} 
              className={`flex flex-col space-y-6 mt-12 ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              <input
                className="p-5 border bg-transparent"
                required
                id="companyName"
                placeholder="Company Name"
                {...register('companyName')} 
              />
              <div className="invalid-feedback">{errors.companyName?.message}</div>
              <input
                type="number"
                className="p-5 border bg-transparent"
                required
                id="registrationNumber"
                placeholder="Registration Number"
                {...register('registrationNumber')} 
              />
              <div className="invalid-feedback">{errors.registrationNumber?.message}</div>
              <input
                className="p-5 border bg-transparent"
                required
                id="companyShortDescription"
                placeholder="Company Short Description"
                {...register('description')} 
              />
              <div className="invalid-feedback">{errors.description?.message}</div>
              <input
                type="number"
                className="p-5 border bg-transparent"
                required
                id="phoneNumber"
                placeholder="Phone Number"
                {...register('phonenumber')}  
              />
              <div className="invalid-feedback">{errors.phonenumber?.message}</div>
              <input
                className="p-5 border bg-transparent"
                required
                id="address"
                placeholder="Address"
                {...register("address")}
              />
              <div className="invalid-feedback">{errors.address?.message}</div>
              <input
                className="p-5 border bg-transparent"
                required
                id="city"
                placeholder="City"
                {...register("city")}
              />
              <div className="invalid-feedback">{errors.city?.message}</div>
              <input
                className="p-5 border bg-transparent"
                required
                id="state"
                placeholder="State / Province"
                {...register("state")}
              />
              <div className="invalid-feedback">{errors.state?.message}</div>
              <input
                type="number"
                className="p-5 border bg-transparent"
                required
                id="zip"
                placeholder="ZIP / Postal Code"
                {...register("zip")}
              />
              <div className="invalid-feedback">{errors.zip?.message}</div>
              <input
                className="p-5 border bg-transparent"
                required
                id="country"
                placeholder="Country"
                {...register("country")}
              />
              <div className="invalid-feedback">{errors.country?.message}</div>
              <input
                type="email"
                className="p-5 border bg-transparent"
                required
                id="emailAddress"
                placeholder="Email Address"
                {...register("email")}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
              <input
                type="string"
                className="p-5 border bg-transparent"
                required
                id="website"
                placeholder="Website https://"
                {...register("website")}
              />
              <div className="invalid-feedback">{errors.website?.message}</div>
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
