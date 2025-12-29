import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Eye, Calendar, User, Paperclip, Download } from 'lucide-react'
import type { FellowshipPost } from '@/types/fellowship'

interface BoardDetailProps {
    post: FellowshipPost
}

export function BoardDetail({ post }: BoardDetailProps) {
    const formattedDate = format(new Date(post.created_at), 'yyyy년 MM월 dd일 HH:mm', {
        locale: ko,
    })

    return (
        <article className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* 헤더 */}
            <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>조회 {post.view_count}</span>
                    </div>
                </div>
            </div>

            {/* 본문 */}
            <div className="p-6">
                {/* 썸네일 이미지 */}
                {post.thumbnail_url && (
                    <div className="mb-6 rounded-lg overflow-hidden">
                        <img
                            src={post.thumbnail_url}
                            alt={post.title}
                            className="w-full h-auto"
                        />
                    </div>
                )}

                {/* 내용 */}
                <div
                    className="prose prose-gray dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* 첨부파일 */}
                {post.attachments && post.attachments.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <Paperclip className="w-4 h-4" />
                            <span>첨부파일 ({post.attachments.length})</span>
                        </div>
                        <div className="space-y-2">
                            {post.attachments.map((file, index) => (
                                <a
                                    key={index}
                                    href={file.url}
                                    download={file.name}
                                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                >
                                    <Download className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {formatFileSize(file.size)}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    )
}

// 파일 크기 포맷팅 유틸리티
function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
