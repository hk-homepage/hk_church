import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubNavigation } from "@/components/sub-navigation"

const subNavItems = [
  { title: "교회교육", href: "/nurturing/education" },
  { title: "2025년 암송구절", href: "/nurturing/memory-verse-2025" },
  { title: "성경통신문제", href: "/nurturing/bible-study" },
  { title: "오늘의 묵상", href: "https://www.qtland.com/quiet/quiet.php?cate=A" },
]

export default function NurturingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SubNavigation items={subNavItems} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
