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
import { signupAction } from "@/app/actions/auth"

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const userId = formData.get('userId') as string
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const phone = (formData.get('phone') as string)?.trim() || undefined

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      setIsLoading(false)
      return
    }

    // 비밀번호 길이 확인
    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.')
      setIsLoading(false)
      return
    }

    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('회원가입 시도:', { userId, name, email, phone })
      }
      const result = await signupAction(userId, name, email, password, phone)
      if (process.env.NODE_ENV === 'development') {
        console.log('회원가입 결과:', result)
      }

      if (result.success) {
        router.push('/')
        router.refresh()
      } else {
        setError(result.error || '회원가입에 실패했습니다.')
        setIsLoading(false)
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('회원가입 에러:', error)
      }
      setError(error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다.')
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
            <CardTitle>회원가입</CardTitle>
            <CardDescription>혜광교회 회원이 되어주세요</CardDescription>
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
                <Label htmlFor="name">이름</Label>
                <Input 
                  id="name" 
                  name="name"
                  type="text" 
                  placeholder="이름을 입력하세요" 
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="이메일을 입력하세요" 
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">전화번호 (선택)</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  type="tel" 
                  placeholder="010-1234-5678" 
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  placeholder="비밀번호를 입력하세요 (최소 6자)" 
                  required
                  minLength={6}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password" 
                  placeholder="비밀번호를 다시 입력하세요" 
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? '회원가입 중...' : '회원가입'}
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
