# 혜광교회 웹사이트 구조 분석 및 프로젝트 코드 구조

## 1. 웹사이트 개요

### 1.1 기본 정보
- **URL**: https://www.ihkchurch.com
- **교회명**: (부천)혜광교회
- **소속**: 대한예수교장로회(고신) 경기서부노회
- **설립일**: 1991년 3월 3일
- **주소**: 경기 부천시 원미구 상이로51번길 30
- **전화**: 032-327-5547
- **이메일**: ihkchurch@naver.com
- **YouTube**: https://www.youtube.com/@혜광교회-l5f

### 1.2 기술 스택 (기존 사이트)
- **서버**: ASP 기반 (추정)
- **URL 구조**: Query Parameter 기반 라우팅
- **예시 URL**: `/modu/document/document_view.asp?uotc_code=7447&uotc=34019&lef=01&sublef=undefined&menu_curr=1|uotc|7447|34019`

---

## 2. DOM 트리 구조 분석

### 2.1 전체 레이아웃 구조

```
<html>
├── <head>
│   ├── 메타 태그 (SEO, Open Graph)
│   ├── 스타일시트
│   └── 스크립트
└── <body>
    ├── <header> (헤더바)
    │   ├── 로고 영역
    │   ├── 네비게이션 메뉴 (드롭다운 포함)
    │   └── 액션 버튼 (로그인, 일정, 카페, 문자)
    ├── <main> (메인 콘텐츠)
    │   └── 페이지별 콘텐츠 영역
    └── <footer> (푸터)
        ├── 교회 정보
        ├── 바로가기 링크
        ├── 연락처 정보
        ├── 소셜 미디어 링크
        └── 저작권 및 법적 링크
```

### 2.2 헤더 구조 (Header)

```
<header>
├── 로고 영역
│   └── "혜광교회" 텍스트/이미지
├── 메인 네비게이션 (Desktop)
│   ├── 교회소개 (드롭다운)
│   │   ├── 인사말
│   │   ├── 예배안내
│   │   ├── 섬기는 분들
│   │   ├── 실시간 온라인 예배
│   │   ├── 온라인 헌금
│   │   ├── 시설소개
│   │   ├── 교회연혁
│   │   └── 오시는길
│   ├── 교회학교 (드롭다운)
│   │   ├── 유치부
│   │   ├── 초등부
│   │   ├── 중고등부
│   │   ├── 대학청년부
│   │   └── 2024 이전
│   ├── 양육/모임 (드롭다운)
│   │   ├── 교회교육
│   │   ├── 2025년 암송구절
│   │   ├── 성경통신문제
│   │   └── 오늘의 묵상
│   ├── 교회소식 (드롭다운)
│   │   ├── 공지사항
│   │   ├── 주보
│   │   ├── 새가족 소개
│   │   └── 혜광 갤러리
│   └── 성도의교제 (드롭다운)
│       ├── 은혜 나눔
│       ├── 감사 나눔
│       └── 일상 나눔
├── 액션 버튼 (Desktop)
│   ├── 로그인
│   ├── 회원가입
│   ├── 문자
│   ├── 일정
│   └── 카페
└── 모바일 메뉴 (햄버거 메뉴)
    └── Sheet/Drawer 형태의 사이드 메뉴
```

### 2.3 메인 콘텐츠 구조

```
<main>
├── 히어로 섹션 (홈페이지)
│   ├── 이미지 슬라이더
│   ├── 메인 타이틀
│   └── CTA 버튼
├── 퀵 링크 섹션
├── 온라인 예배 섹션
│   ├── YouTube 임베드
│   └── 예배 시간 안내
├── 주보 섹션
├── 갤러리 섹션
└── 위치 섹션
```

### 2.4 푸터 구조

```
<footer>
├── 교회 정보
│   ├── 로고
│   ├── 교회 소개 문구
│   └── 소셜 미디어 링크
├── 바로가기 링크
├── 연락처 정보
└── 하단 정보
    ├── 저작권
    ├── 개인정보처리방침
    └── 이용약관
```

---

## 3. 네비게이션 및 라우팅 구조 분석

### 3.1 메인 메뉴 구조

