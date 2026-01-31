'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createEducationProgram, updateEducationProgram } from '@/app/actions/education'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { EducationProgram } from '@/types/education'

interface EducationFormProps {
  mode: 'create' | 'edit'
  initialData?: EducationProgram
}

export function EducationForm({ mode, initialData }: EducationFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: initialData?.title ?? '',
    description: initialData?.description ?? '',
    schedule: initialData?.schedule ?? '',
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const title = formData.title.trim()
      if (!title) {
        setError('제목을 입력해주세요.')
        setIsLoading(false)
        return
      }

      if (mode === 'create') {
        const result = await createEducationProgram({
          title,
          description: formData.description.trim(),
          schedule: formData.schedule.trim(),
        })
        if (result.success) {
          router.push('/nurturing/education')
          router.refresh()
          return
        }
        setError(result.error ?? '등록에 실패했습니다.')
      } else if (initialData?.id) {
        const result = await updateEducationProgram(initialData.id, {
          title,
          description: formData.description.trim(),
          schedule: formData.schedule.trim(),
        })
        if (result.success) {
          router.push('/nurturing/education')
          router.refresh()
          return
        }
        setError(result.error ?? '수정에 실패했습니다.')
      }
    } catch (err) {
      console.error('Submit error:', err)
      setError('처리 중 오류가 발생했습니다.')
    }
    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{mode === 'create' ? '프로그램 추가' : '프로그램 수정'}</CardTitle>
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
              placeholder="예: 새가족 교육"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="교육 프로그램 설명"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={isLoading}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="schedule">일정</Label>
            <Input
              id="schedule"
              name="schedule"
              type="text"
              placeholder="예: 매월 첫째 주일 시작"
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              disabled={isLoading}
            />
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
              {isLoading ? '저장 중...' : mode === 'create' ? '등록' : '수정'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
