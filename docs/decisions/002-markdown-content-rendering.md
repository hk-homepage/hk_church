# ADR-002: Markdown 콘텐츠 렌더링으로 전환

## 상태
적용됨 (2026-01-02)

## 컨텍스트
`board-detail.tsx`에서 게시글 본문을 `dangerouslySetInnerHTML`로 렌더링하고 있었음.
이는 XSS(Cross-Site Scripting) 취약점을 유발할 수 있는 보안 문제.

### 고려한 옵션
1. **sanitize-html로 HTML 정화** - HTML 유지, allowlist 기반 필터링
2. **Markdown 렌더링으로 전환** - HTML 직접 입력 불가, 구조적으로 안전

## 결정
**옵션 2: Markdown 렌더링**을 선택함.

### 사용 라이브러리
- `react-markdown`: Markdown → React 컴포넌트 변환
- `rehype-sanitize`: 추가 보안 레이어 (혹시 모를 우회 방지)

## 이유
1. **XSS 원천 차단**: Markdown은 `<script>` 같은 태그를 파싱하지 않음
2. **단순한 보안 모델**: allowlist 관리 불필요
3. **교회 게시판 용도에 적합**: 복잡한 HTML 기능 불필요
4. **장기 유지보수 용이**: 보안 설정 실수 가능성 낮음

## 구현
### 파일 변경
- `lib/utils/markdown.tsx`: MarkdownContent 컴포넌트 생성
- `components/fellowship/board-detail.tsx`: dangerouslySetInnerHTML → MarkdownContent
- `lib/mock/fellowship-data.ts`: HTML → Markdown 형식으로 변경

### 코드 예시
```tsx
// Before (위험)
<div dangerouslySetInnerHTML={{ __html: post.content }} />

// After (안전)
<MarkdownContent content={post.content} className="prose" />
```

## 영향
- 기존 HTML 콘텐츠는 Markdown으로 마이그레이션 필요
- Supabase 연동 시 콘텐츠 저장 형식: Markdown 문자열
- 향후 에디터 도입 시 Markdown 에디터 사용 권장

## 참고
- [react-markdown](https://github.com/remarkjs/react-markdown)
- [rehype-sanitize](https://github.com/rehypejs/rehype-sanitize)
