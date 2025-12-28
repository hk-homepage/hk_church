# 혜광교회 웹사이트 프로젝트 구조

## 문서 정보
- **작성일**: 2025-12-28
- **기술 스택**: Next.js 16 + Supabase + Vercel
- **프레임워크**: App Router (Next.js 13+)

---

## 📁 전체 프로젝트 구조

```
hk_church/
├── .github/                          # GitHub 설정
│   └── workflows/
│       └── ci.yml                    # CI/CD 파이프라인
│
├── .next/                            # Next.js 빌드 출력 (gitignore)
├── node_modules/                     # 의존성 패키지 (gitignore)
│
├── app/                              # Next.js App Router
│   ├── (auth)/                       # 인증 관련 라우트 그룹
│   │   ├── login/
│   │   │   └── page.tsx              # 로그인 페이지
│   │   ├── register/
│   │   │   └── page.tsx              # 회원가입 페이지
│   │   └── layout.tsx                # 인증 레이아웃
│   │
│   ├── (main)/                       # 메인 사이트 라우트 그룹
│   │   ├── about/                    # 교회소개
│   │   │   ├── greeting/
│   │   │   │   └── page.tsx          # 인사말
│   │   │   ├── worship/
│   │   │   │   └── page.tsx          # 예배안내
│   │   │   ├── staff/
│   │   │   │   └── page.tsx          # 섬기는 분들
│   │   │   ├── online-worship/
│   │   │   │   └── page.tsx          # 실시간 온라인 예배
│   │   │   ├── offering/
│   │   │   │   └── page.tsx          # 온라인 헌금
│   │   │   ├── facilities/
│   │   │   │   └── page.tsx          # 시설소개
│   │   │   ├── history/
│   │   │   │   └── page.tsx          # 교회연혁
│   │   │   ├── location/
│   │   │   │   └── page.tsx          # 오시는길
│   │   │   └── layout.tsx            # 교회소개 레이아웃
│   │   │
│   │   ├── sunday-school/            # 교회학교
│   │   │   ├── kindergarten/
│   │   │   │   └── page.tsx          # 유치부
│   │   │   ├── elementary/
│   │   │   │   └── page.tsx          # 초등부
│   │   │   ├── youth/
│   │   │   │   └── page.tsx          # 중고등부
│   │   │   ├── young-adult/
│   │   │   │   └── page.tsx          # 대학청년부
│   │   │   ├── archive/
│   │   │   │   └── page.tsx          # 2024 이전 자료
│   │   │   └── layout.tsx
│   │   │
│   │   ├── education/                # 양육/모임
│   │   │   ├── programs/
│   │   │   │   └── page.tsx          # 교회교육
│   │   │   ├── memory-verses/
│   │   │   │   └── page.tsx          # 암송구절
│   │   │   ├── bible-quiz/
│   │   │   │   └── page.tsx          # 성경통신문제
│   │   │   ├── devotional/
│   │   │   │   └── page.tsx          # 오늘의 묵상
│   │   │   └── layout.tsx
│   │   │
│   │   ├── news/                     # 교회소식
│   │   │   ├── notices/
│   │   │   │   ├── page.tsx          # 공지사항 목록
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # 공지사항 상세
│   │   │   ├── bulletins/
│   │   │   │   ├── page.tsx          # 주보 목록
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # 주보 상세
│   │   │   ├── newcomers/
│   │   │   │   ├── page.tsx          # 새가족 소개
│   │   │   │   └── register/
│   │   │   │       └── page.tsx      # 새가족 등록
│   │   │   ├── gallery/
│   │   │   │   ├── page.tsx          # 갤러리 목록
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # 갤러리 상세
│   │   │   └── layout.tsx
│   │   │
│   │   ├── fellowship/               # 성도의교제
│   │   │   ├── grace/
│   │   │   │   ├── page.tsx          # 은혜 나눔 목록
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # 은혜 나눔 상세
│   │   │   ├── gratitude/
│   │   │   │   ├── page.tsx          # 감사 나눔 목록
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # 감사 나눔 상세
│   │   │   ├── daily/
│   │   │   │   ├── page.tsx          # 일상 나눔 목록
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # 일상 나눔 상세
│   │   │   └── layout.tsx
│   │   │
│   │   ├── schedule/
│   │   │   └── page.tsx              # 교회 일정
│   │   │
│   │   ├── mypage/
│   │   │   └── page.tsx              # 마이페이지
│   │   │
│   │   ├── sms/
│   │   │   └── page.tsx              # 문자 서비스
│   │   │
│   │   └── layout.tsx                # 메인 레이아웃
│   │
│   ├── (admin)/                      # 관리자 라우트 그룹
│   │   ├── admin/
│   │   │   ├── page.tsx              # 대시보드
│   │   │   ├── content/
│   │   │   │   ├── pages/
│   │   │   │   │   └── page.tsx      # 페이지 관리
│   │   │   │   ├── hero-slides/
│   │   │   │   │   └── page.tsx      # 슬라이더 관리
│   │   │   │   ├── notices/
│   │   │   │   │   └── page.tsx      # 공지사항 관리
│   │   │   │   ├── bulletins/
│   │   │   │   │   └── page.tsx      # 주보 관리
│   │   │   │   ├── gallery/
│   │   │   │   │   └── page.tsx      # 갤러리 관리
│   │   │   │   └── worship-videos/
│   │   │   │       └── page.tsx      # 예배 영상 관리
│   │   │   ├── members/
│   │   │   │   ├── page.tsx          # 회원 관리
│   │   │   │   └── newcomers/
│   │   │   │       └── page.tsx      # 새가족 관리
│   │   │   ├── departments/
│   │   │   │   └── page.tsx          # 부서 관리
│   │   │   ├── settings/
│   │   │   │   └── page.tsx          # 사이트 설정
│   │   │   └── layout.tsx            # 관리자 레이아웃
│   │   └── layout.tsx
│   │
│   ├── api/                          # API Routes
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts          # 로그인 API
│   │   │   ├── register/
│   │   │   │   └── route.ts          # 회원가입 API
│   │   │   └── logout/
│   │   │       └── route.ts          # 로그아웃 API
│   │   ├── notices/
│   │   │   ├── route.ts              # 공지사항 목록/작성
│   │   │   └── [id]/
│   │   │       └── route.ts          # 공지사항 상세/수정/삭제
│   │   ├── bulletins/
│   │   │   └── route.ts              # 주보 API
│   │   ├── gallery/
│   │   │   └── route.ts              # 갤러리 API
│   │   ├── youtube/
│   │   │   └── latest/
│   │   │       └── route.ts          # YouTube 최신 영상
│   │   ├── search/
│   │   │   └── route.ts              # 전체 검색
│   │   └── upload/
│   │       └── route.ts              # 파일 업로드
│   │
│   ├── layout.tsx                    # 루트 레이아웃
│   ├── page.tsx                      # 홈페이지
│   ├── globals.css                   # 전역 스타일
│   ├── error.tsx                     # 에러 페이지
│   ├── not-found.tsx                 # 404 페이지
│   └── loading.tsx                   # 로딩 페이지
│
├── components/                       # React 컴포넌트
│   ├── layout/                       # 레이아웃 컴포넌트
│   │   ├── Header.tsx                # 헤더
│   │   ├── Footer.tsx                # 푸터
│   │   ├── Sidebar.tsx               # 사이드바 (관리자)
│   │   └── Breadcrumb.tsx            # 경로 표시
│   │
│   ├── home/                         # 홈페이지 섹션
│   │   ├── HeroSlider.tsx            # 히어로 슬라이더
│   │   ├── QuickLinks.tsx            # 퀵 링크
│   │   ├── LiveWorship.tsx           # 온라인 예배
│   │   ├── LatestBulletin.tsx        # 최신 주보
│   │   ├── NoticeList.tsx            # 공지사항
│   │   ├── GalleryPreview.tsx        # 갤러리 미리보기
│   │   └── LocationMap.tsx           # 지도
│   │
│   ├── about/                        # 교회소개 컴포넌트
│   │   ├── GreetingContent.tsx       # 인사말 콘텐츠
│   │   ├── WorshipSchedule.tsx       # 예배 시간표
│   │   ├── StaffCard.tsx             # 섬기는 분들 카드
│   │   ├── HistoryTimeline.tsx       # 연혁 타임라인
│   │   └── KakaoMap.tsx              # 카카오맵
│   │
│   ├── news/                         # 교회소식 컴포넌트
│   │   ├── NoticeCard.tsx            # 공지사항 카드
│   │   ├── BulletinCard.tsx          # 주보 카드
│   │   ├── GalleryGrid.tsx           # 갤러리 그리드
│   │   ├── Lightbox.tsx              # 이미지 라이트박스
│   │   └── NewcomerForm.tsx          # 새가족 등록 폼
│   │
│   ├── fellowship/                   # 교제 게시판 컴포넌트
│   │   ├── PostList.tsx              # 게시글 리스트
│   │   ├── PostCard.tsx              # 게시글 카드
│   │   ├── PostDetail.tsx            # 게시글 상세
│   │   ├── CommentSection.tsx        # 댓글 섹션
│   │   └── PostEditor.tsx            # 게시글 에디터
│   │
│   ├── education/                    # 교육 컴포넌트
│   │   ├── ProgramCard.tsx           # 프로그램 카드
│   │   ├── MemoryVerseCard.tsx       # 암송 구절 카드
│   │   └── DevotionalViewer.tsx      # 묵상 뷰어
│   │
│   ├── schedule/                     # 일정 컴포넌트
│   │   ├── Calendar.tsx              # 달력
│   │   ├── EventCard.tsx             # 일정 카드
│   │   └── EventModal.tsx            # 일정 상세 모달
│   │
│   ├── admin/                        # 관리자 컴포넌트
│   │   ├── Dashboard.tsx             # 대시보드
│   │   ├── StatsCard.tsx             # 통계 카드
│   │   ├── ContentEditor.tsx         # 콘텐츠 에디터 (Tiptap)
│   │   ├── FileUploader.tsx          # 파일 업로더
│   │   ├── DataTable.tsx             # 데이터 테이블
│   │   └── ImageManager.tsx          # 이미지 관리자
│   │
│   └── ui/                           # UI 컴포넌트 (shadcn/ui)
│       ├── button.tsx                # 버튼
│       ├── card.tsx                  # 카드
│       ├── dialog.tsx                # 다이얼로그
│       ├── dropdown-menu.tsx         # 드롭다운 메뉴
│       ├── form.tsx                  # 폼
│       ├── input.tsx                 # 인풋
│       ├── navigation-menu.tsx       # 네비게이션 메뉴
│       ├── sheet.tsx                 # 시트 (모바일 메뉴)
│       ├── table.tsx                 # 테이블
│       ├── tabs.tsx                  # 탭
│       ├── toast.tsx                 # 토스트
│       └── ...                       # 기타 UI 컴포넌트
│
├── lib/                              # 유틸리티 및 설정
│   ├── supabase/                     # Supabase 관련
│   │   ├── client.ts                 # Supabase 클라이언트 (브라우저)
│   │   ├── server.ts                 # Supabase 클라이언트 (서버)
│   │   ├── middleware.ts             # Supabase 미들웨어
│   │   └── types.ts                  # Supabase 타입 정의
│   │
│   ├── hooks/                        # Custom Hooks
│   │   ├── useAuth.ts                # 인증 훅
│   │   ├── useUser.ts                # 사용자 정보 훅
│   │   ├── useNotices.ts             # 공지사항 훅
│   │   ├── useBulletins.ts           # 주보 훅
│   │   ├── useGallery.ts             # 갤러리 훅
│   │   └── useInfiniteScroll.ts      # 무한 스크롤 훅
│   │
│   ├── actions/                      # Server Actions
│   │   ├── auth.ts                   # 인증 액션
│   │   ├── notices.ts                # 공지사항 액션
│   │   ├── bulletins.ts              # 주보 액션
│   │   ├── gallery.ts                # 갤러리 액션
│   │   ├── fellowship.ts             # 교제 게시판 액션
│   │   └── upload.ts                 # 파일 업로드 액션
│   │
│   ├── validations/                  # Zod 스키마
│   │   ├── auth.ts                   # 인증 스키마
│   │   ├── notice.ts                 # 공지사항 스키마
│   │   ├── bulletin.ts               # 주보 스키마
│   │   ├── fellowship.ts             # 교제 게시판 스키마
│   │   └── newcomer.ts               # 새가족 스키마
│   │
│   ├── utils/                        # 유틸리티 함수
│   │   ├── cn.ts                     # className 유틸
│   │   ├── date.ts                   # 날짜 포맷팅
│   │   ├── string.ts                 # 문자열 유틸
│   │   ├── image.ts                  # 이미지 처리
│   │   └── seo.ts                    # SEO 유틸
│   │
│   └── constants/                    # 상수
│       ├── menu.ts                   # 메뉴 구조
│       ├── routes.ts                 # 라우트 경로
│       └── config.ts                 # 설정 값
│
├── public/                           # 정적 파일
│   ├── images/                       # 이미지
│   │   ├── logo.svg                  # 로고
│   │   ├── og-image.jpg              # OG 이미지
│   │   └── placeholder.jpg           # 플레이스홀더
│   ├── icons/                        # 아이콘
│   │   ├── favicon.ico               # 파비콘
│   │   ├── apple-icon.png            # 애플 아이콘
│   │   └── icon.svg                  # 앱 아이콘
│   ├── fonts/                        # 폰트 (선택)
│   └── robots.txt                    # 로봇 설정
│
├── supabase/                         # Supabase 설정
│   ├── migrations/                   # 데이터베이스 마이그레이션
│   │   ├── 20250101000000_initial_schema.sql
│   │   ├── 20250102000000_add_notices.sql
│   │   ├── 20250103000000_add_bulletins.sql
│   │   ├── 20250104000000_add_gallery.sql
│   │   ├── 20250105000000_add_fellowship.sql
│   │   └── ...
│   ├── seed.sql                      # 시드 데이터
│   └── config.toml                   # Supabase 설정
│
├── types/                            # TypeScript 타입
│   ├── database.types.ts             # Supabase 생성 타입
│   ├── models.ts                     # 모델 타입
│   └── api.ts                        # API 응답 타입
│
├── middleware.ts                     # Next.js 미들웨어 (인증)
├── next.config.ts                    # Next.js 설정
├── tailwind.config.ts                # Tailwind CSS 설정
├── postcss.config.mjs                # PostCSS 설정
├── tsconfig.json                     # TypeScript 설정
├── components.json                   # shadcn/ui 설정
├── .env.local                        # 환경 변수 (gitignore)
├── .env.example                      # 환경 변수 예시
├── .gitignore                        # Git 무시 파일
├── package.json                      # 패키지 설정
├── package-lock.json                 # 패키지 잠금
├── README.md                         # 프로젝트 README
├── PRD.md                            # 프로젝트 요구사항 문서
├── PAGE_SPECIFICATIONS.md            # 페이지별 명세서
└── PROJECT_STRUCTURE.md              # 이 문서
```

