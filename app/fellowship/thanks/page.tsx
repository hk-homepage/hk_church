import type { Metadata } from 'next'
import { BoardHeader } from '@/components/fellowship/board-header'
import { BoardList } from '@/components/fellowship/board-list'
import { BoardPagination } from '@/components/fellowship/board-pagination'
import { generateMockPosts } from '@/lib/mock/fellowship-data'
import { getBoardConfig } from '@/lib/constants/fellowship'
import type { PaginationInfo } from '@/types/fellowship'

const CATEGORY = 'thanks' as const

export const metadata: Metadata = {
    title: '감사 나눔 | 혜광교회',
    description: '감사의 마음을 나누는 공간입니다',
}

interface PageProps {
    searchParams: Promise<{ page?: string }>
}

export default async function ThanksPage({ searchParams }: PageProps) {
    const params = await searchParams
    const config = getBoardConfig(CATEGORY)
    const currentPage = Number(params.page) || 1
    const postsPerPage = config.postsPerPage

    // Mock 데이터 가져오기 (실제로는 Supabase에서 가져옴)
    const allPosts = generateMockPosts(CATEGORY, 100)

    // 페이지네이션 적용
    const startIndex = (currentPage - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    const posts = allPosts.slice(startIndex, endIndex)

    // 페이지네이션 정보
    const pagination: PaginationInfo = {
        currentPage,
        totalPages: Math.ceil(allPosts.length / postsPerPage),
        totalCount: allPosts.length,
        pageSize: postsPerPage,
        hasNext: endIndex < allPosts.length,
        hasPrev: currentPage > 1,
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <BoardHeader category={CATEGORY} totalCount={allPosts.length} />
            <BoardList
                posts={posts}
                category={CATEGORY}
                currentPage={currentPage}
                postsPerPage={postsPerPage}
            />
            <BoardPagination
                pagination={pagination}
                baseUrl="/fellowship/thanks"
            />
        </div>
    )
}
