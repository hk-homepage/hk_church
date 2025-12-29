# UI 시스템 문서

## 디자인 원칙

### 핵심 가치

1. **차분하고 읽기 쉬운 UI**: 교회에 적합한 차분한 디자인
2. **공격적이지 않은 색상**: 화려한 애니메이션이나 강렬한 색상 지양
3. **여백과 공간 활용**: 세로 간격과 여백을 충분히 활용
4. **모바일 우선**: 모바일 사용자와 고령 사용자 고려

### 사용자 고려사항

- **고령 사용자**: 큰 글씨, 명확한 버튼, 간단한 네비게이션
- **모바일 사용자**: 터치 친화적 UI, 반응형 레이아웃
- **접근성**: WCAG 2.1 AA 수준 준수

## 컴포넌트 구조

### 컴포넌트 분류

#### 1. UI 컴포넌트 (`components/ui/`)

재사용 가능한 기본 UI 컴포넌트 (shadcn/ui 기반):

- `button.tsx`: 버튼
- `card.tsx`: 카드
- `dialog.tsx`: 다이얼로그/모달
- `input.tsx`: 입력 필드
- `navigation-menu.tsx`: 네비게이션 메뉴
- `sheet.tsx`: 사이드 시트 (모바일 메뉴)
- `accordion.tsx`: 아코디언
- 기타 shadcn/ui 컴포넌트

**규칙**:
- 비즈니스 로직 없음
- Props를 통한 완전한 커스터마이징
- 일관된 스타일링
- TypeScript 타입 정의 필수

#### 2. 레이아웃 컴포넌트 (`components/`)

전역 레이아웃 컴포넌트:

- `header.tsx`: 헤더 (네비게이션, 로고)
- `footer.tsx`: 푸터 (정보, 링크)
- `page-header.tsx`: 페이지 헤더
- `sub-navigation.tsx`: 서브 네비게이션

**규칙**:
- 전역적으로 사용
- 일관된 레이아웃 제공
- 반응형 디자인 필수

#### 3. 기능 컴포넌트 (`components/[feature]/`)

특정 기능에 특화된 컴포넌트:

- `components/fellowship/`: 게시판 컴포넌트
- `components/home/`: 홈페이지 섹션 컴포넌트
- 기타 페이지별 컴포넌트

**규칙**:
- 재사용 가능하도록 설계
- Props를 통한 커스터마이징
- UI 컴포넌트 조합하여 구성

## 스타일 가이드

### 색상 팔레트

```css
/* 주요 색상 */
--primary: 교회 메인 컬러 (파란색 계열)
--secondary: 보조 컬러
--accent: 강조 컬러

/* 배경 */
--background: 배경색 (흰색/다크)
--foreground: 전경색 (검정/흰색)

/* 상태 */
--muted: 비활성화
--destructive: 삭제/경고
```

### 타이포그래피

```css
/* 폰트 크기 */
text-xs: 0.75rem (12px)
text-sm: 0.875rem (14px)
text-base: 1rem (16px)
text-lg: 1.125rem (18px)
text-xl: 1.25rem (20px)
text-2xl: 1.5rem (24px)
text-3xl: 1.875rem (30px)

/* 폰트 굵기 */
font-normal: 400
font-medium: 500
font-semibold: 600
font-bold: 700
```

### 간격 (Spacing)

```css
/* 패딩/마진 */
p-2: 0.5rem (8px)
p-4: 1rem (16px)
p-6: 1.5rem (24px)
p-8: 2rem (32px)

/* 갭 */
gap-2: 0.5rem
gap-4: 1rem
gap-6: 1.5rem
gap-8: 2rem
```

### 반응형 브레이크포인트

```css
/* 모바일 */
기본: < 640px

/* 태블릿 */
sm: 640px
md: 768px

/* 데스크톱 */
lg: 1024px
xl: 1280px
2xl: 1536px
```

## 컴포넌트 패턴

### 1. 게시판 컴포넌트 패턴

재사용 가능한 게시판 시스템:

