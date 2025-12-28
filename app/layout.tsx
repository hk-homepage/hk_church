import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "(부천)혜광교회 | Hyegwang Church",
  description: "다음세대가 춤추는 교회, 부천 혜광교회입니다. 하나님의 사랑으로 모든 분들을 환영합니다.",
  keywords: ["혜광교회", "부천교회", "교회", "Hyegwang Church", "부천시 원미구"],
  authors: [{ name: "혜광교회" }],
  openGraph: {
    title: "(부천)혜광교회 | Hyegwang Church",
    description: "다음세대가 춤추는 교회, 부천 혜광교회입니다.",
    type: "website",
    locale: "ko_KR",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
