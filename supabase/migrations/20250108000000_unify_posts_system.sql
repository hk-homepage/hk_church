-- 게시판 통합 마이그레이션
-- profiles 테이블만 존재하는 상태에서 boards와 posts 테이블을 새로 생성
--
-- 참고: 다음 테이블이 이미 존재한다고 가정합니다:
-- - profiles (id uuid, user_id varchar, role varchar, name varchar, email varchar, ...)

-- ============================================
-- 1단계: ENUM 타입 생성
-- ============================================

-- post_type ENUM 생성
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'post_type') THEN
        CREATE TYPE post_type AS ENUM (
            'general',      -- 일반 게시판
            'fellowship',   -- 성도의 교제
            'bulletin',     -- 주보
            'announcement'  -- 공지사항
        );
    END IF;
END $$;

-- board_type ENUM 생성
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'board_type') THEN
        CREATE TYPE board_type AS ENUM (
            'general',
            'fellowship',
            'bulletin',
            'announcement'
        );
    END IF;
END $$;

-- board_visibility ENUM 생성
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'board_visibility') THEN
        CREATE TYPE board_visibility AS ENUM ('PUBLIC', 'PRIVATE');
    END IF;
END $$;

-- ============================================
-- 2단계: boards 테이블 생성
-- ============================================

CREATE TABLE IF NOT EXISTS boards (
    board_id BIGSERIAL PRIMARY KEY,
    parent_board_id BIGINT,
    name VARCHAR(100) NOT NULL,
    slug TEXT UNIQUE,
    board_type board_type DEFAULT 'general',
    visibility board_visibility DEFAULT 'PUBLIC',
    description TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_boards_parent
        FOREIGN KEY (parent_board_id)
        REFERENCES boards(board_id)
        ON DELETE SET NULL
);

-- boards 테이블 인덱스
CREATE INDEX IF NOT EXISTS idx_boards_parent ON boards(parent_board_id);
CREATE INDEX IF NOT EXISTS idx_boards_sort ON boards(sort_order);
CREATE INDEX IF NOT EXISTS idx_boards_type ON boards(board_type);
CREATE INDEX IF NOT EXISTS idx_boards_slug ON boards(slug);

-- ============================================
-- 3단계: posts 테이블 생성
-- ============================================

CREATE TABLE IF NOT EXISTS posts (
    post_id BIGSERIAL PRIMARY KEY,
    board_id BIGINT NOT NULL,
    post_type post_type DEFAULT 'general',
    author_user_id UUID NOT NULL,
    author_name TEXT,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    thumbnail_url TEXT,
    author_ip VARCHAR(45),
    is_notice BOOLEAN DEFAULT FALSE,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    view_count INT DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT fk_posts_board
        FOREIGN KEY (board_id) 
        REFERENCES boards(board_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_posts_author
        FOREIGN KEY (author_user_id) 
        REFERENCES auth.users(id)
        ON DELETE SET NULL
);

-- posts 테이블 인덱스
CREATE INDEX IF NOT EXISTS idx_posts_board ON posts(board_id);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_type ON posts(post_type);
CREATE INDEX IF NOT EXISTS idx_posts_metadata ON posts USING GIN(metadata);
CREATE INDEX IF NOT EXISTS idx_posts_notice ON posts(is_notice, created_at DESC) WHERE is_notice = TRUE;
CREATE INDEX IF NOT EXISTS idx_posts_pinned ON posts(is_pinned, created_at DESC) WHERE is_pinned = TRUE;
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(is_featured, created_at DESC) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_posts_deleted ON posts(deleted_at) WHERE deleted_at IS NULL;

-- ============================================
-- 4단계: 업데이트 시간 자동 갱신 함수
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 업데이트 시간 자동 갱신 트리거
DROP TRIGGER IF EXISTS update_boards_updated_at ON boards;
CREATE TRIGGER update_boards_updated_at
    BEFORE UPDATE ON boards
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 5단계: 조회수 증가 함수
-- ============================================

CREATE OR REPLACE FUNCTION increment_post_view_count(p_post_id BIGINT)
RETURNS void AS $$
BEGIN
    UPDATE posts
    SET view_count = view_count + 1
    WHERE post_id = p_post_id AND deleted_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 6단계: Row Level Security (RLS) 활성화
-- ============================================

ALTER TABLE boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 게시판
-- 모든 사용자가 PUBLIC 게시판 읽기 가능
DROP POLICY IF EXISTS "Anyone can read public boards" ON boards;
CREATE POLICY "Anyone can read public boards"
ON boards FOR SELECT
USING (visibility = 'PUBLIC'::board_visibility);

-- 관리자만 게시판 관리 가능
DROP POLICY IF EXISTS "Admins can manage boards" ON boards;
CREATE POLICY "Admins can manage boards"
ON boards FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- RLS 정책: 게시물
-- 모든 사용자가 삭제되지 않은 게시물 읽기 가능
DROP POLICY IF EXISTS "Anyone can read posts" ON posts;
CREATE POLICY "Anyone can read posts"
ON posts FOR SELECT
USING (deleted_at IS NULL);

-- 인증된 사용자만 게시물 작성 가능
DROP POLICY IF EXISTS "Authenticated users can create posts" ON posts;
CREATE POLICY "Authenticated users can create posts"
ON posts FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = author_user_id);

