import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "시설소개 | 혜광교회",
  description: "혜광교회 시설을 소개합니다",
}

const facilities = [
  {
    name: "본당",
    description: "300석 규모의 예배 공간으로, 전 성도가 함께 예배드리는 장소입니다.",
    image: "/church-sanctuary-interior-korean.jpg",
  },
  {
    name: "교육관",
    description: "유치부, 초등부, 중고등부 등 교회학교 교육이 이루어지는 공간입니다.",
    image: "/church-education-building-classroom.jpg",
  },
  {
    name: "친교실",
    description: "예배 후 성도들이 함께 교제하며 식사하는 공간입니다.",
    image: "/church-fellowship-hall-dining.jpg",
  },
  {
    name: "기도실",
    description: "조용히 기도하며 하나님과 교제할 수 있는 공간입니다.",
    image: "/church-prayer-room-peaceful.jpg",
  },
]

export default function FacilitiesPage() {
  return (
    <>
      <PageHeader
        title="시설소개"
        description="혜광교회의 시설을 소개합니다"
        breadcrumb={[{ label: "교회소개", href: "/about" }, { label: "시설소개" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-2">
              {facilities.map((facility) => (
                <Card key={facility.name} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={facility.image || "/placeholder.svg"}
                      alt={facility.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{facility.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{facility.description}</p>
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
