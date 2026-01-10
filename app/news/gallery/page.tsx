import Image from "next/image"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ImageIcon } from "lucide-react"

export const metadata = {
  title: "혜광 갤러리 | 혜광교회",
  description: "혜광교회 사진 갤러리",
}

const galleries = [
  {
    id: 1,
    title: "2025 신년감사예배",
    date: "2025.01.05",
    thumbnail: "/christmas-celebration-worship-service-church-decor.jpg",
    count: 25,
  },
  {
    id: 2,
    title: "2024 성탄절 예배",
    date: "2024.12.25",
    thumbnail: "/church-congregation-worshipping-together-with-rais.jpg",
    count: 32,
  },
  {
    id: 3,
    title: "2024 추수감사절 예배",
    date: "2024.11.24",
    thumbnail: "/church-community-gathering-fellowship-event-outdoo.jpg",
    count: 28,
  },
  {
    id: 4,
    title: "2024 교회학교 발표회",
    date: "2024.11.10",
    thumbnail: "/bible-study-group-graduation-ceremony-church.jpg",
    count: 45,
  },
  {
    id: 5,
    title: "2024 성경암송대회",
    date: "2024.10.27",
    thumbnail: "/church-bible-recitation-competition-event-korean.jpg",
    count: 18,
  },
  {
    id: 6,
    title: "2024 새가족 수료식",
    date: "2024.10.13",
    thumbnail: "/new-members-graduation-ceremony-church-korean.jpg",
    count: 22,
  },
]

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="혜광 갤러리"
        description="혜광교회의 아름다운 순간들을 담았습니다"
        breadcrumb={[{ label: "교회소식", href: "/news" }, { label: "혜광 갤러리" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleries.map((gallery) => (
              <Card key={gallery.id} className="group overflow-hidden transition-shadow hover:shadow-lg">
                <Link href={`/news/gallery/${gallery.id}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={gallery.thumbnail || "/placeholder.svg"}
                      alt={gallery.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/10" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="mb-2 font-semibold text-foreground group-hover:text-primary">{gallery.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {gallery.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <ImageIcon className="h-4 w-4" />
                        {gallery.count}장
                      </span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
