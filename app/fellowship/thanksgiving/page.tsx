import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, User, MessageSquare } from "lucide-react"

export const metadata = {
  title: "감사 나눔 | 혜광교회",
  description: "혜광교회 성도들의 감사 나눔",
}

const thanksgivings = [
  {
    id: 1,
    title: "건강을 회복하게 해주신 하나님께 감사",
    author: "정OO",
    date: "2025.01.03",
    preview: "오랜 병환 끝에 건강을 회복하게 되어 감사드립니다...",
    comments: 7,
  },
  {
    id: 2,
    title: "취업의 축복에 감사드립니다",
    author: "김OO",
    date: "2024.12.28",
    preview: "1년간의 취업준비 끝에 좋은 직장에 합격했습니다...",
    comments: 15,
  },
  {
    id: 3,
    title: "가정의 평안에 감사",
    author: "이OO",
    date: "2024.12.22",
    preview: "올 한해 가정에 평안을 주신 하나님께 감사드립니다...",
    comments: 9,
  },
]

export default function ThanksgivingPage() {
  return (
    <>
      <PageHeader
        title="감사 나눔"
        description="하나님께 감사드리는 이야기를 나눕니다"
        breadcrumb={[{ label: "성도의교제", href: "/fellowship" }, { label: "감사 나눔" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
              {thanksgivings.map((item) => (
                <Card key={item.id} className="transition-shadow hover:shadow-md">
                  <Link href={`/fellowship/thanksgiving/${item.id}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg hover:text-primary">{item.title}</CardTitle>
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
