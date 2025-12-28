import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Folder, FileText } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "2024 이전 자료 | 혜광교회",
  description: "혜광교회 교회학교 2024 이전 자료",
}

const archives = [
  { year: "2024", title: "2024년 교회학교 자료", count: 52 },
  { year: "2023", title: "2023년 교회학교 자료", count: 48 },
  { year: "2022", title: "2022년 교회학교 자료", count: 45 },
  { year: "2021", title: "2021년 교회학교 자료", count: 40 },
]

export default function Archive2024Page() {
  return (
    <>
      <PageHeader
        title="2024 이전 자료"
        description="교회학교 지난 자료를 확인하세요"
        breadcrumb={[{ label: "교회학교", href: "/sunday-school" }, { label: "2024 이전" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-4">
              {archives.map((archive) => (
                <Card key={archive.year} className="transition-shadow hover:shadow-md">
                  <Link href={`/sunday-school/archive-2024/${archive.year}`}>
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <Folder className="h-10 w-10 text-primary" />
                      <div>
                        <CardTitle>{archive.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>{archive.count}개의 자료</span>
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
