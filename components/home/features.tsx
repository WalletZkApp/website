"use client";

import { ThemeContext } from "@/context/theme_context";
import FadeWrapper from "@/utils/fade_wrapper";
import { useContext } from "react";
import { useTranslations } from "use-intl";

function Features() {
  const t = useTranslations("Index");
  const { theme } = useContext(ThemeContext);
  return (
    <div
      id="features"
      className="max-w-7xl p-5 mx-auto lg:py-24 flex flex-col lg:flex-row lg:items-center"
    >
      <div className="w-full md:hidden lg:block lg:w-[40%]">
        <FadeWrapper x={-100} y={0}>
          <img
            className="rounded-md lg:h-[45rem] hover:translate-y-[-1%] transition-all cursor-pointer drop-shadow-md"
            src="/assets/mockup.png"
            alt=""
          />
        </FadeWrapper>
      </div>
      <div className="w-full lg:w-[60%]">
        <FadeWrapper x={100} y={0}>
          <div className="text-center text-gd font-thin tracking-widest text-[1.5rem] md:text-[3rem] mt-5 md:mt-0">
            {t("Features")}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5 md:mt-16">
            {features.map((x) => {
              return (
                <div
                  key={x.label}
                  className="flex flex-col items-start md:flex-row md:space-x-3"
                >
                  <img
                    className="h-[2rem] object-contain"
                    src={x.icon}
                    alt=""
                  />
                  <div className="mt-2 md:mt-0">
                    <div
                      className={`text-[1.25rem] ${
                        theme === "light" ? "text-darkgrey" : "text-white"
                      }`}
                    >
                      {t(x.label)}
                    </div>
                    <div className="text-[#848484] font-light lg:max-w-[85%] mt-3">
                      {t(x.description)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeWrapper>
      </div>
    </div>
  );
}

const features = [
  {
    icon: "/assets/icons/icon_1.png",
    label: "Keyless Wallet",
    description:
      "Secure Smart OTPs: Zero-knowledge, self-sovereign, air-gapped for enhanced security",
  },
  {
    icon: "/assets/icons/icon_2.png",
    label: "Social Recover",
    description:
      "Zero-knowledge, resilient, anonymous system with time locks and multiple safety nets for fund recovery and privacy",
  },
  {
    icon: "/assets/icons/icon_3.png",
    label: "Onramp",
    description:
      "Refers to a method or service that allows individuals to convert traditional fiat currency into cryptocurrencies",
  },
  {
    icon: "/assets/icons/icon_4.png",
    label: "Shamir Service",
    description:
      "Enhance wallet security: Shamir Secret Sharing distributes secrets among parties, ensuring protection against theft and loss",
  },
];

export default Features;
