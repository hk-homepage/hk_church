-- RLS 정책 문제 해결: SECURITY DEFINER 함수 사용
-- 문제: RLS 정책 내에서 profiles 테이블 조회 시 실패
-- 해결: SECURITY DEFINER 함수로 RLS 우회하여 관리자 권한 확인

-- 관리자 권한 확인 함수 (SECURITY DEFINER로 RLS 우회)
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
-- SECURITY DEFINER 함수 사용으로 profiles 테이블 RLS 우회
-- WITH CHECK: 관리자면 모든 필드 변경 허용 (deleted_at 설정 포함)
CREATE POLICY "Admins can update any posts"
ON posts FOR UPDATE
USING (
    is_admin_user() AND deleted_at IS NULL
)
WITH CHECK (
    is_admin_user()  -- 관리자면 모든 필드 수정 가능 (deleted_at 포함)
);
