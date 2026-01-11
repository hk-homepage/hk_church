# Supabase CRUD 작업 가이드라인

이 문서는 프로젝트에서 Supabase를 사용한 CRUD 작업과 인증 처리에 대한 가이드라인입니다.

## 📋 목차

1. [Supabase 클라이언트 사용법](#supabase-클라이언트-사용법)
2. [인증 관련 함수](#인증-관련-함수)
3. [CRUD 작업 패턴](#crud-작업-패턴)
4. [에러 처리](#에러-처리)
5. [RLS (Row Level Security) 이해](#rls-row-level-security-이해)
6. [실전 예제](#실전-예제)

---

## Supabase 클라이언트 사용법

프로젝트에는 3가지 Supabase 클라이언트가 있습니다. 각각의 용도와 사용 시나리오를 이해해야 합니다.

### 1. `lib/supabase/client.ts` (브라우저용)

**용도**:** 클라이언트 컴포넌트에서 사용

**사용 시나리오:**
- 브라우저에서 실행되는 코드
- 실시간 구독 (`onAuthStateChange`, `on()` 등)
- 클라이언트 사이드 데이터 조회

**예제:**
```typescript
'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect } from 'react'

export function MyComponent() {
  useEffect(() => {
    const supabase = createClient()
    
    // 인증 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session)
      }
    )
    
    return () => subscription.unsubscribe()
  }, [])
}
```

### 2. `lib/supabase/server.ts` (서버용)

**용도**:** Server Components, Server Actions에서 사용

**사용 시나리오:**
- 서버에서 실행되는 모든 코드
- Server Actions (`app/actions/*.ts`)
- Server Components (`app/**/page.tsx`)
- 쿠키 기반 세션 관리

**예제:**
```typescript
'use server'

import { createClient } from '@/lib/supabase/server'

export async function getPosts() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
  
  if (error) throw error
  return data
}
```

### 3. `lib/supabase/middleware.ts` (미들웨어용)

**용도**:** Next.js Middleware에서 사용

**사용 시나리오:**
- `middleware.ts` 파일에서만 사용
- 요청마다 세션 자동 갱신
- 보호된 라우트 체크

**예제:**
```typescript
// middleware.ts
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}
```

### 📌 클라이언트 선택 가이드

| 상황 | 사용할 클라이언트 |
|------|------------------|
| 클라이언트 컴포넌트 (`'use client'`) | `client.ts` |
| Server Action (`'use server'`) | `server.ts` |
| Server Component | `server.ts` |
| Middleware | `middleware.ts` |

---

## 인증 관련 함수

`app/actions/auth.ts`에 정의된 인증 관련 함수들입니다.

### `loginAction(userId: string, password: string)`

아이디와 비밀번호로 로그인합니다.

```typescript
import { loginAction } from '@/app/actions/auth'

const result = await loginAction('myuser123', 'password123')

if (result.success) {
  // 로그인 성공
  console.log('User:', result.user)
} else {
  // 로그인 실패
  console.error('Error:', result.error)
}
```

**반환값:**
```typescript
{
  success: boolean
  error?: string
  user?: {
    id: string
    email: string
    userId?: string
  }
}
```

### `signupAction(userId, name, email, password, phone?)`

회원가입을 처리합니다.

```typescript
import { signupAction } from '@/app/actions/auth'

const result = await signupAction(
  'myuser123',           // 아이디
  '홍길동',              // 이름
  'user@example.com',     // 이메일 (필수)
  'password123',          // 비밀번호
  '010-1234-5678'         // 전화번호 (선택)
)

if (result.success) {
  // 회원가입 성공
} else {
  // 회원가입 실패
  console.error(result.error)
}
```

**자동 체크 항목:**
- 아이디 중복 확인
- 이메일 중복 확인
- Supabase Auth 자동 검증

### `logoutAction()`

로그아웃을 처리합니다.

```typescript
import { logoutAction } from '@/app/actions/auth'

await logoutAction()
// 클라이언트에서 페이지 새로고침 필요
window.location.href = '/'
```

### `getCurrentUser()`

현재 로그인한 사용자 정보를 가져옵니다.

```typescript
import { getCurrentUser } from '@/app/actions/auth'

const user = await getCurrentUser()

if (user) {
  console.log('User ID:', user.id)
  console.log('User ID (custom):', user.userId)
  console.log('Name:', user.name)
  console.log('Email:', user.email)
  console.log('Role:', user.role)
  console.log('Status:', user.status)
} else {
  // 로그인하지 않음
}
```

**반환값:**
```typescript
{
  id: string              // UUID (auth.users.id)
  email: string
  userId: string          // 커스텀 아이디
  name: string
  role: string            // 'member', 'admin' 등
  status: string          // 'active', 'inactive' 등
  phone?: string
} | null
```

---

## CRUD 작업 패턴

### 기본 패턴

모든 CRUD 작업은 Server Actions를 통해 처리합니다.

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/app/actions/auth'

export async function createPost(title: string, content: string) {
  // 1. 인증 확인
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: '로그인이 필요합니다.' }
  }

  // 2. Supabase 클라이언트 생성
  const supabase = await createClient()

  // 3. 데이터 삽입
  const { data, error } = await supabase
    .from('posts')
    .insert({
      title,
      content,
      author_id: user.id,
      author_name: user.name,
    })
    .select()
    .single()

  // 4. 에러 처리
  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}
```

### CREATE (생성)

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/app/actions/auth'

export async function createItem(data: { title: string; content: string }) {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: '로그인이 필요합니다.' }
  }

  const supabase = await createClient()
  
  const { data: newItem, error } = await supabase
    .from('items')
    .insert({
      ...data,
      user_id: user.id,
      created_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data: newItem }
}
```

### READ (조회)

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'

// 모든 사용자가 조회 가능
export async function getItems() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

// 특정 사용자의 데이터만 조회
export async function getMyItems() {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: '로그인이 필요합니다.' }
  }

  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

// 단일 항목 조회
export async function getItem(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}
```

### UPDATE (수정)

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/app/actions/auth'

export async function updateItem(
  id: string,
  updates: { title?: string; content?: string }
) {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: '로그인이 필요합니다.' }
  }

  const supabase = await createClient()

  // 권한 확인 (작성자만 수정 가능)
  const { data: existingItem } = await supabase
    .from('items')
    .select('user_id')
    .eq('id', id)
    .single()

  if (!existingItem) {
    return { success: false, error: '항목을 찾을 수 없습니다.' }
  }

  if (existingItem.user_id !== user.id) {
    return { success: false, error: '수정 권한이 없습니다.' }
  }

  // 수정
  const { data, error } = await supabase
    .from('items')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}
```

### DELETE (삭제)

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/app/actions/auth'

export async function deleteItem(id: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: '로그인이 필요합니다.' }
  }

  const supabase = await createClient()

  // 권한 확인
  const { data: existingItem } = await supabase
    .from('items')
    .select('user_id')
    .eq('id', id)
    .single()

  if (!existingItem) {
    return { success: false, error: '항목을 찾을 수 없습니다.' }
  }

  // 관리자 또는 작성자만 삭제 가능
  const isAuthor = existingItem.user_id === user.id
  const isAdmin = user.role === 'admin'

  if (!isAuthor && !isAdmin) {
    return { success: false, error: '삭제 권한이 없습니다.' }
  }

  // 삭제
  const { error } = await supabase
    .from('items')
    .delete()
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}
```

---

## 에러 처리

### 표준 에러 처리 패턴

모든 Server Action은 일관된 에러 처리 패턴을 사용합니다.

```typescript
'use server'

export async function myAction() {
  try {
    // 작업 수행
    const result = await doSomething()
    
    return {
      success: true,
      data: result
    }
  } catch (error) {
    // 개발 환경에서만 로그 출력
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', error)
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : '오류가 발생했습니다.'
    }
  }
}
```

### 클라이언트에서 에러 처리

```typescript
'use client'

