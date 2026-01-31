import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, List } from 'lucide-react'
import { notFound } from 'next/navigation'
import { BoardDetail } from '@/components/board-detail'
import { getNotice, deleteNotice } from '@/app/actions/announcements'
import { DeletePostButton } from '@/components/delete-post-button'
import { getCurrentUser } from '@/app/actions/auth'
import { isAdmin } from '@/lib/utils/permissions'

// SSR (Server-Side Rendering) 사용
// 매 요청마다 최신 데이터를 가져와서 렌더링
export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    // generateMetadata에서는 조회수 증가하지 않음
    const result = await getNotice(id, false)
    
    if (result.success && result.notice) {
        return {
            title: `${result.notice.title} | 공지사항 | 혜광교회`,
            description: result.notice.title,
        }
    }
    
    return {
        title: '공지사항 | 혜광교회',
        description: '혜광교회 공지사항',
    }
}

export default async function AnnouncementDetailPage({ params }: PageProps) {
    const { id } = await params

    // 실제 데이터 가져오기
    const result = await getNotice(id)
    
    if (!result.success || !result.notice) {
        notFound()
    }

    const notice = result.notice
    const user = await getCurrentUser()
    const canDelete = isAdmin(user)
    
    // BoardDetail 컴포넌트에 맞는 형식으로 변환
    // getNotice에서 이미 JOIN으로 author_name을 가져왔으므로 별도 조회 불필요
    const post = {
        id: notice.id,
        category_slug: 'grace' as const, // 임시로 사용 (공지사항은 별도 타입이지만 BoardDetail 재사용)
        title: notice.title,
        content: typeof notice.content === 'string' 
            ? notice.content 
            : (notice.content as any)?.text || JSON.stringify(notice.content),
        author_name: (notice as any).author_name || '관리자', // getNotice에서 JOIN으로 가져온 값 사용
        author_id: notice.author_id,
        view_count: notice.view_count || 0,
        is_pinned: notice.is_pinned || false,
        is_featured: false,
        thumbnail_url: null,
        created_at: notice.created_at,
        updated_at: notice.updated_at,
        attachments: Array.isArray(notice.attachments) ? notice.attachments : [],
    } as any // BoardDetail이 FellowshipPost를 기대하지만 공지사항도 동일한 구조이므로 타입 단언 사용

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
                <div className="flex items-center gap-2">
                    {canDelete && (
                        <DeletePostButton
                            id={id}
                            onDelete={deleteNotice}
                            redirectPath="/news/announcements"
                            title={notice.title}
                        />
                    )}
                    <Link
                        href="/news/announcements"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <List className="w-4 h-4" />
                        <span>전체 목록</span>
                    </Link>
                </div>
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
}
