import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hyegwang.org"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "(부천)혜광교회 | Hyegwang Church",
  description: "다음세대가 춤추는 교회, 부천 혜광교회입니다. 하나님의 사랑으로 모든 분들을 환영합니다.",
  keywords: ["혜광교회", "부천교회", "교회", "Hyegwang Church", "부천시 원미구"],
  authors: [{ name: "혜광교회" }],
  openGraph: {
    title: "(부천)혜광교회 | Hyegwang Church",
    description: "형제를 내 몸같이 사랑하는 교회, 부천 혜광교회입니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "혜광교회",
    images: [{ url: "/intro.jpg", width: 1200, height: 630, alt: "혜광교회" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "(부천)혜광교회 | Hyegwang Church",
    description: "형제를 내 몸같이 사랑하는 교회, 부천 혜광교회입니다.",
    images: ["/intro.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon-church.png", sizes: "any" }],
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
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
