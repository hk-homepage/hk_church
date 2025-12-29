# 아키텍처 문서

## 전체 구조

혜광교회 웹사이트는 Next.js App Router를 기반으로 한 모던 웹 애플리케이션입니다.

### 디렉토리 구조

```
hk_church/
├── app/                    # Next.js App Router
│   ├── (routes)/          # 라우트 그룹
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   └── globals.css        # 전역 스타일
│
├── components/            # React 컴포넌트
│   ├── ui/               # 재사용 가능한 UI 컴포넌트
│   ├── fellowship/       # 게시판 컴포넌트
│   ├── header.tsx        # 헤더
│   └── footer.tsx        # 푸터
│
├── lib/                   # 유틸리티 및 설정
│   ├── constants/        # 상수
│   ├── hooks/            # 커스텀 훅
│   ├── mock/             # Mock 데이터
│   └── utils/            # 유틸리티 함수
│
├── types/                 # TypeScript 타입 정의
│   └── fellowship.ts     # 게시판 타입
│
├── public/               # 정적 파일
│   ├── images/
│   └── icons/
│
└── docs/                 # 프로젝트 문서
```

## 라우팅 구조

### App Router 규칙

- 모든 라우트는 `app/` 디렉토리 내에 위치
- 동적 라우트는 `[param]` 형식 사용
- 레이아웃 로직은 `layout.tsx`에 위치
- 3단계 이상의 깊은 중첩은 명확한 이유가 있을 때만 사용

### 주요 라우트

```
/                           # 홈페이지
├── /about                  # 교회소개 (→ /about/greeting)
│   ├── /greeting          # 인사말
│   ├── /worship-info      # 예배안내
│   ├── /staff             # 섬기는 분들
│   ├── /facilities        # 시설소개
│   ├── /history           # 교회연혁
│   └── /location          # 오시는 길
│
├── /sunday-school         # 교회학교 (→ /sunday-school/kindergarten)
│   ├── /kindergarten      # 유치부
│   ├── /elementary        # 초등부
│   ├── /youth             # 중고등부
│   ├── /college           # 대학청년부
│   └── /archive-2024      # 2024 이전
│
├── /nurturing             # 양육/모임 (→ /nurturing/education)
│   ├── /education         # 교회교육
│   ├── /memory-verse-2025 # 암송구절
│   ├── /bible-study       # 성경통신문제
│   └── /devotion          # 오늘의 묵상
│
├── /news                  # 교회소식 (→ /news/announcements)
│   ├── /announcements     # 공지사항
│   ├── /bulletin          # 주보
│   └── /new-members       # 새가족 소개
│
├── /fellowship            # 성도의교제 (→ /fellowship/grace)
│   ├── /grace             # 은혜 나눔
│   │   ├── /             # 목록
│   │   └── /[id]         # 상세
│   ├── /thanks            # 감사 나눔
│   │   ├── /             # 목록
│   │   └── /[id]         # 상세
│   └── /daily             # 일상 나눔
│       ├── /             # 목록
│       └── /[id]         # 상세
│
├── /gallery               # 갤러리
├── /worship/online        # 온라인 예배
├── /offering              # 온라인 헌금
├── /calendar              # 일정
├── /login                 # 로그인
└── /signup                # 회원가입
```

### 리다이렉트 규칙

메인 메뉴 클릭 시 첫 번째 서브메뉴로 자동 리다이렉트:

- `/about` → `/about/greeting`
- `/sunday-school` → `/sunday-school/kindergarten`
- `/nurturing` → `/nurturing/education`
- `/news` → `/news/announcements`
- `/fellowship` → `/fellowship/grace`

## 데이터 흐름

### 현재 구조 (Mock 데이터)

```
Page Component
    ↓
Mock Data Generator (lib/mock/)
    ↓
TypeScript Types (types/)
    ↓
UI Components (components/)
```

### 향후 구조 (Supabase 연동)

```
Page Component (Server Component)
    ↓
Server Actions (lib/actions/)
    ↓
Supabase Client (lib/supabase/)
    ↓
Database (Supabase)
    ↓
TypeScript Types (types/)
    ↓
UI Components (components/)
```

## 컴포넌트 아키텍처

### 레이어 구조

1. **Page Components** (`app/*/page.tsx`)
   - 서버 컴포넌트 우선
   - 데이터 페칭 및 레이아웃 구성
   - 비즈니스 로직 최소화

2. **Layout Components** (`components/layout/`)
   - Header, Footer, Sidebar 등
   - 전역 네비게이션
   - 공통 UI 요소

3. **Feature Components** (`components/fellowship/`, etc.)
   - 특정 기능에 특화된 컴포넌트
   - 재사용 가능하도록 설계
   - Props를 통한 커스터마이징

4. **UI Components** (`components/ui/`)
   - shadcn/ui 기반
   - 완전히 재사용 가능
   - 비즈니스 로직 없음

### 컴포넌트 통신

```
Parent Component
    ↓ (props)
Child Component
    ↑ (callbacks)
Parent Component
```

## 상태 관리

### 현재 전략

- **서버 상태**: Server Components에서 직접 데이터 페칭
- **클라이언트 상태**: React useState/useReducer
- **URL 상태**: Next.js searchParams
- **폼 상태**: React Hook Form (향후)

### 향후 확장

- **전역 상태**: Zustand 또는 Context API (필요시)
- **서버 상태 캐싱**: React Query (필요시)

## 스타일링 전략

### Tailwind CSS 사용

- 유틸리티 클래스 우선
- 커스텀 컴포넌트는 `@apply` 사용 자제
- 다크 모드: `dark:` 접두사 사용

### 반응형 디자인

```
모바일 우선 (Mobile First)
    ↓
sm: 640px  (태블릿)
    ↓
md: 768px  (태블릿 가로)
    ↓
lg: 1024px (데스크톱)
    ↓
xl: 1280px (대형 데스크톱)
```

## 성능 최적화

### 전략

1. **서버 컴포넌트 우선**: 클라이언트 JavaScript 최소화
2. **코드 스플리팅**: Next.js 자동 처리
3. **이미지 최적화**: Next.js Image 컴포넌트 사용
4. **폰트 최적화**: next/font 사용
5. **캐싱**: Next.js 자동 캐싱 활용

### 측정 지표

- **FCP** (First Contentful Paint): < 1.8s
- **LCP** (Largest Contentful Paint): < 2.5s
- **TTI** (Time to Interactive): < 3.8s
- **CLS** (Cumulative Layout Shift): < 0.1

## 보안

### 현재 구현

- **HTTPS**: Vercel 자동 제공
- **CSP**: Next.js 기본 설정
- **XSS 방지**: React 자동 이스케이프

### 향후 구현

- **인증**: Supabase Auth
- **권한 관리**: RLS (Row Level Security)
- **CSRF 보호**: Next.js Server Actions
- **Rate Limiting**: Vercel Edge Functions

## 배포 전략

### Vercel 배포

```
Git Push (main branch)
    ↓
Vercel 자동 빌드
    ↓
프리뷰 배포 (PR)
    ↓
프로덕션 배포 (merge)
```

### 환경 분리

- **Development**: `localhost:3000`
- **Preview**: Vercel 자동 생성 URL
- **Production**: `www.ihkchurch.com`

---

**마지막 업데이트**: 2025-12-29
