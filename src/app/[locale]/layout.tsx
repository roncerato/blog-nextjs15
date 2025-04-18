import { AppLayout } from "../../components/AppLayout";
import "@/app/globals.scss";
import { Raleway, Roboto, } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core";
import { Metadata } from "next";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${raleway.variable} font-body`}>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
