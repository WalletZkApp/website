import React, { useContext } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useTranslations } from "next-intl";
import SocialRecoveryCarousel from "../carousel/social_recovery_carousel";
import { ThemeContext } from "@/context/theme_context";
import FadeWrapper from "@/utils/fade_wrapper";

function SocialRecovery() {
  const t = useTranslations("Index");
  const { theme } = useContext(ThemeContext);
  return (
    <FadeWrapper y={100} x={0}>
      <div className="max-w-6xl mx-auto p-5 mt-5 md:mt-24">
        <div
          className={`${
            theme === "light" ? "bg-white" : "bg-gray-800"
          } drop-shadow-md flex flex-col lg:flex-row rounded-lg overflow-hidden`}
        >
          <div className="lg:w-[30%] p-8 flex flex-col space-y-5">
            <div className="text-primary flex items-center space-x-3">
              <TwitterIcon />
              <div>{t("Social Recovery")}</div>
            </div>
            <div className="text-[1.75rem] md:text-[2.5rem] max-w-[90%]">
              {t("Hear what the community has to say")}
            </div>
            <div className="w-full h-[2px] bg-primary line-gd"></div>
            <div
              className={`${
                theme === "light" ? "text-darkgrey" : "text-white"
              }`}
            >
              {t("Keep up to date with ZKWallet")}
            </div>
            <button className="hover:brightness-[1.1] py-3 px-5 rounded-full bg-primary text-white mt-5 w-[150px]">
              {t("Learn More")}
            </button>
          </div>
          <div className="lg:w-[70%] carousel-gd p-5 md:p-8">
            <SocialRecoveryCarousel />
          </div>
        </div>
      </div>
    </FadeWrapper>
  );
}

export default SocialRecovery;
