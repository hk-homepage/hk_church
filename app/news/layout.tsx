import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubNavigation } from "@/components/sub-navigation"

const subNavItems = [
  { title: "공지사항", href: "/news/announcements" },
  { title: "주보", href: "/news/bulletin" },
  { title: "새가족 소개", href: "/news/new-members" },
  { title: "혜광 갤러리", href: "/news/gallery" },
]

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SubNavigation items={subNavItems} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
