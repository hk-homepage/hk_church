'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createNotice } from '@/app/actions/announcements'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

export function AnnouncementForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    is_pinned: false,
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      console.log('공지사항 작성 시작...', { title: formData.title })
      
      const result = await createNotice({
        title: formData.title,
        content: formData.content,
        is_pinned: formData.is_pinned,
      })

      console.log('Create notice result:', result)

      if (result.success) {
        console.log('공지사항 작성 성공, 목록 페이지로 이동...')
        // 목록 페이지로 이동 (강제 새로고침)
        window.location.href = '/news/announcements'
        return // 이동하므로 아래 코드 실행 안 됨
      } else {
        console.error('공지사항 작성 실패:', result.error)
        setError(result.error || '공지사항 작성에 실패했습니다.')
        setIsLoading(false)
      }
    } catch (err) {
      console.error('Submit error:', err)
      setError('공지사항 작성 중 오류가 발생했습니다.')
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>공지사항 작성</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="공지사항 제목을 입력하세요"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">내용 *</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="공지사항 내용을 입력하세요"
              required
              rows={15}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_pinned"
              checked={formData.is_pinned}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_pinned: checked === true })
              }
              disabled={isLoading}
            />
            <Label
              htmlFor="is_pinned"
              className="text-sm font-normal cursor-pointer"
            >
              중요 공지로 상단 고정
            </Label>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              취소
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? '작성 중...' : '작성하기'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
