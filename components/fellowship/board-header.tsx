// Board title and description header
import type { BoardCategory } from '@/types/fellowship'
import { getBoardConfig } from '@/lib/constants/fellowship'

interface BoardHeaderProps {
    category: BoardCategory
    totalCount?: number
}

export function BoardHeader({ category, totalCount }: BoardHeaderProps) {
    const config = getBoardConfig(category)

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {config.categoryName}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {config.description}
                    </p>
                </div>
                {totalCount !== undefined && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        총 <span className="font-semibold text-gray-900 dark:text-white">{totalCount}</span>개의 게시글
                    </div>
                )}
            </div>
        </div>
    )
}
