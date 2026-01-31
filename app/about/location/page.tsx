import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Mail, Car, Train } from "lucide-react"
import { KakaoMap } from "@/components/kakao-map"

export const metadata = {
  title: "오시는 길 | 혜광교회",
  description: "혜광교회 오시는 길 안내",
}

export default function LocationPage() {
  return (
    <>
      <PageHeader
        title="오시는 길"
        description="혜광교회를 찾아오시는 방법을 안내합니다"
        breadcrumb={[{ label: "교회소개", href: "/about" }, { label: "오시는 길" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Map */}
            <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg bg-muted">
              <KakaoMap className="w-full h-full" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>연락처</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">주소</p>
                      <p className="text-muted-foreground">경기도 부천시 원미구 상이로51번길 30</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">이메일</p>
                      <p className="text-muted-foreground">ihkchurch@naver.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transportation */}
              <Card>
                <CardHeader>
                  <CardTitle>교통편</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Train className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">지하철</p>
                      <p className="text-muted-foreground">1호선 부개역 2번 출구에서 도보 10분</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Car className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">자가용</p>
                      <p className="text-muted-foreground">교회 전용 주차장 이용 가능</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
