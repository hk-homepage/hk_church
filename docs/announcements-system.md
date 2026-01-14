# 공지사항 시스템 구조 분석

## 📋 목차

1. [전체 구조 개요](#전체-구조-개요)
2. [페이지 구조](#페이지-구조)
3. [컴포넌트 구조](#컴포넌트-구조)
4. [서버 액션 (API)](#서버-액션-api)
5. [데이터베이스 구조](#데이터베이스-구조)
6. [데이터 흐름](#데이터-흐름)
7. [권한 체계](#권한-체계)

---

## 전체 구조 개요

공지사항 시스템은 **범용 게시판 시스템(`boards`, `posts` 테이블)**을 활용하여 구현되었습니다.

```
사용자 요청
    ↓
Next.js 페이지 (Server Component)
    ↓
서버 액션 (Server Action)
    ↓
Supabase 클라이언트
    ↓
PostgreSQL 데이터베이스 (boards, posts 테이블)
```

---

## 페이지 구조

### 1. 공지사항 목록 페이지
**경로**: `/news/announcements`  
**파일**: `app/news/announcements/page.tsx`

**기능**:
- 공지사항 목록 표시
- 관리자만 "공지사항 작성" 버튼 표시
- 빈 목록 처리

**데이터 흐름**:
```typescript
AnnouncementsPage (Server Component)
  ↓
getNotices(1, 20) 호출
  ↓
Supabase에서 posts 테이블 조회
  - board_id = 공지사항 게시판 ID
  - is_notice = TRUE
  - deleted_at IS NULL
  ↓
목록 렌더링
```

**주요 코드**:
```26:32:app/news/announcements/page.tsx
export default async function AnnouncementsPage() {
  const user = await getCurrentUser()
  const canCreate = isAdmin(user)
  
  // 실제 데이터 가져오기
  const result = await getNotices(1, 20)
  const announcements = result.notices || []
```

---

### 2. 공지사항 상세 페이지
**경로**: `/news/announcements/[id]`  
**파일**: `app/news/announcements/[id]/page.tsx`

**기능**:
- 공지사항 상세 내용 표시
- 조회수 자동 증가
- 작성자 이름 표시
- 메타데이터 생성 (SEO)

**데이터 흐름**:
```
페이지 요청
  ↓
generateMetadata() 실행
  → getNotice(id, false) 호출 (조회수 증가 안 함)
  ↓
AnnouncementDetailPage() 실행
  → getNotice(id, true) 호출 (조회수 증가)
  → 작성자 이름 조회 (profiles 테이블)
  ↓
BoardDetail 컴포넌트로 렌더링
```

**중요**: `generateMetadata`와 페이지 컴포넌트에서 각각 `getNotice`를 호출하므로, 조회수 증가는 페이지 컴포넌트에서만 실행되도록 `incrementView` 파라미터로 제어합니다.

**주요 코드**:
```17:33:app/news/announcements/[id]/page.tsx
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    // generateMetadata에서는 조회수 증가하지 않음
    const result = await getNotice(id, false)
    
    if (result.success && result.notice) {
        return {
            title: `${result.notice.title} | 공지사항 | 혜광교회`,
            description: result.notice.title,
        }
    }
    
    return {
        title: '공지사항 | 혜광교회',
        description: '혜광교회 공지사항',
    }
}
```

---

### 3. 공지사항 작성 페이지
**경로**: `/news/announcements/new`  
**파일**: `app/news/announcements/new/page.tsx`

**기능**:
- 관리자 권한 확인
- 비관리자는 목록 페이지로 리다이렉트
- 작성 폼 렌더링

**권한 체크**:
```12:23:app/news/announcements/new/page.tsx
export default async function NewAnnouncementPage() {
  const user = await getCurrentUser()

  // 로그인 확인
  if (!user) {
    redirect('/login?redirect=/news/announcements/new')
  }

  // 관리자 권한 확인
  if (!isAdmin(user)) {
    redirect('/news/announcements')
  }
```

---

## 컴포넌트 구조

### 1. AnnouncementForm (작성 폼)
**파일**: `components/announcement-form.tsx`  
**타입**: Client Component (`'use client'`)

**기능**:
- 제목, 내용 입력
- 중요 공지 상단 고정 옵션
- 폼 제출 처리
- 작성 후 목록 페이지로 이동

**상태 관리**:
```17:21:components/announcement-form.tsx
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    is_pinned: false,
  })
```

**제출 흐름**:
```23:54:components/announcement-form.tsx
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      console.log('공지사항 작성 시작...', { title: formData.title })
      
      const result = await createNotice({
        title: formData.title,
        content: formData.content,
        is_pinned: formData.is_pinned,
      })

      console.log('Create notice result:', result)

      if (result.success) {
        console.log('공지사항 작성 성공, 목록 페이지로 이동...')
        // 목록 페이지로 이동 (강제 새로고침)
        window.location.href = '/news/announcements'
        return // 이동하므로 아래 코드 실행 안 됨
      } else {
        console.error('공지사항 작성 실패:', result.error)
        setError(result.error || '공지사항 작성에 실패했습니다.')
        setIsLoading(false)
      }
    } catch (err) {
      console.error('Submit error:', err)
      setError('공지사항 작성 중 오류가 발생했습니다.')
      setIsLoading(false)
    }
  }
```

---

### 2. BoardDetail (상세 표시)
**파일**: `components/board-detail.tsx`  
**타입**: Client Component

**기능**:
- 게시글 상세 내용 표시
- 작성자, 날짜, 조회수 표시
- 마크다운 콘텐츠 렌더링
- 첨부파일 표시

**재사용**: 교제 게시판과 공지사항 모두에서 사용

---

## 서버 액션 (API)

**파일**: `app/actions/announcements.ts`  
**타입**: Server Actions (`'use server'`)

### 1. createNotice - 공지사항 작성

**기능**:
- 관리자 권한 확인
- 공지사항 게시판 찾기
- `posts` 테이블에 `is_notice = TRUE`로 저장

**흐름**:
```22:115:app/actions/announcements.ts
export async function createNotice(data: CreateNoticeInput): Promise<NoticeResult> {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return {
        success: false,
        error: '로그인이 필요합니다.',
      }
    }

    if (!isAdmin(user)) {
      return {
        success: false,
        error: '관리자만 공지사항을 작성할 수 있습니다.',
      }
    }

    if (!data.title || !data.title.trim()) {
      return {
        success: false,
        error: '제목을 입력해주세요.',
      }
    }

    if (!data.content || !data.content.trim()) {
      return {
        success: false,
        error: '내용을 입력해주세요.',
      }
    }

    const supabase = await createClient()

    // 공지사항 게시판 찾기 (이름이 '공지사항'인 게시판)
    const { data: noticeBoard, error: boardError } = await supabase
      .from('boards')
      .select('board_id')
      .eq('name', '공지사항')
      .single()

    if (boardError || !noticeBoard) {
      return {
        success: false,
        error: '공지사항 게시판을 찾을 수 없습니다.',
      }
    }

    // 공지사항을 posts 테이블에 저장 (is_notice = TRUE)
    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        board_id: noticeBoard.board_id,
        author_user_id: user.id,
        title: data.title.trim(),
        content: data.content.trim(),
        is_notice: true,
        is_pinned: data.is_pinned ?? false,
        view_count: 0,
      })
      .select('post_id')
      .single()

    if (error) {
      console.error('공지사항 작성 에러:', error)
      console.error('에러 상세:', JSON.stringify(error, null, 2))
      return {
        success: false,
        error: error.message || '공지사항 작성에 실패했습니다.',
      }
    }

    if (!post) {
      console.error('게시물 생성 실패: post 데이터 없음')
      return {
        success: false,
        error: '게시물이 생성되지 않았습니다.',
      }
    }

    console.log('공지사항 작성 성공:', { post_id: post.post_id })

    return {
      success: true,
      id: post.post_id?.toString() || '',
    }
  } catch (error) {
    console.error('Create notice error:', error)
    return {
      success: false,
      error: '공지사항 작성 중 오류가 발생했습니다.',
    }
  }
}
```

---

### 2. getNotices - 공지사항 목록 조회

**기능**:
- 공지사항 게시판 찾기
- `is_notice = TRUE`인 게시물만 조회
- 페이지네이션 지원
- 고정 공지 우선 정렬

**흐름**:
```120:190:app/actions/announcements.ts
export async function getNotices(page: number = 1, limit: number = 10) {
  try {
    const supabase = await createClient()

    // 공지사항 게시판 찾기
    const { data: noticeBoard } = await supabase
      .from('boards')
      .select('board_id')
      .eq('name', '공지사항')
      .single()

    if (!noticeBoard) {
      return {
        success: true,
        notices: [],
        total: 0,
      }
    }

    const from = (page - 1) * limit
    const to = from + limit - 1

    // 공지사항 게시판의 is_notice = TRUE인 게시물만 가져오기
    const { data, error, count } = await supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .eq('board_id', noticeBoard.board_id)
      .eq('is_notice', true)
      .is('deleted_at', null)
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) {
      console.error('공지사항 목록 조회 에러:', error)
      return {
        success: false,
        error: error.message,
        notices: [],
        total: 0,
      }
    }

    // posts 테이블 구조를 notices와 호환되도록 변환
    const notices = (data || []).map((post: any) => ({
      id: post.post_id.toString(),
      title: post.title,
      content: post.content,
      author_id: post.author_user_id,
      is_pinned: post.is_pinned || false,
      view_count: post.view_count || 0,
      created_at: post.created_at,
      updated_at: post.updated_at,
      attachments: [],
    }))

    return {
      success: true,
      notices,
      total: count || 0,
    }
  } catch (error) {
    console.error('Get notices error:', error)
    return {
      success: false,
      error: '공지사항 목록을 불러오는 중 오류가 발생했습니다.',
      notices: [],
      total: 0,
    }
  }
}
```

---

### 3. getNotice - 공지사항 상세 조회

**기능**:
- 공지사항 상세 정보 조회
- 조회수 증가 (옵션)
- `post_id`를 문자열로 변환하여 반환

**중요**: `incrementView` 파라미터로 조회수 증가를 제어합니다.
- `generateMetadata`: `false` (조회수 증가 안 함)
- 페이지 컴포넌트: `true` (조회수 증가)

**흐름**:
```197:257:app/actions/announcements.ts
export async function getNotice(id: string, incrementView: boolean = true) {
  try {
    const supabase = await createClient()

    const postId = parseInt(id, 10)
    if (isNaN(postId)) {
      return {
        success: false,
        error: '유효하지 않은 공지사항 ID입니다.',
        notice: null,
      }
    }

    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('post_id', postId)
      .eq('is_notice', true)
      .is('deleted_at', null)
      .single()

    if (error || !post) {
      console.error('공지사항 상세 조회 에러:', error)
      return {
        success: false,
        error: error?.message || '공지사항을 찾을 수 없습니다.',
        notice: null,
      }
    }

    // 조회수 증가 (옵션)
    if (incrementView) {
      await supabase.rpc('increment_post_view_count', { p_post_id: postId })
    }

    // posts 테이블 구조를 notices와 호환되도록 변환
    const notice = {
      id: post.post_id.toString(),
      title: post.title,
      content: post.content,
      author_id: post.author_user_id,
      is_pinned: post.is_pinned || false,
      view_count: post.view_count || 0,
      created_at: post.created_at,
      updated_at: post.updated_at,
      attachments: [],
    }

    return {
      success: true,
      notice,
    }
  } catch (error) {
    console.error('Get notice error:', error)
    return {
      success: false,
      error: '공지사항을 불러오는 중 오류가 발생했습니다.',
      notice: null,
    }
  }
}
```

---

## 데이터베이스 구조

### 테이블 구조

공지사항은 **범용 게시판 시스템**을 사용합니다:

#### 1. boards 테이블
게시판 정보를 저장합니다.

```sql
CREATE TABLE boards (
    board_id BIGSERIAL PRIMARY KEY,
    parent_board_id BIGINT,  -- 계층 구조 지원
    name VARCHAR(100) NOT NULL,  -- '공지사항'
    visibility board_visibility DEFAULT 'PUBLIC',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**초기 데이터**: 마이그레이션 실행 시 "공지사항" 게시판이 자동 생성됩니다.

---

#### 2. posts 테이블
게시물 정보를 저장합니다. 공지사항은 `is_notice = TRUE`로 구분합니다.

```sql
CREATE TABLE posts (
    post_id BIGSERIAL PRIMARY KEY,
    board_id BIGINT NOT NULL,  -- 공지사항 게시판 ID
    author_user_id UUID NOT NULL,  -- 작성자 UUID
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    author_ip VARCHAR(45),
    is_notice BOOLEAN DEFAULT FALSE,  -- 공지사항 여부
    is_pinned BOOLEAN DEFAULT FALSE,  -- 상단 고정
    view_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,  -- Soft delete
    CONSTRAINT fk_posts_board FOREIGN KEY (board_id) REFERENCES boards(board_id),
    CONSTRAINT fk_posts_author FOREIGN KEY (author_user_id) REFERENCES auth.users(id)
);
```

**공지사항 식별 방법**:
- `board_id` = 공지사항 게시판 ID
- `is_notice` = `TRUE`

---

### 데이터베이스 함수

#### increment_post_view_count
조회수 증가 함수

```sql
CREATE OR REPLACE FUNCTION increment_post_view_count(p_post_id BIGINT)
RETURNS void AS $$
BEGIN
    UPDATE posts
    SET view_count = view_count + 1
    WHERE post_id = p_post_id AND deleted_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 데이터 흐름

### 1. 공지사항 작성 흐름

```
사용자 (관리자)
  ↓
AnnouncementForm (Client Component)
  ↓ 폼 제출
createNotice() (Server Action)
  ↓
권한 확인 (isAdmin)
  ↓
공지사항 게시판 찾기 (boards 테이블)
  ↓
posts 테이블에 INSERT
  - board_id: 공지사항 게시판 ID
  - is_notice: TRUE
  - is_pinned: 사용자 선택
  ↓
post_id 반환
  ↓
목록 페이지로 리다이렉트
```

---

### 2. 공지사항 목록 조회 흐름

```
사용자
  ↓
AnnouncementsPage (Server Component)
  ↓
getNotices(1, 20) 호출
  ↓
공지사항 게시판 찾기
  ↓
posts 테이블 조회
  - WHERE board_id = 공지사항 게시판 ID
  - AND is_notice = TRUE
  - AND deleted_at IS NULL
  - ORDER BY is_pinned DESC, created_at DESC
  ↓
데이터 변환 (post_id → id 문자열)
  ↓
목록 렌더링
```

---

### 3. 공지사항 상세 조회 흐름

```
사용자
  ↓
페이지 요청 (/news/announcements/[id])
  ↓
generateMetadata() 실행
  → getNotice(id, false) 호출
  → 조회수 증가 안 함
  ↓
AnnouncementDetailPage() 실행
  → getNotice(id, true) 호출
  → 조회수 증가
  → 작성자 이름 조회 (profiles 테이블)
  ↓
BoardDetail 컴포넌트 렌더링
```

**중요**: `generateMetadata`와 페이지 컴포넌트에서 각각 `getNotice`를 호출하므로, 조회수는 페이지 컴포넌트에서만 증가합니다.

---

## 권한 체계

### 권한 확인 함수
**파일**: `lib/utils/permissions.ts`

```typescript
export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin' || false
}

export function canCreateNotice(user: User | null): boolean {
  return isAdmin(user)
}
```

---

### RLS (Row Level Security) 정책

#### 읽기 권한
```sql
-- 모든 사용자가 삭제되지 않은 게시물 읽기 가능
CREATE POLICY "Anyone can read posts"
ON posts FOR SELECT
USING (deleted_at IS NULL);
```

#### 작성 권한
```sql
-- 관리자는 공지사항(is_notice = TRUE) 작성 가능
CREATE POLICY "Admins can create notices"
ON posts FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND auth.uid() = author_user_id
  AND is_notice = TRUE
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);
```

---

## 주요 특징

### 1. 범용 게시판 시스템 활용
- 별도의 `notices` 테이블 대신 `posts` 테이블 사용
- `is_notice` 플래그로 공지사항 구분
- 다른 게시판과 동일한 구조로 확장 가능

### 2. 계층 구조 지원
- `boards` 테이블의 `parent_board_id`로 게시판 계층 구조 지원
- 향후 하위 게시판 생성 가능

### 3. Soft Delete
- `deleted_at` 컬럼으로 논리 삭제
- 실제 데이터는 유지하되 조회에서 제외

### 4. 조회수 중복 증가 방지
- `generateMetadata`에서는 조회수 증가 안 함
- 페이지 컴포넌트에서만 조회수 증가

---

## 파일 구조 요약

```
app/
├── news/
│   └── announcements/
│       ├── page.tsx              # 목록 페이지
│       ├── [id]/
│       │   └── page.tsx          # 상세 페이지
│       └── new/
│           └── page.tsx          # 작성 페이지
│
app/actions/
└── announcements.ts               # 서버 액션 (API)

components/
├── announcement-form.tsx         # 작성 폼 컴포넌트
└── board-detail.tsx              # 상세 표시 컴포넌트 (재사용)

lib/utils/
└── permissions.ts                 # 권한 체크 함수

supabase/migrations/
├── 20250105000000_create_boards_system.sql  # 게시판 시스템
└── 20250106000000_add_is_pinned_to_posts.sql # is_pinned 컬럼 추가
```

---

## API 호출 요약

### 작성
- **함수**: `createNotice(data)`
- **권한**: 관리자만
- **동작**: `posts` 테이블에 `is_notice = TRUE`로 저장

### 목록 조회
- **함수**: `getNotices(page, limit)`
- **권한**: 모든 사용자
- **동작**: 공지사항 게시판의 `is_notice = TRUE` 게시물 조회

### 상세 조회
- **함수**: `getNotice(id, incrementView)`
- **권한**: 모든 사용자
- **동작**: 게시물 조회 + 조회수 증가 (옵션)

---

**마지막 업데이트**: 2025-01-05
