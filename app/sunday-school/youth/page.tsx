import { SundaySchoolHeroSection } from "@/components/sunday-school-hero-section"
import { SundaySchoolInfoSection } from "@/components/sunday-school-info-section"

export const metadata = {
  title: "중고등부 | 혜광교회",
  description: "혜광교회 중고등부 소개",
}

const intro =
  "중고등부는 청소년들이 세상 속에서 믿음으로 살아가는 법을 배우는 공동체입니다. 심도 있는 말씀 공부, 토론, 찬양, 봉사활동을 통해 그리스도인으로서의 정체성을 확립하고 세상을 변화시키는 리더로 성장합니다."

const infoItems = [
  { label: "예배 시간", value: "주일 오전 11:00" },
  { label: "예배 장소", value: "교육관 3층 중고등부실" },
  { label: "대상", value: "중학생, 고등학생" },
  { label: "교육 목표", value: "신앙 정체성 확립" },
]

export default function YouthPage() {
  return (
    <>
      <SundaySchoolHeroSection
        title="중고등부"
        description={intro}
        imageUrl="/middle-high.png"
        imageAlt="중고등부"
      />
      <SundaySchoolInfoSection items={infoItems} />
    </>
  )
}
