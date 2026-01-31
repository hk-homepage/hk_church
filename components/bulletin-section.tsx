// Homepage section showing recent church bulletins
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Calendar } from "lucide-react"
import { getBulletins } from "@/app/actions/bulletins"

export async function BulletinSection() {
  const result = await getBulletins(6)
  
  // 데이터베이스에서 가져온 주보를 컴포넌트 형식에 맞게 변환
  const bulletins = result.bulletins.slice(0, 6).map((bulletin) => {
    // bulletin_date를 "YYYY년 MM월 DD일" 형식으로 변환 (타임존 안전)
    let formattedDate = ''
    if (bulletin.bulletin_date) {
      // ISO 날짜 문자열을 안전하게 파싱
      const dateStr = bulletin.bulletin_date.includes('T') 
        ? bulletin.bulletin_date.split('T')[0] 
        : bulletin.bulletin_date
      const [year, month, day] = dateStr.split('-')
      if (year && month && day) {
        formattedDate = `${year}년 ${month.padStart(2, '0')}월 ${day.padStart(2, '0')}일`
      }
    }
    
    // ID는 문자열 그대로 사용 (숫자 변환은 불안정)
    return {
      id: bulletin.id,
      title: bulletin.title,
      date: formattedDate,
      image: bulletin.cover_image_url || bulletin.pdf_url || "/placeholder.svg",
    }
  })
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Weekly Bulletin</p>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">교회 주보</h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/news/bulletin">
              전체보기
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bulletins.length > 0 ? (
            bulletins.map((bulletin) => (
              <Link key={bulletin.id} href="/news/bulletin">
                <Card className="overflow-hidden transition-shadow hover:shadow-lg cursor-pointer group">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={bulletin.image}
                      alt={bulletin.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2 pt-3 px-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {bulletin.date}
                    </div>
                    <CardTitle className="text-sm leading-tight line-clamp-2">{bulletin.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 pb-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>자세히 보기</span>
                      <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              등록된 주보가 없습니다.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
