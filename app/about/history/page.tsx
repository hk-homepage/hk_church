// Church history page - timeline from 1991 to present
import { PageHeader } from "@/components/page-header"
import { HistoryTimeline } from "@/components/history-timeline"
import { churchHistory } from "@/lib/constants/church-history"

export const metadata = {
  title: "교회연혁 | 혜광교회",
  description: "혜광교회의 역사를 소개합니다",
}

export default function HistoryPage() {
  const byDecade = churchHistory.reduce<Record<string, typeof churchHistory>>((acc, entry) => {
    const year = parseInt(entry.date.slice(0, 4), 10)
    const decade = year < 2010 ? "~2010" : year < 2020 ? "2010s" : "2020s"
    if (!acc[decade]) acc[decade] = []
    acc[decade].push(entry)
    return acc
  }, {})

  const sectionOrder = ["2020s", "2010s", "~2010"]
  const sectionTitle: Record<string, string> = {
    "~2010": "~2010",
    "2010s": "2010's",
    "2020s": "2020's",
  }
  const orderedDecades = sectionOrder.filter((d) => byDecade[d]?.length)

  orderedDecades.forEach((decade) => {
    byDecade[decade] = [...byDecade[decade]].reverse()
  })

  return (
    <>
      <PageHeader
        title="교회연혁"
        description="혜광교회의 발자취를 소개합니다"
        breadcrumb={[{ label: "교회소개", href: "/about" }, { label: "교회연혁" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <HistoryTimeline
              byDecade={byDecade}
              sectionOrder={orderedDecades}
              sectionTitle={sectionTitle}
            />
          </div>
        </div>
      </section>
    </>
  )
}
