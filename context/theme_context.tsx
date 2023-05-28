"use client";

import { createContext, useState } from "react";

export const ThemeContext = createContext({
  theme: "light",
  changeTheme: (mode: string) => {},
});

export default function ThemeHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("light");

  const changeTheme = (mode: string) => {
    localStorage.setItem("theme", mode.toString());
    setTheme(mode);
  };

  const value = {
    theme: theme,
    changeTheme: changeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
