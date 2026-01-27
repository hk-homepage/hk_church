// 통합된 게시물 타입 정의

export type PostType = 'general' | 'fellowship' | 'bulletin' | 'announcement'
export type BoardType = 'general' | 'fellowship' | 'bulletin' | 'announcement'

// 게시물 메타데이터 타입
export interface FellowshipMetadata {
  category_slug: 'grace' | 'thanks' | 'daily'
  attachments?: Array<{
    name: string
    url: string
    size: number
    type: string
  }>
}

export interface BulletinMetadata {
  bulletin_date: string
  cover_image_url?: string
  pdf_url?: string
  page_count?: number
}

export interface PostMetadata {
  // fellowship 게시판의 경우
  category_slug?: 'grace' | 'thanks' | 'daily'
  attachments?: Array<{
    name: string
    url: string
    size: number
    type: string
  }>
  // bulletin 게시판의 경우
  bulletin_date?: string
  cover_image_url?: string
  pdf_url?: string
  page_count?: number
  // 기타
  [key: string]: any
}

// 통합 게시물 타입
export interface UnifiedPost {
  post_id: number
  board_id: number
  post_type: PostType
  author_user_id: string
  author_name?: string | null
  title: string
  content: string
  thumbnail_url?: string | null
  is_notice: boolean
  is_pinned: boolean
  is_featured: boolean
  view_count: number
  metadata: PostMetadata
  created_at: string
  updated_at: string
  deleted_at?: string | null
}

// 게시판 타입
export interface UnifiedBoard {
  board_id: number
  parent_board_id?: number | null
  name: string
  slug?: string | null
  board_type: BoardType
  visibility: 'PUBLIC' | 'PRIVATE'
  description?: string | null
  metadata: Record<string, any>
  sort_order: number
  created_at: string
  updated_at: string
}

// API 응답 타입
export interface PostsResponse {
  success: boolean
  error?: string
  posts: UnifiedPost[]
  total: number
  board?: UnifiedBoard
}

export interface PostResponse {
  success: boolean
  error?: string
  post: UnifiedPost | null
}

// 페이지네이션 정보
export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalCount: number
  pageSize: number
  hasNext: boolean
  hasPrev: boolean
}

// ============================================
// 호환 타입 (기존 fellowship 타입과 호환)
// ============================================

// 성도의 교제 게시판 카테고리
export type BoardCategory = 'grace' | 'thanks' | 'daily'

// 성도의 교제 게시글 목록 아이템 (UnifiedPost에서 변환)
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

// 성도의 교제 게시글 상세 (UnifiedPost에서 변환)
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
  attachments: Array<{
    name: string
    url: string
    size: number
    type: string
  }>
  thumbnail_url: string | null
  created_at: string
  updated_at: string
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

// UnifiedPost를 FellowshipPostListItem으로 변환하는 헬퍼 함수
export function convertToFellowshipPostListItem(post: UnifiedPost): FellowshipPostListItem {
  return {
    id: post.post_id.toString(),
    title: post.title,
    author_name: post.author_name || '익명',
    view_count: post.view_count,
    is_pinned: post.is_pinned,
    has_attachments: (post.metadata?.attachments?.length || 0) > 0,
    thumbnail_url: post.thumbnail_url || null,
    created_at: post.created_at,
  }
}

// UnifiedPost를 FellowshipPost로 변환하는 헬퍼 함수
export function convertToFellowshipPost(post: UnifiedPost): FellowshipPost {
  return {
    id: post.post_id.toString(),
    category_slug: post.metadata?.category_slug || 'grace',
    title: post.title,
    content: post.content,
    author_id: post.author_user_id || null,
    author_name: post.author_name || '익명',
    view_count: post.view_count,
    is_pinned: post.is_pinned,
    is_featured: post.is_featured,
    attachments: post.metadata?.attachments || [],
    thumbnail_url: post.thumbnail_url || null,
    created_at: post.created_at,
    updated_at: post.updated_at,
  }
}

// ============================================
// 공지사항 타입 (UnifiedPost에서 변환)
// ============================================

export interface Notice {
  id: string
  title: string
  content: string
  author_id: string
  author_name: string
  is_pinned: boolean
  view_count: number
  created_at: string
  updated_at: string
  attachments: Array<{
    name: string
    url: string
    size: number
    type: string
  }>
}

// UnifiedPost를 Notice로 변환하는 헬퍼 함수
export function convertToNotice(post: UnifiedPost): Notice {
  return {
    id: post.post_id.toString(),
    title: post.title,
    content: post.content,
    author_id: post.author_user_id,
    author_name: post.author_name || '관리자',
    is_pinned: post.is_pinned,
    view_count: post.view_count,
    created_at: post.created_at,
    updated_at: post.updated_at,
    attachments: post.metadata?.attachments || [],
  }
}

// ============================================
// 주보 타입 (UnifiedPost에서 변환)
// ============================================

export interface Bulletin {
  id: string
  title: string
  bulletin_date: string
  cover_image_url?: string
  pdf_url: string
  page_count?: number
  created_by?: string
  created_at: string
  updated_at: string
}

// UnifiedPost를 Bulletin로 변환하는 헬퍼 함수
export function convertToBulletin(post: UnifiedPost): Bulletin {
  return {
    id: post.post_id.toString(),
    title: post.title,
    bulletin_date: post.metadata?.bulletin_date || '',
    cover_image_url: post.metadata?.cover_image_url || post.thumbnail_url || undefined,
    pdf_url: post.metadata?.pdf_url || '',
    page_count: post.metadata?.page_count || 1,
    created_by: post.author_user_id,
    created_at: post.created_at,
    updated_at: post.updated_at,
  }
}
