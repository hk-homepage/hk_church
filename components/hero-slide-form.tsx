'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createHeroSlide, updateHeroSlide, type CreateHeroSlideInput } from '@/app/actions/hero-slides'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Image as ImageIcon, Upload, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import type { HeroSlide } from '@/app/actions/hero-slides'

interface HeroSlideFormProps {
  slide?: HeroSlide
  onSuccess?: () => void
}

export function HeroSlideForm({ slide, onSuccess }: HeroSlideFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(slide?.image_url || null)
  const [formData, setFormData] = useState<CreateHeroSlideInput>({
    title: slide?.title || '',
    subtitle: slide?.subtitle || '',
    description: slide?.description || '',
    image_url: slide?.image_url || '',
    cta_text: slide?.cta_text || '',
    cta_link: slide?.cta_link || '',
    display_order: slide?.display_order || 0,
    is_active: slide?.is_active !== undefined ? slide.is_active : true,
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('이미지 파일만 업로드 가능합니다. (JPEG, PNG, WebP)')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('이미지 파일 크기는 10MB 이하여야 합니다.')
      return
    }

    setImageFile(file)
    setError(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    setFormData((prev) => ({ ...prev, image_url: '' }))
  }

  // 파일명을 URL-safe하게 변환하는 함수
  const sanitizeFileName = (fileName: string): string => {
    const extension = fileName.split('.').pop() || ''
    const uuid = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
    return `${uuid}.${extension}`
  }

  const uploadImage = async (file: File): Promise<string> => {
    const supabase = createClient()

    try {
      const safeFileName = sanitizeFileName(file.name)
      const safePath = `banners/${safeFileName}`

      setUploadProgress(50)

      const { data, error } = await supabase.storage
        .from('public-assets')
        .upload(safePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (error) {
        throw error
      }

      setUploadProgress(100)

      const { data: { publicUrl } } = supabase.storage
        .from('public-assets')
        .getPublicUrl(data.path)

      return publicUrl
    } catch (err: any) {
      throw new Error(err.message || '이미지 업로드에 실패했습니다.')
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setUploadProgress(0)

    try {
      let imageUrl = formData.image_url

      // 새 이미지가 있으면 업로드
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      if (!imageUrl) {
        setError('이미지를 업로드해주세요.')
        setIsLoading(false)
        return
      }

      const submitData: CreateHeroSlideInput = {
        ...formData,
        image_url: imageUrl,
      }

      let result
      if (slide) {
        // 수정
        result = await updateHeroSlide(slide.id, submitData)
      } else {
        // 생성
        result = await createHeroSlide(submitData)
      }

      if (!result.success) {
        setError(result.error || '배너 저장에 실패했습니다.')
        setIsLoading(false)
        return
      }

      // 성공 시 리다이렉트
      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/admin/hero-slides')
        router.refresh()
      }
    } catch (err: any) {
      console.error('Submit error:', err)
      setError(err.message || '배너 저장 중 오류가 발생했습니다.')
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{slide ? '배너 수정' : '새 배너 추가'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 이미지 업로드 */}
          <div className="space-y-2">
            <Label htmlFor="image">배너 이미지 *</Label>
            {imagePreview ? (
              <div className="relative w-full h-64 rounded-lg overflow-hidden border">
                <Image
                  src={imagePreview}
                  alt="배너 미리보기"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-64 border-2 border-dashed rounded-lg hover:border-primary/50 transition-colors">
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                >
                  <ImageIcon className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    이미지를 클릭하거나 드래그하여 업로드
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPEG, PNG, WebP (최대 10MB)
                  </p>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            )}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>

          {/* 제목 */}
          <div className="space-y-2">
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="예: 다음세대가 춤추는 교회"
              required
            />
          </div>

          {/* 부제목 */}
          <div className="space-y-2">
            <Label htmlFor="subtitle">부제목</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
              placeholder="예: 마태복음 11:16-17"
            />
          </div>

          {/* 설명 */}
          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="예: 혜광교회에 오신 것을 환영합니다"
              rows={3}
            />
          </div>

          {/* CTA 버튼 텍스트 */}
          <div className="space-y-2">
            <Label htmlFor="cta_text">버튼 텍스트</Label>
            <Input
              id="cta_text"
              value={formData.cta_text}
              onChange={(e) => setFormData((prev) => ({ ...prev, cta_text: e.target.value }))}
              placeholder="예: 교회 알아보기"
            />
          </div>

          {/* CTA 링크 */}
          <div className="space-y-2">
            <Label htmlFor="cta_link">버튼 링크</Label>
            <Input
              id="cta_link"
              type="url"
              value={formData.cta_link}
              onChange={(e) => setFormData((prev) => ({ ...prev, cta_link: e.target.value }))}
              placeholder="예: /about"
            />
          </div>

          {/* 표시 순서 */}
          <div className="space-y-2">
            <Label htmlFor="display_order">표시 순서</Label>
            <Input
              id="display_order"
              type="number"
              value={formData.display_order}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))
              }
              min={0}
            />
            <p className="text-xs text-muted-foreground">
              숫자가 작을수록 먼저 표시됩니다. 비워두면 자동으로 마지막에 추가됩니다.
            </p>
          </div>

          {/* 활성화 여부 */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData((prev) => ({ ...prev, is_active: e.target.checked }))}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="is_active" className="cursor-pointer">
              활성화 (활성화된 배너만 메인페이지에 표시됩니다)
            </Label>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">{error}</div>
          )}

          {/* 제출 버튼 */}
          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? '저장 중...' : slide ? '수정하기' : '추가하기'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (onSuccess) {
                  onSuccess()
                } else {
                  router.back()
                }
              }}
            >
              취소
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