---

## 📦 주요 의존성 패키지

### package.json

```json
{
  "name": "hk_church",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "type-check": "tsc --noEmit",
    "supabase:gen-types": "supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.types.ts"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.2",
    "@radix-ui/react-alert-dialog": "^1.1.4",
    "@radix-ui/react-avatar": "^1.1.2",
    "@radix-ui/react-checkbox": "^1.1.3",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-label": "^2.1.1",
    "@radix-ui/react-navigation-menu": "^1.2.3",
    "@radix-ui/react-popover": "^1.1.4",
    "@radix-ui/react-select": "^2.1.4",
    "@radix-ui/react-separator": "^1.1.1",
    "@radix-ui/react-slot": "^1.1.1",
    "@radix-ui/react-tabs": "^1.1.2",
    "@radix-ui/react-toast": "^1.2.4",
    "@supabase/ssr": "^0.5.2",
    "@supabase/supabase-js": "^2.47.10",
    "@tiptap/extension-placeholder": "^2.10.5",
    "@tiptap/react": "^2.10.5",
    "@tiptap/starter-kit": "^2.10.5",
    "@vercel/analytics": "^1.3.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.5.1",
    "lucide-react": "^0.454.0",
    "next": "^16.0.10",
    "next-themes": "^0.4.6",
    "react": "^19.2.0",
    "react-day-picker": "^9.8.0",
    "react-dom": "^19.2.0",
    "react-hook-form": "^7.60.0",
    "sonner": "^1.7.4",
    "tailwind-merge": "^3.3.1",
    "tailwindcss-animate": "^1.0.7",
    "yet-another-react-lightbox": "^3.27.0",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.9",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "^16.0.10",
    "postcss": "^8.5",
    "supabase": "^1.220.3",
    "tailwindcss": "^4.1.9",
    "typescript": "^5"
  }
}
```

