"use client";

import { ThemeContext } from "@/context/theme_context";
import FadeWrapper from "@/utils/fade_wrapper";
import { useContext } from "react";
import { useTranslations } from "use-intl";

function Team() {
  const t = useTranslations("Index");
  const { theme } = useContext(ThemeContext);

  return (
    <div id="team" className={`${theme === "light" ? "background-gd" : ""}`}>
      <div className="max-w-7xl mx-auto p-5 text-center py-12 lg:py-16">
        <div className="text-[1.5rem] md:text-[2.5rem] text-light-gd tracking-widest">
          {t("Meet Our Team")}
        </div>
        <FadeWrapper y={100} x={0}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 mt-5 md:mt-12">
            {team.map((x) => {
              return (
                <div
                  onClick={() => window.open(x.href)}
                  key={x.label}
                  className={`p-12 py-24 md:py-12 md:px-5 lg:px-12 lg:py-24 flex flex-col items-center ${
                    theme === "light" ? "bg-white" : "bg-gray-800"
                  } drop-shadow-lg rounded-lg hover:translate-y-[-5%] transition-all cursor-pointer`}
                >
                  <img
                    className="h-[10rem] rounded-full"
                    src={x.image}
                    alt=""
                  />
                  <div className="mt-10 font-medium text-[1.25rem]">
                    {x.label}
                  </div>
                  <div className="mt-5 text-gray-400 text-[1.1rem]">
                    {x.job}
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

interface member {
  image: string;
  label: string;
  job: string;
  href: string;
}

const team: member[] = [
  {
    image: "/assets/team/team_1.png",
    label: "IaM [ZK] <DEV>",
    job: "Founder / CEO",
    href: "https://twitter.com/IamZKdevETH",
  },
  {
    image: "/assets/team/team_3.png",
    label: "Abishek Sira Chandrashekar",
    job: "Co-Founder / CTO",
    href: "https://www.linkedin.com/in/abhishek-sira-chandrashekar-821244b7/",
  },
  {
    image: "/assets/team/team_2.png",
    label: "Axel Arifin",
    job: "Co-Founder / CMO",
    href: "https://www.linkedin.com/in/axel-arifin-99aba7143/",
  },
];

export default Team;
