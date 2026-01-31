// Staff page - introduces pastors and ministers serving the church
import Image from "next/image"
import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "섬기는 분들 | 혜광교회",
  description: "혜광교회를 섬기는 분들을 소개합니다",
}

interface StaffMember {
  name: string
  role: string
  image: string
  email?: string
  phone?: string
}

const staff: StaffMember[] = [
  { name: "정문용", role: "원로목사", image: "/emeritus-pastor.jpg" },
  {
    name: "이종흠",
    role: "담임목사",
    image: "/senior-pastor.jpg",
    email: "ihkchurch@naver.com",
    phone: "032-326-1550",
  },
  { name: "류승철", role: "목사", image: "/ryu-pastor.jpg", email: "rsch22@naver.com" },
  { name: "윤상현", role: "목사", image: "/yun-pastor.jpg", email: "best926805@naver.com" },
  { name: "이한솔", role: "전도사", image: "/lee-minister.jpg", email: "leehansol04050925@gmail.com" },
  { name: "박영미", role: "전도사", image: "/bark-minister.jpg", email: "pym42086@naver.com" },
  { name: "이은순", role: "전도사", image: "/lee2-minister.jpeg", email: "lovemelissa@hanmail.net" },
]

export default function StaffPage() {
  return (
    <>
      <PageHeader
        title="섬기는 분들"
        description="혜광교회를 섬기시는 분들을 소개합니다"
        breadcrumb={[{ label: "교회소개", href: "/about" }, { label: "섬기는 분들" }]}
      />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {staff.map((person) => (
                <Card key={`${person.name}-${person.role}`} className="overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-lg font-bold text-foreground">{person.name}</h3>
                    <p className="text-sm font-medium text-primary">{person.role}</p>
                    {person.phone && (
                      <a
                        href={`tel:${person.phone.replace(/-/g, "")}`}
                        className="mt-2 flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <Phone className="h-3.5 w-3.5 shrink-0" />
                        <span>{person.phone}</span>
                      </a>
                    )}
                    {person.email && (
                      <Link
                        href={`mailto:${person.email}`}
                        className="mt-1 flex items-center justify-center gap-1.5 break-all text-sm text-muted-foreground hover:text-foreground"
                      >
                        <Mail className="h-3.5 w-3.5 shrink-0" />
                        <span>{person.email}</span>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
