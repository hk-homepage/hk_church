// Interactive church history timeline with scroll-triggered animations
"use client"

import { useEffect, useRef, useState } from "react"
import type { HistoryEntry } from "@/lib/constants/church-history"
import { cn } from "@/lib/utils"

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split(".")
  if (!d) return `${y}년 ${parseInt(m, 10)}월`
  return `${y}.${m}.${d}`
}

interface HistoryTimelineProps {
  byDecade: Record<string, HistoryEntry[]>
  sectionOrder: string[]
  sectionTitle: Record<string, string>
}

export function HistoryTimeline({ byDecade, sectionOrder, sectionTitle }: HistoryTimelineProps) {
  return (
    <div className="space-y-16">
      {sectionOrder.map((decade) => (
        <section key={decade}>
          <h2
            className="mb-8 inline-block rounded-full bg-primary/10 px-5 py-2 text-lg font-bold text-primary"
          >
            {sectionTitle[decade] ?? decade}
          </h2>
          <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:rounded-full before:bg-gradient-to-b before:from-primary before:via-primary/60 before:to-primary/20">
            {byDecade[decade].map((entry, i) => (
              <TimelineItem key={`${entry.date}-${i}`} entry={entry} index={i} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function TimelineItem({ entry, index }: { entry: HistoryEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { rootMargin: "-40px 0px -60px 0px", threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "history-timeline-item relative mb-10 rounded-lg border border-border/50 bg-card/50 px-5 py-4 shadow-sm transition-all duration-500 last:mb-0",
        "hover:border-primary/30 hover:bg-card hover:shadow-md hover:-translate-x-0.5",
        visible && "history-timeline-item-visible"
      )}
      style={{
        transitionDelay: visible ? `${Math.min(index * 40, 400)}ms` : "0ms",
      }}
    >
      <div className="absolute -left-[29px] top-6 h-3 w-3 rounded-full border-2 border-background bg-primary ring-2 ring-primary/30" />
      <div className="mb-1.5 text-sm font-bold text-primary">{formatDate(entry.date)}</div>
      <p className="text-muted-foreground leading-relaxed">{entry.event}</p>
    </div>
  )
}
