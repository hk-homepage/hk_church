'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/app/actions/auth'
import type { UnifiedPost, PostType, UnifiedBoard, PostsResponse, PostResponse, Bulletin } from '@/types/posts'
import { convertToBulletin } from '@/types/posts'

export type FellowshipCategory = 'grace' | 'thanks' | 'daily'

export interface FellowshipAttachmentInput {
  name: string
  url: string
  size: number
  type: string
}

export interface CreateFellowshipPostInput {
  title: string
  content: string
  attachments?: FellowshipAttachmentInput[]
}

export interface CreateFellowshipPostResult {
  success: boolean
  error?: string
  id?: string
}

/**
 * 게시판별 게시물 목록 조회
 */
export async function getPostsByBoard(
  boardSlug: string,
  options: {
    page?: number
    limit?: number
    postType?: PostType
  } = {}
): Promise<PostsResponse> {
  const { page = 1, limit = 20, postType } = options
  
  try {
    const supabase = await createClient()
    
    // 게시판 조회
    const { data: board, error: boardError } = await supabase
      .from('boards')
      .select('*')
      .eq('slug', boardSlug)
      .single()
    
    if (boardError || !board) {
      return {
        success: false,
        error: '게시판을 찾을 수 없습니다.',
        posts: [],
        total: 0,
      }
    }
    
    // 게시물 조회
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    let query = supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .eq('board_id', board.board_id)
      .is('deleted_at', null)
    
    if (postType) {
      query = query.eq('post_type', postType)
    }
    
    const { data: posts, error, count } = await query
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .range(from, to)
    
    if (error) {
      console.error('게시물 목록 조회 에러:', error)
      return {
        success: false,
        error: error.message,
        posts: [],
        total: 0,
      }
    }
    
    return {
      success: true,
      posts: (posts || []) as UnifiedPost[],
      total: count || 0,
      board: board as UnifiedBoard,
    }
  } catch (error) {
    console.error('Get posts error:', error)
    return {
      success: false,
      error: '게시물 목록을 불러오는 중 오류가 발생했습니다.',
      posts: [],
      total: 0,
    }
  }
}

/**
 * 게시물 상세 조회
 */
export async function getPostById(postId: number, incrementView: boolean = true): Promise<PostResponse> {
  try {
    const supabase = await createClient()
    
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('post_id', postId)
      .is('deleted_at', null)
      .single()
    
    if (error || !post) {
      return {
        success: false,
        error: error?.message || '게시물을 찾을 수 없습니다.',
        post: null,
      }
    }
    
    // 조회수 증가
    if (incrementView) {
      await supabase.rpc('increment_post_view_count', { p_post_id: postId })
    }
    
    return {
      success: true,
      post: post as UnifiedPost,
    }
  } catch (error) {
    console.error('Get post error:', error)
    return {
      success: false,
      error: '게시물을 불러오는 중 오류가 발생했습니다.',
      post: null,
    }
  }
}

/**
 * 성도의 교제 게시판 글 작성 (로그인한 일반 사용자)
 */
export async function createFellowshipPost(
  category: FellowshipCategory,
  data: CreateFellowshipPostInput
): Promise<CreateFellowshipPostResult> {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return {
        success: false,
        error: '로그인이 필요합니다.',
      }
    }

    const title = data.title?.trim()
    if (!title) {
      return {
        success: false,
        error: '제목을 입력해주세요.',
      }
    }

    const supabase = await createClient()

    const boardSlug = `fellowship-${category}`
    const { data: board, error: boardError } = await supabase
      .from('boards')
      .select('board_id')
      .eq('slug', boardSlug)
      .single()

    if (boardError || !board) {
      return {
        success: false,
        error: '게시판을 찾을 수 없습니다.',
      }
    }

    const metadata: { category_slug: FellowshipCategory; attachments?: FellowshipAttachmentInput[] } = {
      category_slug: category,
    }
    if (data.attachments && data.attachments.length > 0) {
      metadata.attachments = data.attachments
    }

    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        board_id: board.board_id,
        post_type: 'general',
        author_user_id: user.id,
        author_name: user.name || '성도',
        title,
        content: data.content?.trim() || '',
        is_pinned: false,
        is_notice: false,
        is_featured: false,
        view_count: 0,
        metadata,
      })
      .select('post_id')
      .single()

    if (error) {
      console.error('fellowship 글 작성 에러:', error)
      return {
        success: false,
        error: error.message || '글 작성에 실패했습니다.',
      }
    }

    if (!post) {
      return {
        success: false,
        error: '글이 등록되지 않았습니다.',
      }
    }

    return {
      success: true,
      id: post.post_id.toString(),
    }
  } catch (error) {
    console.error('createFellowshipPost error:', error)
    return {
      success: false,
      error: '글 작성 중 오류가 발생했습니다.',
    }
  }
}

/**
 * 성도의 교제 게시판 게시물 조회
 */
export async function getFellowshipPosts(
  categorySlug: 'grace' | 'thanks' | 'daily',
  page: number = 1,
  limit: number = 15
): Promise<PostsResponse> {
  const boardSlug = `fellowship-${categorySlug}`
  const result = await getPostsByBoard(boardSlug, { page, limit, postType: 'general' })
  
  if (!result.success) {
    return result
  }
  
  // metadata에서 category_slug 필터링
  const filteredPosts = result.posts.filter(
    (post) => post.metadata?.category_slug === categorySlug
  )
  
  return {
    ...result,
    posts: filteredPosts,
  }
}

/**
 * 주보 목록 조회
 */
export async function getBulletins(limit: number = 50) {
  const result = await getPostsByBoard('bulletins', { limit, postType: 'bulletin' })
  
  if (!result.success) {
    return {
      success: false,
      error: result.error,
      bulletins: [],
    }
  }
  
  // UnifiedPost를 Bulletin 형식으로 변환
  const bulletins = result.posts.map(convertToBulletin)
  
  return {
    success: true,
    bulletins,
  }
}

/**
 * 주보 상세 조회
 */
export async function getBulletin(id: string) {
  const postId = parseInt(id, 10)
  
  if (isNaN(postId)) {
    return {
      success: false,
      error: '유효하지 않은 주보 ID입니다.',
      bulletin: null,
    }
  }
  
  const result = await getPostById(postId, false)
  
  if (!result.success || !result.post) {
    return {
      success: false,
      error: result.error || '주보를 찾을 수 없습니다.',
      bulletin: null,
    }
  }
  
  // 주보 타입 확인
  if (result.post.post_type !== 'bulletin') {
    return {
      success: false,
      error: '주보를 찾을 수 없습니다.',
      bulletin: null,
    }
  }
  
  // UnifiedPost를 Bulletin로 변환
  const bulletin = convertToBulletin(result.post)
  
  return {
    success: true,
    bulletin,
  }
}
