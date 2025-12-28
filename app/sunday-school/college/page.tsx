import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Users, Target } from "lucide-react"

export const metadata = {
  title: "대학청년부 | 혜광교회",
  description: "혜광교회 대학청년부 소개",
}

export default function CollegePage() {
  return (
    <>
      <PageHeader
        title="대학청년부"
        description="믿음으로 세상에 나아가는 청년들"
        breadcrumb={[{ label: "교회학교", href: "/sunday-school" }, { label: "대학청년부" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 grid gap-8 md:grid-cols-2">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image src="/korean-young-adults-church-group.jpg" alt="대학청년부" fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="mb-4 text-2xl font-bold text-foreground">대학청년부 소개</h2>
                <p className="text-muted-foreground leading-relaxed">
                  대학청년부는 대학생과 청년들이 함께 예배하고 성장하는 공동체입니다. 말씀 묵상, 소그룹 나눔, 봉사 활동,
                  친교 모임을 통해 믿음 안에서 삶의 방향을 찾고 서로를 격려하며 성장합니다.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <Clock className="h-8 w-8 text-primary" />
                  <CardTitle className="text-base">예배 시간</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">주일 오후 1:30</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <MapPin className="h-8 w-8 text-primary" />
                  <CardTitle className="text-base">예배 장소</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">청년부실</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Users className="h-8 w-8 text-primary" />
                  <CardTitle className="text-base">대상</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">대학생, 청년</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Target className="h-8 w-8 text-primary" />
                  <CardTitle className="text-base">교육 목표</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">세상 속 신앙 실천</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
