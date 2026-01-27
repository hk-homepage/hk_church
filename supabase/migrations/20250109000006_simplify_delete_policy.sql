-- Soft Delete를 위한 간단한 RLS 정책
-- 문제: UPDATE 작업인 soft delete가 RLS 정책 위반
-- 해결: 관리자 UPDATE 정책을 더 단순하게 수정

-- 관리자 권한 확인 함수 (이미 있으면 재생성)
CREATE OR REPLACE FUNCTION is_admin_user()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$;

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Authors can update their posts" ON posts;
DROP POLICY IF EXISTS "Admins can update any posts" ON posts;
DROP POLICY IF EXISTS "Authors or admins can delete posts" ON posts;

-- 작성자만 자신의 게시물 수정 가능 (일반 수정만, 삭제 불가)
CREATE POLICY "Authors can update their posts"
ON posts FOR UPDATE
USING (
    auth.uid() = author_user_id AND deleted_at IS NULL
)
WITH CHECK (
    auth.uid() = author_user_id AND deleted_at IS NULL
);

-- 관리자는 모든 게시물 수정/삭제 가능
-- USING: 삭제되지 않은 행만 수정 가능
-- WITH CHECK: 모든 변경 허용 (deleted_at 설정 포함)
CREATE POLICY "Admins can update any posts"
ON posts FOR UPDATE
USING (
    is_admin_user() AND deleted_at IS NULL
)
WITH CHECK (
    is_admin_user()  -- 관리자면 모든 필드 변경 허용 (deleted_at 포함)
);
