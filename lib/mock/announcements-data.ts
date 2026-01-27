// Mock data generators for announcements (temporary until Supabase)
import type { FellowshipPost } from '@/types/posts'

// announcements 목록 데이터
export const announcementsList = [
  {
    id: 1,
    title: "2025년 신년 감사예배 안내",
    date: "2025.01.01",
    views: 156,
    isImportant: true,
  },
  {
    id: 2,
    title: "2025년 교회 행사 일정 안내",
    date: "2024.12.28",
    views: 234,
    isImportant: true,
  },
  {
    id: 3,
    title: "성탄절 특별 예배 안내",
    date: "2024.12.20",
    views: 189,
    isImportant: false,
  },
  {
    id: 4,
    title: "겨울 수련회 신청 안내",
    date: "2024.12.15",
    views: 312,
    isImportant: false,
  },
  {
    id: 5,
    title: "교회학교 교사 모집",
    date: "2024.12.10",
    views: 98,
    isImportant: false,
  },
]

// 날짜 문자열을 ISO 형식으로 변환 (예: "2025.01.01" -> "2025-01-01T00:00:00.000Z")
function parseDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('.')
  return new Date(`${year}-${month}-${day}T00:00:00.000Z`).toISOString()
}

// 공지사항 상세 Mock 데이터 생성
export function generateAnnouncementDetail(id: string | number): FellowshipPost {
  const announcementId = typeof id === 'string' ? parseInt(id, 10) : id
  const announcement = announcementsList.find(a => a.id === announcementId) || announcementsList[0]

  // 각 공지사항별 본문 내용
  const contents: Record<number, string> = {
    1: `# 2025년 신년 감사예배 안내

새해를 맞이하여 하나님의 은혜에 감사드리며 신년 감사예배를 드립니다.

## 예배 일정
- **일시**: 2025년 1월 1일 (수) 오전 11시
- **장소**: 혜광교회 본당
- **예배 순서**: 찬양, 기도, 말씀, 헌신

## 특별 프로그램
- 신년 헌신 예배
- 새해 다짐 나눔 시간
- 교회 가족과 함께하는 점심 식사

모든 성도님들의 많은 참석을 부탁드립니다.`,

    2: `# 2025년 교회 행사 일정 안내

2025년 한 해 동안 진행될 주요 교회 행사 일정을 안내드립니다.

## 주요 행사 일정

### 1분기
- 1월: 신년 감사예배, 새해 헌신 예배
- 2월: 설날 특별 예배, 전도 집회
- 3월: 부활절 특별 예배, 봄 수련회

### 2분기
- 4월: 어린이 주일, 어버이 주일
- 5월: 가정의 달 특별 예배
- 6월: 여름 수련회 준비

### 3분기
- 7월: 여름 수련회, 청년 특별 집회
- 8월: 여름 성경학교
- 9월: 추수 감사 주일 준비

### 4분기
- 10월: 추수 감사 주일
- 11월: 전도 주간
- 12월: 성탄절 특별 예배, 송년 감사 예배

자세한 일정은 추후 공지사항을 통해 안내드리겠습니다.`,

    3: `# 성탄절 특별 예배 안내

하나님의 사랑을 기념하는 성탄절 특별 예배를 드립니다.

## 예배 일정
- **일시**: 2024년 12월 25일 (수) 오전 11시
- **장소**: 혜광교회 본당
- **특별 프로그램**: 성탄 찬양, 어린이 합창, 성탄 축하 공연

## 참석 안내
- 모든 성도님들의 참석을 환영합니다
- 어린이와 청소년들의 특별 공연이 준비되어 있습니다
- 예배 후 교회 가족과 함께하는 성탄 축하 시간이 있습니다

하나님의 사랑이 가득한 성탄절이 되기를 기원합니다.`,

    4: `# 겨울 수련회 신청 안내

2025년 겨울 수련회 참가 신청을 받습니다.

## 수련회 일정
- **일시**: 2025년 1월 15일(수) ~ 1월 17일(금) 2박 3일
- **장소**: 교회 수련원
- **대상**: 전 교인 (초등학생 이상)

## 신청 방법
- 교회 사무실로 직접 방문하여 신청
- 온라인 신청 가능 (추후 링크 공지)
- 신청 기간: 2024년 12월 20일 ~ 2025년 1월 5일

## 참가비
- 성인: 50,000원
- 청소년: 40,000원
- 초등학생: 30,000원

많은 참여 부탁드립니다.`,

    5: `# 교회학교 교사 모집

혜광교회 교회학교에서 함께 섬길 교사를 모집합니다.

## 모집 대상
- 주일학교 교사 (유치부, 초등부, 중고등부)
- 교회학교 사역에 헌신할 수 있는 분
- 어린이와 청소년을 사랑하는 분

## 지원 자격
- 세례를 받은 교인
- 정기적으로 예배에 참석하시는 분
- 교사 교육에 참여 가능하신 분

## 지원 방법
- 교회 사무실로 문의
- 담당 목사님께 직접 상담

하나님의 사역에 함께하실 분들의 많은 관심과 지원을 부탁드립니다.`,
  }

  const content = contents[announcement.id] || `# ${announcement.title}

이것은 ${announcement.title}의 본문 내용입니다.

혜광교회의 소식을 전해드립니다.

## 주요 내용

- 첫 번째 항목
- 두 번째 항목
- 세 번째 항목

자세한 내용은 교회 사무실로 문의해 주시기 바랍니다.`

  const createdAt = parseDate(announcement.date)

  return {
    id: `announcement-${announcement.id}`,
    category_slug: 'daily' as const, // 임시로 daily 사용 (announcements 전용 타입이 없음)
    title: announcement.title,
    content: content,
    author_id: 'admin',
    author_name: '교회 사무실',
    view_count: announcement.views,
    is_pinned: announcement.isImportant,
    is_featured: announcement.isImportant,
    attachments: [],
    thumbnail_url: null,
    created_at: createdAt,
    updated_at: createdAt,
  }
}
