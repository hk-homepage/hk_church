import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, ExternalLink } from "lucide-react"

export function LiveWorshipSection() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Video Embed */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-foreground/10 shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/BXLnanlZAiM"
                title="혜광교회 온라인 예배"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Online Worship</p>
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              온라인 예배
            </h2>
            <p className="mb-6 text-pretty text-lg text-muted-foreground leading-relaxed">
              혜광교회는 매주 주일 예배를 실시간으로 송출합니다. 어디서든 함께 예배에 참여하실 수 있습니다.
            </p>

            <div className="mb-8 rounded-xl bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-semibold text-foreground">예배 시간 안내</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex justify-between border-b border-border pb-2">
                  <span>주일 1부 예배</span>
                  <span className="font-medium text-foreground">오전 9:00</span>
                </li>
                <li className="flex justify-between border-b border-border pb-2">
                  <span>주일 2부 예배</span>
                  <span className="font-medium text-foreground">오전 11:00</span>
                </li>
                <li className="flex justify-between border-b border-border pb-2">
                  <span>수요 예배</span>
                  <span className="font-medium text-foreground">저녁 7:30</span>
                </li>
                <li className="flex justify-between">
                  <span>금요 기도회</span>
                  <span className="font-medium text-foreground">저녁 8:00</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="https://www.youtube.com/@혜광교회-l5f/streams" target="_blank">
                  <Play className="mr-2 h-4 w-4" />
                  실시간 예배 참여
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="https://www.youtube.com/@혜광교회-l5f" target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  유튜브 채널
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
