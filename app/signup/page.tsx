import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Church } from "lucide-react"

export const metadata = {
  title: "회원가입 | 혜광교회",
  description: "혜광교회 회원가입",
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex items-center justify-center py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <Church className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle>회원가입</CardTitle>
            <CardDescription>혜광교회 회원이 되어주세요</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input id="name" type="text" placeholder="이름을 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" type="email" placeholder="이메일을 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input id="password" type="password" placeholder="비밀번호를 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <Input id="confirmPassword" type="password" placeholder="비밀번호를 다시 입력하세요" />
              </div>
              <Button type="submit" className="w-full">
                회원가입
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              이미 회원이신가요?{" "}
              <Link href="/login" className="text-primary hover:underline">
                로그인
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
