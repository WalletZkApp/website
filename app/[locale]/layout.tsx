import React from "react";
import "../globals.css";

// Theme Context
import ThemeHandler from "@/context/theme_context";

// Multi Languages
import { NextIntlClientProvider } from "next-intl";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

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

interface layout {
  children: React.ReactNode;
  params: Params;
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: layout) {
  const messages = Object.assign(
    {},
    await import(`../../messages/${locale}.json`)
  );

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeHandler>{children}</ThemeHandler>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
