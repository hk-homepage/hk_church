import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubNavigation } from "@/components/sub-navigation"

const subNavItems = [
  { title: "인사말", href: "/about/greeting" },
  { title: "예배안내", href: "/about/worship-info" },
  { title: "섬기는 분들", href: "/about/staff" },
  { title: "시설소개", href: "/about/facilities" },
  { title: "교회연혁", href: "/about/history" },
  { title: "오시는 길", href: "/about/location" },
]

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SubNavigation items={subNavItems} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
