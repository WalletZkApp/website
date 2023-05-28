"use client";

import { ThemeContext } from "@/context/theme_context";
import { useContext, useEffect, useState } from "react";
import { useTranslations } from "use-intl";

import { Icon, IconButton } from "@mui/material";
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
      <div className="flex items-center justify-between p-5">
        <img
          className="cursor-pointer"
          onClick={() => window.scrollTo(0, 0)}
          src="/logo.png"
          alt=""
        />
        <div className="flex items-center space-x-8">
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
          <div className="hidden md:flex items-center space-x-8">
            {menuList.map((x) => {
              return (
                <a
                  className="hover:text-primary cursor-pointer transition-all"
                  key={x.href}
                  href={x.href}
                >
                  {t(x.label)}
                </a>
              );
            })}
            <Link href="/guardian">
              <button className="button-gd text-white font-semibold p-2 px-3 rounded-md">
                Connect Wallet
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation  */}
      <div
        className={`${menu ? "translate-x-0" : "translate-x-[-100%]"} ${
          theme === "light" ? "bg-white text-black" : "bg-background text-white"
        } transition-all fixed left-0 top-0 h-[100vh] drop-shadow-md p-5 z-[99] flex flex-col space-y-8`}
      >
        <div className="flex items-center space-x-5">
          <img src="/logo.png" alt="" />
          <IconButton onClick={() => setMenu(false)}>
            <CloseIcon
              sx={{ color: `${theme === "light" ? "black" : "white"}` }}
            />
          </IconButton>
        </div>
        {menuList.map((x) => {
          return (
            <a
              key={x.href + x.label}
              onClick={() => setMenu(false)}
              href={x.href}
            >
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

      {/* Floating Navigation  */}
      <div
        className={`${
          floating ? "translate-y-0" : "translate-y-[-100%]"
        } transition-all left-0 top-0 fixed ${
          theme === "light" ? "bg-white text-black" : "bg-background text-white"
        } w-full flex items-center justify-between p-5 z-[99]`}
      >
        <img
          className="cursor-pointer"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          src="/logo.png"
          alt=""
        />
        <div className="flex items-center space-x-8">
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
          <div className="hidden md:flex items-center space-x-8">
            {menuList.map((x) => {
              return (
                <a
                  className="hover:text-primary cursor-pointer transition-all"
                  key={x.label}
                  href={x.href}
                >
                  {t(x.label)}
                </a>
              );
            })}
            <Link href="/guardian">
              <button className="button-gd text-white font-semibold p-2 px-3 rounded-md">
                Connect Wallet
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

const menuList = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Timeline",
    href: "#collection",
  },
  {
    label: "Investor/Partners",
    href: "#investors",
  },
  {
    label: "Meet The Team",
    href: "#team",
  },
];

export default Navigation;
