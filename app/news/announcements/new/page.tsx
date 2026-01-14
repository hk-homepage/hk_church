import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/app/actions/auth'
import { isAdmin } from '@/lib/utils/permissions'
import { PageHeader } from '@/components/page-header'
import { AnnouncementForm } from '@/components/announcement-form'

export const metadata = {
  title: '공지사항 작성 | 혜광교회',
  description: '공지사항을 작성합니다',
}

export default async function NewAnnouncementPage() {
  const user = await getCurrentUser()

  // 로그인 확인
  if (!user) {
    redirect('/login?redirect=/news/announcements/new')
  }

  // 관리자 권한 확인
  if (!isAdmin(user)) {
    redirect('/news/announcements')
  }

  return (
    <>
      <PageHeader
        title="공지사항 작성"
        description="새로운 공지사항을 작성합니다"
        breadcrumb={[
          { label: '교회소식', href: '/news' },
          { label: '공지사항', href: '/news/announcements' },
          { label: '작성' },
        ]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <AnnouncementForm />
          </div>
        </div>
      </section>
    </>
  )
}
