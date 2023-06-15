import "../globals.css";

// Theme Context
import ThemeHandler from "@/context/theme_context";

// Multi Languages
import { NextIntlClientProvider } from "next-intl";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import "react-toastify/dist/ReactToastify.css";

import GoogleAnalytics from "@/components/google/GoogleAnalytics"; 

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "es" },
    { locale: "nl" },
    { locale: "id" },
    { locale: "cn" },
    { locale: "tr" },
    { locale: "in" },
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
      <head>
        <title>ZK Keyless Wallet</title>
        <meta
          name="description"
          content="The First Smart Contract Wallet on Mina Protocol, No Recovery Seed Phrase Required"
        />
        {process.env.NEXT_PUBLIC_GA_TRACKING_ID && <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_TRACKING_ID} />}
      </head>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeHandler>{children}</ThemeHandler>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}