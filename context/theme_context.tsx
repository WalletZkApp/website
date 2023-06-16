"use client";

import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
  theme: "light",
  changeTheme: (mode: string) => {},
});

interface child {
  children: React.ReactNode;
}

export default function ThemeHandler({ children }: child) {
  const [theme, setTheme] = useState("light");

  const changeTheme = (mode: string) => {
    localStorage.setItem("theme", mode.toString());
    setTheme(mode);
  };

  useEffect(() => {
    let localTheme = localStorage.getItem("theme");
    if (localTheme === "light" || localTheme === "dark") {
      setTheme(localTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
