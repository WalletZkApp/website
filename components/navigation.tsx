"use client";

import { ThemeContext } from "@/context/theme_context";
import { useContext, useEffect, useState } from "react";
import { useTranslations } from "use-intl";

import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

function Navigation() {
  const t = useTranslations("Index");
  const { theme, changeTheme } = useContext(ThemeContext);
  const [menu, setMenu] = useState(false);
  const [floating, setFloating] = useState(false);

  const MenuComponents = () => {
    return (
      <div className="hidden lg:flex items-center space-x-8">
        {menuList.map((x) => {
          return (
            <div key={x.label} className="menu-parents">
              {x.label === "Guardian Registration" ? (
                <Link
                  className="hover:text-primary pb-1"
                  key={x.label}
                  href={x.href}
                >
                  {t(x.label)}
                  <div className="menu-child"></div>
                </Link>
              ) : (
                <a
                  className="hover:text-primary pb-1"
                  key={x.label}
                  href={x.href}
                >
                  {t(x.label)}
                  <div className="menu-child"></div>
                </a>
              )}
            </div>
          );
        })}
        <button className="hover:brightness-[1.05] transition-all button-gd text-white font-semibold p-2 px-3 rounded-md">
          Connect Wallet
        </button>
      </div>
    );
  };

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setFloating(true);
    } else {
      setFloating(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Normal Navigation  */}
      <div
        className={`flex items-center justify-between space-x-5 p-5 ${
          theme === "light" ? "text-black" : "text-white"
        } z-[99] relative`}
      >
        <Link href="/">
          {theme === "light" ? (
            <img className="h-[2rem] md:h-[2.5rem]" src="/logo.png" alt="" />
          ) : (
            <img
              className="h-[2rem] md:h-[2.5rem]"
              src="/logo_white.png"
              alt=""
            />
          )}
        </Link>
        <div className="flex items-center space-x-1 lg:space-x-8">
          <IconButton
            onClick={() =>
              theme === "light" ? changeTheme("dark") : changeTheme("light")
            }
          >
            {theme === "light" ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon sx={{ color: "white" }} />
            )}
          </IconButton>
          <div className="lg:hidden">
            <IconButton onClick={() => setMenu(!menu)}>
              <MenuIcon
                sx={{ color: `${theme === "light" ? "black" : "white"}` }}
              />
            </IconButton>
          </div>
          <MenuComponents />
        </div>
      </div>
      {/* Normal Navigation End  */}

      {/* Floating Navigation ( On Scroll )  */}
      <div
        className={`${
          floating ? "translate-y-0" : "translate-y-[-100%]"
        } transition-all left-0 top-0 fixed ${
          theme === "light" ? "bg-white text-black" : "bg-background text-white"
        } drop-shadow-md w-full flex items-center justify-between p-5 z-[99] space-x-5`}
      >
        <Link href="/">
          {theme === "light" ? (
            <img className="h-[2rem] md:h-[2.5rem]" src="/logo.png" alt="" />
          ) : (
            <img
              className="h-[2rem] md:h-[2.5rem]"
              src="/logo_white.png"
              alt=""
            />
          )}
        </Link>
        <div className="flex items-center space-x-1 md:space-x-8">
          <IconButton
            onClick={() =>
              theme === "light" ? changeTheme("dark") : changeTheme("light")
            }
          >
            {theme === "light" ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon sx={{ color: "white" }} />
            )}
          </IconButton>
          <div className="md:hidden">
            <IconButton onClick={() => setMenu(!menu)}>
              <MenuIcon
                sx={{ color: `${theme === "light" ? "black" : "white"}` }}
              />
            </IconButton>
          </div>
          <MenuComponents />
        </div>
      </div>
      {/* Floating Navigation End  */}

      {/* Mobile Navigation  */}
      <div
        className={`${menu ? "translate-x-0" : "translate-x-[-100%]"} ${
          theme === "light" ? "bg-white text-black" : "bg-background text-white"
        } transition-all fixed left-0 top-0 h-[100vh] drop-shadow-md p-5 z-[99] flex flex-col space-y-8`}
      >
        <div className="flex items-center space-x-5">
          <Link href="/">
            {theme === "light" ? (
              <img className="h-[2.5rem" src="/logo.png" alt="" />
            ) : (
              <img className="h-[2.5rem" src="/logo_white.png" alt="" />
            )}
          </Link>
          <IconButton onClick={() => setMenu(false)}>
            <CloseIcon
              sx={{ color: `${theme === "light" ? "black" : "white"}` }}
            />
          </IconButton>
        </div>
        {menuList.map((x) => {
          return x.label === "Guardian Registration" ? (
            <Link onClick={() => setMenu(false)} key={x.label} href={x.href}>
              {t(x.label)}
            </Link>
          ) : (
            <a onClick={() => setMenu(false)} key={x.label} href={x.href}>
              {t(x.label)}
            </a>
          );
        })}
        <Link href="/guardian">
          <button className="button-gd text-white font-semibold py-2 rounded-md w-full">
            Connect Wallet
          </button>
        </Link>
      </div>
      {/* Mobile Navigation End  */}
    </>
  );
}

const menuList = [
  {
    label: "Features",
    href: "/#features",
  },
  {
    label: "Timeline",
    href: "/#collection",
  },
  {
    label: "Investor/Partners",
    href: "/#investors",
  },
  {
    label: "Meet The Team",
    href: "/#team",
  },
  {
    label: "Guardian Registration",
    href: "/guardian",
  },
];

export default Navigation;
