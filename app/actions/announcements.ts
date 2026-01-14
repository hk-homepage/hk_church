'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from './auth'
import { isAdmin } from '@/lib/utils/permissions'

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

    // 공지사항 저장 (content는 JSONB로 저장, 간단한 텍스트는 문자열로 저장)
    const { data: notice, error } = await supabase
      .from('notices')
      .insert({
        title: data.title.trim(),
        content: data.content.trim(), // 향후 JSONB로 변경 가능
        author_id: user.id,
        is_pinned: data.is_pinned ?? false,
        view_count: 0,
        attachments: [],
      })
      .select('id')
      .single()

    if (error) {
      console.error('공지사항 작성 에러:', error)
      return {
        success: false,
        error: error.message || '공지사항 작성에 실패했습니다.',
      }
    }

    return {
      success: true,
      id: notice.id,
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
 * 공지사항 목록 가져오기
 */
export async function getNotices(page: number = 1, limit: number = 10) {
  try {
    const supabase = await createClient()

    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from('notices')
      .select('*', { count: 'exact' })
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) {
      console.error('공지사항 목록 조회 에러:', error)
      return {
        success: false,
        error: error.message,
        notices: [],
        total: 0,
      }
    }

    return {
      success: true,
      notices: data || [],
      total: count || 0,
    }
  } catch (error) {
    console.error('Get notices error:', error)
    return {
      success: false,
      error: '공지사항 목록을 불러오는 중 오류가 발생했습니다.',
      notices: [],
      total: 0,
    }
  }
}

/**
 * 공지사항 상세 가져오기
 */
export async function getNotice(id: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('공지사항 상세 조회 에러:', error)
      return {
        success: false,
        error: error.message,
        notice: null,
      }
    }

    // 조회수 증가
    await supabase.rpc('increment_notice_view_count', { notice_id: id })

    return {
      success: true,
      notice: data,
    }
  } catch (error) {
    console.error('Get notice error:', error)
    return {
      success: false,
      error: '공지사항을 불러오는 중 오류가 발생했습니다.',
      notice: null,
    }
  }
}
