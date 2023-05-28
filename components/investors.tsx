"use client";

import { useTranslations } from "use-intl";

function Investors() {
  const t = useTranslations("Index");
  return (
    <div
      id="investors"
      className="max-w-7xl mx-auto p-5 flex flex-col items-center py-12 lg:py-16"
    >
      <div className="text-[1.5rem] md:text-[2.5rem] font-semibold">
        {t("Investor / Partners")}
      </div>
      <div className="grid grid-cols-5 gap-12 lg:gap-16 mt-10">
        {investors.map((x) => {
          return (
            <div className="flex justify-center items-center">
              <img className="h-[5rem] object-contain" key={x} src={x} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const investors = [
  "/assets/investors/investor_1.png",
  "/assets/investors/investor_2.png",
  "/assets/investors/investor_3.png",
  "/assets/partners/partner_1.png",
  "/assets/partners/partner_2.png",
  "/assets/partners/partner_3.png",
  "/assets/partners/partner_4.png",
  "/assets/partners/partner_5.png",
  "/assets/partners/partner_6.png",
  "/assets/partners/partner_7.png",
];

// const partners = [
//   "/assets/partners/partner_1.png",
//   "/assets/partners/partner_2.png",
//   "/assets/partners/partner_3.png",
//   "/assets/partners/partner_4.png",
//   "/assets/partners/partner_5.png",
//   "/assets/partners/partner_6.png",
//   "/assets/partners/partner_7.png",
// ];

export default Investors;
