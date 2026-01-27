// Page navigation controls for board lists
'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { PaginationInfo } from '@/types/posts'

interface BoardPaginationProps {
    pagination: PaginationInfo
    baseUrl: string
}

export function BoardPagination({ pagination, baseUrl }: BoardPaginationProps) {
    const { currentPage, totalPages, hasNext, hasPrev } = pagination

    // 페이지 번호 배열 생성 (최대 10개 표시)
    const getPageNumbers = () => {
        const pages: number[] = []
        const maxVisible = 10

        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
        let endPage = Math.min(totalPages, startPage + maxVisible - 1)

        // 끝 페이지가 총 페이지보다 작으면 시작 페이지 조정
        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }

        return pages
    }

    const pageNumbers = getPageNumbers()

    if (totalPages <= 1) {
        return null
    }

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            {/* 이전 페이지 */}
            <Link
                href={hasPrev ? `${baseUrl}?page=${currentPage - 1}` : '#'}
                className={`
          flex items-center justify-center w-9 h-9 rounded-lg border
          ${hasPrev
                        ? 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    }
        `}
                aria-disabled={!hasPrev}
                onClick={(e) => !hasPrev && e.preventDefault()}
            >
                <ChevronLeft className="w-4 h-4" />
            </Link>

            {/* 페이지 번호 */}
            <div className="flex items-center gap-1">
                {pageNumbers.map((pageNum) => (
                    <Link
                        key={pageNum}
                        href={`${baseUrl}?page=${pageNum}`}
                        className={`
              flex items-center justify-center w-9 h-9 rounded-lg border text-sm font-medium
              ${pageNum === currentPage
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }
            `}
                    >
                        {pageNum}
                    </Link>
                ))}
            </div>

            {/* 다음 페이지 */}
            <Link
                href={hasNext ? `${baseUrl}?page=${currentPage + 1}` : '#'}
                className={`
          flex items-center justify-center w-9 h-9 rounded-lg border
          ${hasNext
                        ? 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    }
        `}
                aria-disabled={!hasNext}
                onClick={(e) => !hasNext && e.preventDefault()}
            >
                <ChevronRight className="w-4 h-4" />
            </Link>
        </div>
    )
}
