'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Church } from "lucide-react"
import { loginAction } from "@/app/actions/auth"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const userId = formData.get('userId') as string
    const password = formData.get('password') as string

    const result = await loginAction(userId, password)

    if (result.success) {
      router.push('/')
      router.refresh()
    } else {
      setError(result.error || '로그인에 실패했습니다.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex items-center justify-center py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <Church className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle>로그인</CardTitle>
            <CardDescription>혜광교회 회원 로그인</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="userId">아이디</Label>
                <Input 
                  id="userId" 
                  name="userId"
                  type="text" 
                  placeholder="아이디를 입력하세요" 
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  placeholder="비밀번호를 입력하세요" 
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? '로그인 중...' : '로그인'}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              아직 회원이 아니신가요?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                회원가입
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
