import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/app/actions/auth'
import { isAdmin } from '@/lib/utils/permissions'
import { PageHeader } from '@/components/page-header'
import { EducationForm } from '@/components/education-form'

export const metadata = {
  title: "프로그램 추가 | 교회교육 | 혜광교회",
  description: "교회교육 프로그램을 추가합니다",
}

export default async function NewEducationPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login?redirect=/nurturing/education/new')
  }

  if (!isAdmin(user)) {
    redirect('/nurturing/education')
  }

  return (
    <>
      <PageHeader
        title="프로그램 추가"
        description="새 교회교육 프로그램을 등록합니다"
        breadcrumb={[
          { label: "양육/모임", href: "/nurturing" },
          { label: "교회교육", href: "/nurturing/education" },
          { label: "추가" },
        ]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <EducationForm mode="create" />
          </div>
        </div>
      </section>
    </>
  )
}
