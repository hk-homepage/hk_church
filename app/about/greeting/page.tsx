// Greeting page - church introduction with hero image and welcome text
import Image from "next/image"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "인사말 | 혜광교회",
  description: "혜광교회 인사말 - 대한예수교장로회(고신) 경기서부노회",
}

export default function GreetingPage() {
  return (
    <>
      <PageHeader
        title="인사말"
        description="혜광교회에 오신 것을 환영합니다"
        breadcrumb={[{ label: "교회소개", href: "/about" }, { label: "인사말" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="relative mb-12 aspect-[16/10] w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/intro.jpg"
                alt="혜광교회 예배당"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                대한예수교장로회(고신) 경기서부노회에 속해 있으며, 건강한 신앙의 유산 위에서 출발한 교회입니다.
              </p>
              <p>
                1991년 3월 3일 설립하여, 2003년 이곳 현재의 위치에 교회를 건축하고 꾸준히 성장하고 있는 행복한
                교회입니다.
              </p>
              <p className="text-lg font-medium text-foreground">함께 좋은 교회를 만들어 갑시다!</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
