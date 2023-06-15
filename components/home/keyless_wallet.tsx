import { ThemeContext } from "@/context/theme_context";
import FadeWrapper from "@/utils/fade_wrapper";
import { useTranslations } from "next-intl";
import React, { useContext } from "react";

function KeylessWallet() {
  const t = useTranslations("Index");
  const { theme } = useContext(ThemeContext);

  return (
    <FadeWrapper y={100} x={0}>
      <div className="max-w-6xl mx-auto p-5 mt-5 md:mt-24">
        <div
          className={`w-full flex flex-col lg:flex-row drop-shadow-xl p-5 md:p-8 rounded-xl ${
            theme === "light" ? "bg-white" : "bg-gray-800"
          }`}
        >
          <div className="w-full">
            <div className="flex flex-col space-y-5 md:space-y-8">
              <div className="md:text-[1.5rem] text-primary">
                {t("Shamir Service")}
              </div>
              <div className="text-[1.5rem] md:text-[2rem] font-medium">
                {t(
                  "Discover the power of Shamir Service for unparalleled security of your digital assets"
                )}
              </div>
              <div
                className={`md:text-[1.25rem] ${
                  theme === "light" ? "text-darkgrey" : "text-white font-thin"
                }`}
              >
                {t(
                  "This innovative technology divides your private keys into multiple shares, distributed among trusted parties"
                )}
                .{" "}
                {t(
                  "With Shamir Service, you can ensure that even if a share is compromised, your assets remain safe"
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end mt-5 lg:mt-0">
            <img
              className="lg:h-[26rem] lg:w-[26rem]"
              src="/assets/illustration_3.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </FadeWrapper>
  );
}

export default KeylessWallet;
