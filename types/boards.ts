// 게시판 시스템 TypeScript 타입 정의

export type BoardVisibility = 'PUBLIC' | 'PRIVATE'

// 게시판 타입
export interface Board {
  board_id: number
  parent_board_id: number | null
  name: string
  visibility: BoardVisibility
  sort_order: number
  created_at: string
  updated_at: string
}

// 게시물 타입
export interface Post {
  post_id: number
  board_id: number
  author_user_id: string // UUID
  title: string
  content: string
  author_ip: string | null
  is_notice: boolean
  view_count: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

// 게시물 목록 아이템 (최적화된 타입)
export interface PostListItem {
  post_id: number
  board_id: number
  author_user_id: string
  author_name?: string // 조인으로 가져올 수 있음
  title: string
  is_notice: boolean
  view_count: number
  created_at: string
  updated_at: string
  comment_count?: number // 조인으로 계산
  file_count?: number // 조인으로 계산
}

// 게시물 상세 (댓글, 파일 포함)
export interface PostDetail extends Post {
  author_name?: string
  comments?: Comment[]
  files?: FileAttachment[]
}

// 댓글 타입
export interface Comment {
  comment_id: number
  post_id: number
  author_user_id: string // UUID
  author_name?: string // 조인으로 가져올 수 있음
  content: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

// 파일 첨부 타입
export interface FileAttachment {
  file_id: number
  post_id: number
  uploader_user_id: string // UUID
  original_name: string
  stored_name: string
  storage_path: string
  mime_type: string | null
  file_size: number | null
  sort_order: number
  created_at: string
}

// 게시물 작성 입력 타입
export interface CreatePostInput {
  board_id: number
  title: string
  content: string
  author_ip?: string
  is_notice?: boolean
}

// 게시물 수정 입력 타입
export interface UpdatePostInput {
  title?: string
  content?: string
  is_notice?: boolean
}

// 댓글 작성 입력 타입
export interface CreateCommentInput {
  post_id: number
  content: string
}

// 댓글 수정 입력 타입
export interface UpdateCommentInput {
  content: string
}

// 파일 업로드 입력 타입
export interface UploadFileInput {
  post_id: number
  original_name: string
  stored_name: string
  storage_path: string
  mime_type?: string
  file_size?: number
  sort_order?: number
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

// 게시물 목록 응답 타입
export interface PostsResponse {
  posts: PostListItem[]
  pagination: PaginationInfo
}

// 게시물 상세 응답 타입
export interface PostDetailResponse {
  post: PostDetail
  relatedPosts?: PostListItem[]
}

// 댓글 목록 응답 타입
export interface CommentsResponse {
  comments: Comment[]
  pagination?: PaginationInfo
}
