-- 게시판 카테고리 테이블 (선택사항 - 확장성을 위해)
CREATE TABLE fellowship_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,           -- 'grace', 'thanks', 'daily'
  name TEXT NOT NULL,                  -- '은혜 나눔', '감사 나눔', '일상 나눔'
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 게시글 테이블
CREATE TABLE fellowship_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_slug TEXT NOT NULL,         -- 'grace', 'thanks', 'daily'
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,           -- 작성자 이름 (비회원 대비)
  
  -- 메타 정보
  view_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false,     -- 상단 고정
  is_featured BOOLEAN DEFAULT false,   -- 추천글
  
  -- 첨부파일 (JSON 배열)
  attachments JSONB DEFAULT '[]'::jsonb,
  -- 예: [{"name": "image.jpg", "url": "...", "size": 1024, "type": "image/jpeg"}]
  
  -- 이미지 (대표 이미지)
  thumbnail_url TEXT,
  
  -- 타임스탬프
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 인덱스
  CONSTRAINT fk_category FOREIGN KEY (category_slug) 
    REFERENCES fellowship_categories(slug) ON DELETE CASCADE
);

-- 댓글 테이블 (향후 확장)
CREATE TABLE fellowship_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES fellowship_posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES fellowship_comments(id) ON DELETE CASCADE, -- 대댓글
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_fellowship_posts_category ON fellowship_posts(category_slug);
CREATE INDEX idx_fellowship_posts_created ON fellowship_posts(created_at DESC);
CREATE INDEX idx_fellowship_posts_pinned ON fellowship_posts(is_pinned, created_at DESC);
CREATE INDEX idx_fellowship_comments_post ON fellowship_comments(post_id);

-- Row Level Security (RLS) 정책
ALTER TABLE fellowship_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE fellowship_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE fellowship_comments ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 카테고리 읽기 가능
CREATE POLICY "Anyone can read categories"
ON fellowship_categories FOR SELECT
USING (is_active = true);

-- 모든 사용자가 게시글 읽기 가능
CREATE POLICY "Anyone can read posts"
ON fellowship_posts FOR SELECT
USING (true);

-- 인증된 사용자만 게시글 작성 가능 (향후 확장)
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

-- 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_post_view_count(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE fellowship_posts
  SET view_count = view_count + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 업데이트 시간 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_fellowship_posts_updated_at
BEFORE UPDATE ON fellowship_posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 초기 데이터 (Seed)
INSERT INTO fellowship_categories (slug, name, description, display_order) VALUES
  ('grace', '은혜 나눔', '하나님께서 주신 은혜를 나누는 공간입니다', 1),
  ('thanks', '감사 나눔', '감사의 마음을 나누는 공간입니다', 2),
  ('daily', '일상 나눔', '일상의 소소한 이야기를 나누는 공간입니다', 3);
