'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from './auth'
import { isAdmin } from '@/lib/utils/permissions'

export interface CreateBulletinInput {
  title: string
  bulletin_date: string // YYYY-MM-DD 형식
  cover_image_url?: string
  pdf_url: string
  page_count?: number
}

export interface BulletinResult {
  success: boolean
  error?: string
  id?: string
}

export interface Bulletin {
  id: string
  title: string
  bulletin_date: string
  cover_image_url?: string
  pdf_url: string
  page_count?: number
  created_by?: string
  created_at: string
  updated_at: string
}

/**
 * 주보 작성 (관리자만)
 */
export async function createBulletin(data: CreateBulletinInput): Promise<BulletinResult> {
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
        error: '관리자만 주보를 작성할 수 있습니다.',
      }
    }

    if (!data.title || !data.title.trim()) {
      return {
        success: false,
        error: '제목을 입력해주세요.',
      }
    }

    if (!data.bulletin_date) {
      return {
        success: false,
        error: '주보 날짜를 입력해주세요.',
      }
    }

    // PDF 또는 이미지 중 하나는 필수
    const hasPdf = data.pdf_url && data.pdf_url.trim()
    const hasImage = data.cover_image_url && data.cover_image_url.trim()
    
    if (!hasPdf && !hasImage) {
      return {
        success: false,
        error: 'PDF 또는 이미지 파일을 업로드해주세요.',
      }
    }

    const supabase = await createClient()

    const { data: bulletin, error } = await supabase
      .from('bulletins')
      .insert({
        title: data.title.trim(),
        bulletin_date: data.bulletin_date,
        cover_image_url: data.cover_image_url?.trim() || null,
        pdf_url: data.pdf_url?.trim() || null,
        page_count: data.page_count || 1, // 기본값 1
        created_by: user.id,
      })
      .select('id')
      .single()

    if (error) {
      console.error('주보 작성 에러:', error)
      return {
        success: false,
        error: error.message || '주보 작성에 실패했습니다.',
      }
    }

    if (!bulletin) {
      return {
        success: false,
        error: '주보가 생성되지 않았습니다.',
      }
    }

    return {
      success: true,
      id: bulletin.id,
    }
  } catch (error) {
    console.error('Create bulletin error:', error)
    return {
      success: false,
      error: '주보 작성 중 오류가 발생했습니다.',
    }
  }
}

/**
 * 주보 목록 가져오기
 */
export async function getBulletins(limit: number = 50) {
  try {
    const supabase = await createClient()

    const { data: bulletins, error } = await supabase
      .from('bulletins')
      .select('*')
      .order('bulletin_date', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('주보 목록 조회 에러:', error)
      return {
        success: false,
        error: error.message,
        bulletins: [],
      }
    }

    return {
      success: true,
      bulletins: (bulletins || []) as Bulletin[],
    }
  } catch (error) {
    console.error('Get bulletins error:', error)
    return {
      success: false,
      error: '주보 목록을 불러오는 중 오류가 발생했습니다.',
      bulletins: [],
    }
  }
}

/**
 * 주보 상세 가져오기
 */
export async function getBulletin(id: string) {
  try {
    const supabase = await createClient()

    const { data: bulletin, error } = await supabase
      .from('bulletins')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !bulletin) {
      console.error('주보 상세 조회 에러:', error)
      return {
        success: false,
        error: error?.message || '주보를 찾을 수 없습니다.',
        bulletin: null,
      }
    }

    return {
      success: true,
      bulletin: bulletin as Bulletin,
    }
  } catch (error) {
    console.error('Get bulletin error:', error)
    return {
      success: false,
      error: '주보를 불러오는 중 오류가 발생했습니다.',
      bulletin: null,
    }
  }
}

/**
 * 주보 수정 (관리자만)
 */
export async function updateBulletin(id: string, data: Partial<CreateBulletinInput>): Promise<BulletinResult> {
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
        error: '관리자만 주보를 수정할 수 있습니다.',
      }
    }

    const supabase = await createClient()

    const updateData: any = {}
    if (data.title !== undefined) updateData.title = data.title.trim()
    if (data.bulletin_date !== undefined) updateData.bulletin_date = data.bulletin_date
    if (data.cover_image_url !== undefined) updateData.cover_image_url = data.cover_image_url?.trim() || null
    if (data.pdf_url !== undefined) updateData.pdf_url = data.pdf_url.trim()
    if (data.page_count !== undefined) updateData.page_count = data.page_count || null

    const { error } = await supabase
      .from('bulletins')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('주보 수정 에러:', error)
      return {
        success: false,
        error: error.message || '주보 수정에 실패했습니다.',
      }
    }

    return {
      success: true,
      id,
    }
  } catch (error) {
    console.error('Update bulletin error:', error)
    return {
      success: false,
      error: '주보 수정 중 오류가 발생했습니다.',
    }
  }
}

/**
 * 주보 삭제 (관리자만)
 */
export async function deleteBulletin(id: string): Promise<BulletinResult> {
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
        error: '관리자만 주보를 삭제할 수 있습니다.',
      }
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from('bulletins')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('주보 삭제 에러:', error)
      return {
        success: false,
        error: error.message || '주보 삭제에 실패했습니다.',
      }
    }

    return {
      success: true,
      id,
    }
  } catch (error) {
    console.error('Delete bulletin error:', error)
    return {
      success: false,
      error: '주보 삭제 중 오류가 발생했습니다.',
    }
  }
}
