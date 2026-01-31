import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { getEducationPrograms } from '@/app/actions/education'
import { getCurrentUser } from '@/app/actions/auth'
import { isAdmin } from '@/lib/utils/permissions'
import { EducationProgramList } from '@/components/education-program-list'

export const metadata = {
  title: "교회교육 | 혜광교회",
  description: "혜광교회 교회교육 프로그램 안내",
}

export default async function EducationPage() {
  const [programs, user] = await Promise.all([
    getEducationPrograms(),
    getCurrentUser(),
  ])
  const canEdit = user !== null && isAdmin(user)

  return (
    <>
      <PageHeader
        title="교회교육"
        description="혜광교회의 다양한 교육 프로그램을 소개합니다"
        breadcrumb={[{ label: "양육/모임", href: "/nurturing" }, { label: "교회교육" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {canEdit && (
              <div className="mb-6 flex flex-col items-end gap-1">
                <Button asChild>
                  <Link href="/nurturing/education/new">프로그램 추가</Link>
                </Button>
                {programs.length > 1 && (
                  <p className="text-xs text-muted-foreground">카드를 드래그하여 표시 순서를 변경할 수 있습니다.</p>
                )}
              </div>
            )}
            {programs.length === 0 ? (
              <div className="rounded-lg border border-dashed border-muted-foreground/25 bg-muted/30 py-16 text-center text-muted-foreground">
                등록된 교육 프로그램이 없습니다.
                {canEdit && (
                  <div className="mt-4">
                    <Button asChild variant="outline">
                      <Link href="/nurturing/education/new">첫 프로그램 추가</Link>
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <EducationProgramList programs={programs} canEdit={canEdit} />
            )}
          </div>
        </div>
      </section>
    </>
  )
}
