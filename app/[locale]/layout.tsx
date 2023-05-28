import { NextIntlClientProvider } from "next-intl";
import "../globals.css";
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
}: any) {
  const messages = await import(`../../messages/${locale}.json`);

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
