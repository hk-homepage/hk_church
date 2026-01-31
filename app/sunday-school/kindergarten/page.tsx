import { SundaySchoolHeroSection } from "@/components/sunday-school-hero-section"
import { SundaySchoolInfoSection } from "@/components/sunday-school-info-section"

export const metadata = {
  title: "유치부 | 혜광교회",
  description: "혜광교회 유치부 소개",
}

const intro =
  "유치부는 5-7세 어린이들이 하나님의 말씀을 배우고 예배하는 공동체입니다. 찬양과 율동, 성경 이야기, 만들기 활동 등을 통해 하나님의 사랑을 경험하고 신앙의 기초를 세워갑니다."

const infoItems = [
  { label: "예배 시간", value: "주일 오전 11:00" },
  { label: "예배 장소", value: "교육관 1층 유치부실" },
  { label: "대상", value: "5-7세 어린이" },
  { label: "교육 목표", value: "하나님 사랑 배우기" },
]

export default function KindergartenPage() {
  return (
    <>
      <SundaySchoolHeroSection
        title="유치부"
        description={intro}
        imageUrl="/children.png"
        imageAlt="유치부"
      />
      <SundaySchoolInfoSection items={infoItems} />
    </>
  )
}
