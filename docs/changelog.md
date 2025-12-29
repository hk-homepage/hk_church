# 변경 이력 (Changelog)

모든 주요 변경사항은 이 파일에 기록됩니다.

## [Unreleased]

### 계획 중
- Supabase 데이터베이스 연동
- 회원 인증 시스템
- 관리자 페이지
- 게시글 작성/수정/삭제 기능
- 댓글 시스템

---

## [0.2.0] - 2025-12-29

### Added
- 성도의 교제 게시판 시스템 구현
  - 은혜 나눔, 감사 나눔, 일상 나눔 3개 게시판
  - 재사용 가능한 게시판 컴포넌트 설계
  - 페이지네이션 기능
  - Mock 데이터 생성 시스템
- 헤더 메뉴 리다이렉트 기능
  - 메인 메뉴 클릭 시 첫 번째 서브메뉴로 자동 이동
  - 드롭다운 아이콘 클릭 시에는 리다이렉트 없이 메뉴 표시
- 문서화 시스템 구축
  - `/docs` 디렉토리 구조 생성
  - 프로젝트 개요, 아키텍처, UI 시스템 문서 작성
  - 설계 결정사항 문서화

### Changed
- 게시판 라우팅 구조 변경
  - `/fellowship/testimonies` → `/fellowship/grace`
  - `/fellowship/thanksgiving` → `/fellowship/thanks`
  - `/fellowship/daily` 유지
- 서브 네비게이션 링크 업데이트

### Fixed
- 중복 폴더 제거 (testimonies, thanksgiving)
- BoardPagination 컴포넌트 클라이언트 컴포넌트로 변경

---

## [0.1.0] - 2025-12-28

### Added
- 프로젝트 초기 설정
  - Next.js 16 (App Router) 설정
  - TypeScript 설정
  - Tailwind CSS 설정
  - shadcn/ui 컴포넌트 설치
- 기본 레이아웃 구현
  - Header 컴포넌트 (네비게이션, 로고)
  - Footer 컴포넌트
  - SubNavigation 컴포넌트
- 페이지 구조 생성
  - 교회소개 섹션
  - 교회학교 섹션
  - 양육/모임 섹션
  - 교회소식 섹션
  - 성도의교제 섹션 (초기 버전)
- 프로젝트 문서 작성
  - PROJECT_STRUCTURE.md
  - PAGE_SPECIFICATIONS.md
  - PRD.md

### Technical Details
- **Framework**: Next.js 16.0.10
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Tailwind CSS**: 4.1.9
- **Node.js**: 18.x 이상

---

## 버전 관리 규칙

### 버전 번호 형식
`MAJOR.MINOR.PATCH`

- **MAJOR**: 주요 기능 변경 또는 호환성 깨지는 변경
- **MINOR**: 새로운 기능 추가 (하위 호환성 유지)
- **PATCH**: 버그 수정 및 작은 개선

### 변경 유형

- **Added**: 새로운 기능
- **Changed**: 기존 기능 변경
- **Deprecated**: 곧 제거될 기능
- **Removed**: 제거된 기능
- **Fixed**: 버그 수정
- **Security**: 보안 관련 수정

---

**마지막 업데이트**: 2025-12-29
