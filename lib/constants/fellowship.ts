// Board configuration constants for each fellowship category
import type { BoardCategory, BoardConfig } from '@/types/fellowship'

export const BOARD_CONFIGS: Record<BoardCategory, BoardConfig> = {
    grace: {
        category: 'grace',
        categoryName: '은혜 나눔',
        description: '하나님께서 주신 은혜를 나누는 공간입니다',
        postsPerPage: 15,
        enableSearch: true,
        enablePinned: true,
    },
    thanks: {
        category: 'thanks',
        categoryName: '감사 나눔',
        description: '감사의 마음을 나누는 공간입니다',
        postsPerPage: 15,
        enableSearch: true,
        enablePinned: true,
    },
    daily: {
        category: 'daily',
        categoryName: '일상 나눔',
        description: '일상의 소소한 이야기를 나누는 공간입니다',
        postsPerPage: 15,
        enableSearch: true,
        enablePinned: true,
    },
}

export const FELLOWSHIP_ROUTES = {
    grace: '/fellowship/grace',
    thanks: '/fellowship/thanks',
    daily: '/fellowship/daily',
} as const

export function getBoardConfig(category: BoardCategory): BoardConfig {
    return BOARD_CONFIGS[category]
}

export function getBoardRoute(category: BoardCategory): string {
    return FELLOWSHIP_ROUTES[category]
}
