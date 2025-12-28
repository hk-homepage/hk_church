import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubNavigation } from "@/components/sub-navigation"

const subNavItems = [
  { title: "은혜 나눔", href: "/fellowship/testimonies" },
  { title: "감사 나눔", href: "/fellowship/thanksgiving" },
  { title: "일상 나눔", href: "/fellowship/daily" },
]

export default function FellowshipLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SubNavigation items={subNavItems} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
