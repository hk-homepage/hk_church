// 교회학교 부서별 히어로 섹션 - 홈처럼 전체 너비 이미지 위에 제목·소개글
import Image from "next/image"

interface SundaySchoolHeroSectionProps {
  title: string
  description: string
  imageUrl: string
  imageAlt?: string
}

export function SundaySchoolHeroSection({
  title,
  description,
  imageUrl,
  imageAlt,
}: SundaySchoolHeroSectionProps) {
  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-muted">
      <Image
        src={imageUrl}
        alt={imageAlt ?? title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-foreground/50" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container px-4 text-center">
          <div className="mx-auto max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl">
              {title}
            </h1>
            <p className="text-lg leading-relaxed text-primary-foreground/95 md:text-xl">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
