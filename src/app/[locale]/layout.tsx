import { AppLayout } from "../../components/AppLayout";
import "@/app/globals.scss";
import { Raleway, Roboto, } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core";
import { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
config.autoAddCss = false;

const raleway = Raleway({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ['latin', 'cyrillic'],
  variable: "--font-poppins",
})
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ['latin', "cyrillic"],
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: {
    default: 'BlogStandart',
    template: '%s | BlogStandart',
  }
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  return (
    <html lang={locale}>
      <body className={`${roboto.variable} ${raleway.variable} font-body`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppLayout>
            {children}
          </AppLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
