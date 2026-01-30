'use client'

// Fellowship board post form - title, content, optional image attachments (logged-in users)
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createFellowshipPost, type FellowshipCategory } from '@/app/actions/posts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const STORAGE_BUCKET = 'public-assets'
const STORAGE_PATH_PREFIX = 'fellowship-attachments'

interface AttachmentFile {
  file: File
  preview: string
  order: number
}

interface FellowshipFormProps {
  category: FellowshipCategory
  categoryName: string
  baseUrl: string
}

function sanitizeFileName(fileName: string): string {
  const extension = fileName.split('.').pop() || ''
  const uuid = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
  return `${uuid}.${extension}`
}

export function FellowshipForm({ category, categoryName, baseUrl }: FellowshipFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [attachments, setAttachments] = useState<AttachmentFile[]>([])
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setError(null)

    for (const file of files) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setError('이미지 파일만 업로드 가능합니다. (JPEG, PNG, WebP)')
        return
      }
      if (file.size > MAX_FILE_SIZE) {
        setError('파일 크기는 10MB 이하여야 합니다.')
        return
      }
    }

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const preview = ev.target?.result as string
        setAttachments((prev) => [
          ...prev,
          { file, preview, order: prev.length },
        ])
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) =>
      prev.filter((_, i) => i !== index).map((a, i) => ({ ...a, order: i }))
    )
  }

  const uploadAttachment = async (file: File): Promise<{ name: string; url: string; size: number; type: string }> => {
    const supabase = createClient()
    const safeName = sanitizeFileName(file.name)
    const path = `${STORAGE_PATH_PREFIX}/${safeName}`

    try {
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(path, file, { cacheControl: '3600', upsert: false })

      if (uploadError) {
        console.error('Storage upload error:', { message: uploadError.message, name: uploadError.name, path, bucket: STORAGE_BUCKET })
        throw new Error(uploadError.message || '파일 업로드에 실패했습니다.')
      }

      const { data: { publicUrl } } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(path)

      return {
        name: file.name,
        url: publicUrl,
        size: file.size,
        type: file.type,
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error('uploadAttachment failed:', { path, bucket: STORAGE_BUCKET, file: file.name, err })
      throw new Error(`첨부파일 업로드 실패: ${message}`)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    setUploadProgress(0)

    try {
      if (!formData.title?.trim()) {
        setError('제목을 입력해주세요.')
        setIsLoading(false)
        return
      }

      let uploadedAttachments: { name: string; url: string; size: number; type: string }[] = []
      const total = attachments.length

      for (let i = 0; i < attachments.length; i++) {
        setUploadProgress(total ? Math.round(((i + 1) / total) * 90) : 0)
        const item = await uploadAttachment(attachments[i].file)
        uploadedAttachments.push(item)
      }

      setUploadProgress(95)

      const result = await createFellowshipPost(category, {
        title: formData.title.trim(),
        content: formData.content?.trim() ?? '',
        attachments: uploadedAttachments.length > 0 ? uploadedAttachments : undefined,
      })

      if (result.success && result.id) {
        setUploadProgress(100)
        router.push(`${baseUrl}/${result.id}`)
        return
      }

      setError(result.error ?? '글 작성에 실패했습니다.')
      setIsLoading(false)
    } catch (err) {
      console.error('Submit error:', err)
      setError(err instanceof Error ? err.message : '글 작성 중 오류가 발생했습니다.')
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{categoryName} 글쓰기</CardTitle>
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
              placeholder="제목을 입력하세요"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              disabled={isLoading}
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground">
              {formData.title.length}/200
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">내용</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="내용을 입력하세요. 마크다운을 사용할 수 있습니다."
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              disabled={isLoading}
              rows={12}
              className="resize-y min-h-[200px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachments">첨부 이미지 (선택)</Label>
            <div className="flex items-center gap-4">
              <Input
                id="attachments"
                name="attachments"
                type="file"
                accept={ACCEPTED_IMAGE_TYPES.join(',')}
                multiple
                onChange={handleFileChange}
                disabled={isLoading}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              JPEG, PNG, WebP (최대 10MB). 여러 장 선택 가능합니다.
            </p>
          </div>

          {attachments.length > 0 && (
            <div className="space-y-4">
              <Label>첨부된 이미지 ({attachments.length}개)</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {attachments.map((att, index) => (
                  <div
                    key={index}
                    className="relative group border rounded-lg overflow-hidden bg-muted/50"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={att.preview}
                        alt={att.file.name}
                        fill
                        className="object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                        onClick={() => removeAttachment(index)}
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="p-2 text-xs text-muted-foreground truncate" title={att.file.name}>
                      {att.file.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <Label>업로드 진행률</Label>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {uploadProgress}%
              </p>
            </div>
          )}

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
              {isLoading ? '등록 중...' : '등록하기'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
