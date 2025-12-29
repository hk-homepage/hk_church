# 혜광교회 웹사이트

> 다음세대가 춤추는 교회, 부천 혜광교회 공식 웹사이트

## 🏛️ 프로젝트 개요

Next.js 16 (App Router)와 TypeScript를 기반으로 구축된 현대적인 교회 웹사이트입니다.

### 주요 특징

- ✅ **재사용 가능한 컴포넌트**: 코드 중복 최소화
- ✅ **타입 안정성**: TypeScript strict 모드
- ✅ **반응형 디자인**: 모바일/태블릿/데스크톱 지원
- ✅ **다크 모드**: 자동 테마 전환
- ✅ **확장 가능한 구조**: 새로운 기능 추가 용이

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.x 이상
- npm 또는 pnpm

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 열기
# http://localhost:3000
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📁 프로젝트 구조

```
hk_church/
├── app/                # Next.js App Router
├── components/         # React 컴포넌트
├── lib/               # 유틸리티 및 설정
├── types/             # TypeScript 타입
├── public/            # 정적 파일
└── docs/              # 프로젝트 문서
```

## 📚 문서

상세한 문서는 `/docs` 디렉토리에서 확인할 수 있습니다:

- [프로젝트 개요](./docs/overview.md) - 프로젝트 철학 및 목표
- [아키텍처](./docs/architecture.md) - 앱 구조 및 라우팅
- [UI 시스템](./docs/ui-system.md) - 디자인 규칙 및 컴포넌트
- [게시판 시스템](./docs/board-system.md) - 게시판 구현 상세
- [데이터 모델](./docs/data-models.md) - TypeScript 타입 및 스키마
- [인증 및 권한](./docs/auth-and-roles.md) - 사용자 관리 (향후)
- [변경 이력](./docs/changelog.md) - 버전별 변경사항

## 🛠️ 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: shadcn/ui
- **아이콘**: Lucide React
- **데이터베이스**: Supabase (예정)
- **배포**: Vercel

## 🎨 주요 기능

### 현재 구현됨

- ✅ 반응형 레이아웃
- ✅ 다크 모드 지원
- ✅ 재사용 가능한 게시판 시스템
- ✅ 페이지네이션
- ✅ 서브 네비게이션
- ✅ Mock 데이터 시스템

### 개발 예정

- ⏳ Supabase 데이터베이스 연동
- ⏳ 회원 인증 시스템
- ⏳ 관리자 페이지
- ⏳ 게시글 작성/수정/삭제
- ⏳ 댓글 시스템
- ⏳ 이미지 업로드

## 📖 개발 가이드

### 코드 스타일

- TypeScript strict 모드 사용
- 함수형 컴포넌트 우선
- Named exports 사용
- 파일명: kebab-case, 컴포넌트명: PascalCase

### 컴포넌트 규칙

- 작고 집중된 컴포넌트
- 재사용 가능한 로직은 커스텀 훅으로
- JSX 내부의 복잡한 로직 지양

### 문서화

- 주요 결정사항은 `/docs/decisions`에 기록
- 변경사항은 `changelog.md`에 업데이트
- 새로운 기능은 관련 문서 업데이트

## 🤝 기여하기

1. 새로운 기능 추가 전 관련 문서 확인
2. 코드 스타일 가이드 준수
3. 타입 안정성 유지
4. 재사용 가능한 컴포넌트 우선 고려

## 📝 라이선스

이 프로젝트는 혜광교회의 소유입니다.

## 📞 문의

- **교회**: 혜광교회
- **주소**: 경기도 부천시 원미구
- **전화**: 032-XXX-XXXX
- **이메일**: info@ihkchurch.com

---

**마지막 업데이트**: 2025-12-29