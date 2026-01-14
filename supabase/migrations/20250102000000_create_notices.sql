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

-- 공지사항 테이블 생성
CREATE TABLE notices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- TEXT로 저장 (향후 JSONB로 변경 가능)
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_pinned BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  attachments JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_notices_created ON notices(created_at DESC);
CREATE INDEX idx_notices_pinned ON notices(is_pinned, created_at DESC);
CREATE INDEX idx_notices_author ON notices(author_id);

-- Row Level Security 활성화
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 모든 사용자가 공지사항 읽기 가능
CREATE POLICY "Anyone can read notices"
ON notices FOR SELECT
USING (true);

-- RLS 정책: 관리자만 공지사항 작성 가능
CREATE POLICY "Only admins can insert notices"
ON notices FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- RLS 정책: 관리자만 공지사항 수정 가능
CREATE POLICY "Only admins can update notices"
ON notices FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- RLS 정책: 관리자만 공지사항 삭제 가능
CREATE POLICY "Only admins can delete notices"
ON notices FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_notice_view_count(notice_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE notices
  SET view_count = view_count + 1
  WHERE id = notice_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 업데이트 시간 자동 갱신 함수 (이미 존재할 수 있음)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 업데이트 시간 자동 갱신 트리거
CREATE TRIGGER update_notices_updated_at
    BEFORE UPDATE ON notices
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
