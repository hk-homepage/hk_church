import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "2025년 암송구절 | 혜광교회",
  description: "혜광교회 2025년 암송구절",
}

const memoryVerses = [
  { month: "1월", verse: "여호와를 경외하는 것이 지혜의 근본이요", reference: "잠언 9:10" },
  { month: "2월", verse: "내가 진실로 진실로 너희에게 이르노니", reference: "요한복음 14:12" },
  { month: "3월", verse: "너희는 먼저 그의 나라와 그의 의를 구하라", reference: "마태복음 6:33" },
  { month: "4월", verse: "우리가 알거니와 하나님을 사랑하는 자", reference: "로마서 8:28" },
  { month: "5월", verse: "여호와는 나의 목자시니 내게 부족함이 없으리로다", reference: "시편 23:1" },
  { month: "6월", verse: "오직 여호와를 앙망하는 자는 새 힘을 얻으리니", reference: "이사야 40:31" },
  { month: "7월", verse: "항상 기뻐하라 쉬지 말고 기도하라", reference: "데살로니가전서 5:16-17" },
  { month: "8월", verse: "예수께서 이르시되 나는 부활이요 생명이니", reference: "요한복음 11:25" },
  { month: "9월", verse: "내가 주께 범죄하지 아니하려 하여", reference: "시편 119:11" },
  { month: "10월", verse: "범사에 감사하라 이것이 그리스도 예수 안에서", reference: "데살로니가전서 5:18" },
  { month: "11월", verse: "하나님이 세상을 이처럼 사랑하사", reference: "요한복음 3:16" },
  { month: "12월", verse: "내가 산을 향하여 눈을 들리라", reference: "시편 121:1-2" },
]

export default function MemoryVersePage() {
  return (
    <>
      <PageHeader
        title="2025년 암송구절"
        description="매월 함께 암송하는 말씀입니다"
        breadcrumb={[{ label: "양육/모임", href: "/nurturing" }, { label: "2025년 암송구절" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {memoryVerses.map((item) => (
                <Card key={item.month} className="transition-shadow hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-primary">{item.month}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2 text-foreground leading-relaxed">&quot;{item.verse}&quot;</p>
                    <p className="text-sm font-medium text-muted-foreground">{item.reference}</p>
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
