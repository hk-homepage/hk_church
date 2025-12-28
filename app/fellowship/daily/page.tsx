import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, User, MessageSquare, ImageIcon } from "lucide-react"

export const metadata = {
  title: "일상 나눔 | 혜광교회",
  description: "혜광교회 성도들의 일상 나눔",
}

const dailyPosts = [
  {
    id: 1,
    title: "교회 친교시간 풍경",
    author: "박OO",
    date: "2025.01.05",
    preview: "오늘 예배 후 친교시간에 맛있는 음식을 나누었습니다...",
    comments: 3,
    hasImage: true,
  },
  {
    id: 2,
    title: "소그룹 모임 후기",
    author: "최OO",
    date: "2025.01.03",
    preview: "이번 주 소그룹 모임에서 좋은 시간을 보냈습니다...",
    comments: 6,
    hasImage: true,
  },
  {
    id: 3,
    title: "성도님들과 함께한 등산",
    author: "김OO",
    date: "2024.12.30",
    preview: "연말 성도님들과 함께 북한산 등산을 다녀왔습니다...",
    comments: 11,
    hasImage: true,
  },
]

export default function DailyPage() {
  return (
    <>
      <PageHeader
        title="일상 나눔"
        description="성도들의 일상 이야기를 나눕니다"
        breadcrumb={[{ label: "성도의교제", href: "/fellowship" }, { label: "일상 나눔" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
              {dailyPosts.map((item) => (
                <Card key={item.id} className="transition-shadow hover:shadow-md">
                  <Link href={`/fellowship/daily/${item.id}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-lg hover:text-primary">
                        {item.title}
                        {item.hasImage && <ImageIcon className="h-4 w-4 text-muted-foreground" />}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-muted-foreground line-clamp-2">{item.preview}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {item.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {item.comments}
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
