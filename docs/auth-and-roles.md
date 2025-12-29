# 인증 및 권한 시스템 (향후 구현)

## 개요

이 문서는 향후 구현될 사용자 인증 및 권한 관리 시스템을 설명합니다.

## 사용자 역할

### 역할 정의

```typescript
type UserRole = 'admin' | 'member' | 'guest'
```

#### 1. Guest (비회원)
- **권한**: 읽기 전용
- **접근 가능**:
  - 모든 공개 페이지 조회
  - 게시글 목록 및 상세 조회
  - 공지사항, 주보, 갤러리 조회

#### 2. Member (회원)
- **권한**: 읽기 + 작성
- **접근 가능**:
  - Guest 권한 전체
  - 게시글 작성
  - 댓글 작성
  - 자신의 게시글/댓글 수정/삭제
  - 마이페이지 접근

#### 3. Admin (관리자)
- **권한**: 전체 관리
- **접근 가능**:
  - Member 권한 전체
  - 모든 게시글/댓글 수정/삭제
  - 게시글 고정/추천 설정
  - 사용자 관리
  - 콘텐츠 관리
  - 사이트 설정

## 인증 시스템

### Supabase Auth 사용

```typescript
// 회원가입
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
  options: {
    data: {
      name: '홍길동',
      phone: '010-1234-5678',
    }
  }
})

// 로그인
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
})

// 로그아웃
const { error } = await supabase.auth.signOut()

// 세션 확인
const { data: { session } } = await supabase.auth.getSession()
```

### 소셜 로그인 (선택사항)

```typescript
// Google 로그인
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
})

// Kakao 로그인
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'kakao',
})
```

## 권한 관리

### Row Level Security (RLS)

#### 게시글 정책

```sql
-- 모든 사용자가 게시글 읽기 가능
CREATE POLICY "Anyone can read posts"
ON fellowship_posts FOR SELECT
USING (true);

-- 인증된 사용자만 게시글 작성 가능
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
```

#### 댓글 정책

```sql
-- 모든 사용자가 댓글 읽기 가능
CREATE POLICY "Anyone can read comments"
ON fellowship_comments FOR SELECT
USING (true);

-- 인증된 사용자만 댓글 작성 가능
CREATE POLICY "Authenticated users can insert comments"
ON fellowship_comments FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- 작성자만 자신의 댓글 수정/삭제 가능
CREATE POLICY "Authors can update their comments"
ON fellowship_comments FOR UPDATE
USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their comments"
ON fellowship_comments FOR DELETE
USING (auth.uid() = author_id);
```

### 권한 체크 함수

```typescript
// lib/utils/permissions.ts

export function canCreatePost(user: User | null): boolean {
  return user !== null
}

export function canEditPost(user: User | null, post: FellowshipPost): boolean {
  if (!user) return false
  return user.id === post.author_id || user.role === 'admin'
}

export function canDeletePost(user: User | null, post: FellowshipPost): boolean {
  if (!user) return false
  return user.id === post.author_id || user.role === 'admin'
}

export function canPinPost(user: User | null): boolean {
  return user?.role === 'admin'
}

export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin'
}
```

## UI 조건부 렌더링

### 권한에 따른 버튼 표시

```tsx
// 게시글 상세 페이지
export default function PostDetailPage({ post, user }) {
  return (
    <div>
      <BoardDetail post={post} />
      
      {/* 작성자 또는 관리자만 수정/삭제 버튼 표시 */}
      {canEditPost(user, post) && (
        <div className="flex gap-2">
          <Button onClick={handleEdit}>수정</Button>
          <Button variant="destructive" onClick={handleDelete}>
            삭제
          </Button>
        </div>
      )}
      
      {/* 관리자만 고정 버튼 표시 */}
      {isAdmin(user) && (
        <Button onClick={handlePin}>
          {post.is_pinned ? '고정 해제' : '고정'}
        </Button>
      )}
    </div>
  )
}
```

### 로그인 상태에 따른 UI

```tsx
// 헤더 컴포넌트
export function Header() {
  const { user } = useAuth()
  
  return (
    <header>
      {/* ... */}
      
      {user ? (
        <div className="flex items-center gap-2">
          <span>{user.name}님</span>
          <Button onClick={handleLogout}>로그아웃</Button>
          {isAdmin(user) && (
            <Button asChild>
              <Link href="/admin">관리자</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/login">로그인</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/signup">회원가입</Link>
          </Button>
        </div>
      )}
    </header>
  )
}
```

## 보안 고려사항

### 1. 비밀번호 정책

- 최소 8자 이상
- 영문, 숫자, 특수문자 조합
- 일반적인 비밀번호 금지

### 2. 세션 관리

- JWT 토큰 사용 (Supabase 자동 처리)
- 토큰 만료 시간: 1시간
- Refresh 토큰으로 자동 갱신

### 3. CSRF 방지

- Next.js Server Actions 사용 (자동 CSRF 보호)
- SameSite 쿠키 설정

### 4. XSS 방지

- React 자동 이스케이프
- 사용자 입력 sanitize
- Content Security Policy 설정

## 관리자 페이지

### 라우팅 구조

```
/admin
├── /dashboard          # 대시보드
├── /posts              # 게시글 관리
│   ├── /grace         # 은혜 나눔 관리
│   ├── /thanks        # 감사 나눔 관리
│   └── /daily         # 일상 나눔 관리
├── /users              # 사용자 관리
├── /content            # 콘텐츠 관리
│   ├── /notices       # 공지사항
│   ├── /bulletins     # 주보
│   └── /gallery       # 갤러리
└── /settings           # 사이트 설정
```

### 관리자 전용 기능

- 게시글 일괄 관리 (삭제, 이동, 고정)
- 사용자 권한 변경
- 통계 및 분석
- 사이트 설정 변경
- 백업 및 복원

## 구현 로드맵

### Phase 1: 기본 인증
- [ ] Supabase Auth 설정
- [ ] 회원가입/로그인 페이지
- [ ] 세션 관리
- [ ] 프로필 페이지

### Phase 2: 권한 관리
- [ ] 역할 기반 권한 시스템
- [ ] RLS 정책 구현
- [ ] 권한 체크 함수
- [ ] UI 조건부 렌더링

### Phase 3: 관리자 기능
- [ ] 관리자 대시보드
- [ ] 게시글 관리
- [ ] 사용자 관리
- [ ] 통계 페이지

### Phase 4: 고급 기능
- [ ] 소셜 로그인
- [ ] 2단계 인증
- [ ] 활동 로그
- [ ] 알림 시스템

---

**마지막 업데이트**: 2025-12-29
