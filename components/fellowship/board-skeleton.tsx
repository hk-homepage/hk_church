export function BoardSkeleton() {
    return (
        <div className="space-y-4">
            {/* 헤더 스켈레톤 */}
            <div className="mb-8">
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                <div className="h-4 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>

            {/* 게시글 목록 스켈레톤 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* 헤더 */}
                <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse hidden md:block" />
                    </div>
                </div>

                {/* 게시글 아이템들 */}
                {Array.from({ length: 10 }).map((_, index) => (
                    <div
                        key={index}
                        className="border-b border-gray-200 dark:border-gray-700 px-4 py-4"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                            <div className="flex-1 space-y-2">
                                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/4" />
                            </div>
                            <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
