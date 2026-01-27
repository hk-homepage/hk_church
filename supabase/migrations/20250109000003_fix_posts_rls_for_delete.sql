-- RLS 정책 수정: 관리자 삭제 및 수정 권한 추가
-- 문제: 관리자가 작성하지 않은 게시물을 삭제/수정할 때 RLS 정책 위반 발생
-- 해결: 관리자 UPDATE 정책을 별도로 추가하고, WITH CHECK 절 추가
-- 추가: profiles 테이블 읽기 정책 추가 (RLS 정책에서 profiles 조회 시 필요)

-- profiles 테이블 읽기 정책 추가 (RLS 정책에서 profiles 조회를 위해 필요)
-- 자신의 프로필 또는 모든 프로필의 role 정보 읽기 가능
DROP POLICY IF EXISTS "Users can read profiles for RLS" ON profiles;
CREATE POLICY "Users can read profiles for RLS"
ON profiles FOR SELECT
USING (
    id = auth.uid() OR
    true  -- RLS 정책에서 role 확인을 위해 모든 프로필의 role 읽기 허용
);

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Authors can update their posts" ON posts;
DROP POLICY IF EXISTS "Authors or admins can delete posts" ON posts;
DROP POLICY IF EXISTS "Admins can update any posts" ON posts;

-- 작성자만 자신의 게시물 수정 가능 (일반 수정)
CREATE POLICY "Authors can update their posts"
ON posts FOR UPDATE
USING (
    auth.uid() = author_user_id AND deleted_at IS NULL
)
WITH CHECK (
    auth.uid() = author_user_id AND deleted_at IS NULL
);

-- 관리자는 모든 게시물 수정 가능 (관리자 수정/삭제)
-- WITH CHECK에서 deleted_at 조건 제거: soft delete 시 deleted_at이 설정되므로
CREATE POLICY "Admins can update any posts"
ON posts FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role = 'admin'
    ) AND deleted_at IS NULL
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
    -- deleted_at 조건 제거: soft delete 시 deleted_at이 설정되므로
);
