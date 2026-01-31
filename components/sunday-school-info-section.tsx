// 교회학교 부서별 안내 카드 (예배 시간, 장소, 대상, 교육 목표)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface SundaySchoolInfoItem {
  label: string
  value: string
}

interface SundaySchoolInfoSectionProps {
  items: SundaySchoolInfoItem[]
}

export function SundaySchoolInfoSection({ items }: SundaySchoolInfoSectionProps) {
  return (
    <section className="pt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <Card key={item.label} className="transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">{item.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
