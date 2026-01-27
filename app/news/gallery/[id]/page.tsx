import Image from "next/image"
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ImageIcon, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getGalleryAlbum, deleteGalleryAlbum } from "@/app/actions/gallery"
import { DeletePostButton } from "@/components/delete-post-button"
import { getCurrentUser } from "@/app/actions/auth"
import { isAdmin } from "@/lib/utils/permissions"

interface GalleryDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: GalleryDetailPageProps) {
  const { id } = await params
  const result = await getGalleryAlbum(id)

  if (!result.success || !result.album) {
    return {
      title: "갤러리 | 혜광교회",
    }
  }

  return {
    title: `${result.album.title} | 혜광 갤러리`,
    description: result.album.description || "혜광교회 사진 갤러리",
  }
}

export default async function GalleryDetailPage({ params }: GalleryDetailPageProps) {
  const { id } = await params
  const result = await getGalleryAlbum(id)

  if (!result.success || !result.album) {
    notFound()
  }

  const album = result.album
  const user = await getCurrentUser()
  const canDelete = isAdmin(user)

  // 날짜 포맷팅
  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return ''
    try {
      const dateStr = dateString.includes('T') 
        ? dateString.split('T')[0] 
        : dateString
      const [year, month, day] = dateStr.split('-')
      if (year && month && day) {
        return `${year}년 ${month.padStart(2, '0')}월 ${day.padStart(2, '0')}일`
      }
      return dateString
    } catch {
      return dateString
    }
  }

  return (
    <>
      <PageHeader
        title={"혜광 갤러리"}
        description={"혜광교회의 아름다운 순간들을 담았습니다"}
        breadcrumb={[
          { label: "교회소식", href: "/news" },
          { label: "혜광 갤러리", href: "/news/gallery" },
          { label: album.title },
        ]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            {/* 뒤로가기 버튼 */}
            <div className="mb-6">
              <Button variant="ghost" asChild>
                <Link href="/news/gallery">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  목록으로
                </Link>
              </Button>
            </div>

            {/* 앨범 정보 */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">{album.title}</h1>
                    {album.description && (
                      <p className="text-muted-foreground mb-4">{album.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {album.event_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(album.event_date)}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <ImageIcon className="h-4 w-4" />
                        총 {album.image_count || 0}장
                      </span>
                    </div>
                  </div>
                  {canDelete && (
                    <DeletePostButton
                      id={id}
                      onDelete={deleteGalleryAlbum}
                      redirectPath="/news/gallery"
                      title={album.title}
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 이미지 그리드 */}
            {album.images && album.images.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {album.images.map((image, index) => (
                  <div
                    key={image.id}
                    className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
                  >
                    <Image
                      src={image.image_url}
                      alt={image.caption || `${album.title} - ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {image.caption && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                        <p className="text-sm text-white">{image.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">이 앨범에는 이미지가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