-- 관리자는 공지사항(is_notice = TRUE) 작성 가능
DROP POLICY IF EXISTS "Admins can create notices" ON posts;
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

-- 작성자만 자신의 게시물 수정 가능
DROP POLICY IF EXISTS "Authors can update their posts" ON posts;
CREATE POLICY "Authors can update their posts"
ON posts FOR UPDATE
USING (
    auth.uid() = author_user_id AND deleted_at IS NULL
);

-- 작성자 또는 관리자만 게시물 삭제 가능 (soft delete)
DROP POLICY IF EXISTS "Authors or admins can delete posts" ON posts;
CREATE POLICY "Authors or admins can delete posts"
ON posts FOR UPDATE
USING (
    (
        auth.uid() = author_user_id OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    ) AND deleted_at IS NULL
);

-- ============================================
-- 7단계: 게시판 초기 데이터 생성
-- ============================================

-- 공지사항 게시판 생성
INSERT INTO boards (name, slug, board_type, description, sort_order)
VALUES ('공지사항', 'announcements', 'announcement', '교회 공지사항', 0)
ON CONFLICT (slug) DO UPDATE SET
    board_type = EXCLUDED.board_type,
    description = EXCLUDED.description;

-- 성도의 교제 게시판 생성
INSERT INTO boards (name, slug, board_type, description, sort_order)
VALUES 
    ('은혜 나눔', 'fellowship-grace', 'fellowship', '하나님께서 주신 은혜를 나누는 공간입니다', 1),
    ('감사 나눔', 'fellowship-thanks', 'fellowship', '감사의 마음을 나누는 공간입니다', 2),
    ('일상 나눔', 'fellowship-daily', 'fellowship', '일상의 소소한 이야기를 나누는 공간입니다', 3)
ON CONFLICT (slug) DO UPDATE SET
    board_type = EXCLUDED.board_type,
    description = EXCLUDED.description;

-- 주보 게시판 생성
INSERT INTO boards (name, slug, board_type, description, sort_order)
VALUES ('주보', 'bulletins', 'bulletin', '교회 주보 아카이브', 0)
ON CONFLICT (slug) DO UPDATE SET
    board_type = EXCLUDED.board_type,
    description = EXCLUDED.description;

-- ============================================
-- 8단계: 데이터 검증 뷰 생성
-- ============================================

-- 게시물 타입별 요약 뷰
CREATE OR REPLACE VIEW posts_type_summary AS
SELECT 
    post_type,
    COUNT(*) as count,
    MIN(created_at) as earliest_post,
    MAX(created_at) as latest_post
FROM posts
WHERE deleted_at IS NULL
GROUP BY post_type;

-- 게시판별 게시물 수 뷰
CREATE OR REPLACE VIEW boards_posts_summary AS
SELECT 
    b.board_id,
    b.name,
    b.slug,
    b.board_type,
    COUNT(p.post_id) as post_count
FROM boards b
LEFT JOIN posts p ON b.board_id = p.board_id AND p.deleted_at IS NULL
GROUP BY b.board_id, b.name, b.slug, b.board_type
ORDER BY b.sort_order;
