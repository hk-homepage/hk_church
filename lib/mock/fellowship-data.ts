// Mock data generators for fellowship posts (temporary until Supabase)
import type { FellowshipPostListItem, FellowshipPost, BoardCategory } from '@/types/posts'
export function generateMockPosts(category: BoardCategory, count: number = 50): FellowshipPostListItem[] {
    const posts: FellowshipPostListItem[] = []

    const titles = {
        grace: [
            '합심기도팀 성탄을 기다리며 ♡',
            '추수 감사주일을 준비하며~~~',
            '상반기 성경통독반 종강',
            '2024년 하반기 성경 통독반 종강',
            '특별새벽 예배 완주 시상',
            '목요 합심기도사역 재개',
            '주일 예배의 은혜',
            '새벽기도의 축복',
            '말씀 묵상의 기쁨',
            '찬양 속에서 만난 하나님',
        ],
        thanks: [
            '건강 회복에 감사드립니다',
            '가족의 화목에 감사합니다',
            '직장에서의 승진 감사',
            '시험 합격 감사',
            '안전한 여행 감사',
            '새 집 마련 감사',
            '자녀 입학 감사',
            '사업 성공 감사',
            '좋은 만남 감사',
            '일용할 양식 감사',
        ],
        daily: [
            '교회 김장',
            '성탄트리점등식 준비(안수집사회)',
            '사랑2구역심방',
            '2024 찬양대 회식',
            '부흥1구역 심방',
            '목요노방전도',
            '오늘의 일상',
            '주말 나들이',
            '가족 모임',
            '취미 생활',
        ],
    }

    const authors = [
        '김성도', '이집사', '박권사', '최장로', '정집사',
        '강성도', '조권사', '윤집사', '임장로', '한성도',
    ]

    for (let i = 0; i < count; i++) {
        const titleList = titles[category]
        const title = titleList[i % titleList.length] + (i >= titleList.length ? ` (${Math.floor(i / titleList.length) + 1})` : '')

        const createdAt = new Date()
        createdAt.setDate(createdAt.getDate() - i)
        createdAt.setHours(Math.floor(Math.random() * 24))
        createdAt.setMinutes(Math.floor(Math.random() * 60))

        posts.push({
            id: `${category}-${i + 1}`,
            title,
            author_name: authors[Math.floor(Math.random() * authors.length)],
            view_count: Math.floor(Math.random() * 500),
            is_pinned: i < 2, // 처음 2개는 고정
            has_attachments: Math.random() > 0.7,
            thumbnail_url: Math.random() > 0.8 ? `https://picsum.photos/seed/${category}-${i}/400/300` : null,
            created_at: createdAt.toISOString(),
        })
    }

    return posts
}

// 상세 게시글 Mock 데이터
export function generateMockPostDetail(id: string, category: BoardCategory): FellowshipPost {
    const posts = generateMockPosts(category, 100)
    const listItem = posts.find(p => p.id === id) || posts[0]

    return {
        ...listItem,
        category_slug: category,
        content: `이것은 ${listItem.title}의 본문 내용입니다.

하나님께서 주신 은혜에 감사드립니다.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### 주요 내용

- 첫 번째 항목
- 두 번째 항목
- 세 번째 항목

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
        author_id: 'mock-user-id',
        is_featured: Math.random() > 0.8,
        attachments: listItem.has_attachments ? [
            {
                name: '첨부파일1.pdf',
                url: '/files/sample.pdf',
                size: 1024 * 500, // 500KB
                type: 'application/pdf',
            },
            {
                name: '이미지.jpg',
                url: '/files/sample.jpg',
                size: 1024 * 200, // 200KB
                type: 'image/jpeg',
            },
        ] : [],
        updated_at: listItem.created_at,
    }
}