import { myAction } from '@/app/actions/my-action'

export function MyComponent() {
  const handleSubmit = async () => {
    const result = await myAction()
    
    if (result.success) {
      // 성공 처리
      console.log('Success:', result.data)
    } else {
      // 에러 처리
      alert(result.error)
    }
  }
  
  return <button onClick={handleSubmit}>Submit</button>
}
```

---

## RLS (Row Level Security) 이해

RLS는 데이터베이스 레벨에서 행 단위 접근 제어를 제공합니다.

### RLS 정책 예시

```sql
-- 모든 사용자가 읽기 가능
CREATE POLICY "Anyone can read items"
ON items FOR SELECT
USING (true);

-- 인증된 사용자만 생성 가능
CREATE POLICY "Authenticated users can insert"
ON items FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- 작성자만 수정 가능
CREATE POLICY "Authors can update"
ON items FOR UPDATE
USING (auth.uid() = user_id);

-- 작성자 또는 관리자만 삭제 가능
CREATE POLICY "Authors or admins can delete"
ON items FOR DELETE
USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);
```

### RLS와 애플리케이션 로직

RLS는 **추가 보안 레이어**입니다. 애플리케이션 로직에서도 권한을 확인해야 합니다.

```typescript
// ❌ 나쁜 예: RLS만 의존
export async function deleteItem(id: string) {
  const supabase = await createClient()
  await supabase.from('items').delete().eq('id', id)
  // RLS가 막아주지만, 사용자에게 명확한 에러 메시지 제공 불가
}

