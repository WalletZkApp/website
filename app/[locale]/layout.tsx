"use client";

import { NextIntlClientProvider } from "next-intl";
import "../globals.css";
import ThemeHandler from "@/context/theme_context";
import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "es" },
    { locale: "nl" },
    { locale: "id" },
    { locale: "cn" },
    { locale: "tr" },
  ];
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: any) {
  const messages = await import(`../../messages/${locale}.json`);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#804BDB",
      },
    },
  });

  return (
    <html lang={locale}>
      <body>
        <React.Suspense fallback={null}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider theme={theme}>
              <ThemeHandler>
                <div>{children}</div>
              </ThemeHandler>
            </ThemeProvider>
          </NextIntlClientProvider>
        </React.Suspense>
      </body>
    </html>
  );
}
