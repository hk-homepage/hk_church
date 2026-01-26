-- 주보 테이블 생성
CREATE TABLE bulletins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  bulletin_date DATE NOT NULL,
  cover_image_url TEXT,
  pdf_url TEXT NOT NULL,
  page_count INTEGER,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_bulletins_date ON bulletins(bulletin_date DESC);
CREATE INDEX idx_bulletins_created ON bulletins(created_at DESC);
CREATE INDEX idx_bulletins_created_by ON bulletins(created_by);

-- Row Level Security 활성화
ALTER TABLE bulletins ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 모든 사용자가 주보 읽기 가능
CREATE POLICY "Anyone can read bulletins"
ON bulletins FOR SELECT
USING (true);

-- RLS 정책: 관리자만 주보 작성 가능
CREATE POLICY "Only admins can insert bulletins"
ON bulletins FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- RLS 정책: 관리자만 주보 수정 가능
CREATE POLICY "Only admins can update bulletins"
ON bulletins FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- RLS 정책: 관리자만 주보 삭제 가능
CREATE POLICY "Only admins can delete bulletins"
ON bulletins FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 업데이트 시간 자동 갱신 트리거
CREATE TRIGGER update_bulletins_updated_at
    BEFORE UPDATE ON bulletins
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Storage 버킷 생성 (이미 있으면 무시)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'bulletins',
  'bulletins',
  true,
  52428800, -- 50MB 제한
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp']::text[];

-- Storage RLS 정책: 모든 사용자가 주보 파일 읽기 가능
CREATE POLICY "Anyone can view bulletins"
ON storage.objects FOR SELECT
USING (bucket_id = 'bulletins');

-- Storage RLS 정책: 관리자만 주보 파일 업로드 가능
-- 파일 크기와 MIME 타입은 버킷 설정과 클라이언트/서버 측에서 검증
CREATE POLICY "Only admins can upload bulletins"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'bulletins' AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Storage RLS 정책: 관리자만 주보 파일 삭제 가능
CREATE POLICY "Only admins can delete bulletins"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'bulletins' AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);
