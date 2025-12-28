import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Users, Target } from "lucide-react"

export const metadata = {
  title: "중고등부 | 혜광교회",
  description: "혜광교회 중고등부 소개",
}

export default function YouthPage() {
  return (
    <>
      <PageHeader
        title="중고등부"
        description="세상을 변화시키는 청소년 리더들"
        breadcrumb={[{ label: "교회학교", href: "/sunday-school" }, { label: "중고등부" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 grid gap-8 md:grid-cols-2">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image src="/korean-youth-group-church-teenagers.jpg" alt="중고등부" fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="mb-4 text-2xl font-bold text-foreground">중고등부 소개</h2>
                <p className="text-muted-foreground leading-relaxed">
                  중고등부는 청소년들이 세상 속에서 믿음으로 살아가는 법을 배우는 공동체입니다. 심도 있는 말씀 공부,
                  토론, 찬양, 봉사활동을 통해 그리스도인으로서의 정체성을 확립하고 세상을 변화시키는 리더로 성장합니다.
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
                  <p className="text-muted-foreground">주일 오전 11:00</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <MapPin className="h-8 w-8 text-primary" />
                  <CardTitle className="text-base">예배 장소</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">교육관 3층 중고등부실</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Users className="h-8 w-8 text-primary" />
                  <CardTitle className="text-base">대상</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">중학생, 고등학생</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Target className="h-8 w-8 text-primary" />
                  <CardTitle className="text-base">교육 목표</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">신앙 정체성 확립</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
