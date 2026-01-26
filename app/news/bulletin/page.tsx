import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { BulletinGrid } from "@/components/bulletin-grid"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { getBulletins } from "@/app/actions/bulletins"
import { getCurrentUser } from "@/app/actions/auth"
import { isAdmin } from "@/lib/utils/permissions"

export const metadata = {
  title: "주보 | 혜광교회",
  description: "매주 발행되는 교회 주보입니다",
}

export default async function BulletinPage() {
  const user = await getCurrentUser()
  const canCreate = isAdmin(user)
  const result = await getBulletins(100)
  
  // 데이터베이스에서 가져온 주보를 컴포넌트 형식에 맞게 변환
  const bulletins = result.bulletins.map((bulletin) => {
    // bulletin_date를 "YYYY년 MM월 DD일" 형식으로 변환
    const date = new Date(bulletin.bulletin_date)
    const formattedDate = `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일`
    
    return {
      id: parseInt(bulletin.id.slice(0, 8), 16) || 0, // UUID를 숫자로 변환 (간단한 방법)
      date: formattedDate,
      title: bulletin.title,
      image: bulletin.cover_image_url || bulletin.pdf_url || "/placeholder.svg",
      pdfUrl: bulletin.pdf_url || undefined,
      imageUrl: bulletin.cover_image_url || undefined,
    }
  })

  return (
    <>
      <PageHeader
        title="주보"
        description="매주 발행되는 교회 주보입니다"
        breadcrumb={[{ label: "교회소식", href: "/news" }, { label: "주보" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {canCreate && (
              <div className="mb-6 flex justify-end">
                <Button asChild>
                  <Link href="/news/bulletin/new">
                    <Plus className="mr-2 h-4 w-4" />
                    주보 작성
                  </Link>
                </Button>
              </div>
            )}
            {result.success && bulletins.length > 0 ? (
              <BulletinGrid bulletins={bulletins} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">등록된 주보가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
