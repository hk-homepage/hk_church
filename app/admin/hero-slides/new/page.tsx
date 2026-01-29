import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/app/actions/auth'
import { isAdmin } from '@/lib/utils/permissions'
import { PageHeader } from '@/components/page-header'
import { HeroSlideForm } from '@/components/hero-slide-form'

export const metadata = {
  title: '배너 추가 | 혜광교회',
  description: '새로운 배너를 추가합니다',
}

export default async function NewHeroSlidePage() {
  const user = await getCurrentUser()

  // 로그인 확인
  if (!user) {
    redirect('/login?redirect=/admin/hero-slides/new')
  }

  // 관리자 권한 확인
  if (!isAdmin(user)) {
    redirect('/admin/hero-slides')
  }

  return (
    <>
      <PageHeader
        title="배너 추가"
        description="새로운 배너를 추가합니다"
        breadcrumb={[
          { label: '관리자', href: '/admin' },
          { label: '배너 관리', href: '/admin/hero-slides' },
          { label: '추가' },
        ]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <HeroSlideForm />
          </div>
        </div>
      </section>
    </>
  )
}
