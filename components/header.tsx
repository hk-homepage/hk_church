"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Church, User, Calendar, MessageSquare, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const menuItems = [
  {
    title: "교회소개",
    href: "/about",
    submenu: [
      { title: "인사말", href: "/about/greeting" },
      { title: "예배안내", href: "/about/worship-info" },
      { title: "섬기는 분들", href: "/about/staff" },
      { title: "실시간 온라인 예배", href: "/worship/online" },
      { title: "온라인 헌금", href: "/offering" },
      { title: "시설소개", href: "/about/facilities" },
      { title: "교회연혁", href: "/about/history" },
      { title: "오시는 길", href: "/about/location" },
    ],
  },
  {
    title: "교회학교",
    href: "/sunday-school",
    submenu: [
      { title: "유치부", href: "/sunday-school/kindergarten" },
      { title: "초등부", href: "/sunday-school/elementary" },
      { title: "중고등부", href: "/sunday-school/youth" },
      { title: "대학청년부", href: "/sunday-school/college" },
      { title: "2024 이전", href: "/sunday-school/archive-2024" },
    ],
  },
  {
    title: "양육/모임",
    href: "/nurturing",
    submenu: [
      { title: "교회교육", href: "/nurturing/education" },
      { title: "2025년 암송구절", href: "/nurturing/memory-verse-2025" },
      { title: "성경통신문제", href: "/nurturing/bible-study" },
      { title: "오늘의 묵상", href: "/nurturing/devotion" },
    ],
  },
  {
    title: "교회소식",
    href: "/news",
    submenu: [
      { title: "공지사항", href: "/news/announcements" },
      { title: "주보", href: "/news/bulletin" },
      { title: "새가족 소개", href: "/news/new-members" },
      { title: "혜광 갤러리", href: "/gallery" },
    ],
  },
  {
    title: "성도의교제",
    href: "/fellowship",
    submenu: [
      { title: "은혜 나눔", href: "/fellowship/testimonies" },
      { title: "감사 나눔", href: "/fellowship/thanksgiving" },
      { title: "일상 나눔", href: "/fellowship/daily" },
    ],
  },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Church className="h-8 w-8 text-primary" />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground leading-tight">혜광교회</span>
            <span className="text-xs text-muted-foreground">Hyegwang Church</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.submenu ? (
                  <>
                    <NavigationMenuTrigger className="bg-transparent text-foreground hover:bg-accent">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-56 gap-1 p-2">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={subItem.href}
                                className="block select-none rounded-md p-3 text-sm leading-none text-foreground no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                {subItem.title}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="sm" className="text-foreground" asChild>
            <Link href="/calendar">
              <Calendar className="mr-2 h-4 w-4" />
              일정
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-foreground" asChild>
            <Link href="https://cafe.naver.com" target="_blank">
              <MessageSquare className="mr-2 h-4 w-4" />
              카페
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              로그인
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 overflow-y-auto bg-background">
            <SheetTitle className="sr-only">메뉴</SheetTitle>
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex items-center gap-2">
                <Church className="h-8 w-8 text-primary" />
                <span className="text-lg font-bold text-foreground">혜광교회</span>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {menuItems.map((item, index) => (
                  <AccordionItem key={item.title} value={`item-${index}`}>
                    <AccordionTrigger className="text-base font-medium text-foreground hover:no-underline">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-1 pl-2">
                        {item.submenu?.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="flex flex-col gap-2 border-t border-border pt-4">
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <LogIn className="mr-2 h-4 w-4" />
                    로그인
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <User className="mr-2 h-4 w-4" />
                    회원가입
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <Link href="/calendar" onClick={() => setIsOpen(false)}>
                    <Calendar className="mr-2 h-4 w-4" />
                    일정
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
