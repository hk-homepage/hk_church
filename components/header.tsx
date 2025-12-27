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

const menuItems = [
  {
    title: "교회소개",
    href: "/about",
    submenu: [
      { title: "인사말", href: "/about/greeting" },
      { title: "비전", href: "/about/vision" },
      { title: "섬기는 분들", href: "/about/staff" },
      { title: "오시는 길", href: "/about/location" },
    ],
  },
  {
    title: "예배안내",
    href: "/worship",
    submenu: [
      { title: "예배시간", href: "/worship/schedule" },
      { title: "온라인예배", href: "/worship/online" },
      { title: "설교말씀", href: "/worship/sermons" },
    ],
  },
  {
    title: "교회주보",
    href: "/bulletin",
  },
  {
    title: "혜광갤러리",
    href: "/gallery",
  },
  {
    title: "주일학교",
    href: "/sunday-school",
  },
  {
    title: "양육 및 모임",
    href: "/groups",
    submenu: [
      { title: "새가족 양육", href: "/groups/newcomers" },
      { title: "성경통독반", href: "/groups/bible-reading" },
      { title: "소그룹 모임", href: "/groups/small-groups" },
    ],
  },
  {
    title: "온라인헌금",
    href: "/offering",
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
                      <ul className="grid w-48 gap-1 p-2">
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
          <Button variant="ghost" size="sm" className="text-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            일정
          </Button>
          <Button variant="ghost" size="sm" className="text-foreground">
            <MessageSquare className="mr-2 h-4 w-4" />
            카페
          </Button>
          <Button variant="outline" size="sm">
            <LogIn className="mr-2 h-4 w-4" />
            로그인
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
          <SheetContent side="right" className="w-80 bg-background">
            <SheetTitle className="sr-only">메뉴</SheetTitle>
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex items-center gap-2">
                <Church className="h-8 w-8 text-primary" />
                <span className="text-lg font-bold text-foreground">혜광교회</span>
              </div>
              <nav className="flex flex-col gap-1">
                {menuItems.map((item) => (
                  <div key={item.title}>
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 flex flex-col gap-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="flex flex-col gap-2 border-t border-border pt-4">
                <Button variant="outline" className="justify-start bg-transparent">
                  <LogIn className="mr-2 h-4 w-4" />
                  로그인
                </Button>
                <Button variant="outline" className="justify-start bg-transparent">
                  <User className="mr-2 h-4 w-4" />
                  회원가입
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
