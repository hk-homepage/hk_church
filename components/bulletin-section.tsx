// Homepage section showing recent church bulletins
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, ChevronRight, Calendar } from "lucide-react"

const bulletins = [
  { id: 1, title: "2025년 12월 28일 주보", date: "2025-12-27" },
  { id: 2, title: "2025년 12월 21일 주보", date: "2025-12-20" },
  { id: 3, title: "2025년 12월 14일 주보", date: "2025-12-13" },
  { id: 4, title: "2025년 12월 7일 주보", date: "2025-12-06" },
  { id: 5, title: "2025년 11월 30일 주보", date: "2025-11-29" },
]

export function BulletinSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Weekly Bulletin</p>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">교회 주보</h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/bulletin">
              전체보기
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bulletins.slice(0, 6).map((bulletin, index) => (
            <Card
              key={bulletin.id}
              className={`group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1 truncate font-semibold text-foreground group-hover:text-primary">
                    {bulletin.title}
                  </h3>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {bulletin.date}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
