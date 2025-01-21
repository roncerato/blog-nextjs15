import { AppLayout } from "../components/AppLayout";
import "./globals.scss";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: "--font-dm-sans",
});
const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: "--font-dm-serif",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${dmSerifDisplay.variable} font-body`}>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
