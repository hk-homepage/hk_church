import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "오늘의 묵상 | 혜광교회",
  description: "혜광교회 오늘의 묵상",
}

export default function DevotionPage() {
  const today = new Date()
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`

  return (
    <>
      <PageHeader
        title="오늘의 묵상"
        description="매일 말씀으로 하루를 시작합니다"
        breadcrumb={[{ label: "양육/모임", href: "/nurturing" }, { label: "오늘의 묵상" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Card>
              <CardHeader>
                <p className="text-sm text-muted-foreground">{formattedDate}</p>
                <CardTitle className="text-2xl">여호와를 경외하는 것이 지혜의 근본</CardTitle>
                <p className="text-primary font-medium">잠언 9:10</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <p className="italic text-foreground leading-relaxed">
                    &quot;여호와를 경외하는 것이 지혜의 근본이요 거룩하신 자를 아는 것이 명철이니라&quot;
                  </p>
                </div>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    오늘 말씀은 지혜의 근본이 무엇인지를 알려줍니다. 세상은 지식과 경험이 지혜의 근본이라고 말하지만,
                    성경은 여호와를 경외하는 것이 지혜의 근본이라고 분명히 선언합니다.
                  </p>
                  <p>
                    여호와를 경외한다는 것은 하나님을 두려워하며 공경하고, 그분의 말씀에 순종하는 삶을 사는 것입니다.
                    이러한 삶을 살 때 우리는 참된 지혜를 얻게 됩니다.
                  </p>
                  <p>
                    오늘 하루도 하나님을 경외하는 마음으로 시작합시다. 그분의 말씀에 귀 기울이고, 그분의 뜻대로 살아갈
                    때 우리의 삶에 참된 지혜가 임하게 될 것입니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <h4 className="mb-2 font-semibold text-foreground">오늘의 기도</h4>
                  <p className="text-sm text-muted-foreground">
                    하나님 아버지, 오늘도 주님을 경외하는 마음으로 하루를 시작하게 하소서. 참된 지혜를 주시고, 말씀대로
                    살아가게 인도하여 주옵소서. 예수님의 이름으로 기도합니다. 아멘.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
