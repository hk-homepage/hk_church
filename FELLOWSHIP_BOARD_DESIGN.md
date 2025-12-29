# 성도의 교제 게시판 시스템 설계 문서

## 📋 목차
1. [개요](#개요)
2. [폴더 구조](#폴더-구조)
3. [데이터 모델](#데이터-모델)
4. [컴포넌트 설계](#컴포넌트-설계)
5. [라우팅 구조](#라우팅-구조)
6. [확장성 고려사항](#확장성-고려사항)

---

## 개요

### 목적
- 3개의 게시판(은혜 나눔, 감사 나눔, 일상 나눔)을 **단일 컴포넌트로 재사용**
- 읽기 전용 기능 우선 구현 (목록, 상세보기)
- 향후 관리자 기능(작성, 수정, 삭제) 확장 가능한 구조

### 기술 스택
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: Supabase
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

---

## 폴더 구조

```
hk_church/
├── app/
│   └── fellowship/                    # 성도의 교제 섹션
│       ├── layout.tsx                 # 공통 레이아웃
│       ├── page.tsx                   # 게시판 선택 페이지 (선택사항)
│       │
│       ├── grace/                     # 은혜 나눔
│       │   ├── page.tsx               # 목록 페이지
│       │   └── [id]/
│       │       └── page.tsx           # 상세 페이지
│       │
│       ├── thanks/                    # 감사 나눔
│       │   ├── page.tsx               # 목록 페이지
│       │   └── [id]/
│       │       └── page.tsx           # 상세 페이지
│       │
│       └── daily/                     # 일상 나눔
│           ├── page.tsx               # 목록 페이지
│           └── [id]/
│               └── page.tsx           # 상세 페이지
│
├── components/
│   └── fellowship/                    # 재사용 가능한 게시판 컴포넌트
│       ├── board-list.tsx             # 게시글 목록 컴포넌트
│       ├── board-item.tsx             # 게시글 항목 컴포넌트
│       ├── board-detail.tsx           # 게시글 상세 컴포넌트
│       ├── board-pagination.tsx       # 페이지네이션 컴포넌트
│       ├── board-search.tsx           # 검색 컴포넌트
│       ├── board-header.tsx           # 게시판 헤더
│       └── board-skeleton.tsx         # 로딩 스켈레톤
│
├── lib/
│   ├── actions/
│   │   └── fellowship.ts              # Server Actions
│   │
│   ├── hooks/
│   │   └── use-fellowship.ts          # Custom Hooks
│   │
│   └── validations/
│       └── fellowship.ts              # Zod 스키마
│
└── types/
    └── fellowship.ts                  # TypeScript 타입 정의
```

---

## 데이터 모델

### Supabase 테이블 스키마

```sql
-- 게시판 카테고리 테이블 (선택사항 - 확장성을 위해)
CREATE TABLE fellowship_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,           -- 'grace', 'thanks', 'daily'
  name TEXT NOT NULL,                  -- '은혜 나눔', '감사 나눔', '일상 나눔'
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 게시글 테이블
CREATE TABLE fellowship_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_slug TEXT NOT NULL,         -- 'grace', 'thanks', 'daily'
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,           -- 작성자 이름 (비회원 대비)
  
  -- 메타 정보
  view_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false,     -- 상단 고정
  is_featured BOOLEAN DEFAULT false,   -- 추천글
  
  -- 첨부파일 (JSON 배열)
  attachments JSONB DEFAULT '[]'::jsonb,
  -- 예: [{"name": "image.jpg", "url": "...", "size": 1024, "type": "image/jpeg"}]
  
  -- 이미지 (대표 이미지)
  thumbnail_url TEXT,
  
  -- 타임스탬프
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 인덱스
  CONSTRAINT fk_category FOREIGN KEY (category_slug) 
    REFERENCES fellowship_categories(slug) ON DELETE CASCADE
);

-- 댓글 테이블 (향후 확장)
CREATE TABLE fellowship_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES fellowship_posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES fellowship_comments(id) ON DELETE CASCADE, -- 대댓글
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_fellowship_posts_category ON fellowship_posts(category_slug);
CREATE INDEX idx_fellowship_posts_created ON fellowship_posts(created_at DESC);
CREATE INDEX idx_fellowship_posts_pinned ON fellowship_posts(is_pinned, created_at DESC);
CREATE INDEX idx_fellowship_comments_post ON fellowship_comments(post_id);

-- Row Level Security (RLS) 정책
ALTER TABLE fellowship_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE fellowship_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE fellowship_comments ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 카테고리 읽기 가능
CREATE POLICY "Anyone can read categories"
ON fellowship_categories FOR SELECT
USING (is_active = true);

-- 모든 사용자가 게시글 읽기 가능
CREATE POLICY "Anyone can read posts"
ON fellowship_posts FOR SELECT
USING (true);

-- 인증된 사용자만 게시글 작성 가능 (향후 확장)
CREATE POLICY "Authenticated users can insert posts"
ON fellowship_posts FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- 작성자만 자신의 게시글 수정 가능
CREATE POLICY "Authors can update their posts"
ON fellowship_posts FOR UPDATE
USING (auth.uid() = author_id);

-- 작성자 또는 관리자만 게시글 삭제 가능
CREATE POLICY "Authors or admins can delete posts"
ON fellowship_posts FOR DELETE
USING (
  auth.uid() = author_id OR
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_post_view_count(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE fellowship_posts
  SET view_count = view_count + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 업데이트 시간 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_fellowship_posts_updated_at
BEFORE UPDATE ON fellowship_posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

### 초기 데이터 (Seed)

```sql
-- 카테고리 초기 데이터
INSERT INTO fellowship_categories (slug, name, description, display_order) VALUES
  ('grace', '은혜 나눔', '하나님께서 주신 은혜를 나누는 공간입니다', 1),
  ('thanks', '감사 나눔', '감사의 마음을 나누는 공간입니다', 2),
  ('daily', '일상 나눔', '일상의 소소한 이야기를 나누는 공간입니다', 3);
```

---

## TypeScript 타입 정의

### types/fellowship.ts

```typescript
// 게시판 카테고리 타입
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
```

---

## 컴포넌트 설계

### 1. 게시판 설정 (lib/constants/fellowship.ts)

```typescript
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
```

---

## 확장성 고려사항

### 1. 관리자 기능 확장 구조

현재는 읽기 전용이지만, 향후 다음과 같이 확장 가능:

```typescript
// lib/actions/fellowship.ts 에 추가할 함수들

// 게시글 작성 (관리자/회원)
export async function createPost(data: CreatePostInput) {
  // 권한 체크
  // 데이터 검증
  // DB 저장
}

// 게시글 수정
export async function updatePost(id: string, data: UpdatePostInput) {
  // 권한 체크 (작성자 또는 관리자)
  // 데이터 검증
  // DB 업데이트
}

// 게시글 삭제
export async function deletePost(id: string) {
  // 권한 체크
  // DB 삭제
}
```

### 2. 권한 관리

```typescript
// lib/utils/permissions.ts

export function canCreatePost(user: User | null): boolean {
  return user !== null // 로그인한 사용자만
}

export function canEditPost(user: User | null, post: FellowshipPost): boolean {
  if (!user) return false
  return user.id === post.author_id || isAdmin(user)
}

export function canDeletePost(user: User | null, post: FellowshipPost): boolean {
  if (!user) return false
  return user.id === post.author_id || isAdmin(user)
}

function isAdmin(user: User): boolean {
  // user_roles 테이블 체크
  return user.role === 'admin'
}
```

### 3. 향후 기능 확장 로드맵

**Phase 1: 읽기 전용 (현재)**
- ✅ 게시글 목록 조회
- ✅ 게시글 상세 조회
- ✅ 페이지네이션
- ✅ 검색 기능
- ✅ 조회수 증가

**Phase 2: 회원 기능**
- 게시글 작성 (로그인 필요)
- 게시글 수정/삭제 (본인 글만)
- 댓글 작성
- 좋아요 기능

**Phase 3: 관리자 기능**
- 모든 게시글 수정/삭제
- 게시글 고정 (is_pinned)
- 추천글 설정 (is_featured)
- 게시글 숨김/차단
- 통계 대시보드

**Phase 4: 고급 기능**
- 이미지 업로드 및 갤러리
- 파일 첨부
- 알림 기능
- 태그 시스템
- 게시글 신고 기능

---

## 성능 최적화

### 1. 데이터베이스 최적화
- 적절한 인덱스 생성 (category, created_at, is_pinned)
- 목록 조회 시 필요한 필드만 SELECT
- 페이지네이션으로 대량 데이터 처리

### 2. 캐싱 전략
```typescript
// Next.js App Router 캐싱
export const revalidate = 60 // 60초마다 재검증

// Supabase 쿼리 캐싱
const { data, error } = await supabase
  .from('fellowship_posts')
  .select('*')
  .eq('category_slug', category)
  .order('created_at', { ascending: false })
  .limit(15)
```

### 3. 이미지 최적화
- Next.js Image 컴포넌트 사용
- Supabase Storage의 이미지 변환 기능 활용
- Lazy loading 적용

---

## 보안 고려사항

### 1. XSS 방지
- 사용자 입력 sanitize
- HTML 렌더링 시 DOMPurify 사용

### 2. CSRF 방지
- Next.js Server Actions 사용 (자동 CSRF 보호)

### 3. SQL Injection 방지
- Supabase 클라이언트 사용 (Prepared Statements)
- 사용자 입력 검증 (Zod)

### 4. 권한 체크
- RLS (Row Level Security) 활용
- Server Actions에서 이중 권한 체크

---

## 왜 이 구조가 효율적인가?

### 1. **재사용성 (Reusability)**
- 단일 컴포넌트 세트로 3개 게시판 운영
- 새로운 게시판 추가 시 설정만 추가하면 됨
- 코드 중복 최소화

### 2. **확장성 (Scalability)**
- 관리자 기능 추가 시 기존 구조 유지
- 새로운 기능 추가가 용이한 구조
- 데이터베이스 스키마 확장 가능

### 3. **유지보수성 (Maintainability)**
- 타입 안정성 (TypeScript)
- 명확한 폴더 구조
- 관심사의 분리 (Separation of Concerns)

### 4. **성능 (Performance)**
- 서버 컴포넌트 우선 사용
- 적절한 캐싱 전략
- 최적화된 데이터베이스 쿼리

### 5. **사용자 경험 (UX)**
- 일관된 UI/UX
- 빠른 페이지 로딩
- 반응형 디자인

---

## 다음 단계

1. ✅ 데이터베이스 마이그레이션 실행
2. ✅ 타입 정의 파일 생성
3. ✅ 재사용 가능한 컴포넌트 개발
4. ✅ Server Actions 구현
5. ✅ 페이지 라우팅 구현
6. ✅ 스타일링 및 반응형 디자인
7. ⏳ 테스트 및 최적화
8. ⏳ 관리자 기능 확장 (Phase 2)
