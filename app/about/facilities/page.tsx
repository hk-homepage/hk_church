// Facilities page - under preparation
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "시설소개 | 혜광교회",
  description: "혜광교회 시설을 소개합니다",
}

export default function FacilitiesPage() {
  return (
    <>
      <PageHeader
        title="시설소개"
        description="혜광교회의 시설을 소개합니다"
        breadcrumb={[{ label: "교회소개", href: "/about" }, { label: "시설소개" }]}
      />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-lg text-muted-foreground">아직 준비중입니다.</p>
        </div>
      </section>
    </>
  )
}
