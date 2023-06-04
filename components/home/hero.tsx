"use client";

import { ThemeContext } from "@/context/theme_context";
import FadeWrapper from "@/utils/fade_wrapper";
import { useContext } from "react";
import { useTranslations } from "use-intl";

function Hero() {
  const t = useTranslations("Index");
  const { theme } = useContext(ThemeContext);

  return (
    <div id="Hero" className="py-5 md:py-12 lg:py-36">
      <div className="flex flex-col md:flex-row md:space-x-12 md:items-center max-w-7xl mx-auto p-5">
        <div className="w-full lg:w-[60%] text-center md:text-left">
          <FadeWrapper x={-100} y={0}>
            <div
              className={`${
                theme === "light" ? "text-darkgrey" : "text-white"
              } text-[2rem] lg:text-[3rem] tracking-wider`}
            >
              {t("Welcome to")}
            </div>
            <div
              className={`tracking-widest text-[2rem] lg:text-[3.5rem] font-bold text-gd`}
            >
              {t("ZK WALLET")}
            </div>
            <div
              className={`${
                theme === "light" ? "text-darkgrey" : "text-white"
              } mt-5 md:max-w-[80%] font-extralight`}
            >
              {t(
                "With a ZK wallet, the transaction details are encrypted and the zero-knowledge proof ensures that the transaction is valid"
              )}
            </div>
            <form className="flex flex-col lg:flex-row lg:items-center lg:space-x-3 mt-8">
              <input
                className="bg-white px-5 py-3 drop-shadow-lg w-full lg:w-[20rem] rounded-md text-black"
                placeholder={t("Enter your email")}
                required
              />
              <button className="hover:brightness-[1.05] transition-all button-gd px-8 py-3 drop-shadow-md rounded-md text-white font-semibold mt-5 lg:mt-0">
                {t("Join Waitlist")}
              </button>
            </form>
          </FadeWrapper>
        </div>
        <div className="hidden md:block w-full lg:w-[40%]">
          <FadeWrapper x={100} y={0}>
            <img
              className="floating-logo h-[20rem] object-contain drop-shadow-xl"
              src="/zkwallet.png"
              alt=""
            />
          </FadeWrapper>
        </div>
      </div>
    </div>
  );
}

export default Hero;
