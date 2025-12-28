import Image from "next/image"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "인사말 | 혜광교회",
  description: "혜광교회 담임목사 인사말",
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
            <div className="mb-12 flex flex-col items-center gap-8 md:flex-row md:items-start">
              <div className="relative h-64 w-48 shrink-0 overflow-hidden rounded-lg shadow-lg md:h-80 md:w-60">
                <Image src="/korean-pastor-portrait-professional.jpg" alt="담임목사" fill className="object-cover" />
              </div>
              <div>
                <h2 className="mb-2 text-2xl font-bold text-foreground">환영합니다</h2>
                <p className="mb-4 text-lg text-primary font-medium">담임목사</p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>사랑하는 성도 여러분, 그리고 혜광교회를 방문해 주신 모든 분들을 주님의 이름으로 환영합니다.</p>
                  <p>
                    혜광교회는 1991년 3월 3일에 설립되어, &quot;다음세대가 춤추는 교회&quot;라는 비전을 품고 복음 전파와
                    다음세대 양육에 힘쓰고 있습니다.
                  </p>
                  <p>
                    우리 교회는 하나님의 말씀을 바르게 가르치고, 예배를 통해 하나님께 영광 돌리며, 서로 사랑하고 섬기는
                    공동체가 되기를 소망합니다.
                  </p>
                  <p>
                    어려운 시대를 살아가는 우리 모두에게 혜광교회가 쉼과 위로의 장소가 되고, 새로운 힘을 얻어 세상으로
                    나아가는 은혜의 통로가 되기를 기도합니다.
                  </p>
                  <p>
                    언제든지 혜광교회의 문은 여러분을 위해 열려 있습니다. 함께 예배하고, 함께 성장하며, 함께 섬기는
                    아름다운 공동체가 되기를 소망합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-8 text-center">
              <p className="text-lg italic text-muted-foreground">
                &quot;우리가 이 시장에 앉아 다른 아이들을 불러 이르되 우리가 너희를 향하여 피리를 불어도 너희가 춤추지
                않고 우리가 슬피 울어도 너희가 가슴을 치지 아니하였다 함과 같도다&quot;
              </p>
              <p className="mt-2 font-medium text-foreground">- 마태복음 11:16-17 -</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
