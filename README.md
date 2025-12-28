# 혜광교회 웹사이트

> "다음세대가 춤추는 교회" - 마태복음 11:16-17

부천 혜광교회의 공식 웹사이트입니다. Next.js, Supabase, Vercel을 기반으로 구축된 현대적이고 사용자 친화적인 교회 플랫폼입니다.

## 🌟 주요 기능

- **온라인 예배**: YouTube 실시간 스트리밍 및 예배 영상 아카이브
- **교회 소식**: 공지사항, 주보, 갤러리
- **교회학교**: 유치부, 초등부, 중고등부, 대학청년부
- **양육/모임**: 교육 프로그램, 암송 구절, 성경 퀴즈, 묵상 자료
- **성도의 교제**: 은혜/감사/일상 나눔 게시판
- **회원 시스템**: 로그인, 회원가입, 마이페이지
- **관리자 대시보드**: 콘텐츠 관리, 회원 관리

## 🛠️ 기술 스택

- **프레임워크**: [Next.js 16](https://nextjs.org/) (App Router)
- **언어**: [TypeScript](https://www.typescriptlang.org/)
- **데이터베이스**: [Supabase](https://supabase.com/)
- **스타일링**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI 컴포넌트**: [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/)
- **배포**: [Vercel](https://vercel.com/)
- **인증**: Supabase Auth
- **스토리지**: Supabase Storage

## 📦 설치 및 실행

### 1. 저장소 클론

```bash
git clone https://github.com/your-org/hk_church.git
cd hk_church
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.example` 파일을 복사하여 `.env.local` 파일을 생성하고, Supabase 프로젝트 정보를 입력합니다.

```bash
cp .env.example .env.local
```

`.env.local` 파일 내용:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Supabase 데이터베이스 설정

Supabase 프로젝트를 생성한 후, `supabase/migrations/` 폴더의 마이그레이션 파일을 순서대로 실행합니다.

```bash
# Supabase CLI 설치 (선택)
npm install -g supabase

# 로컬 Supabase 시작 (선택)
supabase init
supabase start
supabase db reset
```

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 📚 프로젝트 문서

- **[PRD.md](./PRD.md)**: 프로젝트 요구사항 문서
- **[PAGE_SPECIFICATIONS.md](./PAGE_SPECIFICATIONS.md)**: 페이지별 상세 명세서
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)**: 프로젝트 구조 및 설정

## 🚀 배포

### Vercel 배포

1. Vercel 계정 생성 및 GitHub 연동
2. 프로젝트 Import
3. 환경 변수 설정
4. 배포

```bash
# Vercel CLI 사용
npm install -g vercel
vercel --prod
```

## 🧪 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint

# 타입 체크
npm run type-check

# Supabase 타입 생성
npm run supabase:gen-types
```

## 📁 주요 디렉토리 구조

```
hk_church/
├── app/                    # Next.js App Router
│   ├── (main)/            # 메인 사이트 라우트
│   ├── (auth)/            # 인증 라우트
│   ├── (admin)/           # 관리자 라우트
│   └── api/               # API Routes
├── components/            # React 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── home/             # 홈페이지 섹션
│   ├── ui/               # UI 컴포넌트 (shadcn/ui)
│   └── ...
├── lib/                   # 유틸리티 및 설정
│   ├── supabase/         # Supabase 클라이언트
│   ├── hooks/            # Custom Hooks
│   ├── actions/          # Server Actions
│   └── utils/            # 유틸리티 함수
├── supabase/             # Supabase 설정
│   └── migrations/       # 데이터베이스 마이그레이션
└── public/               # 정적 파일
```

## 🤝 기여

프로젝트에 기여하고 싶으시다면 Pull Request를 보내주세요.

## 📄 라이선스

이 프로젝트는 혜광교회의 소유입니다.

## 📞 문의

- **웹사이트**: [https://www.ihkchurch.com](https://www.ihkchurch.com)
- **이메일**: info@ihkchurch.com
- **전화**: 032-XXX-XXXX

---

**© 2025 혜광교회. All rights reserved.**