#### 3.1.1 교회소개 (`/about`)
```
교회소개
├── 인사말 (/about/greeting)
├── 예배안내 (/about/worship-info) - 주의: 예배안내와 중복 가능
├── 섬기는 분들 (/about/staff)
├── 실시간 온라인 예배 (/worship/online)
├── 온라인 헌금 (/offering)
├── 시설소개 (/about/facilities)
├── 교회연혁 (/about/history)
└── 오시는길 (/about/location)
```

#### 3.1.2 교회학교 (`/sunday-school`)
```
교회학교
├── 유치부 (/sunday-school/kindergarten)
├── 초등부 (/sunday-school/elementary)
├── 중고등부 (/sunday-school/youth)
├── 대학청년부 (/sunday-school/college)
└── 2024 이전 (/sunday-school/archive-2024)
```

#### 3.1.3 양육/모임 (`/nurturing`)
```
양육/모임
├── 교회교육 (/nurturing/education)
├── 2025년 암송구절 (/nurturing/memory-verse-2025)
├── 성경통신문제 (/nurturing/bible-study)
└── 오늘의 묵상 (/nurturing/devotion)
```

#### 3.1.4 교회소식 (`/news`)
```
교회소식
├── 공지사항 (/news/announcements)
├── 주보 (/news/bulletin)
├── 새가족 소개 (/news/new-members)
└── 혜광 갤러리 (/gallery)
```

#### 3.1.5 성도의교제 (`/fellowship`)
```
성도의교제
├── 은혜 나눔 (/fellowship/testimonies)
├── 감사 나눔 (/fellowship/thanksgiving)
└── 일상 나눔 (/fellowship/daily)
```

### 3.2 기존 사이트 URL 구조 분석

기존 사이트는 Query Parameter 기반 라우팅을 사용:

```
/modu/document/document_view.asp?
  uotc_code=7447          # 문서 코드
  &uotc=34019             # 문서 ID
  &lef=01                 # 레벨 1 메뉴
  &sublef=undefined       # 레벨 2 메뉴 (없을 경우)
  &menu_curr=1|uotc|7447|34019  # 현재 메뉴 경로
```

### 3.3 Next.js App Router 구조 (권장)

```
app/
├── layout.tsx                    # 루트 레이아웃
├── page.tsx                      # 홈페이지 (/)
├── about/
│   ├── layout.tsx               # 교회소개 레이아웃
│   ├── page.tsx                 # 교회소개 메인
│   ├── greeting/
│   │   └── page.tsx             # 인사말
│   ├── worship-info/
│   │   └── page.tsx             # 예배안내 (교회소개 내)
│   ├── staff/
│   │   └── page.tsx             # 섬기는 분들
│   ├── facilities/
│   │   └── page.tsx             # 시설소개
│   ├── history/
│   │   └── page.tsx             # 교회연혁
│   └── location/
│       └── page.tsx             # 오시는 길
├── worship/
│   ├── layout.tsx               # 예배안내 레이아웃
│   ├── page.tsx                 # 예배안내 메인
│   ├── schedule/
│   │   └── page.tsx             # 예배시간
│   ├── online/
│   │   └── page.tsx             # 실시간 온라인 예배
│   └── sermons/
│       └── page.tsx             # 설교말씀
├── sunday-school/
│   ├── layout.tsx               # 교회학교 레이아웃
│   ├── page.tsx                 # 교회학교 메인
│   ├── kindergarten/
│   │   └── page.tsx             # 유치부
│   ├── elementary/
│   │   └── page.tsx             # 초등부
│   ├── youth/
│   │   └── page.tsx             # 중고등부
│   ├── college/
│   │   └── page.tsx             # 대학청년부
│   └── archive-2024/
│       └── page.tsx             # 2024 이전
├── nurturing/
│   ├── layout.tsx               # 양육/모임 레이아웃
│   ├── page.tsx                 # 양육/모임 메인
│   ├── education/
│   │   └── page.tsx             # 교회교육
│   ├── memory-verse-2025/
│   │   └── page.tsx             # 2025년 암송구절
│   ├── bible-study/
│   │   └── page.tsx             # 성경통신문제
│   └── devotion/
│       └── page.tsx             # 오늘의 묵상
├── news/
│   ├── layout.tsx               # 교회소식 레이아웃
│   ├── page.tsx                 # 교회소식 메인
│   ├── announcements/
│   │   └── page.tsx             # 공지사항
│   ├── bulletin/
│   │   └── page.tsx             # 주보
│   └── new-members/
│       └── page.tsx             # 새가족 소개
├── gallery/
│   ├── layout.tsx               # 갤러리 레이아웃
│   └── page.tsx                 # 혜광 갤러리
├── fellowship/
│   ├── layout.tsx               # 성도의교제 레이아웃
│   ├── page.tsx                 # 성도의교제 메인
│   ├── testimonies/
│   │   └── page.tsx             # 은혜 나눔
│   ├── thanksgiving/
│   │   └── page.tsx             # 감사 나눔
│   └── daily/
│       └── page.tsx             # 일상 나눔
├── offering/
│   ├── layout.tsx               # 온라인헌금 레이아웃
│   └── page.tsx                 # 온라인헌금
├── login/
│   └── page.tsx                 # 로그인
├── signup/
│   └── page.tsx                 # 회원가입
├── calendar/
│   └── page.tsx                 # 일정
├── cafe/
│   └── page.tsx                 # 카페 (커뮤니티)
├── privacy/
│   └── page.tsx                 # 개인정보처리방침
└── terms/
    └── page.tsx                 # 이용약관
```

