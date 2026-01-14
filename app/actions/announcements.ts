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

    // 공지사항을 posts 테이블에 저장 (is_notice = TRUE)
    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        board_id: noticeBoard.board_id,
        author_user_id: user.id,
        title: data.title.trim(),
        content: data.content.trim(),
        is_notice: true,
        is_pinned: data.is_pinned ?? false,
        view_count: 0,
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
 * 공지사항 목록 가져오기
 */
export async function getNotices(page: number = 1, limit: number = 10) {
  try {
    const supabase = await createClient()

    // 공지사항 게시판 찾기
    const { data: noticeBoard } = await supabase
      .from('boards')
      .select('board_id')
      .eq('name', '공지사항')
      .single()

    if (!noticeBoard) {
      return {
        success: true,
        notices: [],
        total: 0,
      }
    }

    const from = (page - 1) * limit
    const to = from + limit - 1

    // 공지사항 게시판의 is_notice = TRUE인 게시물만 가져오기
    const { data, error, count } = await supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .eq('board_id', noticeBoard.board_id)
      .eq('is_notice', true)
      .is('deleted_at', null)
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

    // posts 테이블 구조를 notices와 호환되도록 변환
    const notices = (data || []).map((post: any) => ({
      id: post.post_id.toString(),
      title: post.title,
      content: post.content,
      author_id: post.author_user_id,
      is_pinned: post.is_pinned || false,
      view_count: post.view_count || 0,
      created_at: post.created_at,
      updated_at: post.updated_at,
      attachments: [],
    }))

    return {
      success: true,
      notices,
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
 * @param id 공지사항 ID
 * @param incrementView 조회수 증가 여부 (기본값: true)
 */
export async function getNotice(id: string, incrementView: boolean = true) {
  try {
    const supabase = await createClient()

    const postId = parseInt(id, 10)
    if (isNaN(postId)) {
      return {
        success: false,
        error: '유효하지 않은 공지사항 ID입니다.',
        notice: null,
      }
    }

    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('post_id', postId)
      .eq('is_notice', true)
      .is('deleted_at', null)
      .single()

    if (error || !post) {
      console.error('공지사항 상세 조회 에러:', error)
      return {
        success: false,
        error: error?.message || '공지사항을 찾을 수 없습니다.',
        notice: null,
      }
    }

    // 조회수 증가 (옵션)
    if (incrementView) {
      await supabase.rpc('increment_post_view_count', { p_post_id: postId })
    }

    // posts 테이블 구조를 notices와 호환되도록 변환
    const notice = {
      id: post.post_id.toString(),
      title: post.title,
      content: post.content,
      author_id: post.author_user_id,
      is_pinned: post.is_pinned || false,
      view_count: post.view_count || 0,
      created_at: post.created_at,
      updated_at: post.updated_at,
      attachments: [],
    }

    return {
      success: true,
      notice,
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
