# RLS 정책 참조 가이드

## posts 테이블 RLS 정책

### 1. SELECT (읽기)
```sql
-- 정책명: "Anyone can read posts"
-- 권한: 모든 사용자
-- 조건: deleted_at IS NULL (삭제되지 않은 게시물만)
```

### 2. INSERT (작성)
```sql
-- 정책명: "Authenticated users can create posts"
-- 권한: 인증된 사용자
-- 조건: auth.uid() IS NOT NULL AND auth.uid() = author_user_id

-- 정책명: "Admins can create notices"
-- 권한: 관리자
-- 조건: is_notice = TRUE AND 관리자 권한 확인
```

### 3. UPDATE (수정/삭제)
```sql
-- 정책명: "Authors can update their posts"
-- 권한: 작성자
-- USING: auth.uid() = author_user_id AND deleted_at IS NULL
-- WITH CHECK: auth.uid() = author_user_id AND deleted_at IS NULL

-- 정책명: "Admins can update any posts"
-- 권한: 관리자
-- USING: 관리자 권한 확인 AND deleted_at IS NULL
-- WITH CHECK: 관리자 권한 확인 (deleted_at 조건 없음 - soft delete 지원)
```

## profiles 테이블 RLS 정책

### 1. SELECT (읽기)
```sql
-- 정책명: "Users can read profiles for RLS"
-- 권한: 모든 사용자
-- 조건: id = auth.uid() OR true (RLS 정책에서 role 확인을 위해)
```

## 현재 정책 확인 쿼리

Supabase SQL Editor에서 실행:

```sql
-- posts 테이블의 모든 정책 확인
SELECT 
    policyname,
    cmd,
    qual as "USING 조건",
    with_check as "WITH CHECK 조건"
FROM pg_policies
WHERE tablename = 'posts'
ORDER BY cmd, policyname;

-- profiles 테이블의 모든 정책 확인
SELECT 
    policyname,
    cmd,
    qual as "USING 조건",
    with_check as "WITH CHECK 조건"
FROM pg_policies
WHERE tablename = 'profiles'
ORDER BY cmd, policyname;

-- RLS 활성화 여부 확인
SELECT 
    tablename,
    rowsecurity as "RLS 활성화"
FROM pg_tables
WHERE tablename IN ('posts', 'profiles', 'boards');
```

## 문제 해결

### 삭제 시 RLS 정책 위반 에러 발생 시

1. **정책 확인**
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'posts' AND cmd = 'UPDATE';
   ```

2. **관리자 권한 확인**
   ```sql
   SELECT id, role FROM profiles WHERE id = auth.uid();
   ```

3. **정책 재생성**
   - `supabase/migrations/20250109000003_fix_posts_rls_for_delete.sql` 실행
