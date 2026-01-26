import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/app/actions/auth'
import { isAdmin } from '@/lib/utils/permissions'
import { PageHeader } from '@/components/page-header'
import { BulletinForm } from '@/components/bulletin-form'

export const metadata = {
  title: '주보 작성 | 혜광교회',
  description: '새로운 주보를 작성합니다',
}

export default async function NewBulletinPage() {
  const user = await getCurrentUser()

  // 로그인 확인
  if (!user) {
    redirect('/login?redirect=/news/bulletin/new')
  }

  // 관리자 권한 확인
  if (!isAdmin(user)) {
    redirect('/news/bulletin')
  }

  return (
    <>
      <PageHeader
        title="주보 작성"
        description="새로운 주보를 작성합니다"
        breadcrumb={[
          { label: '교회소식', href: '/news' },
          { label: '주보', href: '/news/bulletin' },
          { label: '작성' },
        ]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <BulletinForm />
          </div>
        </div>
      </section>
    </>
  )
}
