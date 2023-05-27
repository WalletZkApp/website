"use client";

import { IconButton } from "@mui/material";
import { useTranslations } from "use-intl";

function Features() {
  const t = useTranslations("Index");
  return (
    <div className="max-w-7xl p-5 mx-auto py-12 lg:pt-16 lg:pb-24">
      <div className="text-center text-gd font-semibold text-[1.5rem] md:text-[3rem]">
        {t("Features")}
      </div>
      <div className="text-center lg:max-w-[50%] mx-auto mt-3">
        Lorem ipsum dolor sit amet consectetur. Quisque elit malesuada nullam
        risus bibendum. Ipsum posuere a arcu facilisi ipsum velit ut.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 lg:max-w-[70%] mx-auto">
        {features.map((x) => {
          return (
            <div
              key={x.label}
              className="flex flex-col items-start md:flex-row md:space-x-3"
            >
              <img className="h-[2rem] object-contain" src={x.icon} alt="" />
              <div className="mt-2 md:mt-0">
                <div className="font-semibold text-[1.25rem]">{t(x.label)}</div>
                <div className="text-gray-400 lg:max-w-[80%] mt-3">
                  {t(x.description)}
                </div>
              </div>
            </div>
          );
        })}
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
