"use client";

import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import "../globals.css";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ThemeHandler from "@/context/theme_context";

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
}: {
  children: React.ReactNode;
  params: Params;
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeHandler>
            <div>{children}</div>
          </ThemeHandler>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
