import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/app/actions/auth'
import { isAdmin } from '@/lib/utils/permissions'
import { getAllHeroSlides, deleteHeroSlide } from '@/app/actions/hero-slides'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { HeroSlideActions } from '@/components/hero-slide-actions'

export const metadata = {
  title: '배너 관리 | 혜광교회',
  description: '메인페이지 배너 이미지를 관리합니다',
}

export default async function HeroSlidesPage() {
  const user = await getCurrentUser()

  // 로그인 확인
  if (!user) {
    redirect('/login?redirect=/admin/hero-slides')
  }

  // 관리자 권한 확인
  if (!isAdmin(user)) {
    redirect('/')
  }

  const slides = await getAllHeroSlides()

  return (
    <>
      <PageHeader
        title="배너 관리"
        description="메인페이지 배너 이미지를 관리합니다"
        breadcrumb={[
          { label: '관리자', href: '/admin' },
          { label: '배너 관리' },
        ]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">배너 목록</h2>
            <Button asChild>
              <Link href="/admin/hero-slides/new">
                <Plus className="mr-2 h-4 w-4" />
                새 배너 추가
              </Link>
            </Button>
          </div>

          {slides.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">등록된 배너가 없습니다.</p>
                <Button asChild className="mt-4">
                  <Link href="/admin/hero-slides/new">첫 배너 추가하기</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {slides.map((slide) => (
                <Card key={slide.id} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={slide.image_url}
                      alt={slide.title}
                      fill
                      className="object-cover"
                    />
                    {!slide.is_active && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold">비활성화</span>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{slide.title}</CardTitle>
                        {slide.subtitle && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {slide.subtitle}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {slide.is_active ? (
                          <Eye className="h-4 w-4 text-green-500" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {slide.description && (
                      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                        {slide.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        순서: {slide.display_order}
                      </span>
                      <HeroSlideActions slide={slide} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
