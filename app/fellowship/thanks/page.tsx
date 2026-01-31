import type { Metadata } from 'next'
import { BoardHeader } from '@/components/fellowship/board-header'
import { BoardList } from '@/components/fellowship/board-list'
import { BoardPagination } from '@/components/fellowship/board-pagination'
import { getFellowshipPosts } from '@/app/actions/posts'
import { getBoardConfig } from '@/lib/constants/fellowship'
import { convertToFellowshipPostListItem } from '@/types/posts'
import type { PaginationInfo } from '@/types/posts'

const CATEGORY = 'thanks' as const
const BASE_URL = '/fellowship/thanks'

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

    const result = await getFellowshipPosts(CATEGORY, currentPage, postsPerPage)

    if (!result.success) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <p className="text-destructive">{result.error ?? '게시글을 불러오는데 실패했습니다.'}</p>
            </div>
        )
    }

    const posts = result.posts.map(convertToFellowshipPostListItem)
    const totalCount = result.total

    const pagination: PaginationInfo = {
        currentPage,
        totalPages: Math.ceil(totalCount / postsPerPage) || 1,
        totalCount,
        pageSize: postsPerPage,
        hasNext: currentPage * postsPerPage < totalCount,
        hasPrev: currentPage > 1,
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <BoardHeader category={CATEGORY} totalCount={totalCount} baseUrl={BASE_URL} />
            <BoardList
                posts={posts}
                category={CATEGORY}
                currentPage={currentPage}
                postsPerPage={postsPerPage}
                totalCount={totalCount}
            />
            <BoardPagination
                pagination={pagination}
                baseUrl={BASE_URL}
            />
        </div>
    )
}
