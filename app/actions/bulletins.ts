'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from './auth'
import { isAdmin } from '@/lib/utils/permissions'
import { getBulletins as getUnifiedBulletins, getBulletin as getUnifiedBulletin } from './posts'
import type { Bulletin } from '@/types/posts'

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

/**
 * 주보 작성 (관리자만) - 통합된 posts 테이블 사용
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

    // 주보 게시판 찾기
    const { data: board } = await supabase
      .from('boards')
      .select('board_id')
      .eq('slug', 'bulletins')
      .single()

    if (!board) {
      return {
        success: false,
        error: '주보 게시판을 찾을 수 없습니다.',
      }
    }

    // 통합된 posts 테이블에 저장
    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        board_id: board.board_id,
        post_type: 'bulletin',
        author_user_id: user.id,
        author_name: '관리자',
        title: data.title.trim(),
        content: '', // 주보는 내용이 없을 수 있음
        thumbnail_url: data.cover_image_url?.trim() || null,
        metadata: {
          bulletin_date: data.bulletin_date,
          cover_image_url: data.cover_image_url?.trim() || null,
          pdf_url: data.pdf_url?.trim() || null,
          page_count: data.page_count || 1,
        },
      })
      .select('post_id')
      .single()

    if (error) {
      console.error('주보 작성 에러:', error)
      return {
        success: false,
        error: error.message || '주보 작성에 실패했습니다.',
      }
    }

    if (!post) {
      return {
        success: false,
        error: '주보가 생성되지 않았습니다.',
      }
    }

    return {
      success: true,
      id: post.post_id.toString(),
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
 * 주보 목록 가져오기 - 통합된 posts 테이블 사용
 */
export async function getBulletins(limit: number = 50) {
  return getUnifiedBulletins(limit)
}

/**
 * 주보 상세 가져오기 - 통합된 posts 테이블 사용
 */
export async function getBulletin(id: string) {
  return getUnifiedBulletin(id)
}

/**
 * 주보 수정 (관리자만) - 통합된 posts 테이블 사용
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

    const postId = parseInt(id, 10)
    if (isNaN(postId)) {
      return {
        success: false,
        error: '유효하지 않은 주보 ID입니다.',
      }
    }

    const supabase = await createClient()

    const updateData: any = {}
    if (data.title !== undefined) updateData.title = data.title.trim()
    if (data.cover_image_url !== undefined) updateData.thumbnail_url = data.cover_image_url?.trim() || null
    
    // metadata 업데이트
    const { data: existingPost } = await supabase
      .from('posts')
      .select('metadata')
      .eq('post_id', postId)
      .single()

    if (existingPost) {
      const metadata = existingPost.metadata || {}
      if (data.bulletin_date !== undefined) metadata.bulletin_date = data.bulletin_date
      if (data.cover_image_url !== undefined) metadata.cover_image_url = data.cover_image_url?.trim() || null
      if (data.pdf_url !== undefined) metadata.pdf_url = data.pdf_url.trim()
      if (data.page_count !== undefined) metadata.page_count = data.page_count || null
      updateData.metadata = metadata
    }

    const { error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('post_id', postId)
      .eq('post_type', 'bulletin')

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
 * 주보 삭제 (관리자만) - 통합된 posts 테이블 사용 (soft delete)
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

    const postId = parseInt(id, 10)
    if (isNaN(postId)) {
      return {
        success: false,
        error: '유효하지 않은 주보 ID입니다.',
      }
    }

    const supabase = await createClient()

    // Soft delete
    const { error } = await supabase
      .from('posts')
      .update({ deleted_at: new Date().toISOString() })
      .eq('post_id', postId)
      .eq('post_type', 'bulletin')

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
