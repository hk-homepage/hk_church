import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from "lucide-react"

export const metadata = {
  title: "일정 | 혜광교회",
  description: "혜광교회 일정 안내",
}

const events = [
  {
    date: "2025.01.05",
    day: "주일",
    title: "신년감사예배",
    time: "오전 9:00, 11:00",
    location: "본당",
    type: "예배",
  },
  {
    date: "2025.01.08",
    day: "수요일",
    title: "수요예배",
    time: "저녁 7:30",
    location: "본당",
    type: "예배",
  },
  {
    date: "2025.01.12",
    day: "주일",
    title: "주일예배",
    time: "오전 9:00, 11:00",
    location: "본당",
    type: "예배",
  },
  {
    date: "2025.01.15",
    day: "수요일",
    title: "새가족 환영회",
    time: "저녁 6:30",
    location: "친교실",
    type: "행사",
  },
  {
    date: "2025.01.19",
    day: "주일",
    title: "교회학교 개강예배",
    time: "오전 11:00",
    location: "교육관",
    type: "행사",
  },
]

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHeader
          title="교회 일정"
          description="혜광교회의 주요 일정을 안내합니다"
          breadcrumb={[{ label: "일정" }]}
        />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="space-y-4">
                {events.map((event, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <span className="text-xs">{event.day}</span>
                            <span className="text-sm font-bold">{event.date.split(".")[2]}</span>
                          </div>
                          <div>
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{event.date}</p>
                          </div>
                        </div>
                        <Badge variant={event.type === "예배" ? "default" : "secondary"}>{event.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
