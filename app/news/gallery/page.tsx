import Image from "next/image"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ImageIcon, Plus } from "lucide-react"
import { getGalleryAlbums } from "@/app/actions/gallery"
import { getCurrentUser } from "@/app/actions/auth"
import { isAdmin } from "@/lib/utils/permissions"

export const metadata = {
  title: "혜광 갤러리 | 혜광교회",
  description: "혜광교회 사진 갤러리",
}

export default async function GalleryPage() {
  const user = await getCurrentUser()
  const canCreate = isAdmin(user)
  const result = await getGalleryAlbums({ limit: 100 })

  // 날짜 포맷팅 (타임존 안전)
  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return ''
    try {
      const dateStr = dateString.includes('T') 
        ? dateString.split('T')[0] 
        : dateString
      const [year, month, day] = dateStr.split('-')
      if (year && month && day) {
        return `${year}.${month.padStart(2, '0')}.${day.padStart(2, '0')}`
      }
      return dateString
    } catch {
      return dateString
    }
  }

  return (
    <>
      <PageHeader
        title="혜광 갤러리"
        description="혜광교회의 아름다운 순간들을 담았습니다"
        breadcrumb={[{ label: "교회소식", href: "/news" }, { label: "혜광 갤러리" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          {canCreate && (
            <div className="mb-6 flex justify-end">
              <Button asChild>
                <Link href="/news/gallery/new">
                  <Plus className="mr-2 h-4 w-4" />
                  갤러리 등록
                </Link>
              </Button>
            </div>
          )}
          {result.success && result.albums.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {result.albums.map((album) => (
                <Card key={album.id} className="group overflow-hidden transition-shadow hover:shadow-lg">
                  <Link href={`/news/gallery/${album.id}`}>
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={album.cover_image_url || "/placeholder.svg"}
                        alt={album.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/10" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="mb-2 font-semibold text-foreground group-hover:text-primary">{album.title}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(album.event_date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <ImageIcon className="h-4 w-4" />
                          {album.image_count || 0}장
                        </span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">등록된 갤러리가 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
