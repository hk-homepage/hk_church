// Worship info page - regular worship (text list) and Sunday school (image cards)
import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Clock, MapPin } from "lucide-react"

export const metadata = {
  title: "예배안내 | 혜광교회",
  description: "혜광교회 예배 시간 및 장소 안내",
}

const regularWorshipData = [
  { category: "주일", subCategory: "1부", time: "주일 오전 09:00", place: "본당" },
  { category: "주일", subCategory: "2부", time: "주일 오전 11:00", place: "본당" },
  { category: "기도회", subCategory: "수요", time: "수요일 오후 07:30", place: "본당" },
  { category: "기도회", subCategory: "금요", time: "금요일 오후 08:30", place: "본당" },
  { category: "기도회", subCategory: "새벽", time: "평일 오전 05:00", place: "본당" },
]

const sundaySchoolRows = [
  { division: "유치부", time: "주일 오전 11:00", place: "/", image: "/children.png" },
  { division: "초등부", time: "주일 오전 11:00", place: "/", image: "/elementary.png" },
  { division: "중고등부", time: "주일 오전 11:00", place: "/", image: "/middle-high.png" },
  { division: "청년부", time: "주일 오후 01:30", place: "/", image: "/youth.png" },
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
          <div className="mx-auto max-w-5xl space-y-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">정기예배 </h2>

            {/* 정기예배 */}
            <div className="relative min-h-[320px] overflow-hidden rounded-lg">
              <Image
                src="/intro.jpg"
                alt="정기예배"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-black/65" aria-hidden />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8">
                <ul className="w-full max-w-md space-y-3 text-base text-white/95 md:text-lg">
                  {regularWorshipData.map((row) => (
                    <li
                      key={`${row.category}-${row.subCategory}`}
                      className="grid grid-cols-[4rem_1fr_4rem] items-center gap-x-4 border-b border-white/20 pb-3 last:border-b-0 last:pb-0"
                    >
                      <span className="text-center font-medium">{row.subCategory}</span>
                      <span className="text-center font-semibold text-white">{row.time}</span>
                      <span className="text-center text-white/90">{row.place}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            

            {/* 주일학교 */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground">주일학교</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {sundaySchoolRows.map((row) => (
                  <Card
                    key={row.division}
                    className="relative aspect-[4/3] w-full overflow-hidden border-0 p-0 transition-shadow hover:shadow-lg"
                  >
                    <Image
                      src={row.image}
                      alt={row.division}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/55" aria-hidden />
                    <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                      <h3 className="mb-2 text-lg font-semibold">{row.division}</h3>
                      <div className="space-y-1 text-sm text-white/90">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 shrink-0 text-white" />
                          <span>{row.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 shrink-0 text-white" />
                          <span>{row.place === "/" ? "-" : row.place}</span>
                        </div>
                      </div>
                    </div>
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
