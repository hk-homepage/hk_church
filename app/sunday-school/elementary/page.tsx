import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Users, Target } from "lucide-react"

export const metadata = {
  title: "초등부 | 혜광교회",
  description: "혜광교회 초등부 소개",
}

export default function ElementaryPage() {
  return (
    <>
      <PageHeader
        title="초등부"
        description="말씀 위에 세워지는 어린이들"
        breadcrumb={[{ label: "교회학교", href: "/sunday-school" }, { label: "초등부" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 grid gap-8 md:grid-cols-2">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image src="/elementary-school-children-sunday-school-korean.jpg" alt="초등부" fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="mb-4 text-2xl font-bold text-foreground">초등부 소개</h2>
                <p className="text-muted-foreground leading-relaxed">
                  초등부는 초등학생들이 성경 말씀을 깊이 배우고 예배하는 공동체입니다. 체계적인 성경 공부, 찬양,
                  레크리에이션 활동을 통해 신앙이 성장하고 또래 친구들과 함께 믿음의 공동체를 경험합니다.
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
                  <p className="text-muted-foreground">교육관 2층 초등부실</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Users className="h-8 w-8 text-primary" />
                  <CardTitle className="text-base">대상</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">초등학교 1-6학년</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Target className="h-8 w-8 text-primary" />
                  <CardTitle className="text-base">교육 목표</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">말씀 암송 및 적용</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
