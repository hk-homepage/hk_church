import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, List } from 'lucide-react'
import { notFound } from 'next/navigation'
import { BoardDetail } from '@/components/board-detail'
import { generateAnnouncementDetail } from '@/lib/mock/announcements-data'

export const metadata: Metadata = {
    title: '공지사항 | 혜광교회',
    description: '혜광교회 공지사항',
}

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function AnnouncementDetailPage({ params }: PageProps) {
    const { id } = await params

    // Mock 데이터 가져오기 (실제로는 Supabase에서 가져옴)
    try {
        const post = generateAnnouncementDetail(id)

        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* 상단 네비게이션 */}
                <div className="flex items-center justify-between mb-6">
                    <Link
                        href="/news/announcements"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>목록으로</span>
                    </Link>
                    <Link
                        href="/news/announcements"
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
                        href="/news/announcements"
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
