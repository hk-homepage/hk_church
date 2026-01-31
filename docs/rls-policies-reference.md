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
-- 권한: 인증된 사용자 (TO authenticated)
-- WITH CHECK: auth.uid() = author_user_id (본인이 작성자로 등록되는 행만 허용)
-- 적용: 성도의 교제(fellowship) 등 일반 사용자 글 작성 시 필요
-- 마이그레이션: supabase/migrations/20260130000000_posts_rls_allow_authenticated_insert.sql
```

RLS INSERT 위반(42501) 발생 시 위 마이그레이션을 Supabase SQL Editor에서 실행하세요.

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

### 첨부파일 업로드 실패 시

글쓰기에서 이미지 첨부 시 예외가 나면 **Storage(스토리지) 정책**을 확인하세요.

1. **Supabase 대시보드 → Storage**
   - 버킷 `public-assets`가 있는지 확인.
   - 없으면 버킷 생성 후 Public으로 설정하거나, 아래 정책으로 업로드를 허용.

2. **버킷 정책 확인**
   - `public-assets` 버킷 → **Policies** 탭.
   - **INSERT** 정책이 있어야 함. 인증된 사용자가 `fellowship-attachments/*` 경로에 업로드할 수 있도록.

3. **정책 추가 예시 (SQL Editor 또는 Policies UI)**
   - Policy name: `Authenticated users can upload fellowship attachments`
   - Allowed operation: **INSERT**
   - Target roles: **authenticated**
   - Policy definition (예시):  
     `bucket_id = 'public-assets'` AND `(storage.foldername(name))[1] = 'fellowship-attachments'`

   Storage 정책은 테이블 RLS와 별개이므로, 위와 같이 Storage용 정책을 따로 추가해야 합니다.

4. **브라우저 콘솔 확인**
   - 개발자 도구(F12) → Console에서 `Storage upload error:` 또는 `uploadAttachment failed:` 로그를 확인하면 Supabase가 반환한 메시지를 볼 수 있습니다.
