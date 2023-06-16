import WalletProvider from "@/context/wallet_context";
import "../globals.css";

// Theme Context
import ThemeHandler from "@/context/theme_context";

// Multi Languages
import { NextIntlClientProvider } from "next-intl";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import "react-toastify/dist/ReactToastify.min.css";

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
          content="With a ZK Keyless Wallet, the transaction details are encrypted and the zero-knowledge proof ensures that the transaction is valid"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeHandler>
            <WalletProvider>{children}</WalletProvider>
          </ThemeHandler>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
