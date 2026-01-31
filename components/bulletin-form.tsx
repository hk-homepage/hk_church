'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBulletin } from '@/app/actions/bulletins'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, FileText, Image as ImageIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function BulletinForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    title: '',
    bulletin_date: '',
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const isPdf = selectedFile.type === 'application/pdf'
      const isImage = ['image/jpeg', 'image/png', 'image/webp'].includes(selectedFile.type)
      
      if (!isPdf && !isImage) {
        setError('PDF 또는 이미지 파일만 업로드 가능합니다. (PDF, JPEG, PNG, WebP)')
        return
      }
      
      if (isPdf && selectedFile.size > 50 * 1024 * 1024) {
        setError('PDF 파일 크기는 50MB 이하여야 합니다.')
        return
      }
      
      if (isImage && selectedFile.size > 10 * 1024 * 1024) {
        setError('이미지 파일 크기는 10MB 이하여야 합니다.')
        return
      }
      
      setFile(selectedFile)
      setError(null)
    }
  }

  // 파일명을 URL-safe하게 변환하는 함수
  const sanitizeFileName = (fileName: string): string => {
    // 파일 확장자 추출
    const extension = fileName.split('.').pop() || ''
    // 확장자를 제외한 파일명
    const nameWithoutExt = fileName.slice(0, fileName.lastIndexOf('.'))
    
    // UUID 생성 (간단한 버전)
    const uuid = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
    
    // 안전한 파일명 생성: UUID + 확장자
    return `${uuid}.${extension}`
  }

  const uploadFile = async (file: File): Promise<string> => {
    const supabase = createClient()
    
    try {
      // 파일 타입에 따라 폴더 결정
      const isPdf = file.type === 'application/pdf'
      const folder = isPdf ? 'pdfs' : 'images'
      
      // 파일명을 안전하게 변환
      const safeFileName = sanitizeFileName(file.name)
      const safePath = `${folder}/${safeFileName}`
      
      setUploadProgress(50)
      
      const { data, error } = await supabase.storage
        .from('bulletins')
        .upload(safePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (error) {
        throw error
      }

      setUploadProgress(100)

      const { data: { publicUrl } } = supabase.storage
        .from('bulletins')
        .getPublicUrl(data.path)

      return publicUrl
    } catch (err: any) {
      throw new Error(err.message || '파일 업로드에 실패했습니다.')
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (!file) {
        setError('PDF 또는 이미지 파일을 업로드해주세요.')
        setIsLoading(false)
        return
      }

      if (!formData.title || !formData.title.trim()) {
        setError('제목을 입력해주세요.')
        setIsLoading(false)
        return
      }

      if (!formData.bulletin_date) {
        setError('주보 날짜를 선택해주세요.')
        setIsLoading(false)
        return
      }

      // 파일 업로드
      const fileUrl = await uploadFile(file)
      
      // 파일 타입에 따라 pdf_url 또는 cover_image_url 설정
      const isPdf = file.type === 'application/pdf'
      
      // 주보 생성 (페이지 수는 항상 1)
      const result = await createBulletin({
        title: formData.title.trim(),
        bulletin_date: formData.bulletin_date,
        pdf_url: isPdf ? fileUrl : '', // PDF인 경우
        cover_image_url: isPdf ? undefined : fileUrl, // 이미지인 경우
        page_count: 1, // 항상 1페이지
      })

      if (result.success) {
        window.location.href = '/news/bulletin'
        return
      } else {
        setError(result.error || '주보 작성에 실패했습니다.')
        setIsLoading(false)
      }
    } catch (err: any) {
      console.error('Submit error:', err)
      setError(err.message || '주보 작성 중 오류가 발생했습니다.')
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>주보 작성</CardTitle>
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
              placeholder="예: 2025년 1월 5일 주보"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bulletin_date">주보 날짜 *</Label>
            <Input
              id="bulletin_date"
              name="bulletin_date"
              type="date"
              required
              value={formData.bulletin_date}
              onChange={(e) =>
                setFormData({ ...formData, bulletin_date: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">주보 파일 * (PDF 또는 이미지)</Label>
            <div className="flex items-center gap-4">
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf,image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={isLoading}
                className="flex-1"
              />
              {file && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {file.type === 'application/pdf' ? (
                    <FileText className="h-4 w-4" />
                  ) : (
                    <ImageIcon className="h-4 w-4" />
                  )}
                  <span>{file.name}</span>
                  <span className="text-xs">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              PDF (최대 50MB) 또는 이미지 (JPEG, PNG, WebP, 최대 10MB) 파일을 업로드하세요.
            </p>
          </div>

          {uploadProgress > 0 && (
            <div className="space-y-2">
              <Label>업로드 진행률</Label>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
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
              {isLoading ? '작성 중...' : '작성하기'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
