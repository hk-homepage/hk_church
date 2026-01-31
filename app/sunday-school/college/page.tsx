import { SundaySchoolHeroSection } from "@/components/sunday-school-hero-section"
import { SundaySchoolInfoSection } from "@/components/sunday-school-info-section"

export const metadata = {
  title: "대학청년부 | 혜광교회",
  description: "혜광교회 대학청년부 소개",
}

const intro =
  "대학청년부는 대학생과 청년들이 함께 예배하고 성장하는 공동체입니다. 말씀 묵상, 소그룹 나눔, 봉사 활동, 친교 모임을 통해 믿음 안에서 삶의 방향을 찾고 서로를 격려하며 성장합니다."

const infoItems = [
  { label: "예배 시간", value: "주일 오후 1:30" },
  { label: "예배 장소", value: "청년부실" },
  { label: "대상", value: "대학생, 청년" },
  { label: "교육 목표", value: "세상 속 신앙 실천" },
]

export default function CollegePage() {
  return (
    <>
      <SundaySchoolHeroSection
        title="대학청년부"
        description={intro}
        imageUrl="/youth.png"
        imageAlt="대학청년부"
      />
      <SundaySchoolInfoSection items={infoItems} />
    </>
  )
}
