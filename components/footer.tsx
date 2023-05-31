import { ThemeContext } from "@/context/theme_context";
import Link from "next/link";
import { useContext } from "react";
import { useTranslations } from "use-intl";

function Footer() {
  const t = useTranslations("Index");
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div
        className={`border-y py-12 lg:py-16 ${
          theme === "light" ? "" : "border-gray-700"
        }`}
      >
        <div className="max-w-7xl p-5 mx-auto">
          <div className="flex flex-col space-y-12 lg:flex-row lg:space-y-0 justify-between">
            <div className="flex flex-col">
              {theme === "light" ? (
                <img className="h-[2.5rem] w-[15rem]" src="/logo.png" alt="" />
              ) : (
                <img
                  className="h-[2.5rem] w-[15rem]"
                  src="/logo_white.png"
                  alt=""
                />
              )}
              <div className="uppercase mt-10 text-gray-400 font-medium">
                {t("Contact Us")}
              </div>
              <div className="flex flex-wrap items-center mt-5">
                {socials.map((x) => {
                  return (
                    <Link href={x.href} key={x.href} target="_blank">
                      <div
                        className={`border ${
                          theme === "light" ? "" : "border-gray-700"
                        } hover:translate-y-[5%] hover:brightness-[0.95] transition-all p-3 flex justify-center items-center rounded-full h-[3.5rem] w-[3.5rem] mr-5 mb-5`}
                      >
                        <img src={x.icon} alt="" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            {/* ZK Wallet  */}
            <div>
              <div className="uppercase text-gray-400 font-medium">
                {t("ZK Wallet")}
              </div>
              <div className="flex flex-col space-y-3 mt-3">
                {menu.map((x) => {
                  return (
                    <Link key={x.label} href={x.href}>
                      <div className="hover:underline font-medium">
                        {t(x.label)}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            {/* Company  */}
            <div>
              <div className="uppercase text-gray-400 font-medium">
                {t("Company")}
              </div>
              <div className="flex flex-col space-y-3 mt-3">
                {company.map((x) => {
                  return (
                    <Link key={x.label} href={x.href}>
                      <div className="hover:underline font-medium">
                        {t(x.label)}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            {/* Security & Support   */}
            <div>
              <div className="uppercase text-gray-400 font-medium">
                {t("Security & Support")}
              </div>
              <div className="flex flex-col space-y-3 mt-3">
                {security.map((x) => {
                  return (
                    <Link key={x.label} href={x.href}>
                      <div className="hover:underline font-medium">
                        {t(x.label)}
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="text-gray-400 font-medium mt-5">
                {t("Languages")}
              </div>
              <div className="flex flex-wrap items-center lg:grid lg:grid-cols-3 mt-5">
                {languages.map((x) => {
                  return (
                    <Link href={x.href} key={x.flag}>
                      <img
                        className="h-[2rem] w-[3rem] rounded-md cursor-pointer hover:translate-y-[-5%] transition-all drop-shadow-md mr-5 mb-5"
                        src={x.flag}
                        alt=""
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 max-w-7xl mx-auto text-gray-400">
        © All rights reserved to ZK Wallet
      </div>
    </>
  );
}

const languages = [
  {
    flag: "/assets/flags/english.png",
    href: "/en",
  },
  {
    flag: "/assets/flags/indonesia.png",
    href: "/id",
  },
  {
    flag: "/assets/flags/spain.png",
    href: "/es",
  },
  {
    flag: "/assets/flags/china.png",
    href: "/cn",
  },
  {
    flag: "/assets/flags/netherlands.png",
    href: "/nl",
  },
  {
    flag: "/assets/flags/turkey.png",
    href: "/tr",
  },
];

const security = [
  {
    label: "Get Help",
    href: "#GetHelp",
  },
  {
    label: "Security Center",
    href: "#SecurityCenter",
  },
  {
    label: "Developer Docs",
    href: "#DeveloperDocs",
  },
];

const company = [
  {
    label: "Join Our Team",
    href: "#JoinOurTeam",
  },
  {
    label: "Terms of Service",
    href: "#TermsofService",
  },
  {
    label: "Privacy Policy",
    href: "#PrivacyPolicy",
  },
];

const menu = [
  {
    label: "FAQ",
    href: "#FAQ",
  },
  {
    label: "Press",
    href: "#Press",
  },
  {
    label: "Community Coverage",
    href: "#CommunityCoverage",
  },
  {
    label: "MINA Protocol Zkapp",
    href: "#Mina",
  },
];

const socials = [
  {
    icon: "/assets/social_media/twitter.png",
    href: "https://twitter.com",
  },
  {
    icon: "/assets/social_media/linkedin.png",
    href: "https://linkedin.com",
  },
  {
    icon: "/assets/social_media/telegram.png",
    href: "https://telegram.com",
  },
  {
    icon: "/assets/social_media/youtube.png",
    href: "https://youtube.com",
  },
  {
    icon: "/assets/social_media/discord.png",
    href: "https://discord.com",
  },
];

export default Footer;