---

## 🔧 환경 변수 설정

### .env.example

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Site
NEXT_PUBLIC_SITE_URL=https://www.ihkchurch.com
NEXT_PUBLIC_SITE_NAME=혜광교회

# YouTube API (선택)
YOUTUBE_API_KEY=your-youtube-api-key
YOUTUBE_CHANNEL_ID=your-channel-id

# Email (선택)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 🗄️ Supabase 데이터베이스 마이그레이션

### 초기 스키마 (20250101000000_initial_schema.sql)

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  birth_date DATE,
  gender TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User roles table
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- 'admin', 'member', 'guest'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Pages table (CMS)
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content JSONB,
  meta_description TEXT,
  featured_image TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero slides table
CREATE TABLE hero_slides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  cta_text TEXT,
  cta_link TEXT,
  display_order INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Worship schedules table
CREATE TABLE worship_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT,
  description TEXT,
  day_of_week INTEGER, -- 0=일요일, 1=월요일, ...
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true
);

-- Worship videos table
CREATE TABLE worship_videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  worship_date DATE NOT NULL,
  worship_type TEXT,
  description TEXT,
  thumbnail_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff table
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  department TEXT,
  photo_url TEXT,
  bio TEXT,
  email TEXT,
  phone TEXT,
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true
);

