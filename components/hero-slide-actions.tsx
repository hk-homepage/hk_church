'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteHeroSlide } from '@/app/actions/hero-slides'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import type { HeroSlide } from '@/app/actions/hero-slides'

interface HeroSlideActionsProps {
  slide: HeroSlide
}

export function HeroSlideActions({ slide }: HeroSlideActionsProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    const result = await deleteHeroSlide(slide.id)
    setIsDeleting(false)
    setShowDeleteDialog(false)

    if (result.success) {
      router.refresh()
    } else {
      alert(result.error || '삭제에 실패했습니다.')
    }
  }

  return (
    <>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/hero-slides/${slide.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            수정
          </Link>
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          삭제
        </Button>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>배너 삭제</DialogTitle>
            <DialogDescription>
              정말로 이 배너를 삭제하시겠습니까? 이 작업은 되돌릴 수 없으며,
              이미지 파일도 함께 삭제됩니다.
              <br />
              <br />
              <strong>{slide.title}</strong>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
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
