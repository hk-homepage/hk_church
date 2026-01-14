import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Eye, Plus } from "lucide-react"
import { getCurrentUser } from "@/app/actions/auth"
import { isAdmin } from "@/lib/utils/permissions"

export const metadata = {
  title: "공지사항 | 혜광교회",
  description: "혜광교회 공지사항",
}

const announcements = [
  {
    id: 1,
    title: "2025년 신년 감사예배 안내",
    date: "2025.01.01",
    views: 156,
    isImportant: true,
  },
  {
    id: 2,
    title: "2025년 교회 행사 일정 안내",
    date: "2024.12.28",
    views: 234,
    isImportant: true,
  },
  {
    id: 3,
    title: "성탄절 특별 예배 안내",
    date: "2024.12.20",
    views: 189,
    isImportant: false,
  },
  {
    id: 4,
    title: "겨울 수련회 신청 안내",
    date: "2024.12.15",
    views: 312,
    isImportant: false,
  },
  {
    id: 5,
    title: "교회학교 교사 모집",
    date: "2024.12.10",
    views: 98,
    isImportant: false,
  },
]

export default async function AnnouncementsPage() {
  const user = await getCurrentUser()
  const canCreate = isAdmin(user)

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
            <div className="space-y-4">
              {announcements.map((item) => (
                <Card key={item.id} className="transition-shadow hover:shadow-md">
                  <Link href={`/news/announcements/${item.id}`}>
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-3">
                        {item.isImportant && <Badge variant="destructive">중요</Badge>}
                        <h3 className="font-medium text-foreground hover:text-primary">{item.title}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {item.views}
                        </span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
