import Link from "next/link"
import { Church, Clock, FileText, Images, GraduationCap, Users, Heart } from "lucide-react"

const quickLinks = [
  {
    icon: Church,
    title: "교회소개",
    description: "혜광교회를 소개합니다",
    href: "/about",
    color: "bg-amber-500",
  },
  {
    icon: Clock,
    title: "예배안내",
    description: "예배 시간 및 장소",
    href: "/worship",
    color: "bg-emerald-500",
  },
  {
    icon: FileText,
    title: "교회주보",
    description: "주간 소식 및 기도제목",
    href: "/bulletin",
    color: "bg-sky-500",
  },
  {
    icon: Images,
    title: "혜광갤러리",
    description: "교회 사진 및 영상",
    href: "/gallery",
    color: "bg-rose-500",
  },
  {
    icon: GraduationCap,
    title: "주일학교",
    description: "다음세대 교육",
    href: "/sunday-school",
    color: "bg-violet-500",
  },
  {
    icon: Users,
    title: "양육 및 모임",
    description: "소그룹 및 양육과정",
    href: "/groups",
    color: "bg-orange-500",
  },
  {
    icon: Heart,
    title: "온라인헌금",
    description: "감사와 헌신의 통로",
    href: "/offering",
    color: "bg-pink-500",
  },
]

export function QuickLinks() {
  return (
    <section className="relative -mt-16 z-20 px-4 pb-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group flex flex-col items-center rounded-xl bg-card p-4 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${link.color} text-white transition-transform group-hover:scale-110`}
              >
                <link.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-foreground">{link.title}</h3>
              <p className="text-center text-xs text-muted-foreground">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
