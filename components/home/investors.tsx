"use client";

import FadeWrapper from "@/utils/fade_wrapper";
import { useTranslations } from "use-intl";

function Investors() {
  const t = useTranslations("Index");
  return (
    <div
      id="investors"
      className="max-w-7xl mx-auto p-5 flex flex-col items-center py-12 lg:py-16"
    >
      <div className="text-[1.5rem] md:text-[2.5rem] tracking-widest text-light-gd">
        {t("Investor / Partners")}
      </div>
      <FadeWrapper y={100} x={0}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 lg:gap-24 mt-12 lg:mt-24">
          {investors.map((x) => {
            return (
              <a
                href={x.href}
                target="_blank"
                key={x.href}
                className="hover:translate-y-[-5%] cursor-pointer transition-all flex justify-center items-center"
              >
                <img
                  className="h-[7.5rem] object-contain"
                  src={x.image}
                  alt=""
                />
              </a>
            );
          })}
        </div>
      </FadeWrapper>
    </div>
  );
}

const investors = [
  {
    image: "/assets/partners/partner_4.png",
    href: "https://minaprotocol.com/",
  },
  {
    image: "/assets/investors/investor_1.png",
    href: "https://twitter.com/ZkPixHuman",
  },
  {
    image: "/assets/investors/investor_2.png",
    href: "https://twitter.com/minacryptocom",
  },
  {
    image: "/assets/investors/investor_3.png",
    href: "https://twitter.com/minadevelopers?lang=en",
  },
  {
    image: "/assets/partners/partner_1.png",
    href: "https://zkappsformina.com/",
  },
  {
    image: "/assets/partners/partner_2.png",
    href: "https://o1labs.org/",
  },
  {
    image: "/assets/partners/partner_3.png",
    href: "https://zkfs.io/",
  },
  {
    image: "/assets/partners/partner_5.png",
    href: "https://luminadex.com/",
  },
  {
    image: "/assets/partners/partner_6.png",
    href: "https://moonedge.finance/#/",
  },
  {
    image: "/assets/partners/partner_7.png",
    href: "https://everstake.one/",
  },
];

export default Investors;
