// Homepage section with map and church address
import { MapPin, Phone, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function LocationSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Contact Us</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">오시는 길</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Map */}
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.123456789!2d126.78!3d37.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z67aA7LKc7IucIOybkOuvuOq1rCDsg4HsnbTroZzCoDUx67KI6ri4IDMw!5e0!3m2!1sko!2skr!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              title="혜광교회 위치"
            />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">주소</h3>
                  <p className="text-muted-foreground">경기도 부천시 원미구 상이로51번길 30</p>
                  <p className="mt-1 text-sm text-muted-foreground">(부천) 혜광교회</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">전화번호</h3>
                  <p className="text-muted-foreground">032-XXX-XXXX</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">예배 시간</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>주일 1부 예배: 오전 9:00</li>
                    <li>주일 2부 예배: 오전 11:00</li>
                    <li>수요 예배: 저녁 7:30</li>
                    <li>금요 기도회: 저녁 8:00</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