-- History timeline table
CREATE TABLE history_timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year INTEGER NOT NULL,
  month INTEGER,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  display_order INTEGER
);

-- Departments table
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  age_range TEXT,
  schedule TEXT,
  location TEXT,
  teacher_name TEXT,
  teacher_photo_url TEXT,
  is_active BOOLEAN DEFAULT true
);

-- Education programs table
CREATE TABLE education_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  target_audience TEXT,
  duration TEXT,
  schedule TEXT,
  instructor TEXT,
  max_participants INTEGER,
  registration_start DATE,
  registration_end DATE,
  is_active BOOLEAN DEFAULT true
);

-- Memory verses table
CREATE TABLE memory_verses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  scripture_reference TEXT NOT NULL,
  scripture_text TEXT NOT NULL,
  commentary TEXT,
  UNIQUE(year, month)
);

-- Devotionals table
CREATE TABLE devotionals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE UNIQUE NOT NULL,
  scripture_reference TEXT NOT NULL,
  scripture_text TEXT NOT NULL,
  meditation_text TEXT NOT NULL,
  prayer_points TEXT[],
  author TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  end_datetime TIMESTAMP WITH TIME ZONE,
  location TEXT,
  organizer TEXT,
  category TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newcomers table
CREATE TABLE newcomers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  gender TEXT,
  birth_date DATE,
  phone TEXT,
  email TEXT,
  address TEXT,
  registration_source TEXT,
  message TEXT,
  photo_url TEXT,
  is_public BOOLEAN DEFAULT false,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE worship_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE worship_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE history_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_verses ENABLE ROW LEVEL SECURITY;
