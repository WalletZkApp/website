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
        <div className="text-[1.5rem] md:text-[2.5rem] font-semibold">
          {t("Meet Our Team")}
        </div>
        <FadeWrapper y={100} x={0}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5 md:mt-12">
            {team.map((x) => {
              return (
                <div
                  key={x.label}
                  className={`p-12 py-24 flex flex-col items-center ${
                    theme === "light" ? "bg-white" : "bg-gray-800"
                  } drop-shadow-lg rounded-lg hover:translate-y-[-5%] transition-all cursor-pointer`}
                >
                  <img src={x.image} alt="" />
                  <div className="mt-8 text-[1.5rem]">{x.label}</div>
                </div>
              );
            })}
          </div>
        </FadeWrapper>
      </div>
    </div>
  );
}

const team = [
  {
    image: "/assets/team/team_1.png",
    label: "I'm Dev",
  },
  {
    image: "/assets/team/team_2.png",
    label: "Axel",
  },
  {
    image: "/assets/team/team_3.png",
    label: "Abhi",
  },
];

export default Team;
