'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface DeletePostButtonProps {
  id: string
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>
  redirectPath: string
  title?: string
}

export function DeletePostButton({ 
  id, 
  onDelete, 
  redirectPath,
  title = '이 항목'
}: DeletePostButtonProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await onDelete(id)
      if (!result || !result.success) {
        alert(result?.error || '삭제에 실패했습니다.')
        setIsDeleting(false)
        setIsOpen(false)
        return
      }

      // 등록(작성)과 동일하게, 성공 시에는 목록 페이지로 확실히 이동
      // 전체 새로고침 방식으로 동작하도록 통일
      if (typeof window !== 'undefined') {
        window.location.href = redirectPath
        return
      }

      // (SSR 환경 대비 – 이 경우는 거의 없음)
      setIsOpen(false)
      router.replace(redirectPath)
      router.refresh()
    } catch (error) {
      console.error('Delete error:', error)
      alert('삭제 중 오류가 발생했습니다.')
      setIsDeleting(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setIsOpen(true)}
        disabled={isDeleting}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        삭제
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
            <DialogDescription>
              {title}을(를) 삭제하면 복구할 수 없습니다. 이 작업을 계속하시겠습니까?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isDeleting}
            >
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? '삭제 중...' : '삭제'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
