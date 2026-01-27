// Single post row in board list
import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Eye, Paperclip, Pin } from 'lucide-react'
import type { FellowshipPostListItem, BoardCategory } from '@/types/posts'
import { getBoardRoute } from '@/lib/constants/fellowship'

interface BoardItemProps {
    post: FellowshipPostListItem
    category: BoardCategory
    index: number
}

export function BoardItem({ post, category, index }: BoardItemProps) {
    const boardRoute = getBoardRoute(category)
    const postUrl = `${boardRoute}/${post.id}`

    // 고정된 날짜 형식 사용 (hydration 오류 방지)
    const formattedDate = format(new Date(post.created_at), 'yyyy.MM.dd', {
        locale: ko,
    })

    return (
        <div
            className={`
        group border-b border-gray-200 dark:border-gray-700 
        hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors
        ${post.is_pinned ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}
      `}
        >
            <Link href={postUrl} className="block px-4 py-4">
                <div className="flex items-center gap-4">
                    {/* 번호 */}
                    <div className="w-12 text-center flex-shrink-0">
                        {post.is_pinned ? (
                            <Pin className="w-4 h-4 text-blue-600 dark:text-blue-400 mx-auto" />
                        ) : (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {index + 1}
                            </span>
                        )}
                    </div>

                    {/* 썸네일 (있는 경우) */}
                    {post.thumbnail_url && (
                        <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <img
                                src={post.thumbnail_url}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* 제목 및 메타 정보 */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                {post.title}
                            </h3>
                            {post.has_attachments && (
                                <Paperclip className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                            <span>{post.author_name}</span>
                            <span>•</span>
                            <span>{formattedDate}</span>
                        </div>
                    </div>

                    {/* 조회수 */}
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                        <Eye className="w-4 h-4" />
                        <span>{post.view_count}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}