ALTER TABLE devotionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE newcomers ENABLE ROW LEVEL SECURITY;

-- RLS Policies (예시)
-- Anyone can read published pages
CREATE POLICY "Anyone can read published pages"
ON pages FOR SELECT
USING (is_published = true);

-- Only admins can insert/update/delete pages
CREATE POLICY "Only admins can manage pages"
ON pages FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);

-- Anyone can read active hero slides
CREATE POLICY "Anyone can read active hero slides"
ON hero_slides FOR SELECT
USING (is_active = true);

-- Anyone can read worship schedules
CREATE POLICY "Anyone can read worship schedules"
ON worship_schedules FOR SELECT
USING (is_active = true);

-- Anyone can read worship videos
CREATE POLICY "Anyone can read worship videos"
ON worship_videos FOR SELECT
USING (true);

-- Anyone can read staff
CREATE POLICY "Anyone can read staff"
ON staff FOR SELECT
USING (is_active = true);

-- Anyone can read history
CREATE POLICY "Anyone can read history"
ON history_timeline FOR SELECT
USING (true);

-- Anyone can read departments
CREATE POLICY "Anyone can read departments"
ON departments FOR SELECT
USING (is_active = true);

-- Anyone can read education programs
CREATE POLICY "Anyone can read education programs"
ON education_programs FOR SELECT
USING (is_active = true);

