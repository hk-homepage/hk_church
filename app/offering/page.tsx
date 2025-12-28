import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, CreditCard, Heart } from "lucide-react"

export const metadata = {
  title: "온라인 헌금 | 혜광교회",
  description: "혜광교회 온라인 헌금 안내",
}

const offeringAccounts = [
  {
    type: "십일조",
    bank: "국민은행",
    account: "XXX-XXX-XXXXXX",
    holder: "혜광교회",
  },
  {
    type: "감사헌금",
    bank: "신한은행",
    account: "XXX-XXX-XXXXXX",
    holder: "혜광교회",
  },
  {
    type: "선교헌금",
    bank: "하나은행",
    account: "XXX-XXX-XXXXXX",
    holder: "혜광교회",
  },
  {
    type: "건축헌금",
    bank: "우리은행",
    account: "XXX-XXX-XXXXXX",
    holder: "혜광교회",
  },
]

export default function OfferingPage() {
  return (
    <>
      <PageHeader
        title="온라인 헌금"
        description="감사의 마음을 하나님께 드립니다"
        breadcrumb={[{ label: "온라인 헌금" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Introduction */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Heart className="h-8 w-8 text-primary shrink-0" />
                  <div>
                    <h2 className="mb-2 text-lg font-semibold text-foreground">
                      헌금은 하나님께 드리는 감사와 헌신의 표현입니다
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      혜광교회는 성도님들의 헌금을 하나님 나라 확장과 교회 사역을 위해 귀하게 사용하고 있습니다.
                      온라인으로 편리하게 헌금하실 수 있습니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Info */}
            <h3 className="mb-4 text-xl font-semibold text-foreground">헌금 계좌 안내</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {offeringAccounts.map((account) => (
                <Card key={account.type}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <CreditCard className="h-5 w-5 text-primary" />
                      {account.type}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{account.bank}</span>
                      </div>
                      <p className="font-mono text-lg font-semibold text-primary">{account.account}</p>
                      <p className="text-muted-foreground">예금주: {account.holder}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Notice */}
            <Card className="mt-8 border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h4 className="mb-2 font-semibold text-foreground">헌금 시 유의사항</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 입금자명에 이름과 헌금 종류를 기재해 주세요. (예: 홍길동십일조)</li>
                  <li>• 헌금증명서가 필요하신 분은 교회 사무실로 연락해 주세요.</li>
                  <li>• 문의: 032-327-5547</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
