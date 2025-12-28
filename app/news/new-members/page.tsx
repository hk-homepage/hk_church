import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "새가족 소개 | 혜광교회",
  description: "혜광교회 새가족 소개",
}

const newMembers = [
  {
    id: 1,
    name: "김OO",
    date: "2025.01.05",
    image: "/person-silhouette.png",
  },
  {
    id: 2,
    name: "이OO",
    date: "2024.12.29",
    image: "/person-silhouette.png",
  },
  {
    id: 3,
    name: "박OO",
    date: "2024.12.22",
    image: "/person-silhouette.png",
  },
  {
    id: 4,
    name: "최OO 가족",
    date: "2024.12.15",
    image: "/family-portrait-silhouette.jpg",
  },
]

export default function NewMembersPage() {
  return (
    <>
      <PageHeader
        title="새가족 소개"
        description="혜광교회에 새로 오신 분들을 소개합니다"
        breadcrumb={[{ label: "교회소식", href: "/news" }, { label: "새가족 소개" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 rounded-lg bg-primary/10 p-6 text-center">
              <p className="text-lg text-foreground">
                새가족 여러분을 진심으로 환영합니다!
                <br />
                혜광교회 가족이 되신 것을 축하드립니다.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {newMembers.map((member) => (
                <Card key={member.id} className="text-center">
                  <CardContent className="pt-6">
                    <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.date} 등록</p>
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
