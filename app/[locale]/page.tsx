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
        } transition-all overflow-x-hidden relative`}
      >
        <div className="hidden lg:block absolute left-[-25%] top-[-10%] w-[1000px] h-[1000px] circle-gd rounded-full z-[0]"></div>
        <div className="hidden lg:block absolute right-[-57.5%] top-[-5%] w-[1300px] h-[1100px] circle-gd rounded-full z-[0]"></div>
        <div className="relative z-[1]">
          <Navigation />
          <Hero />
          <Features />
          <Collection />
          <Team />
          <Investors />
          <Form />
          <Footer />
        </div>
      </div>
    </>
  );
}
