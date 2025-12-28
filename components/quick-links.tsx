import Link from "next/link"
import { Church, Video, FileText, Images, BookOpen, Users, Heart, MapPin } from "lucide-react"

const quickLinks = [
  {
    icon: Church,
    title: "교회소개",
    description: "혜광교회를 소개합니다",
    href: "/about/greeting",
    color: "bg-amber-500",
  },
  {
    icon: Video,
    title: "온라인예배",
    description: "실시간 예배 참여",
    href: "/worship/online",
    color: "bg-emerald-500",
  },
  {
    icon: FileText,
    title: "주보",
    description: "주간 소식 및 기도제목",
    href: "/news/bulletin",
    color: "bg-sky-500",
  },
  {
    icon: Images,
    title: "갤러리",
    description: "교회 사진 및 영상",
    href: "/gallery",
    color: "bg-rose-500",
  },
  {
    icon: BookOpen,
    title: "교회학교",
    description: "다음세대 교육",
    href: "/sunday-school",
    color: "bg-violet-500",
  },
  {
    icon: Users,
    title: "성도의교제",
    description: "은혜 나눔",
    href: "/fellowship",
    color: "bg-orange-500",
  },
  {
    icon: Heart,
    title: "온라인헌금",
    description: "감사와 헌신의 통로",
    href: "/offering",
    color: "bg-pink-500",
  },
  {
    icon: MapPin,
    title: "오시는길",
    description: "교회 위치 안내",
    href: "/about/location",
    color: "bg-teal-500",
  },
]

export function QuickLinks() {
  return (
    <section className="relative -mt-16 z-20 px-4 pb-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
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
