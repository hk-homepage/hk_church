import { PageHeader } from '@/components/page-header'
import { GalleryForm } from '@/components/gallery-form'
import { getCurrentUser } from '@/app/actions/auth'
import { isAdmin } from '@/lib/utils/permissions'
import { redirect } from 'next/navigation'

export const metadata = {
  title: '갤러리 등록 | 혜광교회',
  description: '새 갤러리 앨범을 등록합니다',
}

export default async function NewGalleryPage() {
  const user = await getCurrentUser()
  
  if (!isAdmin(user)) {
    redirect('/news/gallery')
  }

  return (
    <>
      <PageHeader
        title="갤러리 등록"
        description="새 갤러리 앨범을 등록합니다"
        breadcrumb={[
          { label: '교회소식', href: '/news' },
          { label: '혜광 갤러리', href: '/news/gallery' },
          { label: '등록' },
        ]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <GalleryForm />
          </div>
        </div>
      </section>
    </>
  )
}
