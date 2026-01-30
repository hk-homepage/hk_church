import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, List } from 'lucide-react'
import { notFound } from 'next/navigation'
import { BoardDetail } from '@/components/board-detail'
import { getPostById } from '@/app/actions/posts'
import { convertToFellowshipPost } from '@/types/posts'

const CATEGORY = 'grace' as const
const BASE_URL = '/fellowship/grace'

export const metadata: Metadata = {
    title: '은혜 나눔 | 혜광교회',
    description: '하나님께서 주신 은혜를 나누는 공간입니다',
}

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function GraceDetailPage({ params }: PageProps) {
    const { id } = await params
    const postId = parseInt(id, 10)

    if (isNaN(postId)) {
        notFound()
    }

    const result = await getPostById(postId, true)

    if (!result.success || !result.post) {
        notFound()
    }

    const { post } = result
    const isFellowshipPost =
        (post.post_type === 'general' || post.post_type === 'fellowship') &&
        post.metadata?.category_slug === CATEGORY
    if (!isFellowshipPost) {
        notFound()
    }

    const fellowshipPost = convertToFellowshipPost(post)

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex items-center justify-between mb-6">
                <Link
                    href={BASE_URL}
                    className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>목록으로</span>
                </Link>
                <Link
                    href={BASE_URL}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <List className="w-4 h-4" />
                    <span>전체 목록</span>
                </Link>
            </div>

            <BoardDetail post={fellowshipPost} />

            <div className="mt-8 flex justify-center">
                <Link
                    href={BASE_URL}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                    <List className="w-4 h-4" />
                    <span>목록으로 돌아가기</span>
                </Link>
            </div>
        </div>
    )
}