---

## 4. 프로젝트 코드 구조 (권장)

### 4.1 디렉토리 구조

```
hk_church/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 루트 레이아웃
│   ├── page.tsx                 # 홈페이지
│   ├── globals.css              # 전역 스타일
│   ├── about/                   # 교회소개
│   ├── worship/                 # 예배안내
│   ├── sunday-school/           # 교회학교
│   ├── nurturing/               # 양육/모임
│   ├── news/                    # 교회소식
│   ├── gallery/                 # 갤러리
│   ├── fellowship/              # 성도의교제
│   ├── offering/                # 온라인헌금
│   ├── login/                   # 로그인
│   ├── signup/                  # 회원가입
│   ├── calendar/                # 일정
│   ├── cafe/                    # 카페
│   ├── privacy/                 # 개인정보처리방침
│   └── terms/                   # 이용약관
├── components/                  # 재사용 가능한 컴포넌트
│   ├── header.tsx               # 헤더 (네비게이션 포함)
│   ├── footer.tsx               # 푸터
│   ├── hero-section.tsx         # 히어로 섹션
│   ├── quick-links.tsx          # 퀵 링크
│   ├── live-worship-section.tsx # 온라인 예배 섹션
│   ├── bulletin-section.tsx     # 주보 섹션
│   ├── gallery-section.tsx       # 갤러리 섹션
│   ├── location-section.tsx     # 위치 섹션
│   └── ui/                      # UI 컴포넌트 (shadcn/ui)
│       ├── button.tsx
│       ├── card.tsx
│       ├── navigation-menu.tsx
│       ├── sheet.tsx
│       └── ...
├── lib/                         # 유틸리티 및 헬퍼 함수
│   ├── utils.ts                # 공통 유틸리티
│   ├── api.ts                  # API 클라이언트
│   └── constants.ts            # 상수 정의
├── types/                       # TypeScript 타입 정의
│   ├── index.ts
│   ├── menu.ts
│   └── content.ts
├── data/                        # 정적 데이터 (선택적)
│   ├── menu-items.ts           # 메뉴 구조
│   └── church-info.ts          # 교회 정보
├── public/                      # 정적 파일
│   ├── images/                 # 이미지
│   ├── documents/              # 문서 (주보 등)
│   └── ...
├── styles/                      # 추가 스타일 (선택적)
├── hooks/                       # 커스텀 훅
├── context/                     # React Context (선택적)
└── config/                      # 설정 파일
    └── site.ts                  # 사이트 설정
```

### 4.2 컴포넌트 구조 상세

#### 4.2.1 Header 컴포넌트 구조

