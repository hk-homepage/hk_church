// Homepage section showing recent gallery photos
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Calendar } from "lucide-react"

const galleryItems = [
  {
    id: 1,
    title: "4분기 성경암송대회",
    date: "2025-12-27",
    image: "/church-bible-recitation-competition-event-korean.jpg",
  },
  {
    id: 2,
    title: "성탄축하예배",
    date: "2025-12-27",
    image: "/christmas-celebration-worship-service-church-decor.jpg",
  },
  {
    id: 3,
    title: "하반기 성경통독반 종강",
    date: "2025-12-14",
    image: "/bible-study-group-graduation-ceremony-church.jpg",
  },
  {
    id: 4,
    title: "새가족 수료식",
    date: "2025-12-14",
    image: "/new-members-graduation-ceremony-church-korean.jpg",
  },
]

export function GallerySection() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Photo Gallery</p>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">혜광 갤러리</h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/news/gallery">
              전체보기
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {galleryItems.map((item) => (
            <Link
              key={item.id}
              href={`/news/gallery/${item.id}`}
              className="group overflow-hidden rounded-2xl bg-card shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="p-4">
                <h3 className="mb-2 font-semibold text-foreground group-hover:text-primary">{item.title}</h3>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {item.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
