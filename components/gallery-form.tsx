'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createGalleryAlbum } from '@/app/actions/gallery'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Image as ImageIcon, Upload, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { GalleryCategory } from '@/types/posts'
import Image from 'next/image'

interface ImageFile {
  file: File
  preview: string
  caption: string
  order: number
}

export function GalleryForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [images, setImages] = useState<ImageFile[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other' as GalleryCategory,
    event_date: '',
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    files.forEach((file) => {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setError('이미지 파일만 업로드 가능합니다. (JPEG, PNG, WebP)')
        return
      }
      
      if (file.size > 10 * 1024 * 1024) {
        setError('이미지 파일 크기는 10MB 이하여야 합니다.')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const preview = e.target?.result as string
        setImages((prev) => [
          ...prev,
          {
            file,
            preview,
            caption: '',
            order: prev.length,
          },
        ])
      }
      reader.readAsDataURL(file)
    })
    
    setError(null)
  }

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index)
      // 순서 재정렬
      return newImages.map((img, i) => ({ ...img, order: i }))
    })
  }

  const updateImageCaption = (index: number, caption: string) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, caption } : img))
    )
  }

  // 파일명을 URL-safe하게 변환하는 함수
  const sanitizeFileName = (fileName: string): string => {
    const extension = fileName.split('.').pop() || ''
    const uuid = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
    return `${uuid}.${extension}`
  }

  const uploadImage = async (file: File): Promise<{ image_url: string; thumbnail_url: string }> => {
    const supabase = createClient()
    
    try {
      const safeFileName = sanitizeFileName(file.name)
      const safePath = `albums/${safeFileName}`
      
      const { data, error } = await supabase.storage
        .from('gallery')
        .upload(safePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (error) {
        throw error
      }

      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(data.path)

      // 썸네일은 원본과 동일 (나중에 리사이징 추가 가능)
      return {
        image_url: publicUrl,
        thumbnail_url: publicUrl,
      }
    } catch (err: any) {
      throw new Error(err.message || '이미지 업로드에 실패했습니다.')
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    setUploadProgress(0)

    try {
      if (!formData.title || !formData.title.trim()) {
        setError('제목을 입력해주세요.')
        setIsLoading(false)
        return
      }

      if (images.length === 0) {
        setError('최소 1개 이상의 이미지를 업로드해주세요.')
        setIsLoading(false)
        return
      }

      // 이미지 업로드
      const uploadedImages = []
      const totalImages = images.length

      for (let i = 0; i < images.length; i++) {
        const image = images[i]
        setUploadProgress(Math.round(((i + 1) / totalImages) * 90))
        
        const { image_url, thumbnail_url } = await uploadImage(image.file)
        uploadedImages.push({
          image_url,
          thumbnail_url,
          caption: image.caption.trim() || undefined,
          display_order: image.order,
        })
      }

      setUploadProgress(95)

      // 갤러리 앨범 생성
      const result = await createGalleryAlbum({
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        category: formData.category,
        event_date: formData.event_date || undefined,
        images: uploadedImages,
      })

      if (result.success) {
        setUploadProgress(100)
        window.location.href = '/news/gallery'
        return
      } else {
        setError(result.error || '갤러리 작성에 실패했습니다.')
        setIsLoading(false)
      }
    } catch (err: any) {
      console.error('Submit error:', err)
      setError(err.message || '갤러리 작성 중 오류가 발생했습니다.')
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>갤러리 등록</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">앨범 제목 *</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="예: 2025 신년감사예배"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="갤러리에 대한 설명을 입력하세요"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              disabled={isLoading}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">카테고리</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as GalleryCategory })
                }
                disabled={isLoading}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="worship">주일예배</option>
                <option value="special">특별예배</option>
                <option value="sunday-school">교회학교</option>
                <option value="event">행사</option>
                <option value="retreat">수련회</option>
                <option value="other">기타</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="event_date">이벤트 날짜</Label>
              <Input
                id="event_date"
                name="event_date"
                type="date"
                value={formData.event_date}
                onChange={(e) =>
                  setFormData({ ...formData, event_date: e.target.value })
                }
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">이미지 * (여러 개 선택 가능)</Label>
            <div className="flex items-center gap-4">
              <Input
                id="images"
                name="images"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleImageChange}
                disabled={isLoading}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              이미지 (JPEG, PNG, WebP, 최대 10MB) 파일을 업로드하세요. 여러 개 선택 가능합니다.
            </p>
          </div>

          {/* 업로드된 이미지 미리보기 */}
          {images.length > 0 && (
            <div className="space-y-4">
              <Label>업로드된 이미지 ({images.length}개)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group border rounded-lg overflow-hidden"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={image.preview}
                        alt={`이미지 ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="p-2">
                      <Input
                        type="text"
                        placeholder="캡션 (선택사항)"
                        value={image.caption}
                        onChange={(e) => updateImageCaption(index, e.target.value)}
                        disabled={isLoading}
                        className="text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {uploadProgress > 0 && (
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
