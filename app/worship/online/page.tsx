import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, ExternalLink, Play } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "실시간 온라인 예배 | 혜광교회",
  description: "혜광교회 실시간 온라인 예배",
}

const worshipSchedule = [
  { title: "주일 1부 예배", time: "오전 9:00" },
  { title: "주일 2부 예배", time: "오전 11:00" },
  { title: "수요 예배", time: "저녁 7:30" },
  { title: "금요 기도회", time: "저녁 8:00" },
]

export default function OnlineWorshipPage() {
  return (
    <>
      <PageHeader
        title="실시간 온라인 예배"
        description="언제 어디서나 함께 예배드립니다"
        breadcrumb={[{ label: "실시간 온라인 예배" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Live Stream */}
            <div className="mb-12">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <iframe
                  src="https://www.youtube.com/embed/live_stream?channel=UC혜광교회채널ID"
                  title="혜광교회 실시간 예배"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">주일 예배 생중계</h2>
                  <p className="text-muted-foreground">매주 주일 오전 9시, 11시 생방송</p>
                </div>
                <Button asChild>
                  <Link href="https://www.youtube.com/@혜광교회-l5f" target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    유튜브 채널 바로가기
                  </Link>
                </Button>
              </div>
            </div>

            {/* Schedule */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    온라인 예배 시간
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {worshipSchedule.map((item) => (
                      <li key={item.title} className="flex items-center justify-between">
                        <span className="text-foreground">{item.title}</span>
                        <span className="font-medium text-primary">{item.time}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    지난 예배 다시보기
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">지난 예배 영상은 유튜브 채널에서 시청하실 수 있습니다.</p>
                  <Button variant="outline" asChild>
                    <Link href="https://www.youtube.com/@혜광교회-l5f/videos" target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      지난 예배 보기
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
