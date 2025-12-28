import Link from "next/link"
import { Church, Youtube, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Church className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">혜광교회</span>
                <span className="text-xs text-muted-foreground">Hyegwang Church</span>
              </div>
            </Link>
            <p className="mb-2 text-sm text-muted-foreground">대한예수교장로회(고신) 경기서부노회</p>
            <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
              다음세대가 춤추는 교회, 혜광교회입니다.
              <br />
              하나님의 사랑으로 모든 분들을 환영합니다.
            </p>
            <div className="flex gap-3">
              <Link
                href="https://www.youtube.com/@혜광교회-l5f"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="유튜브"
              >
                <Youtube className="h-5 w-5" />
              </Link>
              <Link
                href="https://cafe.naver.com"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="네이버 카페"
              >
                <MessageCircle className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">바로가기</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about/greeting" className="transition-colors hover:text-primary">
                  교회소개
                </Link>
              </li>
              <li>
                <Link href="/about/worship-info" className="transition-colors hover:text-primary">
                  예배안내
                </Link>
              </li>
              <li>
                <Link href="/news/bulletin" className="transition-colors hover:text-primary">
                  주보
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="transition-colors hover:text-primary">
                  갤러리
                </Link>
              </li>
              <li>
                <Link href="/offering" className="transition-colors hover:text-primary">
                  온라인헌금
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - 실제 교회 정보로 업데이트 */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">연락처</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>경기도 부천시 원미구</li>
              <li>상이로51번길 30</li>
              <li className="pt-2">Tel: 032-327-5547</li>
              <li>Email: ihkchurch@naver.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© 2025 (부천)혜광교회. All rights reserved. 설립일: 1991년 3월 3일</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="transition-colors hover:text-primary">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="transition-colors hover:text-primary">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
