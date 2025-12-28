import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubNavigation } from "@/components/sub-navigation"

const subNavItems = [
  { title: "유치부", href: "/sunday-school/kindergarten" },
  { title: "초등부", href: "/sunday-school/elementary" },
  { title: "중고등부", href: "/sunday-school/youth" },
  { title: "대학청년부", href: "/sunday-school/college" },
  { title: "2024 이전", href: "/sunday-school/archive-2024" },
]

export default function SundaySchoolLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SubNavigation items={subNavItems} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