-- Anyone can read memory verses
CREATE POLICY "Anyone can read memory verses"
ON memory_verses FOR SELECT
USING (true);

-- Anyone can read devotionals
CREATE POLICY "Anyone can read devotionals"
ON devotionals FOR SELECT
USING (true);

-- Anyone can read public events
CREATE POLICY "Anyone can read public events"
ON events FOR SELECT
USING (is_public = true);

-- Anyone can insert newcomers
CREATE POLICY "Anyone can insert newcomers"
ON newcomers FOR INSERT
WITH CHECK (true);

-- Only admins can read all newcomers
CREATE POLICY "Only admins can read newcomers"
ON newcomers FOR SELECT
USING (
  is_public = true OR
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);
```

### 공지사항 테이블 (20250102000000_add_notices.sql)

```sql
CREATE TABLE notices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content JSONB,
  author_id UUID REFERENCES auth.users(id),
  is_pinned BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  attachments JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

-- Anyone can read notices
CREATE POLICY "Anyone can read notices"
ON notices FOR SELECT
USING (true);

-- Only admins can insert notices
CREATE POLICY "Only admins can insert notices"
ON notices FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);

-- Only admins can update notices
CREATE POLICY "Only admins can update notices"
ON notices FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);

-- Only admins can delete notices
CREATE POLICY "Only admins can delete notices"
ON notices FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_notice_view_count(notice_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE notices
  SET view_count = view_count + 1
  WHERE id = notice_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 주보 테이블 (20250103000000_add_bulletins.sql)

```sql
CREATE TABLE bulletins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  bulletin_date DATE NOT NULL,
  cover_image_url TEXT,
  pdf_url TEXT NOT NULL,
  page_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE bulletins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read bulletins"
ON bulletins FOR SELECT
USING (true);

CREATE POLICY "Only admins can manage bulletins"
ON bulletins FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);
```

### 갤러리 테이블 (20250104000000_add_gallery.sql)

```sql
CREATE TABLE gallery_albums (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  event_date DATE,
  cover_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  album_id UUID REFERENCES gallery_albums(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read gallery albums"
ON gallery_albums FOR SELECT
USING (true);

CREATE POLICY "Anyone can read gallery images"
ON gallery_images FOR SELECT
USING (true);

CREATE POLICY "Only admins can manage gallery albums"
ON gallery_albums FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);

CREATE POLICY "Only admins can manage gallery images"
ON gallery_images FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);
```

### 교제 게시판 테이블 (20250105000000_add_fellowship.sql)

```sql
CREATE TABLE fellowship_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  images TEXT[],
  like_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE fellowship_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES fellowship_posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE fellowship_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES fellowship_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

ALTER TABLE fellowship_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE fellowship_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE fellowship_likes ENABLE ROW LEVEL SECURITY;

-- Anyone can read posts
CREATE POLICY "Anyone can read fellowship posts"
ON fellowship_posts FOR SELECT
USING (true);

-- Authenticated users can insert posts
CREATE POLICY "Authenticated users can insert fellowship posts"
ON fellowship_posts FOR INSERT
WITH CHECK (auth.uid() = author_id);

-- Authors can update their own posts
CREATE POLICY "Authors can update their own fellowship posts"
ON fellowship_posts FOR UPDATE
USING (auth.uid() = author_id);

-- Authors can delete their own posts
CREATE POLICY "Authors can delete their own fellowship posts"
ON fellowship_posts FOR DELETE
USING (auth.uid() = author_id);

-- Anyone can read comments
CREATE POLICY "Anyone can read fellowship comments"
ON fellowship_comments FOR SELECT
USING (true);

-- Authenticated users can insert comments
CREATE POLICY "Authenticated users can insert fellowship comments"
ON fellowship_comments FOR INSERT
WITH CHECK (auth.uid() = author_id);

-- Authors can delete their own comments
CREATE POLICY "Authors can delete their own fellowship comments"
ON fellowship_comments FOR DELETE
USING (auth.uid() = author_id);

-- Authenticated users can like posts
CREATE POLICY "Authenticated users can like fellowship posts"
ON fellowship_likes FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can unlike posts
CREATE POLICY "Users can unlike fellowship posts"
ON fellowship_likes FOR DELETE
USING (auth.uid() = user_id);

-- Function to increment like count
CREATE OR REPLACE FUNCTION increment_fellowship_like_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE fellowship_posts
  SET like_count = like_count + 1
  WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_fellowship_like_insert
AFTER INSERT ON fellowship_likes
FOR EACH ROW
EXECUTE FUNCTION increment_fellowship_like_count();

-- Function to decrement like count
CREATE OR REPLACE FUNCTION decrement_fellowship_like_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE fellowship_posts
  SET like_count = like_count - 1
  WHERE id = OLD.post_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_fellowship_like_delete
AFTER DELETE ON fellowship_likes
FOR EACH ROW
EXECUTE FUNCTION decrement_fellowship_like_count();
```

---

## 🔐 Supabase Storage 버킷 설정

### Storage Buckets

```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('hero-slides', 'hero-slides', true),
  ('bulletins', 'bulletins', true),
  ('gallery', 'gallery', true),
  ('profiles', 'profiles', true),
  ('pages', 'pages', true),
  ('departments', 'departments', true),
  ('attachments', 'attachments', true);

-- Storage policies for hero-slides
CREATE POLICY "Anyone can view hero slides"
ON storage.objects FOR SELECT
USING (bucket_id = 'hero-slides');

CREATE POLICY "Only admins can upload hero slides"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'hero-slides' AND
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);

-- Storage policies for bulletins
CREATE POLICY "Anyone can view bulletins"
ON storage.objects FOR SELECT
USING (bucket_id = 'bulletins');

CREATE POLICY "Only admins can upload bulletins"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'bulletins' AND
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);

-- Storage policies for gallery
CREATE POLICY "Anyone can view gallery images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

CREATE POLICY "Only admins can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'gallery' AND
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);

-- Storage policies for profiles
CREATE POLICY "Anyone can view profile images"
ON storage.objects FOR SELECT
USING (bucket_id = 'profiles');

CREATE POLICY "Users can upload their own profile images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'profiles' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

---

## 🚀 배포 설정 (Vercel)

### vercel.json

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["icn1"],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-role-key"
  }
}
```

---

## 📝 개발 워크플로우

### 1. 로컬 개발 환경 설정

```bash
# 1. 저장소 클론
git clone https://github.com/your-org/hk_church.git
cd hk_church

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env.local
# .env.local 파일 편집하여 Supabase 키 입력

# 4. Supabase 로컬 개발 (선택)
supabase init
supabase start
supabase db reset

# 5. 개발 서버 실행
npm run dev
```

### 2. Supabase 타입 생성

```bash
# Supabase 타입 자동 생성
npm run supabase:gen-types
```

### 3. 배포

```bash
# Vercel에 배포
vercel --prod

# 또는 GitHub에 푸시하면 자동 배포
git push origin main
```

---

## 🧪 테스트 구조 (향후 추가)

```
hk_church/
├── __tests__/
│   ├── components/
│   │   ├── Header.test.tsx
│   │   └── Footer.test.tsx
│   ├── pages/
│   │   └── home.test.tsx
│   └── lib/
│       └── utils.test.ts
├── jest.config.js
└── jest.setup.js
```

---

## 📚 참고 문서

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Supabase 공식 문서](https://supabase.com/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [shadcn/ui 문서](https://ui.shadcn.com)
- [Vercel 배포 가이드](https://vercel.com/docs)

---

**문서 버전**: 1.0  
**최종 수정일**: 2025-12-28  
**작성자**: Ryan
