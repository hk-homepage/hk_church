import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, List } from 'lucide-react'
import { notFound } from 'next/navigation'
import { BoardDetail } from '@/components/fellowship/board-detail'
import { generateMockPostDetail } from '@/lib/mock/fellowship-data'

const CATEGORY = 'daily' as const

export const metadata: Metadata = {
    title: '일상 나눔 | 혜광교회',
    description: '일상의 소소한 이야기를 나누는 공간입니다',
}

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function DailyDetailPage({ params }: PageProps) {
    const { id } = await params

    // Mock 데이터 가져오기 (실제로는 Supabase에서 가져옴)
    try {
        const post = generateMockPostDetail(id, CATEGORY)

        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* 상단 네비게이션 */}
                <div className="flex items-center justify-between mb-6">
                    <Link
                        href="/fellowship/daily"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>목록으로</span>
                    </Link>
                    <Link
                        href="/fellowship/daily"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <List className="w-4 h-4" />
                        <span>전체 목록</span>
                    </Link>
                </div>

                {/* 게시글 상세 */}
                <BoardDetail post={post} />

                {/* 하단 네비게이션 */}
                <div className="mt-8 flex justify-center">
                    <Link
                        href="/fellowship/daily"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                        <List className="w-4 h-4" />
                        <span>목록으로 돌아가기</span>
                    </Link>
                </div>
            </div>
        )
    } catch (error) {
        notFound()
    }
}
