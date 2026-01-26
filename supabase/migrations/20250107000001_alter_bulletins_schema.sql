-- 주보 테이블 스키마 수정
-- pdf_url을 NULL 허용으로 변경하고, page_count 기본값 추가, CHECK 제약조건 추가

-- pdf_url을 NULL 허용으로 변경
ALTER TABLE bulletins 
  ALTER COLUMN pdf_url DROP NOT NULL;

-- page_count에 기본값 1 추가
ALTER TABLE bulletins 
  ALTER COLUMN page_count SET DEFAULT 1;

-- 기존 데이터의 page_count가 NULL이면 1로 업데이트
UPDATE bulletins 
SET page_count = 1 
WHERE page_count IS NULL;

-- CHECK 제약조건 추가: PDF 또는 이미지 중 하나는 필수
-- 기존에 같은 이름의 제약조건이 있을 수 있으므로 먼저 삭제 시도
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'check_file_exists' 
    AND conrelid = 'bulletins'::regclass
  ) THEN
    ALTER TABLE bulletins DROP CONSTRAINT check_file_exists;
  END IF;
END $$;

ALTER TABLE bulletins 
  ADD CONSTRAINT check_file_exists CHECK (
    (pdf_url IS NOT NULL AND pdf_url != '') OR 
    (cover_image_url IS NOT NULL AND cover_image_url != '')
  );
