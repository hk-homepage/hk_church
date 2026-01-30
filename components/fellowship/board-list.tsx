// Table of fellowship posts with header row
import type { FellowshipPostListItem, BoardCategory } from '@/types/posts'
import { BoardItem } from './board-item'

interface BoardListProps {
    posts: FellowshipPostListItem[]
    category: BoardCategory
    currentPage?: number
    postsPerPage?: number
    totalCount?: number
}

export function BoardList({
    posts,
    category,
    currentPage = 1,
    postsPerPage = 15,
    totalCount = 0
}: BoardListProps) {
    if (posts.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                    아직 게시글이 없습니다.
                </p>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* 테이블 헤더 */}
            <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                <div className="flex items-center gap-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="w-12 text-center">번호</div>
                    <div className="flex-1">제목</div>
                    <div className="w-24 text-center hidden md:block">조회수</div>
                </div>
            </div>

            {/* 게시글 목록 - 최신순 표시, 번호는 먼저 쓴 글이 1번이 되도록 역순 */}
            <div>
                {posts.map((post, index) => {
                    const actualIndex = (currentPage - 1) * postsPerPage + index
                    const displayNo = totalCount > 0 ? totalCount - actualIndex : index + 1

                    return (
                        <BoardItem
                            key={post.id}
                            post={post}
                            category={category}
                            displayNo={displayNo}
                        />
                    )
                })}
            </div>
        </div>
    )
}
