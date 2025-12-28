import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { QuickLinks } from "@/components/quick-links"
import { LiveWorshipSection } from "@/components/live-worship-section"
import { BulletinSection } from "@/components/bulletin-section"
import { GallerySection } from "@/components/gallery-section"
import { LocationSection } from "@/components/location-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <QuickLinks />
        <LiveWorshipSection />
        <BulletinSection />
        <GallerySection />
        <LocationSection />
      </main>
      <Footer />
    </div>
  )
}
