import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Calendar } from "lucide-react"

export const metadata = {
  title: "주보 | 혜광교회",
  description: "혜광교회 주보",
}

const bulletins = [
  {
    id: 1,
    date: "2025년 1월 5일",
    title: "신년 감사예배",
    image: "/church-bulletin-korean.jpg",
  },
  {
    id: 2,
    date: "2024년 12월 29일",
    title: "송년감사예배",
    image: "/church-bulletin-christmas.jpg",
  },
  {
    id: 3,
    date: "2024년 12월 22일",
    title: "성탄절 예배",
    image: "/church-bulletin-christmas-service.jpg",
  },
  {
    id: 4,
    date: "2024년 12월 15일",
    title: "대림절 3주",
    image: "/church-bulletin-advent.jpg",
  },
]

export default function BulletinPage() {
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {bulletins.map((bulletin) => (
                <Card key={bulletin.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={bulletin.image || "/placeholder.svg"}
                      alt={bulletin.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {bulletin.date}
                    </div>
                    <CardTitle className="text-base">{bulletin.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      다운로드
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
