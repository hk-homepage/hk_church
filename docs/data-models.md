# 데이터 모델 문서

## TypeScript 타입 정의

### 게시판 (Fellowship)

#### 타입 정의 (`types/fellowship.ts`)

```typescript
// 게시판 카테고리 타입
export type BoardCategory = 'grace' | 'thanks' | 'daily'

// 게시판 카테고리 정보
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

// 게시글 전체 정보
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

// 게시글 목록 아이템 (최적화)
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

// 댓글 (향후 확장)
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

// 페이지네이션 정보
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
```

## 데이터베이스 스키마

### Supabase 테이블 구조

#### fellowship_categories

게시판 카테고리 정보

```sql
CREATE TABLE fellowship_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**초기 데이터**:
- `grace`: 은혜 나눔
- `thanks`: 감사 나눔
- `daily`: 일상 나눔

#### fellowship_posts

게시글 정보

```sql
CREATE TABLE fellowship_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_slug TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  view_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  attachments JSONB DEFAULT '[]'::jsonb,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_category FOREIGN KEY (category_slug) 
    REFERENCES fellowship_categories(slug) ON DELETE CASCADE
);
```

**인덱스**:
- `idx_fellowship_posts_category`: category_slug
- `idx_fellowship_posts_created`: created_at DESC
- `idx_fellowship_posts_pinned`: is_pinned, created_at DESC

#### fellowship_comments

댓글 정보 (향후 확장)

```sql
CREATE TABLE fellowship_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES fellowship_posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES fellowship_comments(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 데이터 검증

### Zod 스키마 (향후 구현)

```typescript
import { z } from 'zod'

// 게시글 작성 스키마
export const createPostSchema = z.object({
  category_slug: z.enum(['grace', 'thanks', 'daily']),
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  author_name: z.string().min(1).max(50),
  attachments: z.array(z.object({
    name: z.string(),
    url: z.string().url(),
    size: z.number().positive(),
    type: z.string(),
  })).optional(),
  thumbnail_url: z.string().url().optional(),
})

// 게시글 수정 스키마
export const updatePostSchema = createPostSchema.partial()

// 댓글 작성 스키마
export const createCommentSchema = z.object({
  post_id: z.string().uuid(),
  parent_id: z.string().uuid().optional(),
  author_name: z.string().min(1).max(50),
  content: z.string().min(1).max(1000),
})
```

## Mock 데이터

### 생성 함수 (`lib/mock/fellowship-data.ts`)

```typescript
// 게시글 목록 Mock 데이터 생성
export function generateMockPosts(
  category: BoardCategory, 
  count: number = 50
): FellowshipPostListItem[]

// 게시글 상세 Mock 데이터 생성
export function generateMockPostDetail(
  id: string, 
  category: BoardCategory
): FellowshipPost
```

**특징**:
- 카테고리별 실제 제목 사용
- 랜덤 작성자, 조회수 생성
- 시간순 정렬
- 첨부파일 및 썸네일 랜덤 생성

## 데이터 흐름

### 현재 (Mock 데이터)

```
Page Component
    ↓
generateMockPosts(category, count)
    ↓
FellowshipPostListItem[]
    ↓
BoardList Component
```

### 향후 (Supabase)

```
Page Component (Server Component)
    ↓
Server Action: getPosts(category, page)
    ↓
Supabase Client
    ↓
Database Query
    ↓
FellowshipPostListItem[]
    ↓
BoardList Component
```

## 향후 확장 모델

### 사용자 (Users)

```typescript
export interface User {
  id: string
  email: string
  name: string
  phone: string | null
  birth_date: string | null
  gender: 'male' | 'female' | null
  avatar_url: string | null
  role: 'admin' | 'member' | 'guest'
  created_at: string
  updated_at: string
}
```

### 공지사항 (Notices)

```typescript
export interface Notice {
  id: string
  title: string
  content: string
  author_id: string
  is_pinned: boolean
  view_count: number
  attachments: Attachment[]
  created_at: string
  updated_at: string
}
```

### 주보 (Bulletins)

```typescript
export interface Bulletin {
  id: string
  title: string
  bulletin_date: string
  cover_image_url: string
  pdf_url: string
  content: string
  created_at: string
}
```

### 갤러리 (Gallery)

```typescript
export interface GalleryAlbum {
  id: string
  title: string
  description: string
  cover_image_url: string
  image_count: number
  created_at: string
}

export interface GalleryImage {
  id: string
  album_id: string
  image_url: string
  thumbnail_url: string
  caption: string
  display_order: number
  created_at: string
}
```

---

**마지막 업데이트**: 2025-12-29
