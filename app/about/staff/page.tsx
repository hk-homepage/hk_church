import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "섬기는 분들 | 혜광교회",
  description: "혜광교회를 섬기는 분들을 소개합니다",
}

const pastors = [
  {
    name: "담임목사",
    role: "담임목사",
    image: "/korean-pastor-portrait.jpg",
    description: "설교, 목회 총괄",
  },
]

const elders = [
  { name: "장로1", role: "시무장로" },
  { name: "장로2", role: "시무장로" },
  { name: "장로3", role: "시무장로" },
]

const deacons = [
  { name: "권사1", role: "권사" },
  { name: "권사2", role: "권사" },
  { name: "권사3", role: "권사" },
]

export default function StaffPage() {
  return (
    <>
      <PageHeader
        title="섬기는 분들"
        description="혜광교회를 섬기시는 분들을 소개합니다"
        breadcrumb={[{ label: "교회소개", href: "/about" }, { label: "섬기는 분들" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* 목사 */}
            <div className="mb-16">
              <h2 className="mb-8 text-center text-2xl font-bold text-foreground">목사</h2>
              <div className="flex justify-center">
                {pastors.map((pastor) => (
                  <Card key={pastor.name} className="max-w-sm overflow-hidden">
                    <div className="relative aspect-square">
                      <Image src={pastor.image || "/placeholder.svg"} alt={pastor.name} fill className="object-cover" />
                    </div>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-bold text-foreground">{pastor.name}</h3>
                      <p className="text-primary font-medium">{pastor.role}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{pastor.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 장로 */}
            <div className="mb-16">
              <h2 className="mb-8 text-center text-2xl font-bold text-foreground">장로</h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {elders.map((elder) => (
                  <Card key={elder.name} className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-foreground">{elder.name}</h3>
                    <p className="text-sm text-muted-foreground">{elder.role}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* 권사 */}
            <div>
              <h2 className="mb-8 text-center text-2xl font-bold text-foreground">권사</h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {deacons.map((deacon) => (
                  <Card key={deacon.name} className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-foreground">{deacon.name}</h3>
                    <p className="text-sm text-muted-foreground">{deacon.role}</p>
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
