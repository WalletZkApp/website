"use client";

import { ThemeContext } from "@/context/theme_context";
import { getCookie, setCookie } from "cookies-next";
import { useContext, useEffect, useState } from "react";

function CookiesConsent() {
  const { theme } = useContext(ThemeContext);
  const [hide, setHide] = useState(true);

  useEffect(() => {
    const cookies = getCookie("cookies");
    if (cookies) {
      setHide(true);
    } else {
      setHide(false);
    }
  }, []);

  const acceptHandler = () => {
    setCookie("cookies", true, { maxAge: 60 * 6 * 24 });
    setHide(true);
  };

  const rejectHandler = () => {
    setHide(true);
  };

  return (
    <div
      className={`${
        theme === "light" ? "bg-white text-black" : "bg-background text-white"
      } ${
        hide
          ? "translate-y-[100%] opacity-0 invisible"
          : "translate-y-[0%] opacity-1 visible"
      } border-t ${
        theme === "light" ? "" : "border-gray-700"
      } drop-shadow-md flex flex-col md:flex-row md:items-center justify-between fixed bottom-0 w-full p-5 lg:px-12 z-[999] transition-all md:space-x-5`}
    >
      <div>This Website Uses Cookies to Improve User Experience</div>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-5 md:space-x-8 mt-5 md:mt-0">
        <button
          onClick={acceptHandler}
          className="whitespace-nowrap uppercase w-full md:w-fit bg-primary text-white hover:brightness-[1.1] p-2 px-10"
        >
          Accept All
        </button>
        <button
          onClick={rejectHandler}
          className="whitespace-nowrap uppercase w-full md:w-fit px-12 border border-primary hover:brightness-[1.1] transition-all p-2 bg-transparent mt-5 md:mt-0"
        >
          Reject All
        </button>
      </div>
    </div>
  );
}

export default CookiesConsent;