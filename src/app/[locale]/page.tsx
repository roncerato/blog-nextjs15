/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image"
import HeroImage from "../../../public/hero.webp"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home"
}

export default async function Home({
  params
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <main className="w-screen h-screen overflow-hidden flex justify-center items-center relative">
      <Image src={HeroImage} alt="Hero" fill className="absolute" />
      <div className="relative z-10 text-white px-10 py-5 text-center max-w-screen-sm bg-slate-900/90 rounded-md backdrop-blur-sm" >
        <p>
          The AI-powered SAAS solution to generate SEO-optimized blog posts in minutes. Get high-quality content, without sacrificing your time.
        </p>
        <a href={`/auth/login?ui_locales=${locale}`} className="btn my-4">
          Begin
        </a>
      </div>
    </main>
  )
}