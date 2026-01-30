import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getCurrentUser } from '@/app/actions/auth'
import { getBoardConfig } from '@/lib/constants/fellowship'
import { FellowshipForm } from '@/components/fellowship-form'

const CATEGORY = 'thanks' as const
const BASE_URL = '/fellowship/thanks'

export const metadata: Metadata = {
  title: '감사 나눔 글쓰기 | 혜광교회',
  description: '감사 나눔 게시판에 글을 작성합니다',
}

export default async function ThanksWritePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(`/login?redirect=${encodeURIComponent(BASE_URL + '/write')}`)
  }

  const config = getBoardConfig(CATEGORY)

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <Link
          href={BASE_URL}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>목록으로</span>
        </Link>
      </div>
      <FellowshipForm
        category={CATEGORY}
        categoryName={config.categoryName}
        baseUrl={BASE_URL}
      />
    </div>
  )
}