// ✅ 좋은 예: 애플리케이션 로직 + RLS
export async function deleteItem(id: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: '로그인이 필요합니다.' }
  }

  // 권한 확인
  const { data: item } = await supabase
    .from('items')
    .select('user_id')
    .eq('id', id)
    .single()

  if (item?.user_id !== user.id && user.role !== 'admin') {
    return { success: false, error: '권한이 없습니다.' }
  }

  // 삭제 (RLS가 추가 보안 제공)
  const { error } = await supabase
    .from('items')
    .delete()
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}
```

---

## 실전 예제

### 예제 1: 게시판 글 작성

```typescript
// app/actions/posts.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/app/actions/auth'

export async function createPost(data: {
  title: string
  content: string
  category: string
}) {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: '로그인이 필요합니다.' }
  }

  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from('posts')
    .insert({
      ...data,
      author_id: user.id,
      author_name: user.name,
      view_count: 0,
      created_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Create post error:', error)
    }
    return { success: false, error: '글 작성에 실패했습니다.' }
  }

  return { success: true, data: post }
}
```

### 예제 2: 댓글 작성

```typescript
// app/actions/comments.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/app/actions/auth'

export async function createComment(postId: string, content: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: '로그인이 필요합니다.' }
  }

  const supabase = await createClient()

  // 게시글 존재 확인
  const { data: post } = await supabase
    .from('posts')
    .select('id')
    .eq('id', postId)
    .single()

  if (!post) {
    return { success: false, error: '게시글을 찾을 수 없습니다.' }
  }

  // 댓글 작성
  const { data: comment, error } = await supabase
    .from('comments')
    .insert({
      post_id: postId,
      author_id: user.id,
      author_name: user.name,
      content,
      created_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    return { success: false, error: '댓글 작성에 실패했습니다.' }
  }

  return { success: true, data: comment }
}
```

### 예제 3: 프로필 수정

```typescript
// app/actions/profile.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/app/actions/auth'

export async function updateProfile(updates: {
  name?: string
  phone?: string
}) {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: '로그인이 필요합니다.' }
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)
    .select()
    .single()

  if (error) {
    return { success: false, error: '프로필 수정에 실패했습니다.' }
  }

  return { success: true, data }
}
```

---

## 체크리스트

CRUD 작업을 할 때 다음을 확인하세요:

- [ ] 올바른 Supabase 클라이언트 사용 (client/server/middleware)
- [ ] 인증 확인 (`getCurrentUser()`)
- [ ] 권한 확인 (작성자, 관리자 등)
- [ ] 에러 처리 (일관된 패턴)
- [ ] 개발 환경 로그 (`process.env.NODE_ENV === 'development'`)
- [ ] RLS 정책 확인 (데이터베이스 레벨 보안)
- [ ] 반환값 일관성 (`{ success: boolean, data?, error? }`)

---

## 추가 리소스

- [Supabase 공식 문서](https://supabase.com/docs)
- [Next.js App Router 문서](https://nextjs.org/docs/app)
- [Supabase SSR 가이드](https://supabase.com/docs/guides/auth/server-side/nextjs)

---

**마지막 업데이트**: 2025-01-10