```typescript
// components/header.tsx
interface MenuItem {
  title: string;
  href: string;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  title: string;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    title: "교회소개",
    href: "/about",
    submenu: [
      { title: "인사말", href: "/about/greeting" },
      { title: "예배안내", href: "/about/worship-info" },
      { title: "섬기는 분들", href: "/about/staff" },
      { title: "실시간 온라인 예배", href: "/worship/online" },
      { title: "온라인 헌금", href: "/offering" },
      { title: "시설소개", href: "/about/facilities" },
      { title: "교회연혁", href: "/about/history" },
      { title: "오시는 길", href: "/about/location" },
    ],
  },
  {
    title: "교회학교",
    href: "/sunday-school",
    submenu: [
      { title: "유치부", href: "/sunday-school/kindergarten" },
      { title: "초등부", href: "/sunday-school/elementary" },
      { title: "중고등부", href: "/sunday-school/youth" },
      { title: "대학청년부", href: "/sunday-school/college" },
      { title: "2024 이전", href: "/sunday-school/archive-2024" },
    ],
  },
  {
    title: "양육/모임",
    href: "/nurturing",
    submenu: [
      { title: "교회교육", href: "/nurturing/education" },
      { title: "2025년 암송구절", href: "/nurturing/memory-verse-2025" },
      { title: "성경통신문제", href: "/nurturing/bible-study" },
      { title: "오늘의 묵상", href: "/nurturing/devotion" },
    ],
  },
  {
    title: "교회소식",
    href: "/news",
    submenu: [
      { title: "공지사항", href: "/news/announcements" },
      { title: "주보", href: "/news/bulletin" },
      { title: "새가족 소개", href: "/news/new-members" },
      { title: "혜광 갤러리", href: "/gallery" },
    ],
  },
  {
    title: "성도의교제",
    href: "/fellowship",
    submenu: [
      { title: "은혜 나눔", href: "/fellowship/testimonies" },
      { title: "감사 나눔", href: "/fellowship/thanksgiving" },
      { title: "일상 나눔", href: "/fellowship/daily" },
    ],
  },
];
```

#### 4.2.2 페이지 레이아웃 구조

각 섹션별로 `layout.tsx`를 만들어 일관된 레이아웃 제공:

```typescript
// app/about/layout.tsx
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">교회소개</h1>
      <nav className="mb-8">
        {/* 서브 네비게이션 */}
      </nav>
      {children}
    </div>
  );
}
```

### 4.3 데이터 구조

#### 4.3.1 메뉴 데이터

```typescript
// data/menu-items.ts
export const menuItems = [
  // ... (위의 메뉴 구조 참조)
];

// types/menu.ts
export interface MenuItem {
  title: string;
  href: string;
  submenu?: SubMenuItem[];
  icon?: React.ComponentType;
}

export interface SubMenuItem {
  title: string;
  href: string;
  description?: string;
}
```

#### 4.3.2 교회 정보

```typescript
// data/church-info.ts
export const churchInfo = {
  name: "혜광교회",
  nameEn: "Hyegwang Church",
  denomination: "대한예수교장로회(고신) 경기서부노회",
  established: "1991년 3월 3일",
  address: {
    full: "경기 부천시 원미구 상이로51번길 30",
    city: "부천시",
    district: "원미구",
    street: "상이로51번길 30",
  },
  contact: {
    phone: "032-327-5547",
    email: "ihkchurch@naver.com",
  },
  social: {
    youtube: "https://www.youtube.com/@혜광교회-l5f",
    facebook: "#",
    band: "#",
  },
};
```

---

## 5. 드롭다운 메뉴 동작 방식

### 5.1 Desktop 드롭다운

- **트리거**: 메인 메뉴 항목에 마우스 호버 또는 클릭
- **표시 방식**: NavigationMenuContent를 사용한 드롭다운 패널
- **위치**: 메뉴 항목 바로 아래
- **애니메이션**: 페이드 인/아웃, 슬라이드 다운

### 5.2 Mobile 드롭다운

- **트리거**: 햄버거 메뉴 아이콘 클릭
- **표시 방식**: Sheet 컴포넌트를 사용한 사이드 드로어
- **위치**: 화면 오른쪽에서 슬라이드 인
- **서브메뉴**: 아코디언 형태로 확장/축소

### 5.3 라우팅 동작

1. **메인 메뉴 클릭**: 해당 섹션의 메인 페이지로 이동
   - 예: "교회소개" 클릭 → `/about`
2. **서브메뉴 클릭**: 해당 서브 페이지로 이동
   - 예: "인사말" 클릭 → `/about/greeting`
3. **활성 상태**: 현재 경로에 따라 메뉴 항목 하이라이트

---

## 6. 구현 권장사항

