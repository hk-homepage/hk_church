import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Users } from "lucide-react"

export const metadata = {
  title: "예배안내 | 혜광교회",
  description: "혜광교회 예배 시간 및 장소 안내",
}

const worshipServices = [
  {
    title: "주일 1부 예배",
    time: "오전 9:00",
    location: "본당",
    target: "전 성도",
  },
  {
    title: "주일 2부 예배",
    time: "오전 11:00",
    location: "본당",
    target: "전 성도",
  },
  {
    title: "수요 예배",
    time: "저녁 7:30",
    location: "본당",
    target: "전 성도",
  },
  {
    title: "금요 기도회",
    time: "저녁 8:00",
    location: "본당",
    target: "전 성도",
  },
  {
    title: "새벽 기도회",
    time: "오전 5:30",
    location: "본당",
    target: "전 성도",
  },
]

const sundaySchoolServices = [
  {
    title: "유치부 예배",
    time: "오전 11:00",
    location: "유치부실",
    target: "5-7세",
  },
  {
    title: "초등부 예배",
    time: "오전 11:00",
    location: "초등부실",
    target: "초등학생",
  },
  {
    title: "중고등부 예배",
    time: "오전 11:00",
    location: "중고등부실",
    target: "중고등학생",
  },
  {
    title: "대학청년부 예배",
    time: "오후 1:30",
    location: "청년부실",
    target: "대학생, 청년",
  },
]

export default function WorshipInfoPage() {
  return (
    <>
      <PageHeader
        title="예배안내"
        description="혜광교회 예배 시간 및 장소를 안내합니다"
        breadcrumb={[{ label: "교회소개", href: "/about" }, { label: "예배안내" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* 주요 예배 */}
            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground">주요 예배</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {worshipServices.map((service) => (
                  <Card key={service.title} className="transition-shadow hover:shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{service.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{service.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{service.target}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 교회학교 예배 */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground">교회학교 예배</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {sundaySchoolServices.map((service) => (
                  <Card key={service.title} className="transition-shadow hover:shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{service.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{service.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{service.target}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
