-- 게시판 시스템 마이그레이션
-- boards, posts, comments, files 테이블 생성

-- profiles 테이블에 role 컬럼이 없는 경우를 대비하여 추가 (이미 있으면 무시됨)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'role'
    ) THEN
        ALTER TABLE profiles ADD COLUMN role TEXT DEFAULT 'member';
    END IF;
END $$;

-- 게시판 가시성 타입
CREATE TYPE board_visibility AS ENUM ('PUBLIC', 'PRIVATE');

-- posts 테이블에 is_pinned 컬럼 추가 (이미 있으면 무시됨)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'posts') THEN
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'posts' AND column_name = 'is_pinned'
        ) THEN
            ALTER TABLE posts ADD COLUMN is_pinned BOOLEAN DEFAULT FALSE;
        END IF;
    END IF;
END $$;

-- 게시판 테이블 (계층 구조 지원)
CREATE TABLE boards (
    board_id BIGSERIAL PRIMARY KEY,
    parent_board_id BIGINT,
    name VARCHAR(100) NOT NULL,
    visibility board_visibility DEFAULT 'PUBLIC',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_boards_parent
        FOREIGN KEY (parent_board_id)
        REFERENCES boards(board_id)
        ON DELETE SET NULL
);

-- 게시물 테이블
CREATE TABLE posts (
    post_id BIGSERIAL PRIMARY KEY,
    board_id BIGINT NOT NULL,
    author_user_id UUID NOT NULL, -- auth.users(id) 참조
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    author_ip VARCHAR(45),
    is_notice BOOLEAN DEFAULT FALSE,
    is_pinned BOOLEAN DEFAULT FALSE, -- 상단 고정
    view_count INT DEFAULT 0,
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

-- 댓글 테이블
CREATE TABLE comments (
    comment_id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL,
    author_user_id UUID NOT NULL, -- auth.users(id) 참조
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT fk_comments_post
        FOREIGN KEY (post_id)
        REFERENCES posts(post_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_comments_author
        FOREIGN KEY (author_user_id)
        REFERENCES auth.users(id)
        ON DELETE SET NULL
);

-- 파일 첨부 테이블
CREATE TABLE files (
    file_id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL,
    uploader_user_id UUID NOT NULL, -- auth.users(id) 참조
    original_name VARCHAR(255) NOT NULL,
    stored_name VARCHAR(255) NOT NULL,
    storage_path VARCHAR(500) NOT NULL,
    mime_type VARCHAR(100),
    file_size BIGINT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_files_post
        FOREIGN KEY (post_id)
        REFERENCES posts(post_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_files_uploader
        FOREIGN KEY (uploader_user_id)
        REFERENCES auth.users(id)
        ON DELETE SET NULL
);

-- 인덱스 생성
CREATE INDEX idx_boards_parent ON boards(parent_board_id);
CREATE INDEX idx_boards_sort ON boards(sort_order);
CREATE INDEX idx_posts_board ON posts(board_id);
CREATE INDEX idx_posts_author ON posts(author_user_id);
CREATE INDEX idx_posts_created ON posts(created_at DESC);
CREATE INDEX idx_posts_notice ON posts(is_notice, created_at DESC) WHERE is_notice = TRUE;
CREATE INDEX idx_posts_pinned ON posts(is_pinned, created_at DESC) WHERE is_pinned = TRUE;
CREATE INDEX idx_posts_deleted ON posts(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_comments_author ON comments(author_user_id);
CREATE INDEX idx_comments_created ON comments(created_at DESC);
CREATE INDEX idx_comments_deleted ON comments(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_files_post ON files(post_id);
CREATE INDEX idx_files_uploader ON files(uploader_user_id);

-- Row Level Security (RLS) 활성화
ALTER TABLE boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 게시판
-- 모든 사용자가 PUBLIC 게시판 읽기 가능
CREATE POLICY "Anyone can read public boards"
ON boards FOR SELECT
USING (visibility = 'PUBLIC'::board_visibility);

-- 관리자만 게시판 관리 가능
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
CREATE POLICY "Anyone can read posts"
ON posts FOR SELECT
USING (deleted_at IS NULL);

-- 인증된 사용자만 게시물 작성 가능
CREATE POLICY "Authenticated users can create posts"
ON posts FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = author_user_id);

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

-- 작성자만 자신의 게시물 수정 가능
CREATE POLICY "Authors can update their posts"
ON posts FOR UPDATE
USING (
    auth.uid() = author_user_id AND deleted_at IS NULL
);

-- 작성자 또는 관리자만 게시물 삭제 가능 (soft delete)
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

-- RLS 정책: 댓글
-- 모든 사용자가 삭제되지 않은 댓글 읽기 가능
CREATE POLICY "Anyone can read comments"
ON comments FOR SELECT
USING (deleted_at IS NULL);

-- 인증된 사용자만 댓글 작성 가능
CREATE POLICY "Authenticated users can create comments"
ON comments FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = author_user_id);

-- 작성자만 자신의 댓글 수정 가능
CREATE POLICY "Authors can update their comments"
ON comments FOR UPDATE
USING (
    auth.uid() = author_user_id AND deleted_at IS NULL
);

-- 작성자 또는 관리자만 댓글 삭제 가능 (soft delete)
CREATE POLICY "Authors or admins can delete comments"
ON comments FOR UPDATE
USING (
    (
        auth.uid() = author_user_id OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    ) AND deleted_at IS NULL
);

-- RLS 정책: 파일
-- 게시물 작성자 또는 관리자만 파일 읽기 가능
CREATE POLICY "Post authors or admins can read files"
ON files FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM posts
        WHERE posts.post_id = files.post_id
        AND (
            posts.author_user_id = auth.uid() OR
            EXISTS (
                SELECT 1 FROM profiles
                WHERE id = auth.uid() AND role = 'admin'
            )
        )
    )
);

-- 인증된 사용자만 파일 업로드 가능
CREATE POLICY "Authenticated users can upload files"
ON files FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = uploader_user_id);

-- 업로더 또는 관리자만 파일 삭제 가능
CREATE POLICY "Uploaders or admins can delete files"
ON files FOR DELETE
USING (
    auth.uid() = uploader_user_id OR
    EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- 업데이트 시간 자동 갱신 함수 (이미 존재할 수 있음)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 업데이트 시간 자동 갱신 트리거
CREATE TRIGGER update_boards_updated_at
    BEFORE UPDATE ON boards
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_post_view_count(p_post_id BIGINT)
RETURNS void AS $$
BEGIN
    UPDATE posts
    SET view_count = view_count + 1
    WHERE post_id = p_post_id AND deleted_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 게시물 삭제 함수 (soft delete)
CREATE OR REPLACE FUNCTION soft_delete_post(p_post_id BIGINT)
RETURNS void AS $$
BEGIN
    UPDATE posts
    SET deleted_at = NOW()
    WHERE post_id = p_post_id AND deleted_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 댓글 삭제 함수 (soft delete)
CREATE OR REPLACE FUNCTION soft_delete_comment(p_comment_id BIGINT)
RETURNS void AS $$
BEGIN
    UPDATE comments
    SET deleted_at = NOW()
    WHERE comment_id = p_comment_id AND deleted_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 공지사항 게시판 초기 데이터 (공지사항 전용 게시판)
INSERT INTO boards (name, visibility, sort_order) 
VALUES ('공지사항', 'PUBLIC', 0)
ON CONFLICT DO NOTHING;
