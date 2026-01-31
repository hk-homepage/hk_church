'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { reorderEducationPrograms } from '@/app/actions/education'
import { EducationDeleteButton } from '@/components/education-delete-button'
import type { EducationProgram } from '@/types/education'

interface EducationProgramListProps {
  programs: EducationProgram[]
  canEdit: boolean
}

export function EducationProgramList({ programs: initialPrograms, canEdit }: EducationProgramListProps) {
  const router = useRouter()
  const [programs, setPrograms] = useState(initialPrograms)
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [dropTargetId, setDropTargetId] = useState<string | null>(null)
  const [isReordering, setIsReordering] = useState(false)

  function handleDragStart(e: React.DragEvent, id: string) {
    setDraggedId(id)
    e.dataTransfer.setData('text/plain', id)
    e.dataTransfer.effectAllowed = 'move'
  }

  function handleDragOver(e: React.DragEvent, id: string) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (draggedId && draggedId !== id) setDropTargetId(id)
  }

  function handleDragLeave() {
    setDropTargetId(null)
  }

  async function handleDrop(e: React.DragEvent, targetId: string) {
    e.preventDefault()
    setDropTargetId(null)
    const id = e.dataTransfer.getData('text/plain')
    setDraggedId(null)
    if (!id || id === targetId) return

    const fromIndex = programs.findIndex((p) => p.id === id)
    const toIndex = programs.findIndex((p) => p.id === targetId)
    if (fromIndex === -1 || toIndex === -1) return

    const reordered = [...programs]
    const [removed] = reordered.splice(fromIndex, 1)
    reordered.splice(toIndex, 0, removed)
    setPrograms(reordered)

    setIsReordering(true)
    const result = await reorderEducationPrograms(reordered.map((p) => p.id))
    setIsReordering(false)
    if (result.success) {
      router.refresh()
    } else {
      setPrograms(initialPrograms)
      alert(result.error ?? '순서 변경에 실패했습니다.')
    }
  }

  function handleDragEnd() {
    setDraggedId(null)
    setDropTargetId(null)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {programs.map((program) => (
        <Card
          key={program.id}
          draggable={canEdit}
          onDragStart={canEdit ? (e) => handleDragStart(e, program.id) : undefined}
          onDragOver={canEdit ? (e) => handleDragOver(e, program.id) : undefined}
          onDragLeave={canEdit ? handleDragLeave : undefined}
          onDrop={canEdit ? (e) => handleDrop(e, program.id) : undefined}
          onDragEnd={canEdit ? handleDragEnd : undefined}
          className={`transition-shadow hover:shadow-lg ${
            draggedId === program.id ? 'opacity-50' : ''
          } ${dropTargetId === program.id ? 'ring-2 ring-primary' : ''} ${
            canEdit ? 'cursor-grab active:cursor-grabbing' : ''
          }`}
        >
          <CardHeader className="flex flex-row items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-xl">{program.title}</CardTitle>
            </div>
            {canEdit && (
              <div className="flex shrink-0 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/nurturing/education/${program.id}/edit`}>수정</Link>
                </Button>
                <EducationDeleteButton
                  programId={program.id}
                  programTitle={program.title}
                />
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-muted-foreground">{program.description}</p>
            <p className="text-sm text-primary font-medium">{program.schedule}</p>
          </CardContent>
        </Card>
      ))}
      {canEdit && programs.length > 0 && isReordering && (
        <p className="col-span-2 text-center text-sm text-muted-foreground">순서 저장 중...</p>
      )}
    </div>
  )
}
