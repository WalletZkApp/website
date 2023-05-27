"use client";

import { ThemeContext } from "@/context/theme_context";
import { useContext } from "react";
import { useTranslations } from "use-intl";

import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";

function Navigation() {
  const t = useTranslations("Index");
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-between p-5">
      <img src="/logo.png" alt="" />
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
          <IconButton>
            <MenuIcon />
          </IconButton>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {menuList.map((x) => {
            return <div key={x.href}>{t(x.label)}</div>;
          })}
          <button className="button-gd text-white font-semibold p-2 px-3 rounded-md">
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

const menuList = [
  {
    label: "Features",
    href: "#Features",
  },
  {
    label: "Timeline",
    href: "#Timeline",
  },
  {
    label: "Investor/Partners",
    href: "#Investor",
  },
  {
    label: "Meet The Team",
    href: "#Team",
  },
];

export default Navigation;
