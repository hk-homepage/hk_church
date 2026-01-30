// Board title and description header with optional write link
import Link from 'next/link'
import type { BoardCategory } from '@/types/posts'
import { getBoardConfig } from '@/lib/constants/fellowship'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

interface BoardHeaderProps {
    category: BoardCategory
    totalCount?: number
    baseUrl?: string
}

export function BoardHeader({ category, totalCount, baseUrl }: BoardHeaderProps) {
    const config = getBoardConfig(category)
    const writeUrl = baseUrl ? `${baseUrl}/write` : undefined

    return (
        <div className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {config.categoryName}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {config.description}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {totalCount !== undefined && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            총 <span className="font-semibold text-gray-900 dark:text-white">{totalCount}</span>개의 게시글
                        </span>
                    )}
                    {writeUrl && (
                        <Button asChild variant="default" size="sm">
                            <Link href={writeUrl} className="inline-flex items-center gap-2">
                                <Pencil className="w-4 h-4" />
                                글쓰기
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
