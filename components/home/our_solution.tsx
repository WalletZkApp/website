import { ThemeContext } from "@/context/theme_context";
import FadeWrapper from "@/utils/fade_wrapper";
import { useTranslations } from "next-intl";
import { useContext } from "react";

function OurSolution() {
  const t = useTranslations("Index");
  const { theme } = useContext(ThemeContext);
  return (
    <div className="max-w-5xl mx-auto p-5 mt-5 md:mt-12">
      <div className="text-center">
        <div className="text-primary md:text-[1.25rem]">
          {t("Our Solutions")}
        </div>
        <div className="font-medium text-[2rem]">
          {t("Get Started with Crypto")}
        </div>
        <div className="font-medium text-[2rem]">{t("on Mina Protocol")}</div>
      </div>

      {/* Stake Section  */}
      <div className="flex flex-col-reverse md:flex-row md:items-center md:space-x-12 mt-5 md:mt-24">
        <FadeWrapper x={-100} y={0}>
          <div className="w-full flex flex-col items-center text-center md:items-start md:text-left space-y-5 mt-8 md:mt-0">
            <div className="text-primary md:text-[1.25rem]">{t("Stake")}</div>
            <div className="font-medium text-[1.5rem] md:text-[2rem]">
              {t("Staking on Everstake")}
            </div>
            <div
              className={`lg:max-w-[90%] md:text-[1.25rem] ${
                theme === "light" ? "text-darkgrey" : "text-white"
              }`}
            >
              {t(
                "Join the staking revolution on Everstake and start earning passive income from your crypto holdings today"
              )}
              <br />
              {t(
                "Your assets stay securely stored in your original wallet, frozen during the staking period"
              )}
              <br />
              {t(
                "You have the freedom to unstake at your preferred time, with the assets becoming available for use after the blockchain's minimum unfreezing period has passed"
              )}
            </div>
            <div className="underline text-primary font-light md:text-[1.25rem]">
              {t("Learn More")}
            </div>
          </div>
        </FadeWrapper>
        <div className="w-full flex justify-center">
          <FadeWrapper x={100} y={0}>
            <img src="/assets/illustration_1.png" alt="" />
          </FadeWrapper>
        </div>
      </div>
      {/* Stake Section End  */}

      {/* Buy Section  */}
      <div className="mt-8 md:mt-24 flex flex-col md:flex-row md:items-center md:space-x-12">
        <div className="w-full">
          <FadeWrapper x={-100} y={0}>
            <img src="/assets/illustration_2.png" alt="" />
          </FadeWrapper>
        </div>
        <div className="w-full">
          <FadeWrapper x={100} y={0}>
            <div className="w-full flex flex-col space-y-4 md:space-y-5 mt-8 md:mt-0 items-center text-center md:items-start md:text-left">
              <div className="text-primary md:text-[1.25rem]">{t("Buy")}</div>
              <div className="font-medium text-[1.5rem] md:text-[2rem]">
                {t("Buy crypto on Mina Protocol")}
              </div>
              <div
                className={`md:text-[1.25rem] ${
                  theme === "light" ? "text-darkgrey" : "text-white"
                }`}
              >
                {t(
                  "Take advantage of the secure and efficient Mina Protocol to enter the world of digital assets with confidence and simplify your crypto purchases and embark on your journey to financial freedom today"
                )}
              </div>
              <div className="underline text-primary font-light md:text-[1.25rem]">
                {t("Learn More")}
              </div>
            </div>
          </FadeWrapper>
        </div>
      </div>
      {/* Buy Section End  */}
    </div>
  );
}

export default OurSolution;