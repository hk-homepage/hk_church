-- posts 테이블에 is_pinned 컬럼 추가
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'posts') THEN
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'posts' AND column_name = 'is_pinned'
        ) THEN
            ALTER TABLE posts ADD COLUMN is_pinned BOOLEAN DEFAULT FALSE;
            
            -- 인덱스 추가
            CREATE INDEX IF NOT EXISTS idx_posts_pinned 
            ON posts(is_pinned, created_at DESC) 
            WHERE is_pinned = TRUE;
        END IF;
    END IF;
END $$;
