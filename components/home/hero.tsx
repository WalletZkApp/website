"use client";

// Translate
import { useTranslations } from "use-intl";

// Framer Motion
import FadeWrapper from "@/utils/fade_wrapper";

// Context
import { useContext, useState } from "react";
import { ThemeContext } from "@/context/theme_context";

// Toast
import { ToastContainer, toast } from "react-toastify";

function Hero() {
  const t = useTranslations("Index");
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [joinedWaitlist, setJoinedWaitlist] = useState(false);

  // MailerLite
  async function onSubmitHandler() {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (emailPattern.test(email)) {
      setLoading(true);
      try {
        const response = await fetch("/api/mailerlite", {
          method: "POST",
          body: JSON.stringify({
            groupName: "joinlist",
            email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setJoinedWaitlist(true);
          toast("Successfully Joined Waitlist", { type: "success" });
          setLoading(false);
          setEmail("");
        } else {
          toast(response.statusText, { type: "error" });
          setLoading(false);
        }
      } catch (error: any) {
        toast("Error Has Occured !"), { type: "error" };
        setLoading(false);
      }
    } else {
      toast("Input Valid Email", { type: "error" });
      setLoading(false);
    }
  }

  return (
    <div id="Hero" className="py-5 md:py-12 lg:py-36">
      <ToastContainer
        autoClose={1000}
        position="top-center"
        toastStyle={{ backgroundColor: "white" }}
        // toastClassName="bg-black"
      />
      <div className="flex flex-col md:flex-row md:space-x-12 md:items-center max-w-7xl mx-auto p-5">
        <div className="w-full lg:w-[60%] text-center md:text-left">
          <FadeWrapper x={-100} y={0}>
            <div
              className={`${
                theme === "light" ? "text-darkgrey" : "text-white"
              } text-[2rem] lg:text-[3rem] tracking-wider`}
            >
              {t("Welcome to")}
            </div>
            <div
              className={`tracking-widest text-[2rem] lg:text-[3.5rem] font-bold text-gd`}
            >
              {t("ZK KEYLESS WALLET")}
            </div>
            <div
              className={`${
                theme === "light" ? "text-darkgrey" : "text-white"
              } mt-5 md:max-w-[80%] font-extralight`}
            >
              {t("The First Smart Contract Wallet on Mina Protocol")}.{" "}
              {t("No Recovery Seed Phrase Required")}
            </div>
            {joinedWaitlist && <div className="replaceForm"></div>}
            {!joinedWaitlist && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmitHandler();
                }}
                className="flex flex-col lg:flex-row lg:items-center lg:space-x-3 mt-8"
              >
                <input
                  className="bg-white px-5 py-3 drop-shadow-lg w-full lg:w-[20rem] rounded-md text-black"
                  placeholder={t("Enter your email")}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <button
                  type="submit"
                  className="hover:brightness-[1.05] transition-all button-gd px-8 py-3 drop-shadow-md rounded-md text-white font-semibold mt-5 lg:mt-0"
                >
                  {t("Join Waitlist")}
                </button>
              </form>
            )}
          </FadeWrapper>
        </div>
        <div className="hidden md:block w-full lg:w-[40%]">
          <FadeWrapper x={100} y={0}>
            <img
              className="floating-logo h-[20rem] object-contain drop-shadow-xl"
              src="/zkwallet.png"
              alt=""
            />
          </FadeWrapper>
        </div>
      </div>
    </div>
  );
}

export default Hero;