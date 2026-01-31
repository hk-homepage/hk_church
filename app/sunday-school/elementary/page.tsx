import { SundaySchoolHeroSection } from "@/components/sunday-school-hero-section"
import { SundaySchoolInfoSection } from "@/components/sunday-school-info-section"

export const metadata = {
  title: "초등부 | 혜광교회",
  description: "혜광교회 초등부 소개",
}

const intro =
  "초등부는 초등학생들이 성경 말씀을 깊이 배우고 예배하는 공동체입니다. 체계적인 성경 공부, 찬양, 레크리에이션 활동을 통해 신앙이 성장하고 또래 친구들과 함께 믿음의 공동체를 경험합니다."

const infoItems = [
  { label: "예배 시간", value: "주일 오전 11:00" },
  { label: "예배 장소", value: "교육관 2층 초등부실" },
  { label: "대상", value: "초등학교 1-6학년" },
  { label: "교육 목표", value: "말씀 암송 및 적용" },
]

export default function ElementaryPage() {
  return (
    <>
      <SundaySchoolHeroSection
        title="초등부"
        description={intro}
        imageUrl="/elementary.png"
        imageAlt="초등부"
      />
      <SundaySchoolInfoSection items={infoItems} />
    </>
  )
}
