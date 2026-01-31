'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteEducationProgram } from '@/app/actions/education'
import { Button } from '@/components/ui/button'

interface EducationDeleteButtonProps {
  programId: string
  programTitle: string
}

export function EducationDeleteButton({ programId, programTitle }: EducationDeleteButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleDelete() {
    if (!confirm(`"${programTitle}" 프로그램을 삭제하시겠습니까?`)) return
    setIsLoading(true)
    try {
      const result = await deleteEducationProgram(programId)
      if (result.success) {
        router.refresh()
      } else {
        alert(result.error ?? '삭제에 실패했습니다.')
      }
    } catch (err) {
      console.error('Delete error:', err)
      alert('삭제 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
      onClick={handleDelete}
      disabled={isLoading}
    >
      {isLoading ? '삭제 중...' : '삭제'}
    </Button>
  )
}
