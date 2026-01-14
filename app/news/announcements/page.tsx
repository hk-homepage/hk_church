import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Eye, Plus } from "lucide-react"
import { getCurrentUser } from "@/app/actions/auth"
import { isAdmin } from "@/lib/utils/permissions"
import { getNotices } from "@/app/actions/announcements"

export const metadata = {
  title: "공지사항 | 혜광교회",
  description: "혜광교회 공지사항",
}

export const dynamic = 'force-dynamic'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

export default async function AnnouncementsPage() {
  const user = await getCurrentUser()
  const canCreate = isAdmin(user)
  
  // 실제 데이터 가져오기
  const result = await getNotices(1, 20)
  const announcements = result.notices || []

  return (
    <>
      <PageHeader
        title="공지사항"
        description="혜광교회의 소식을 전해드립니다"
        breadcrumb={[{ label: "교회소식", href: "/news" }, { label: "공지사항" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {canCreate && (
              <div className="mb-6 flex justify-end">
                <Button asChild>
                  <Link href="/news/announcements/new">
                    <Plus className="h-4 w-4" />
                    공지사항 작성
                  </Link>
                </Button>
              </div>
            )}
            {announcements.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">등록된 공지사항이 없습니다.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {announcements.map((item) => (
                  <Card key={item.id} className="transition-shadow hover:shadow-md">
                    <Link href={`/news/announcements/${item.id}`}>
                      <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-3">
                          {item.is_pinned && <Badge variant="destructive">중요</Badge>}
                          <h3 className="font-medium text-foreground hover:text-primary">{item.title}</h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(item.created_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {item.view_count || 0}
                          </span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
