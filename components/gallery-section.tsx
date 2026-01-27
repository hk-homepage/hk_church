// Homepage section showing recent gallery photos
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Calendar } from "lucide-react"
import { getGalleryAlbums } from "@/app/actions/gallery"

export async function GallerySection() {
  const result = await getGalleryAlbums({ limit: 4 })

  // 날짜 포맷팅 (타임존 안전)
  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return ''
    try {
      const dateStr = dateString.includes('T') 
        ? dateString.split('T')[0] 
        : dateString
      const [year, month, day] = dateStr.split('-')
      if (year && month && day) {
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
      return dateString
    } catch {
      return dateString
    }
  }

  const galleryItems = result.success ? result.albums.slice(0, 4) : []

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

        {galleryItems.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {galleryItems.map((item) => (
              <Link
                key={item.id}
                href={`/news/gallery/${item.id}`}
                className="group overflow-hidden rounded-2xl bg-card shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.cover_image_url || "/placeholder.svg"}
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
                    {formatDate(item.event_date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            등록된 갤러리가 없습니다.
          </div>
        )}
      </div>
    </section>
  )
}
