'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from './auth'
import { isAdmin } from '@/lib/utils/permissions'
import { revalidatePath } from 'next/cache'

export interface HeroSlide {
  id: string
  title: string
  subtitle: string | null
  description: string | null
  image_url: string
  cta_text: string | null
  cta_link: string | null
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CreateHeroSlideInput {
  title: string
  subtitle?: string
  description?: string
  image_url: string
  cta_text?: string
  cta_link?: string
  display_order?: number
  is_active?: boolean
}

export interface HeroSlideResult {
  success: boolean
  error?: string
  id?: string
}

/**
 * 활성화된 배너 슬라이드 가져오기 (공개)
 */
export async function getActiveHeroSlides(): Promise<HeroSlide[]> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Get hero slides error:', error)
      return []
    }

    return (data || []) as HeroSlide[]
  } catch (error) {
    console.error('Get hero slides error:', error)
    return []
  }
}

/**
 * 모든 배너 슬라이드 가져오기 (관리자용)
 */
export async function getAllHeroSlides(): Promise<HeroSlide[]> {
  try {
    const user = await getCurrentUser()
    
    if (!user || !isAdmin(user)) {
      return []
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Get all hero slides error:', error)
      return []
    }

    return (data || []) as HeroSlide[]
  } catch (error) {
    console.error('Get all hero slides error:', error)
    return []
  }
}

/**
 * 배너 슬라이드 생성 (관리자만)
 */
export async function createHeroSlide(data: CreateHeroSlideInput): Promise<HeroSlideResult> {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return {
        success: false,
        error: '로그인이 필요합니다.',
      }
    }

    if (!isAdmin(user)) {
      return {
        success: false,
        error: '관리자만 배너를 생성할 수 있습니다.',
      }
    }

    if (!data.title || !data.title.trim()) {
      return {
        success: false,
        error: '제목을 입력해주세요.',
      }
    }

    if (!data.image_url || !data.image_url.trim()) {
      return {
        success: false,
        error: '이미지를 업로드해주세요.',
      }
    }

    const supabase = await createClient()

    // display_order가 없으면 가장 큰 값 + 1
    let displayOrder = data.display_order
    if (displayOrder === undefined) {
      const { data: maxOrder } = await supabase
        .from('hero_slides')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1)
        .single()

      displayOrder = maxOrder ? (maxOrder.display_order || 0) + 1 : 0
    }

    const { data: slide, error } = await supabase
      .from('hero_slides')
      .insert({
        title: data.title.trim(),
        subtitle: data.subtitle?.trim() || null,
        description: data.description?.trim() || null,
        image_url: data.image_url.trim(),
        cta_text: data.cta_text?.trim() || null,
        cta_link: data.cta_link?.trim() || null,
        display_order: displayOrder,
        is_active: data.is_active !== undefined ? data.is_active : true,
      })
      .select('id')
      .single()

    if (error) {
      console.error('Create hero slide error:', error)
      return {
        success: false,
        error: error.message || '배너 생성에 실패했습니다.',
      }
    }

    if (!slide) {
      return {
        success: false,
        error: '배너가 생성되지 않았습니다.',
      }
    }

    // 데이터 갱신
    revalidatePath('/admin/hero-slides')
    revalidatePath('/') // 메인페이지도 갱신 (배너 표시)

    return {
      success: true,
      id: slide.id,
    }
  } catch (error) {
    console.error('Create hero slide error:', error)
    return {
      success: false,
      error: '배너 생성 중 오류가 발생했습니다.',
    }
  }
}

/**
 * URL에서 스토리지 파일 경로 추출
 * 예: https://xxx.supabase.co/storage/v1/object/public/public-assets/banners/file.jpg
 * -> banners/file.jpg
 */
