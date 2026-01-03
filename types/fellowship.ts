// TypeScript types for fellowship board system
export type BoardCategory = 'grace' | 'thanks' | 'daily'

export interface FellowshipCategory {
    id: string
    slug: BoardCategory
    name: string
    description: string | null
    display_order: number
    is_active: boolean
    created_at: string
}

// 첨부파일 타입
export interface Attachment {
    name: string
    url: string
    size: number
    type: string
}

// 게시글 타입
export interface FellowshipPost {
    id: string
    category_slug: BoardCategory
    title: string
    content: string
    author_id: string | null
    author_name: string
    view_count: number
    is_pinned: boolean
    is_featured: boolean
    attachments: Attachment[]
    thumbnail_url: string | null
    created_at: string
    updated_at: string
}

// 게시글 목록 아이템 (최적화된 타입)
export interface FellowshipPostListItem {
    id: string
    title: string
    author_name: string
    view_count: number
    is_pinned: boolean
    has_attachments: boolean
    thumbnail_url: string | null
    created_at: string
}

// 댓글 타입 (향후 확장)
export interface FellowshipComment {
    id: string
    post_id: string
    parent_id: string | null
    author_id: string | null
    author_name: string
    content: string
    created_at: string
    updated_at: string
}

// 페이지네이션 타입
export interface PaginationInfo {
    currentPage: number
    totalPages: number
    totalCount: number
    pageSize: number
    hasNext: boolean
    hasPrev: boolean
}

// API 응답 타입
export interface FellowshipPostsResponse {
    posts: FellowshipPostListItem[]
    pagination: PaginationInfo
}

export interface FellowshipPostDetailResponse {
    post: FellowshipPost
    relatedPosts?: FellowshipPostListItem[]
}

// 게시판 설정 타입
export interface BoardConfig {
    category: BoardCategory
    categoryName: string
    description: string
    postsPerPage: number
    enableSearch: boolean
    enablePinned: boolean
}
