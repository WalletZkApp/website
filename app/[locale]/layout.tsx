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
      <head>
        <title>ZK Wallet</title>
        <meta
          name="description"
          content="With a ZK wallet, the transaction details are encrypted and the zero-knowledge proof ensures that the transaction is valid"
        />
      </head>
      <link rel="shortcut icon" href="icon.png" type="image/x-icon" />
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeHandler>{children}</ThemeHandler>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