```tsx
// 목록 컴포넌트
<BoardList 
  posts={posts} 
  category={category}
  currentPage={currentPage}
  postsPerPage={postsPerPage}
/>

// 상세 컴포넌트
<BoardDetail post={post} />

// 페이지네이션
<BoardPagination 
  pagination={pagination}
  baseUrl={baseUrl}
/>
```

**특징**:
- `category` props로 게시판 구분
- 동일한 UI/UX 제공
- 확장 가능한 구조

### 2. 카드 패턴

```tsx
<Card>
  <CardHeader>
    <CardTitle>제목</CardTitle>
    <CardDescription>설명</CardDescription>
  </CardHeader>
  <CardContent>
    내용
  </CardContent>
  <CardFooter>
    액션 버튼
  </CardFooter>
</Card>
```

### 3. 네비게이션 패턴

```tsx
// 메인 네비게이션
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>메뉴</NavigationMenuTrigger>
      <NavigationMenuContent>
        서브메뉴
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

// 서브 네비게이션
<SubNavigation items={subNavItems} />
```

## 아이콘 시스템

### Lucide React 사용

```tsx
import { 
  Church,      // 교회
  User,        // 사용자
  Calendar,    // 일정
  Menu,        // 메뉴
  Search,      // 검색
  Heart,       // 좋아요
  MessageSquare, // 댓글
  Eye,         // 조회수
  Pin,         // 고정
  Paperclip,   // 첨부파일
  Download,    // 다운로드
  ArrowLeft,   // 뒤로가기
  ChevronLeft, // 이전
  ChevronRight // 다음
} from 'lucide-react'
```

**규칙**:
- 일관된 크기 사용 (w-4 h-4, w-5 h-5 등)
- 의미에 맞는 아이콘 선택
- 접근성을 위한 aria-label 추가

## 다크 모드

### 구현 방식

```tsx
// Tailwind CSS dark: 접두사 사용
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  콘텐츠
</div>
```

### 색상 변수

```css
/* 라이트 모드 */
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;

/* 다크 모드 */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}
```

## 접근성 (Accessibility)

### 체크리스트

- [ ] 모든 이미지에 alt 텍스트
- [ ] 키보드 네비게이션 지원
- [ ] 충분한 색상 대비 (4.5:1 이상)
- [ ] ARIA 레이블 적절히 사용
- [ ] 포커스 표시 명확히
- [ ] 스크린 리더 호환

### 예시

```tsx
// 버튼
<button aria-label="메뉴 열기">
  <Menu className="w-6 h-6" />
  <span className="sr-only">메뉴 열기</span>
</button>

// 링크
<Link href="/about" aria-label="교회소개 페이지로 이동">
  교회소개
</Link>

// 이미지
<img 
  src="/logo.png" 
  alt="혜광교회 로고" 
/>
```

## 애니메이션

### 원칙

- **미묘하게**: 과도한 애니메이션 지양
- **빠르게**: 200-300ms 이내
- **의미있게**: 사용자 피드백 제공

### 예시

```tsx
// 호버 효과
<div className="transition-colors hover:bg-accent">
  호버 시 배경색 변경
</div>

// 페이드 인
<div className="animate-in fade-in duration-200">
  페이드 인 효과
</div>

// 슬라이드
<div className="animate-in slide-in-from-bottom duration-300">
  아래에서 슬라이드 인
</div>
```

## 모바일 최적화

### 터치 타겟

- 최소 크기: 44x44px
- 충분한 간격: 8px 이상

### 반응형 레이아웃

```tsx
// 모바일: 1열, 태블릿: 2열, 데스크톱: 3열
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} />)}
</div>
```

### 모바일 메뉴

```tsx
// Sheet 컴포넌트 사용
<Sheet>
  <SheetTrigger>메뉴</SheetTrigger>
  <SheetContent side="right">
    모바일 메뉴 내용
  </SheetContent>
</Sheet>
```

## 성능 최적화

### 이미지

```tsx
// Next.js Image 컴포넌트 사용
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="설명"
  width={400}
  height={300}
  loading="lazy"
/>
```

### 폰트

```tsx
// next/font 사용
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

---

**마지막 업데이트**: 2025-12-29
