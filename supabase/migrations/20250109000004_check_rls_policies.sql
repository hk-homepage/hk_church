-- RLS 정책 확인 쿼리
-- posts 테이블의 모든 RLS 정책 조회

-- posts 테이블의 모든 정책 확인
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'posts'
ORDER BY policyname;

-- profiles 테이블의 모든 정책 확인
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'profiles'
ORDER BY policyname;

-- RLS 활성화 여부 확인
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE tablename IN ('posts', 'profiles', 'boards');
