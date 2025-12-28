import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Users, Target } from "lucide-react"

export const metadata = {
  title: "유치부 | 혜광교회",
  description: "혜광교회 유치부 소개",
}

export default function KindergartenPage() {
  return (
    <>
      <PageHeader
        title="유치부"
        description="하나님의 사랑 안에서 자라나는 어린이들"
        breadcrumb={[{ label: "교회학교", href: "/sunday-school" }, { label: "유치부" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 grid gap-8 md:grid-cols-2">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image src="/children-sunday-school-korean-church.jpg" alt="유치부" fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="mb-4 text-2xl font-bold text-foreground">유치부 소개</h2>
                <p className="text-muted-foreground leading-relaxed">
                  유치부는 5-7세 어린이들이 하나님의 말씀을 배우고 예배하는 공동체입니다. 찬양과 율동, 성경 이야기,
                  만들기 활동 등을 통해 하나님의 사랑을 경험하고 신앙의 기초를 세워갑니다.
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
                  <p className="text-muted-foreground">교육관 1층 유치부실</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Users className="h-8 w-8 text-primary" />
                  <CardTitle className="text-base">대상</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">5-7세 어린이</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Target className="h-8 w-8 text-primary" />
                  <CardTitle className="text-base">교육 목표</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">하나님 사랑 배우기</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
