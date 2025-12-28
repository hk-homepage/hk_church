import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Calendar } from "lucide-react"

export const metadata = {
  title: "성경통신문제 | 혜광교회",
  description: "혜광교회 성경통신문제",
}

const bibleStudies = [
  { week: "2025년 1주차", title: "창세기 1-3장", date: "2025.01.05" },
  { week: "2025년 2주차", title: "창세기 4-6장", date: "2025.01.12" },
  { week: "2025년 3주차", title: "창세기 7-9장", date: "2025.01.19" },
  { week: "2025년 4주차", title: "창세기 10-12장", date: "2025.01.26" },
]

export default function BibleStudyPage() {
  return (
    <>
      <PageHeader
        title="성경통신문제"
        description="매주 성경을 깊이 묵상하며 풀어보는 문제입니다"
        breadcrumb={[{ label: "양육/모임", href: "/nurturing" }, { label: "성경통신문제" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              {bibleStudies.map((study) => (
                <Card key={study.week} className="transition-shadow hover:shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle className="text-base">{study.week}</CardTitle>
                        <p className="text-sm text-muted-foreground">{study.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {study.date}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      문제지 다운로드
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