### 6.1 네비게이션 메뉴 업데이트

현재 `components/header.tsx`의 메뉴 구조를 실제 웹사이트 구조에 맞게 업데이트 필요:

```typescript
// 기존 구조와 실제 웹사이트 구조의 차이점
// 1. "교회소개" 서브메뉴에 더 많은 항목 추가
// 2. "교회학교" 메뉴 추가 (현재는 "주일학교"로만 존재)
// 3. "양육/모임" 메뉴 구조 변경
// 4. "교회소식" 메뉴 추가
// 5. "성도의교제" 메뉴 추가
```

### 6.2 라우팅 구조 생성

Next.js App Router를 사용하여 위의 디렉토리 구조대로 페이지 생성:

```bash
# 예시: 교회소개 섹션 생성
mkdir -p app/about/{greeting,staff,facilities,history,location}
touch app/about/layout.tsx
touch app/about/page.tsx
touch app/about/greeting/page.tsx
# ... 등등
```

### 6.3 동적 라우팅 고려사항

향후 확장을 위해 동적 라우팅도 고려:

```
app/
├── news/
│   ├── announcements/
│   │   ├── page.tsx              # 목록 페이지
│   │   └── [id]/
│   │       └── page.tsx          # 상세 페이지
│   └── bulletin/
│       ├── page.tsx              # 목록 페이지
│       └── [id]/
│           └── page.tsx          # 상세 페이지
```

---

## 7. 마이그레이션 체크리스트

### 7.1 메뉴 구조 업데이트
- [ ] Header 컴포넌트의 menuItems 배열 업데이트
- [ ] 모든 서브메뉴 항목 추가
- [ ] 모바일 메뉴도 동일하게 업데이트

### 7.2 페이지 생성
- [ ] `/about` 섹션 페이지들 생성
- [ ] `/sunday-school` 섹션 페이지들 생성
- [ ] `/nurturing` 섹션 페이지들 생성
- [ ] `/news` 섹션 페이지들 생성
- [ ] `/fellowship` 섹션 페이지들 생성

### 7.3 레이아웃 생성
- [ ] 각 섹션별 layout.tsx 생성
- [ ] 서브 네비게이션 컴포넌트 생성
- [ ] Breadcrumb 컴포넌트 추가 (선택적)

### 7.4 콘텐츠 마이그레이션
- [ ] 기존 사이트의 콘텐츠 추출
- [ ] 이미지 및 미디어 파일 마이그레이션
- [ ] 문서 파일 (주보 등) 마이그레이션

### 7.5 SEO 최적화
- [ ] 각 페이지별 메타 태그 설정
- [ ] Open Graph 태그 추가
- [ ] 구조화된 데이터 (Schema.org) 추가

---

## 8. 참고사항

### 8.1 기존 사이트의 특징
- Query Parameter 기반 라우팅 사용
- 회원 시스템 존재 (로그인, 회원가입)
- 커뮤니티 기능 (카페, 일정)
- 개인정보처리방침 및 이용약관 페이지 존재

### 8.2 Next.js로 마이그레이션 시 고려사항
- **SEO**: App Router의 서버 컴포넌트 활용
- **성능**: 이미지 최적화, 레이지 로딩
- **접근성**: 키보드 네비게이션, 스크린 리더 지원
- **반응형**: 모바일 우선 디자인

### 8.3 향후 확장 계획
- 회원 시스템 통합
- CMS 연동 (콘텐츠 관리)
- 실시간 예배 스트리밍
- 온라인 헌금 결제 시스템

---

## 9. URL 매핑 테이블

| 기존 URL 패턴 | 새로운 Next.js 경로 | 메뉴 |
|--------------|-------------------|------|
| `/modu/document/...?lef=01` | `/about/*` | 교회소개 |
| `/modu/document/...?lef=02` | `/sunday-school/*` | 교회학교 |
| `/modu/document/...?lef=03` | `/nurturing/*` | 양육/모임 |
| `/modu/document/...?lef=04` | `/news/*` | 교회소식 |
| `/modu/document/...?lef=05` | `/fellowship/*` | 성도의교제 |

---

**문서 버전**: 1.0  
**작성일**: 2025-01-28  
**작성자**: AI Assistant  
**참고 URL**: https://www.ihkchurch.com

