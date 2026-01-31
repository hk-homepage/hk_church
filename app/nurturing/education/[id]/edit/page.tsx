import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/app/actions/auth'
import { isAdmin } from '@/lib/utils/permissions'
import { PageHeader } from '@/components/page-header'
import { EducationForm } from '@/components/education-form'
import type { EducationProgram } from '@/types/education'

export const metadata = {
  title: "프로그램 수정 | 교회교육 | 혜광교회",
  description: "교회교육 프로그램을 수정합니다",
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditEducationPage({ params }: PageProps) {
  const { id } = await params
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login?redirect=/nurturing/education/' + id + '/edit')
  }

  if (!isAdmin(user)) {
    redirect('/nurturing/education')
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('church_education_programs')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    notFound()
  }

  const program: EducationProgram = {
    id: String(data.id),
    title: String(data.title),
    description: String(data.description ?? ''),
    schedule: String(data.schedule ?? ''),
    display_order: Number(data.display_order ?? 0),
    created_at: String(data.created_at),
    updated_at: String(data.updated_at),
  }

  return (
    <>
      <PageHeader
        title="프로그램 수정"
        description={`"${program.title}" 프로그램을 수정합니다`}
        breadcrumb={[
          { label: "양육/모임", href: "/nurturing" },
          { label: "교회교육", href: "/nurturing/education" },
          { label: "수정" },
        ]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <EducationForm mode="edit" initialData={program} />
          </div>
        </div>
      </section>
    </>
  )
}
