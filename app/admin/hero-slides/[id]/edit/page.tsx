import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/app/actions/auth'
import { isAdmin } from '@/lib/utils/permissions'
import { getAllHeroSlides } from '@/app/actions/hero-slides'
import { PageHeader } from '@/components/page-header'
import { HeroSlideForm } from '@/components/hero-slide-form'

export const metadata = {
  title: '배너 수정 | 혜광교회',
  description: '배너를 수정합니다',
}

interface EditHeroSlidePageProps {
  params: Promise<{ id: string }>
}

export default async function EditHeroSlidePage({ params }: EditHeroSlidePageProps) {
  const { id } = await params
  const user = await getCurrentUser()

  // 로그인 확인
  if (!user) {
    redirect(`/login?redirect=/admin/hero-slides/${id}/edit`)
  }

  // 관리자 권한 확인
  if (!isAdmin(user)) {
    redirect('/admin/hero-slides')
  }

  // 배너 데이터 가져오기
  const slides = await getAllHeroSlides()
  const slide = slides.find((s) => s.id === id)

  if (!slide) {
    redirect('/admin/hero-slides')
  }

  return (
    <>
      <PageHeader
        title="배너 수정"
        description="배너를 수정합니다"
        breadcrumb={[
          { label: '관리자', href: '/admin' },
          { label: '배너 관리', href: '/admin/hero-slides' },
          { label: '수정' },
        ]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <HeroSlideForm slide={slide} />
          </div>
        </div>
      </section>
    </>
  )
}
