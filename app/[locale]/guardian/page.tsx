"use client";

import WalletIcon from "@mui/icons-material/Wallet";
import { Button, IconButton } from "@mui/material";

function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div className="flex flex-col max-w-7xl p-5 md:py-12 mx-auto w-full">
        <div className="text-gd text-[1.25rem] md:text-[2rem] font-semibold">
          Connect Your Wallet and Register
        </div>
        <div className="flex justify-center">
          <div className="bg-primary rounded-full flex justify-center mt-5">
            <IconButton>
              <WalletIcon sx={{ fontSize: "3rem", color: "white" }} />
            </IconButton>
          </div>
        </div>
        <div className="text-gd text-[1.25rem] md:text-[1.5rem] font-semibold mt-6">
          Guardian Registration
        </div>
        <form className="flex flex-col space-y-6 mt-12">
          <input
            className="p-5 border"
            required
            id="companyName"
            placeholder="Company Name"
          />
          <input
            type="number"
            className="p-5 border"
            required
            id="registrationNumber"
            placeholder="Registration Number"
          />
          <input
            className="p-5 border"
            required
            id="companyShortDescription"
            placeholder="Company Short Description"
          />
          <input
            type="number"
            className="p-5 border"
            required
            id="phoneNumber"
            placeholder="Phone Number"
          />
          <input
            className="p-5 border"
            required
            id="address"
            placeholder="Address"
          />
          <input className="p-5 border" required id="city" placeholder="City" />
          <input
            className="p-5 border"
            required
            id="state"
            placeholder="State / Province"
          />
          <input
            type="number"
            className="p-5 border"
            required
            id="zip"
            placeholder="ZIP / Postal Code"
          />
          <input
            className="p-5 border"
            required
            id="country"
            placeholder="Country"
          />
          <input
            type="email"
            className="p-5 border"
            required
            id="emailAddress"
            placeholder="Email Address"
          />
          <input
            type="email"
            className="p-5 border"
            required
            id="website"
            placeholder="Website https://"
          />
          <Button
            variant="contained"
            className="bg-primary"
            sx={{ paddingBlock: "10px" }}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Page;
