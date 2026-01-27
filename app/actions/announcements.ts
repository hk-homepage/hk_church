'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from './auth'
import { isAdmin } from '@/lib/utils/permissions'
import type { UnifiedPost, Notice } from '@/types/posts'
import { convertToNotice } from '@/types/posts'
import { getPostsByBoard, getPostById } from './posts'

export interface CreateNoticeInput {
  title: string
  content: string
  is_pinned?: boolean
}

export interface NoticeResult {
  success: boolean
  error?: string
  id?: string
}

/**
 * 공지사항 작성 (관리자만)
 */
export async function createNotice(data: CreateNoticeInput): Promise<NoticeResult> {
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
        error: '관리자만 공지사항을 작성할 수 있습니다.',
      }
    }

    if (!data.title || !data.title.trim()) {
      return {
        success: false,
        error: '제목을 입력해주세요.',
      }
    }

    if (!data.content || !data.content.trim()) {
      return {
        success: false,
        error: '내용을 입력해주세요.',
      }
    }

    const supabase = await createClient()

    // 공지사항 게시판 찾기 (이름이 '공지사항'인 게시판)
    const { data: noticeBoard, error: boardError } = await supabase
      .from('boards')
      .select('board_id')
      .eq('name', '공지사항')
      .single()

    if (boardError || !noticeBoard) {
      return {
        success: false,
        error: '공지사항 게시판을 찾을 수 없습니다.',
      }
    }

    // 공지사항을 posts 테이블에 저장 (post_type = 'announcement', is_notice = TRUE)
    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        board_id: noticeBoard.board_id,
        post_type: 'announcement',
        author_user_id: user.id,
        author_name: user.name || '관리자',
        title: data.title.trim(),
        content: data.content.trim(),
        is_notice: true,
        is_pinned: data.is_pinned ?? false,
        view_count: 0,
        metadata: {},
      })
      .select('post_id')
      .single()

    if (error) {
      console.error('공지사항 작성 에러:', error)
      console.error('에러 상세:', JSON.stringify(error, null, 2))
      return {
        success: false,
        error: error.message || '공지사항 작성에 실패했습니다.',
      }
    }

    if (!post) {
      console.error('게시물 생성 실패: post 데이터 없음')
      return {
        success: false,
        error: '게시물이 생성되지 않았습니다.',
      }
    }

    console.log('공지사항 작성 성공:', { post_id: post.post_id })

    return {
      success: true,
      id: post.post_id?.toString() || '',
    }
  } catch (error) {
    console.error('Create notice error:', error)
    return {
      success: false,
      error: '공지사항 작성 중 오류가 발생했습니다.',
    }
  }
}

/**
 * 공지사항 목록 가져오기 - 통합된 posts 테이블 사용
 */
export async function getNotices(page: number = 1, limit: number = 10) {
  const result = await getPostsByBoard('announcements', { 
    page, 
    limit, 
    postType: 'announcement' 
  })
  
  if (!result.success) {
    return {
      success: true, // 하위 호환성
      notices: [],
      total: 0,
    }
  }
  
  // UnifiedPost를 Notice 형식으로 변환
  const notices = result.posts
    .filter(post => post.is_notice) // is_notice = true인 것만
    .map(convertToNotice)
  
  return {
    success: true,
    notices,
    total: result.total,
  }
}

/**
 * 공지사항 상세 가져오기 - 통합된 posts 테이블 사용
 * @param id 공지사항 ID
 * @param incrementView 조회수 증가 여부 (기본값: true)
 */
export async function getNotice(id: string, incrementView: boolean = true) {
  const postId = parseInt(id, 10)
  
  if (isNaN(postId)) {
    return {
      success: false,
      error: '유효하지 않은 공지사항 ID입니다.',
      notice: null,
    }
  }
  
  const result = await getPostById(postId, incrementView)
  
  if (!result.success || !result.post) {
    return {
      success: false,
      error: result.error || '공지사항을 찾을 수 없습니다.',
      notice: null,
    }
  }
  
  // 공지사항인지 확인
  if (!result.post.is_notice || result.post.post_type !== 'announcement') {
    return {
      success: false,
      error: '공지사항을 찾을 수 없습니다.',
      notice: null,
    }
  }
  
  // UnifiedPost를 Notice로 변환
  const notice = convertToNotice(result.post)
  
  return {
    success: true,
    notice,
  }
}

/**
 * 공지사항 삭제 (관리자만) - 통합된 posts 테이블 사용 (soft delete)
 */
export async function deleteNotice(id: string): Promise<NoticeResult> {
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
        error: '관리자만 공지사항을 삭제할 수 있습니다.',
      }
    }

    const postId = parseInt(id, 10)
    if (isNaN(postId)) {
      return {
        success: false,
        error: '유효하지 않은 공지사항 ID입니다.',
      }
    }

    const supabase = await createClient()

    // Soft delete
    const { error } = await supabase
      .from('posts')
      .update({ deleted_at: new Date().toISOString() })
      .eq('post_id', postId)
      .eq('post_type', 'announcement')
      .eq('is_notice', true)

    if (error) {
      console.error('공지사항 삭제 에러:', error)
      return {
        success: false,
        error: error.message || '공지사항 삭제에 실패했습니다.',
      }
    }

    return {
      success: true,
      id,
    }
  } catch (error) {
    console.error('Delete notice error:', error)
    return {
      success: false,
      error: '공지사항 삭제 중 오류가 발생했습니다.',
    }
  }
}
