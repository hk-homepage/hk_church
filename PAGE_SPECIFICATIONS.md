# 혜광교회 웹사이트 페이지별 상세 명세서

## 문서 정보
- **작성일**: 2025-12-28
- **기준 사이트**: https://www.ihkchurch.com
- **개발 스택**: Next.js + Supabase + Vercel

---

## 📋 목차
1. [전체 사이트 구조](#전체-사이트-구조)
2. [공통 컴포넌트](#공통-컴포넌트)
3. [페이지별 상세 명세](#페이지별-상세-명세)
4. [데이터베이스 스키마](#데이터베이스-스키마)

---

## 전체 사이트 구조

### 네비게이션 계층 구조

```
혜광교회 웹사이트
├── 상단 유틸리티 메뉴
│   ├── 로그인
│   ├── 회원가입
│   ├── 문자 서비스
│   ├── 일정 (달력)
│   └── 카페 (외부 링크)
│
├── 1. 교회소개
│   ├── 인사말
│   ├── 예배안내
│   ├── 섬기는 분들
│   ├── 실시간 온라인 예배
│   ├── 온라인 헌금
│   ├── 시설소개
│   ├── 교회연혁
│   └── 오시는길
│
├── 2. 교회학교
│   ├── 유치부
│   ├── 초등부
│   ├── 중고등부
│   ├── 대학청년부
│   └── 2024 이전 자료
│
├── 3. 양육/모임
│   ├── 교회교육
│   ├── 2025년 암송구절
│   ├── 성경통신문제
│   └── 오늘의 묵상
│
├── 4. 교회소식
│   ├── 공지사항
│   ├── 주보
│   ├── 새가족 소개
│   └── 혜광 갤러리
│
└── 5. 성도의교제
    ├── 은혜 나눔
    ├── 감사 나눔
    └── 일상 나눔
```

---

## 공통 컴포넌트

### 1. Header (헤더)

#### 기능 요구사항
- **로고 영역**
  - 교회 로고 이미지 (클릭 시 홈으로 이동)
  - 교회명: "혜광교회" (한글)
  - 영문명: "Hyegwang Church"

- **상단 유틸리티 바**
  - 로그인 버튼 (비로그인 시)
  - 회원가입 버튼
  - 사용자 이름 + 로그아웃 (로그인 시)
  - 문자 서비스 링크 (회원 전용)
  - 일정 아이콘 (달력 페이지로 이동)
  - 카페 아이콘 (외부 링크, 새 창)

- **메인 네비게이션**
  - 5개 메인 메뉴 (드롭다운 서브메뉴 포함)
  - 호버 시 서브메뉴 표시
  - 현재 페이지 활성화 표시
  - 모바일: 햄버거 메뉴로 전환

#### 기술 명세
- **컴포넌트**: `components/layout/Header.tsx`
- **상태 관리**: 
  - 로그인 상태: Supabase Auth
  - 모바일 메뉴 열림/닫힘: useState
- **스타일**: Sticky header, backdrop-blur
- **반응형**: 
  - Desktop: 전체 메뉴 표시
  - Tablet/Mobile: 햄버거 메뉴

#### 데이터 요구사항
- 사용자 정보 (Supabase Auth)
- 메뉴 구조 (정적 데이터 또는 CMS)

---

### 2. Footer (푸터)

#### 기능 요구사항
- **교회 정보**
  - 교회명: 혜광교회
  - 주소: 경기도 부천시 원미구 (상세 주소)
  - 전화번호: 032-XXX-XXXX
  - 팩스: 032-XXX-XXXX
  - 이메일: info@ihkchurch.com

- **빠른 링크**
  - 교회소개
  - 예배안내
  - 오시는길
  - 개인정보처리방침

- **소셜 미디어**
  - YouTube 채널 링크
  - 카페 링크
  - 인스타그램 (선택)

- **저작권**
  - Copyright © 2025 혜광교회. All rights reserved.

#### 기술 명세
- **컴포넌트**: `components/layout/Footer.tsx`
- **스타일**: 3컬럼 레이아웃 (모바일: 1컬럼)

---

### 3. Breadcrumb (경로 표시)

#### 기능 요구사항
- 현재 페이지 경로 표시
- 각 경로 클릭 시 해당 페이지로 이동
- 예: 홈 > 교회소개 > 인사말

#### 기술 명세
- **컴포넌트**: `components/ui/Breadcrumb.tsx`
- **라이브러리**: Next.js usePathname

---

## 페이지별 상세 명세

---

## 1. 홈페이지 (/)

### 페이지 개요
- **경로**: `/`
- **파일**: `app/page.tsx`
- **목적**: 교회 소개 및 주요 정보 제공

### 섹션 구성

#### 1.1 히어로 슬라이더 (Hero Slider)

**기능 요구사항**
- 3개 이상의 슬라이드 자동 전환 (6초 간격)
- 각 슬라이드:
  - 배경 이미지 (1920x800px 권장)
  - 메인 제목 (예: "2025년 표어")
  - 부제목 (성경 구절 등)
  - CTA 버튼 (선택)
- 네비게이션:
  - 좌우 화살표 버튼
  - 하단 인디케이터 (점)
- 일시정지/재생 버튼 (선택)

**기술 명세**
- **컴포넌트**: `components/home/HeroSlider.tsx`
- **라이브러리**: Embla Carousel React
- **데이터 소스**: Supabase `hero_slides` 테이블
- **이미지**: Supabase Storage 또는 CDN

**데이터베이스 스키마**
```sql
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
```

---

#### 1.2 퀵 링크 (Quick Links)

**기능 요구사항**
- 주요 서비스 바로가기 아이콘 (6~8개)
  - 예배안내
  - 온라인예배
  - 주보
  - 갤러리
  - 오시는길
  - 온라인헌금
  - 새가족등록
  - 기도요청
- 각 아이콘 클릭 시 해당 페이지로 이동
- 아이콘 + 텍스트 레이블

**기술 명세**
- **컴포넌트**: `components/home/QuickLinks.tsx`
- **아이콘**: Lucide React
- **레이아웃**: Grid (4열 데스크톱, 2열 모바일)

---

#### 1.3 실시간 온라인 예배 (Live Worship)

**기능 요구사항**
- YouTube 최신 영상 임베드
- 영상 제목 및 날짜 표시
- "실시간 예배 참여" 버튼 (YouTube 라이브로 이동)
- "지난 예배 보기" 버튼 (예배 아카이브 페이지로 이동)
- 예배 시간 안내:
  - 주일 1부: 오전 9:00
  - 주일 2부: 오전 11:00
  - 수요예배: 저녁 7:30
  - 금요기도회: 저녁 8:00

**기술 명세**
- **컴포넌트**: `components/home/LiveWorship.tsx`
- **YouTube API**: 최신 영상 자동 가져오기 (선택)
- **데이터 소스**: Supabase `worship_videos` 테이블

**데이터베이스 스키마**
```sql
CREATE TABLE worship_videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  worship_date DATE NOT NULL,
  worship_type TEXT, -- '주일1부', '주일2부', '수요예배' 등
  description TEXT,
  thumbnail_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

#### 1.4 최신 주보 (Latest Bulletin)

**기능 요구사항**
- 최신 주보 3개 표시 (카드 형태)
- 각 카드:
  - 주보 표지 이미지 (썸네일)
  - 날짜 (예: 2025년 1월 5일)
  - 제목 (예: "신년 감사 예배")
  - "자세히 보기" 버튼
- "전체 주보 보기" 버튼

**기술 명세**
- **컴포넌트**: `components/home/LatestBulletin.tsx`
- **데이터 소스**: Supabase `bulletins` 테이블
- **정렬**: 날짜 내림차순

---

#### 1.5 공지사항 (Notices)

**기능 요구사항**
- 최신 공지사항 5개 리스트 표시
- 각 항목:
  - 제목
  - 날짜
  - 중요 공지 배지 (선택)
- "전체 공지 보기" 버튼

**기술 명세**
- **컴포넌트**: `components/home/NoticeList.tsx`
- **데이터 소스**: Supabase `notices` 테이블

---

#### 1.6 혜광 갤러리 (Gallery Preview)

**기능 요구사항**
- 최신 갤러리 이미지 6개 그리드 표시
- 각 이미지 호버 시 제목 표시
- 클릭 시 갤러리 상세 페이지로 이동
- "갤러리 전체 보기" 버튼

**기술 명세**
- **컴포넌트**: `components/home/GalleryPreview.tsx`
- **데이터 소스**: Supabase `gallery_images` 테이블
- **레이아웃**: Grid (3열)

---

#### 1.7 오시는길 (Location Map)

**기능 요구사항**
- 지도 임베드 (Kakao Map 또는 Google Maps)
- 교회 주소 표시
- 교통편 안내:
  - 지하철: 7호선 춘의역 3번 출구
  - 버스: 12번, 23번 등
- "상세 위치 보기" 버튼

**기술 명세**
- **컴포넌트**: `components/home/LocationMap.tsx`
- **지도 API**: Kakao Map API 또는 Google Maps API

---

## 2. 교회소개

### 2.1 인사말 (/about/greeting)

**페이지 개요**
- **경로**: `/about/greeting`
- **파일**: `app/about/greeting/page.tsx`
- **목적**: 담임목사 인사말 전달

**콘텐츠 구성**
- 페이지 제목: "담임목사 인사말"
- 목사님 사진 (좌측 또는 상단)
- 인사말 본문 (HTML 에디터로 작성)
- 서명 이미지 (선택)
- 목사님 정보:
  - 이름
  - 직책
  - 약력 (선택)

**기술 명세**
- **데이터 소스**: Supabase `pages` 테이블 (CMS 형태)
- **에디터**: Tiptap 또는 Quill (관리자용)

**데이터베이스 스키마**
```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL, -- 'greeting', 'vision' 등
  title TEXT NOT NULL,
  content JSONB, -- Tiptap JSON 형식
  meta_description TEXT,
  featured_image TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

### 2.2 예배안내 (/about/worship)

**페이지 개요**
- **경로**: `/about/worship`
- **파일**: `app/about/worship/page.tsx`
- **목적**: 예배 시간 및 장소 안내

**콘텐츠 구성**
- 페이지 제목: "예배안내"
- 예배 시간표 (테이블 형태):
  
  | 구분 | 시간 | 장소 |
  |------|------|------|
  | 주일 1부 예배 | 오전 9:00 | 본당 |
  | 주일 2부 예배 | 오전 11:00 | 본당 |
  | 주일학교 | 오전 11:00 | 각 교실 |
  | 수요예배 | 저녁 7:30 | 본당 |
  | 금요기도회 | 저녁 8:00 | 본당 |
  | 새벽기도회 | 오전 5:30 | 본당 |

- 각 예배 설명
- 온라인 예배 안내 링크

**기술 명세**
- **데이터 소스**: Supabase `worship_schedules` 테이블

**데이터베이스 스키마**
```sql
CREATE TABLE worship_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL, -- '주일 1부 예배'
  time TEXT NOT NULL, -- '오전 9:00'
  location TEXT, -- '본당'
  description TEXT,
  day_of_week INTEGER, -- 0=일요일, 1=월요일, ...
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true
);
```

---

### 2.3 섬기는 분들 (/about/staff)

**페이지 개요**
- **경로**: `/about/staff`
- **파일**: `app/about/staff/page.tsx`
- **목적**: 교회 리더십 소개

**콘텐츠 구성**
- 페이지 제목: "섬기는 분들"
- 섹션별 구분:
  1. **담임목사**
     - 사진
     - 이름
     - 약력
  2. **장로**
     - 사진 (선택)
     - 이름
     - 담당 사역
  3. **권사**
     - 이름 리스트
  4. **집사**
     - 이름 리스트
  5. **부서별 사역자**
     - 부서명
     - 담당자 이름

**기술 명세**
- **데이터 소스**: Supabase `staff` 테이블
- **레이아웃**: 카드 그리드

**데이터베이스 스키마**
```sql
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  position TEXT NOT NULL, -- '담임목사', '장로', '권사' 등
  department TEXT, -- '예배부', '교육부' 등
  photo_url TEXT,
  bio TEXT,
  email TEXT,
  phone TEXT,
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true
);
```

---

### 2.4 실시간 온라인 예배 (/about/online-worship)

**페이지 개요**
- **경로**: `/about/online-worship`
- **파일**: `app/about/online-worship/page.tsx`
- **목적**: 온라인 예배 참여 안내

**콘텐츠 구성**
- 페이지 제목: "실시간 온라인 예배"
- YouTube 라이브 임베드 (라이브 중일 때)
- 라이브 일정 안내
- 지난 예배 영상 리스트 (최신 10개)
  - 썸네일
  - 제목
  - 날짜
  - 재생 버튼
- 페이지네이션

**기술 명세**
- **데이터 소스**: Supabase `worship_videos` 테이블
- **YouTube API**: 라이브 상태 확인 (선택)

---

### 2.5 온라인 헌금 (/about/offering)

**페이지 개요**
- **경로**: `/about/offering`
- **파일**: `app/about/offering/page.tsx`
- **목적**: 헌금 안내 및 계좌 정보 제공

**콘텐츠 구성**
- 페이지 제목: "온라인 헌금"
- 헌금 종류별 계좌 정보:
  - 십일조
  - 감사헌금
  - 선교헌금
  - 건축헌금
- 각 계좌:
  - 은행명
  - 계좌번호
  - 예금주
- 헌금 안내 문구
- QR 코드 (선택)

**기술 명세**
- **데이터 소스**: Supabase `offering_accounts` 테이블 또는 정적 데이터

**향후 확장**
- PG 연동 (토스페이먼츠, 나이스페이 등)
- 헌금 내역 조회 (회원 전용)

---

### 2.6 시설소개 (/about/facilities)

**페이지 개요**
- **경로**: `/about/facilities`
- **파일**: `app/about/facilities/page.tsx`
- **목적**: 교회 시설 소개

**콘텐츠 구성**
- 페이지 제목: "시설소개"
- 시설별 섹션:
  - 본당
  - 소예배실
  - 교육관
  - 주차장
  - 기타 시설
- 각 시설:
  - 사진 (갤러리 형태)
  - 설명
  - 수용 인원 (선택)

**기술 명세**
- **데이터 소스**: Supabase `facilities` 테이블

---

### 2.7 교회연혁 (/about/history)

**페이지 개요**
- **경로**: `/about/history`
- **파일**: `app/about/history/page.tsx`
- **목적**: 교회 역사 소개

**콘텐츠 구성**
- 페이지 제목: "교회연혁"
- 타임라인 형태:
  - 1990년: 교회 설립
  - 1995년: 현 건물 입당
  - 2000년: 교육관 건축
  - 2010년: 창립 20주년
  - 2020년: 창립 30주년
- 각 항목:
  - 연도
  - 주요 사건
  - 사진 (선택)

**기술 명세**
- **데이터 소스**: Supabase `history_timeline` 테이블
- **UI**: 세로 타임라인 컴포넌트

**데이터베이스 스키마**
```sql
CREATE TABLE history_timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year INTEGER NOT NULL,
  month INTEGER,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  display_order INTEGER
);
```

---

### 2.8 오시는길 (/about/location)

**페이지 개요**
- **경로**: `/about/location`
- **파일**: `app/about/location/page.tsx`
- **목적**: 교회 위치 및 교통편 안내

**콘텐츠 구성**
- 페이지 제목: "오시는길"
- 지도 (Kakao Map 또는 Google Maps)
- 주소:
  - 도로명: 경기도 부천시 원미구 XXX로 XXX
  - 지번: 경기도 부천시 원미구 XXX동 XXX-XX
- 교통편:
  - **지하철**:
    - 7호선 춘의역 3번 출구 도보 5분
  - **버스**:
    - 일반: 12, 23, 34번
    - 좌석: 1000, 2000번
  - **자가용**:
    - 네비게이션 검색: "혜광교회"
    - 주차 안내
- 연락처:
  - 전화: 032-XXX-XXXX
  - 팩스: 032-XXX-XXXX
  - 이메일: info@ihkchurch.com

**기술 명세**
- **지도 API**: Kakao Map JavaScript API
- **컴포넌트**: `components/location/KakaoMap.tsx`

---

## 3. 교회학교

### 3.1 유치부 (/sunday-school/kindergarten)

**페이지 개요**
- **경로**: `/sunday-school/kindergarten`
- **파일**: `app/sunday-school/kindergarten/page.tsx`
- **목적**: 유치부 소개 및 활동 안내

**콘텐츠 구성**
- 페이지 제목: "유치부"
- 대상 연령: 5~7세
- 예배 시간: 주일 오전 11:00
- 예배 장소: 유치부실
- 담당 교사 소개
- 교육 프로그램:
  - 성경 이야기
  - 찬양
  - 만들기
  - 게임
- 활동 사진 갤러리
- 공지사항 (부서별)

**기술 명세**
- **데이터 소스**: 
  - Supabase `departments` 테이블 (부서 정보)
  - Supabase `department_posts` 테이블 (공지사항)
  - Supabase `gallery_images` 테이블 (갤러리)

**데이터베이스 스키마**
```sql
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL, -- '유치부', '초등부' 등
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  age_range TEXT, -- '5~7세'
  schedule TEXT, -- '주일 오전 11:00'
  location TEXT, -- '유치부실'
  teacher_name TEXT,
  teacher_photo_url TEXT,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE department_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  department_id UUID REFERENCES departments(id),
  title TEXT NOT NULL,
  content TEXT,
  post_type TEXT, -- 'notice', 'activity', 'photo'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

### 3.2 초등부 (/sunday-school/elementary)
### 3.3 중고등부 (/sunday-school/youth)
### 3.4 대학청년부 (/sunday-school/young-adult)

**구조는 유치부와 동일하며, 각 부서별 특성에 맞게 콘텐츠 조정**

---

### 3.5 2024 이전 자료 (/sunday-school/archive)

**페이지 개요**
- **경로**: `/sunday-school/archive`
- **파일**: `app/sunday-school/archive/page.tsx`
- **목적**: 과거 교회학교 자료 아카이브

**콘텐츠 구성**
- 연도별 필터
- 부서별 필터
- 자료 리스트 (테이블 또는 카드)
  - 제목
  - 날짜
  - 부서
  - 다운로드 링크

---

## 4. 양육/모임

### 4.1 교회교육 (/education/programs)

**페이지 개요**
- **경로**: `/education/programs`
- **파일**: `app/education/programs/page.tsx`
- **목적**: 교회 교육 프로그램 소개

**콘텐츠 구성**
- 페이지 제목: "교회교육"
- 프로그램 리스트:
  - 새가족 양육반
  - 제자훈련
  - 성경통독반
  - 큐티학교
  - 기도학교
- 각 프로그램:
  - 프로그램명
  - 대상
  - 기간
  - 일정
  - 신청 방법
  - 담당자

**기술 명세**
- **데이터 소스**: Supabase `education_programs` 테이블

**데이터베이스 스키마**
```sql
CREATE TABLE education_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  target_audience TEXT, -- '새가족', '전 성도' 등
  duration TEXT, -- '8주', '12주' 등
  schedule TEXT, -- '매주 수요일 저녁 7시'
  instructor TEXT,
  max_participants INTEGER,
  registration_start DATE,
  registration_end DATE,
  is_active BOOLEAN DEFAULT true
);
```

---

### 4.2 2025년 암송구절 (/education/memory-verses)

**페이지 개요**
- **경로**: `/education/memory-verses`
- **파일**: `app/education/memory-verses/page.tsx`
- **목적**: 연간 암송 성경 구절 제공

**콘텐츠 구성**
- 페이지 제목: "2025년 암송구절"
- 월별 암송 구절:
  - 1월: 요한복음 3:16
  - 2월: 시편 23:1
  - ...
- 각 구절:
  - 성경 본문
  - 해설 (선택)
  - 암송 팁
- PDF 다운로드 (전체 암송 구절)

**기술 명세**
- **데이터 소스**: Supabase `memory_verses` 테이블

---

### 4.3 성경통신문제 (/education/bible-quiz)

**페이지 개요**
- **경로**: `/education/bible-quiz`
- **파일**: `app/education/bible-quiz/page.tsx`
- **목적**: 성경 퀴즈 제공

**콘텐츠 구성**
- 페이지 제목: "성경통신문제"
- 주차별 문제 리스트
- 각 문제:
  - 제목 (예: "1주차 - 창세기 1-5장")
  - 문제 PDF 다운로드
  - 정답 제출 (회원 전용)
- 정답 확인 (제출 후)

**기술 명세**
- **데이터 소스**: Supabase `bible_quizzes` 테이블
- **파일 저장**: Supabase Storage

---

### 4.4 오늘의 묵상 (/education/devotional)

**페이지 개요**
- **경로**: `/education/devotional`
- **파일**: `app/education/devotional/page.tsx`
- **목적**: 일일 묵상 자료 제공

**콘텐츠 구성**
- 페이지 제목: "오늘의 묵상"
- 오늘 날짜 표시
- 묵상 본문:
  - 성경 구절
  - 묵상 글
  - 기도 제목
- 이전/다음 날짜 네비게이션
- 달력 뷰 (날짜별 묵상 선택)

**기술 명세**
- **데이터 소스**: Supabase `devotionals` 테이블

**데이터베이스 스키마**
```sql
CREATE TABLE devotionals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE UNIQUE NOT NULL,
  scripture_reference TEXT NOT NULL, -- '요한복음 3:16-17'
  scripture_text TEXT NOT NULL,
  meditation_text TEXT NOT NULL,
  prayer_points TEXT[],
  author TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 5. 교회소식

### 5.1 공지사항 (/news/notices)

**페이지 개요**
- **경로**: `/news/notices`
- **파일**: `app/news/notices/page.tsx`
- **목적**: 교회 공지사항 게시판

**콘텐츠 구성**
- 페이지 제목: "공지사항"
- 게시판 기능:
  - 리스트 뷰 (테이블 형태)
    - 번호
    - 제목
    - 작성자
    - 작성일
    - 조회수
  - 중요 공지 상단 고정
  - 검색 기능 (제목, 내용)
  - 페이지네이션 (10개씩)
- 글쓰기 버튼 (관리자 전용)

**상세 페이지** (`/news/notices/[id]`)
- 제목
- 작성자, 작성일, 조회수
- 본문 (HTML)
- 첨부파일 다운로드
- 이전글/다음글 네비게이션
- 목록으로 버튼

**기술 명세**
- **데이터 소스**: Supabase `notices` 테이블
- **에디터**: Tiptap (관리자용)
- **파일 업로드**: Supabase Storage

**데이터베이스 스키마**
```sql
CREATE TABLE notices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content JSONB, -- Tiptap JSON
  author_id UUID REFERENCES auth.users(id),
  is_pinned BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  attachments JSONB, -- [{name, url, size}]
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

### 5.2 주보 (/news/bulletins)

**페이지 개요**
- **경로**: `/news/bulletins`
- **파일**: `app/news/bulletins/page.tsx`
- **목적**: 주보 아카이브

**콘텐츠 구성**
- 페이지 제목: "주보"
- 주보 리스트 (그리드 또는 리스트)
  - 주보 표지 썸네일
  - 날짜 (예: 2025년 1월 5일)
  - 제목 (예: "신년 감사 예배")
  - 다운로드 버튼 (PDF)
- 연도별 필터
- 검색 기능
- 페이지네이션

**상세 페이지** (`/news/bulletins/[id]`)
- 주보 이미지 뷰어 (페이지 넘기기)
- PDF 다운로드 버튼
- 공유 버튼

**기술 명세**
- **데이터 소스**: Supabase `bulletins` 테이블
- **파일 저장**: Supabase Storage (PDF)

**데이터베이스 스키마**
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
```

---

### 5.3 새가족 소개 (/news/newcomers)

**페이지 개요**
- **경로**: `/news/newcomers`
- **파일**: `app/news/newcomers/page.tsx`
- **목적**: 새가족 환영 및 소개

**콘텐츠 구성**
- 페이지 제목: "새가족 소개"
- 새가족 리스트 (월별)
  - 이름
  - 등록일
  - 인사말 (선택)
  - 사진 (선택)
- 새가족 등록 안내
- "새가족 등록하기" 버튼

**새가족 등록 페이지** (`/news/newcomers/register`)
- 등록 폼:
  - 이름
  - 성별
  - 생년월일
  - 연락처
  - 주소
  - 등록 경로 (전도, 인터넷 검색 등)
  - 기타 문의사항
- 개인정보 수집 동의
- 제출 버튼

**기술 명세**
- **데이터 소스**: Supabase `newcomers` 테이블
- **폼 관리**: React Hook Form + Zod

**데이터베이스 스키마**
```sql
CREATE TABLE newcomers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  gender TEXT,
  birth_date DATE,
  phone TEXT,
  email TEXT,
  address TEXT,
  registration_source TEXT, -- '전도', '인터넷' 등
  message TEXT,
  photo_url TEXT,
  is_public BOOLEAN DEFAULT false, -- 공개 여부
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

### 5.4 혜광 갤러리 (/news/gallery)

**페이지 개요**
- **경로**: `/news/gallery`
- **파일**: `app/news/gallery/page.tsx`
- **목적**: 교회 활동 사진 갤러리

**콘텐츠 구성**
- 페이지 제목: "혜광 갤러리"
- 카테고리 필터:
  - 전체
  - 주일예배
  - 특별예배 (성탄절, 부활절 등)
  - 교회학교
  - 행사
  - 수련회
  - 기타
- 이미지 그리드 (3~4열)
  - 썸네일
  - 제목
  - 날짜
- 클릭 시 라이트박스 뷰어
- 페이지네이션 또는 무한 스크롤

**상세 페이지** (`/news/gallery/[id]`)
- 앨범 제목
- 날짜
- 설명
- 이미지 그리드
- 라이트박스 뷰어 (좌우 네비게이션)
- 공유 버튼

**기술 명세**
- **데이터 소스**: 
  - Supabase `gallery_albums` 테이블
  - Supabase `gallery_images` 테이블
- **이미지 저장**: Supabase Storage
- **라이트박스**: yet-another-react-lightbox

**데이터베이스 스키마**
```sql
CREATE TABLE gallery_albums (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT, -- '주일예배', '특별예배' 등
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
```

---

## 6. 성도의교제

### 6.1 은혜 나눔 (/fellowship/grace)
### 6.2 감사 나눔 (/fellowship/gratitude)
### 6.3 일상 나눔 (/fellowship/daily)

**페이지 개요**
- **경로**: `/fellowship/[category]`
- **파일**: `app/fellowship/[category]/page.tsx`
- **목적**: 성도 간 교제 게시판

**콘텐츠 구성**
- 페이지 제목: "은혜 나눔" / "감사 나눔" / "일상 나눔"
- 게시판 기능:
  - 리스트 뷰
    - 제목
    - 작성자 (닉네임)
    - 작성일
    - 댓글 수
    - 좋아요 수
  - 검색 기능
  - 페이지네이션
- 글쓰기 버튼 (로그인 회원 전용)

**상세 페이지** (`/fellowship/[category]/[id]`)
- 제목
- 작성자, 작성일
- 본문
- 이미지 (선택)
- 좋아요 버튼
- 댓글 섹션:
  - 댓글 리스트
  - 댓글 작성 폼 (로그인 회원)
- 수정/삭제 버튼 (본인 글만)

**기술 명세**
- **데이터 소스**: Supabase `fellowship_posts` 테이블
- **인증**: Supabase Auth (회원 전용)
- **실시간**: Supabase Realtime (댓글 실시간 업데이트)

**데이터베이스 스키마**
```sql
CREATE TABLE fellowship_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL, -- 'grace', 'gratitude', 'daily'
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  images TEXT[], -- 이미지 URL 배열
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
```

---

## 7. 회원 시스템

### 7.1 로그인 (/auth/login)

**페이지 개요**
- **경로**: `/auth/login`
- **파일**: `app/auth/login/page.tsx`
- **목적**: 회원 로그인

**콘텐츠 구성**
- 페이지 제목: "로그인"
- 로그인 폼:
  - 이메일
  - 비밀번호
  - "로그인 유지" 체크박스
  - 로그인 버튼
- "비밀번호 찾기" 링크
- "회원가입" 링크
- 소셜 로그인 (선택):
  - Google
  - Kakao

**기술 명세**
- **인증**: Supabase Auth
- **폼 관리**: React Hook Form + Zod
- **리다이렉트**: 로그인 후 이전 페이지로 이동

---

### 7.2 회원가입 (/auth/register)

**페이지 개요**
- **경로**: `/auth/register`
- **파일**: `app/auth/register/page.tsx`
- **목적**: 신규 회원 가입

**콘텐츠 구성**
- 페이지 제목: "회원가입"
- 회원가입 폼:
  - 이름
  - 이메일
  - 비밀번호
  - 비밀번호 확인
  - 전화번호
  - 생년월일 (선택)
  - 성별 (선택)
  - 개인정보 수집 동의 (필수)
  - 이용약관 동의 (필수)
  - 회원가입 버튼
- "이미 계정이 있으신가요? 로그인" 링크

**기술 명세**
- **인증**: Supabase Auth
- **추가 정보**: Supabase `profiles` 테이블

**데이터베이스 스키마**
```sql
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
```

---

### 7.3 마이페이지 (/mypage)

**페이지 개요**
- **경로**: `/mypage`
- **파일**: `app/mypage/page.tsx`
- **목적**: 회원 정보 관리

**콘텐츠 구성**
- 페이지 제목: "마이페이지"
- 탭 메뉴:
  1. **내 정보**
     - 프로필 사진
     - 이름
     - 이메일
     - 전화번호
     - 생년월일
     - 수정 버튼
  2. **내가 쓴 글**
     - 게시판별 내 글 리스트
  3. **내가 쓴 댓글**
     - 댓글 리스트
  4. **비밀번호 변경**
     - 현재 비밀번호
     - 새 비밀번호
     - 새 비밀번호 확인
     - 변경 버튼
  5. **회원 탈퇴**
     - 탈퇴 안내
     - 탈퇴 버튼

**기술 명세**
- **인증**: Supabase Auth (로그인 필수)
- **데이터**: Supabase `profiles` 테이블

---

### 7.4 문자 서비스 (/sms)

**페이지 개요**
- **경로**: `/sms`
- **파일**: `app/sms/page.tsx`
- **목적**: 회원 간 문자 발송 (교회 내부용)

**콘텐츠 구성**
- 페이지 제목: "문자 서비스"
- 문자 발송 폼:
  - 수신자 선택 (드롭다운 또는 검색)
  - 메시지 내용
  - 발송 버튼
- 발송 내역 리스트

**기술 명세**
- **권한**: 특정 권한 보유 회원만 접근
- **SMS API**: 알리고, 카카오 알림톡 등 (선택)

---

## 8. 일정 (달력)

### 8.1 교회 일정 (/schedule)

**페이지 개요**
- **경로**: `/schedule`
- **파일**: `app/schedule/page.tsx`
- **목적**: 교회 전체 일정 관리

**콘텐츠 구성**
- 페이지 제목: "교회 일정"
- 월간 달력 뷰
  - 일정 표시 (제목, 시간)
  - 일정 클릭 시 상세 정보 모달
- 일정 리스트 뷰 (선택)
- 일정 추가 버튼 (관리자 전용)

**일정 상세 모달**
- 일정 제목
- 날짜 및 시간
- 장소
- 설명
- 담당자

**기술 명세**
- **달력 라이브러리**: react-day-picker 또는 FullCalendar
- **데이터 소스**: Supabase `events` 테이블

**데이터베이스 스키마**
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  end_datetime TIMESTAMP WITH TIME ZONE,
  location TEXT,
  organizer TEXT,
  category TEXT, -- '예배', '행사', '모임' 등
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 9. 관리자 페이지

### 9.1 관리자 대시보드 (/admin)

**페이지 개요**
- **경로**: `/admin`
- **파일**: `app/admin/page.tsx`
- **목적**: 사이트 전체 관리

**권한**
- 관리자 권한 필요 (Supabase RLS)

**콘텐츠 구성**
- 대시보드:
  - 통계 위젯:
    - 총 회원 수
    - 오늘 방문자 수
    - 이번 주 게시글 수
    - 미확인 새가족 등록
  - 빠른 링크:
    - 공지사항 작성
    - 주보 업로드
    - 갤러리 관리
    - 회원 관리

**사이드바 메뉴**
- 콘텐츠 관리
  - 페이지 관리
  - 히어로 슬라이더
  - 공지사항
  - 주보
  - 갤러리
  - 예배 영상
- 회원 관리
  - 회원 리스트
  - 권한 관리
  - 새가족 관리
- 교회학교 관리
  - 부서 관리
  - 부서별 게시판
- 설정
  - 사이트 설정
  - 메뉴 관리
  - 예배 시간 관리

**기술 명세**
- **권한**: Supabase RLS (role-based)
- **UI**: 관리자 전용 레이아웃

---

## 데이터베이스 스키마 요약

### 주요 테이블 목록

1. **인증 및 회원**
   - `auth.users` (Supabase 기본)
   - `profiles` - 회원 프로필
   - `user_roles` - 권한 관리

2. **콘텐츠 관리**
   - `pages` - 정적 페이지 (인사말, 비전 등)
   - `hero_slides` - 메인 슬라이더
   - `notices` - 공지사항
   - `bulletins` - 주보
   - `gallery_albums` - 갤러리 앨범
   - `gallery_images` - 갤러리 이미지

3. **예배 및 교육**
   - `worship_schedules` - 예배 시간표
   - `worship_videos` - 예배 영상
   - `education_programs` - 교육 프로그램
   - `memory_verses` - 암송 구절
   - `devotionals` - 묵상 자료

4. **교회학교**
   - `departments` - 부서 정보
   - `department_posts` - 부서별 게시글

5. **커뮤니티**
   - `fellowship_posts` - 교제 게시판
   - `fellowship_comments` - 댓글
   - `fellowship_likes` - 좋아요

6. **기타**
   - `events` - 일정
   - `newcomers` - 새가족
   - `staff` - 섬기는 분들
   - `history_timeline` - 교회 연혁

---

## 파일 저장소 (Supabase Storage)

### 버킷 구조

```
church-website/
├── hero-slides/          # 히어로 슬라이더 이미지
├── bulletins/            # 주보 PDF
├── gallery/              # 갤러리 이미지
│   ├── thumbnails/       # 썸네일
│   └── originals/        # 원본
├── profiles/             # 회원 프로필 사진
├── pages/                # 페이지 이미지
├── departments/          # 부서 관련 파일
└── attachments/          # 게시판 첨부파일
```

---

## API 엔드포인트 (Next.js API Routes)

### 주요 API

1. **인증**
   - `POST /api/auth/login` - 로그인
   - `POST /api/auth/register` - 회원가입
   - `POST /api/auth/logout` - 로그아웃

2. **콘텐츠**
   - `GET /api/notices` - 공지사항 목록
   - `GET /api/notices/[id]` - 공지사항 상세
   - `POST /api/notices` - 공지사항 작성 (관리자)
   - `GET /api/bulletins` - 주보 목록
   - `GET /api/gallery` - 갤러리 목록

3. **YouTube**
   - `GET /api/youtube/latest` - 최신 예배 영상 (YouTube API)

4. **검색**
   - `GET /api/search?q=검색어` - 전체 검색

---

## SEO 및 메타데이터

### 각 페이지별 메타데이터

```typescript
// app/about/greeting/page.tsx
export const metadata = {
  title: '담임목사 인사말 | 혜광교회',
  description: '혜광교회 담임목사의 인사말을 확인하세요.',
  openGraph: {
    title: '담임목사 인사말 | 혜광교회',
    description: '혜광교회 담임목사의 인사말을 확인하세요.',
    images: ['/og-greeting.jpg'],
  },
}
```

---

## 접근성 (Accessibility)

### 요구사항
- WCAG 2.1 AA 준수
- 키보드 네비게이션 지원
- 스크린 리더 호환
- 적절한 색상 대비
- Alt 텍스트 (모든 이미지)
- ARIA 레이블

---

## 성능 최적화

### 이미지 최적화
- Next.js Image 컴포넌트 사용
- WebP 형식 변환
- 레이지 로딩
- 반응형 이미지

### 코드 최적화
- 코드 스플리팅
- 트리 쉐이킹
- 번들 크기 최소화

### 캐싱
- ISR (Incremental Static Regeneration)
- CDN 캐싱 (Vercel)

---

## 보안

### Supabase RLS (Row Level Security)

```sql
-- 예시: 공지사항 읽기 권한 (모두)
CREATE POLICY "Anyone can read notices"
ON notices FOR SELECT
USING (true);

-- 예시: 공지사항 작성 권한 (관리자만)
CREATE POLICY "Only admins can insert notices"
ON notices FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);
```

---

**문서 버전**: 1.0  
**최종 수정일**: 2025-12-28  
**작성자**: Ryan
