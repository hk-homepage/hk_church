import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, User, MessageSquare } from "lucide-react"

export const metadata = {
  title: "은혜 나눔 | 혜광교회",
  description: "혜광교회 성도들의 은혜 나눔",
}

const testimonies = [
  {
    id: 1,
    title: "신년 새벽기도회를 통해 받은 은혜",
    author: "김OO",
    date: "2025.01.05",
    preview: "새해 첫 새벽기도회에서 하나님의 임재를 경험했습니다...",
    comments: 5,
  },
  {
    id: 2,
    title: "성탄절 예배의 감동",
    author: "이OO",
    date: "2024.12.25",
    preview: "성탄절 예배에서 예수님의 탄생의 의미를 다시 깨달았습니다...",
    comments: 8,
  },
  {
    id: 3,
    title: "말씀 묵상을 통한 변화",
    author: "박OO",
    date: "2024.12.20",
    preview: "매일 말씀을 묵상하면서 제 삶이 변화되고 있습니다...",
    comments: 12,
  },
]

export default function TestimoniesPage() {
  return (
    <>
      <PageHeader
        title="은혜 나눔"
        description="성도들이 나누는 하나님의 은혜 이야기"
        breadcrumb={[{ label: "성도의교제", href: "/fellowship" }, { label: "은혜 나눔" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
              {testimonies.map((item) => (
                <Card key={item.id} className="transition-shadow hover:shadow-md">
                  <Link href={`/fellowship/testimonies/${item.id}`}>
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
