import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Car, Train } from "lucide-react"

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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.5!2d126.78!3d37.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDMwJzAwLjAiTiAxMjbCsDQ2JzQ4LjAiRQ!5e0!3m2!1sko!2skr!4v1600000000000!5m2!1sko!2skr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="혜광교회 위치"
              />
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
                    <Phone className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">전화</p>
                      <p className="text-muted-foreground">032-327-5547</p>
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
                      <p className="text-muted-foreground">7호선 춘의역 3번 출구에서 도보 10분</p>
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
