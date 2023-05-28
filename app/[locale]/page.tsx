"use client";

import Collection from "@/components/collection";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Form from "@/components/form";
import Hero from "@/components/hero";
import Investors from "@/components/investors";
import Navigation from "@/components/navigation";
import Team from "@/components/team";
import { ThemeContext } from "@/context/theme_context";
import { useContext } from "react";

export default function Page() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div
        className={`${
          theme === "light" ? "text-black bg-white" : "text-white bg-[#10172a]"
        } transition-all`}
      >
        <Navigation />
        <Hero />
        <Features />
        <Collection />
        <Team />
        <Investors />
        <Form />
        <Footer />
      </div>
    </>
  );
}