function extractStoragePath(imageUrl: string, bucketName: string): string | null {
  try {
    const url = new URL(imageUrl)
    // Supabase storage URL 패턴 확인
    const storagePattern = `/storage/v1/object/public/${bucketName}/`
    const index = url.pathname.indexOf(storagePattern)
    
    if (index !== -1) {
      return url.pathname.substring(index + storagePattern.length)
    }
    
    // 직접 경로인 경우 (이미 경로만 있는 경우)
    if (imageUrl.startsWith(bucketName + '/') || imageUrl.startsWith('/' + bucketName + '/')) {
      return imageUrl.replace(/^\/?[^\/]+\//, '')
    }
    
    return null
  } catch {
    return null
  }
}

/**
 * 배너 슬라이드 수정 (관리자만)
 * 이미지가 변경된 경우 이전 이미지 파일을 삭제합니다.
 */
export async function updateHeroSlide(id: string, data: Partial<CreateHeroSlideInput>): Promise<HeroSlideResult> {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return {
        success: false,
        error: '로그인이 필요합니다.',
      }
    }

    if (!isAdmin(user)) {
      return {
        success: false,
        error: '관리자만 배너를 수정할 수 있습니다.',
      }
    }

    const supabase = await createClient()

    // 이미지가 변경되는 경우 이전 이미지 삭제
    if (data.image_url !== undefined) {
      const { data: existingSlide } = await supabase
        .from('hero_slides')
        .select('image_url')
        .eq('id', id)
        .single()

      // 이전 이미지가 있고 새 이미지와 다르면 삭제
      if (existingSlide?.image_url && existingSlide.image_url !== data.image_url.trim()) {
        const oldStoragePath = extractStoragePath(existingSlide.image_url, 'public-assets')
        
        if (oldStoragePath) {
          const { error: storageError } = await supabase.storage
            .from('public-assets')
            .remove([oldStoragePath])

          if (storageError) {
            console.error('이전 이미지 삭제 에러:', storageError)
            // 삭제 실패해도 계속 진행 (이미 삭제되었을 수도 있음)
          }
        }
      }
    }

    const updateData: any = {}
    if (data.title !== undefined) updateData.title = data.title.trim()
    if (data.subtitle !== undefined) updateData.subtitle = data.subtitle?.trim() || null
    if (data.description !== undefined) updateData.description = data.description?.trim() || null
    if (data.image_url !== undefined) updateData.image_url = data.image_url.trim()
    if (data.cta_text !== undefined) updateData.cta_text = data.cta_text?.trim() || null
    if (data.cta_link !== undefined) updateData.cta_link = data.cta_link?.trim() || null
    if (data.display_order !== undefined) updateData.display_order = data.display_order
    if (data.is_active !== undefined) updateData.is_active = data.is_active

    const { error } = await supabase
      .from('hero_slides')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Update hero slide error:', error)
      return {
        success: false,
        error: error.message || '배너 수정에 실패했습니다.',
      }
    }

    // 데이터 갱신
    revalidatePath('/admin/hero-slides')
    revalidatePath('/') // 메인페이지도 갱신 (배너 표시)

    return {
      success: true,
      id,
    }
  } catch (error) {
    console.error('Update hero slide error:', error)
    return {
      success: false,
      error: '배너 수정 중 오류가 발생했습니다.',
    }
  }
}

/**
 * 배너 슬라이드 삭제 (관리자만)
 * 테이블 레코드와 스토리지 파일을 함께 삭제합니다.
 */
export async function deleteHeroSlide(id: string): Promise<HeroSlideResult> {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return {
        success: false,
        error: '로그인이 필요합니다.',
      }
    }

    if (!isAdmin(user)) {
      return {
        success: false,
        error: '관리자만 배너를 삭제할 수 있습니다.',
      }
    }

    const supabase = await createClient()

    // 먼저 삭제할 레코드의 이미지 URL 가져오기
    const { data: slide, error: fetchError } = await supabase
      .from('hero_slides')
      .select('image_url')
      .eq('id', id)
      .single()

    if (fetchError || !slide) {
      return {
        success: false,
        error: '배너를 찾을 수 없습니다.',
      }
    }

    // 스토리지 파일 삭제 (public-assets 버킷)
    if (slide.image_url) {
      const storagePath = extractStoragePath(slide.image_url, 'public-assets')
      
      if (storagePath) {
        const { error: storageError } = await supabase.storage
          .from('public-assets')
          .remove([storagePath])

        if (storageError) {
          console.error('스토리지 파일 삭제 에러:', storageError)
          // 스토리지 삭제 실패해도 테이블 레코드는 삭제 진행
          // (이미지가 이미 삭제되었을 수도 있음)
        }
      }
    }

    // 테이블 레코드 삭제
    const { error } = await supabase
      .from('hero_slides')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete hero slide error:', error)
      return {
        success: false,
        error: error.message || '배너 삭제에 실패했습니다.',
      }
    }

    // 데이터 갱신
    revalidatePath('/admin/hero-slides')
    revalidatePath('/') // 메인페이지도 갱신 (배너 표시)

    return {
      success: true,
      id,
    }
  } catch (error) {
    console.error('Delete hero slide error:', error)
    return {
      success: false,
      error: '배너 삭제 중 오류가 발생했습니다.',
    }
  }
}
