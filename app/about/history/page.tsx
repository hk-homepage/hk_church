import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "교회연혁 | 혜광교회",
  description: "혜광교회의 역사를 소개합니다",
}

const historyItems = [
  { year: "1991", month: "3월", event: "혜광교회 설립" },
  { year: "1991", month: "3월", event: "대한예수교장로회(고신) 경기서부노회 소속" },
  { year: "1995", month: "", event: "교육관 건축" },
  { year: "2000", month: "", event: "본당 리모델링" },
  { year: "2005", month: "", event: "창립 15주년 기념 예배" },
  { year: "2010", month: "", event: "창립 20주년 기념 예배" },
  { year: "2015", month: "", event: "창립 25주년 기념 예배 및 선교대회" },
  { year: "2020", month: "", event: "온라인 예배 시스템 구축" },
  { year: "2021", month: "3월", event: "창립 30주년 기념 예배" },
  { year: "2025", month: "", event: "현재에 이르기까지 복음 전파에 힘쓰고 있습니다" },
]

export default function HistoryPage() {
  return (
    <>
      <PageHeader
        title="교회연혁"
        description="혜광교회의 발자취를 소개합니다"
        breadcrumb={[{ label: "교회소개", href: "/about" }, { label: "교회연혁" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />

              {historyItems.map((item, index) => (
                <div
                  key={index}
                  className={`relative mb-8 flex items-center gap-4 md:gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 h-3 w-3 rounded-full bg-primary md:left-1/2 md:-translate-x-1/2" />

                  {/* Content */}
                  <div
                    className={`ml-12 w-full rounded-lg bg-card p-6 shadow-sm md:ml-0 md:w-[calc(50%-2rem)] ${
                      index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                    }`}
                  >
                    <div className="mb-2 flex items-baseline gap-2">
                      <span className="text-xl font-bold text-primary">{item.year}</span>
                      {item.month && <span className="text-sm text-muted-foreground">{item.month}</span>}
                    </div>
                    <p className="text-foreground">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
