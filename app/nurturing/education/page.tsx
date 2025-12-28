import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Calendar, Award } from "lucide-react"

export const metadata = {
  title: "교회교육 | 혜광교회",
  description: "혜광교회 교회교육 프로그램 안내",
}

const programs = [
  {
    icon: BookOpen,
    title: "새가족 교육",
    description: "새가족을 위한 4주 과정의 기초 신앙 교육",
    schedule: "매월 첫째 주일 시작",
  },
  {
    icon: Users,
    title: "제자훈련",
    description: "성숙한 그리스도인으로 성장하기 위한 제자훈련 과정",
    schedule: "연 2회 (상반기/하반기)",
  },
  {
    icon: Calendar,
    title: "성경통독",
    description: "1년에 성경 전체를 읽는 성경통독 프로그램",
    schedule: "매년 1월 시작",
  },
  {
    icon: Award,
    title: "교사교육",
    description: "교회학교 교사를 위한 교육 프로그램",
    schedule: "분기별 진행",
  },
]

export default function EducationPage() {
  return (
    <>
      <PageHeader
        title="교회교육"
        description="혜광교회의 다양한 교육 프로그램을 소개합니다"
        breadcrumb={[{ label: "양육/모임", href: "/nurturing" }, { label: "교회교육" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-2">
              {programs.map((program) => (
                <Card key={program.title} className="transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <program.icon className="mb-2 h-10 w-10 text-primary" />
                    <CardTitle>{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-muted-foreground">{program.description}</p>
                    <p className="text-sm text-primary font-medium">{program.schedule}</p>
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
