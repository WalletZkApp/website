"use client";

// Cookies Popup
import CookiesConsent from "@/components/popup/cookies_consent";

// Sections
import Collection from "@/components/home/collection";
import Features from "@/components/home/features";
import Footer from "@/components/layout/footer";
import Form from "@/components/home/form";
import Hero from "@/components/home/hero";
import Investors from "@/components/home/investors";
import Navigation from "@/components/layout/navigation";
import Team from "@/components/home/team";

// Context
import { ThemeContext } from "@/context/theme_context";
import { useContext } from "react";
import OurSolution from "@/components/home/our_solution";
import KeylessWallet from "@/components/home/keyless_wallet";
import SocialRecovery from "@/components/home/social_recovery";

export default function Page() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div
        className={`${
          theme === "light" ? "text-black bg-white" : "text-white bg-[#10172a]"
        } transition-all overflow-x-hidden relative`}
      >
        <div className="relative z-[1]">
          <Navigation />
          <Hero />
          <Features />
          <OurSolution />
          <KeylessWallet />
          <SocialRecovery />
          <Team />
          <Investors />
          <Form />
          <Footer />
        </div>
        <CookiesConsent />
      </div>
    </>
  );
}
