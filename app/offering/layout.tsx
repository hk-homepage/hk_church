import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function OfferingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
