'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from './auth'
import { isAdmin } from '@/lib/utils/permissions'
import { getPostsByBoard, getPostById } from './posts'
import type { 
  GalleryAlbum, 
  GalleryAlbumDetail, 
  GalleryAlbumsResponse, 
  GalleryAlbumResponse,
  GalleryCategory 
} from '@/types/posts'
import { convertToGalleryAlbum, convertToGalleryAlbumDetail } from '@/types/posts'

export interface CreateGalleryAlbumInput {
  title: string
  description?: string
  category?: GalleryCategory
  event_date?: string
  images: Array<{
    image_url: string
    thumbnail_url?: string
    caption?: string
    display_order?: number
  }>
}

export interface GalleryAlbumResult {
  success: boolean
  error?: string
  id?: string
}

/**
 * 갤러리 앨범 생성 (관리자만) - 통합된 posts 테이블 사용
 */
export async function createGalleryAlbum(data: CreateGalleryAlbumInput): Promise<GalleryAlbumResult> {
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
        error: '관리자만 갤러리를 작성할 수 있습니다.',
      }
    }

    if (!data.title || !data.title.trim()) {
      return {
        success: false,
        error: '제목을 입력해주세요.',
      }
    }

    if (!data.images || data.images.length === 0) {
      return {
        success: false,
        error: '최소 1개 이상의 이미지를 업로드해주세요.',
      }
    }

    const supabase = await createClient()

    // 갤러리 게시판 찾기
    const { data: board } = await supabase
      .from('boards')
      .select('board_id')
      .eq('slug', 'gallery')
      .single()

    if (!board) {
      return {
        success: false,
        error: '갤러리 게시판을 찾을 수 없습니다.',
      }
    }

    // 첫 번째 이미지를 썸네일로 사용
    const thumbnailUrl = data.images[0]?.image_url || data.images[0]?.thumbnail_url || null

    // 통합된 posts 테이블에 저장
    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        board_id: board.board_id,
        post_type: 'gallery',
        author_user_id: user.id,
        author_name: '관리자',
        title: data.title.trim(),
        content: data.description?.trim() || '',
        thumbnail_url: thumbnailUrl,
        metadata: {
          category: data.category || 'other',
          event_date: data.event_date || null,
          images: data.images.map((img, index) => ({
            image_url: img.image_url,
            thumbnail_url: img.thumbnail_url || img.image_url,
            caption: img.caption || null,
            display_order: img.display_order ?? index,
          })),
        },
      })
      .select('post_id')
      .single()

    if (error) {
      console.error('갤러리 작성 에러:', error)
      return {
        success: false,
        error: error.message || '갤러리 작성에 실패했습니다.',
      }
    }

    if (!post) {
      return {
        success: false,
        error: '갤러리가 생성되지 않았습니다.',
      }
    }

    return {
      success: true,
      id: post.post_id.toString(),
    }
  } catch (error) {
    console.error('Create gallery album error:', error)
    return {
      success: false,
      error: '갤러리 작성 중 오류가 발생했습니다.',
    }
  }
}

/**
 * 갤러리 앨범 목록 조회 - 통합된 posts 테이블 사용
 */
export async function getGalleryAlbums(
  options: {
    category?: GalleryCategory
    limit?: number
    offset?: number
  } = {}
): Promise<GalleryAlbumsResponse> {
  const { category, limit = 50, offset = 0 } = options

  try {
    const page = Math.floor(offset / limit) + 1
    const result = await getPostsByBoard('gallery', {
      page,
      limit,
      postType: 'gallery',
    })

    if (!result.success) {
      return {
        success: false,
        error: result.error || '갤러리 앨범을 불러오는데 실패했습니다.',
        albums: [],
        total: 0,
      }
    }

    // 카테고리 필터링
    let filteredPosts = result.posts
    if (category && category !== 'all') {
      filteredPosts = result.posts.filter(
        (post) => post.metadata?.category === category
      )
    }

    // UnifiedPost를 GalleryAlbum으로 변환
    const albums: GalleryAlbum[] = filteredPosts.map(convertToGalleryAlbum)

    return {
      success: true,
      albums,
      total: result.total,
    }
  } catch (error) {
    console.error('Get gallery albums error:', error)
    return {
      success: false,
      error: '갤러리 앨범을 불러오는 중 오류가 발생했습니다.',
      albums: [],
      total: 0,
    }
  }
}

/**
 * 갤러리 앨범 상세 조회 (이미지 포함) - 통합된 posts 테이블 사용
 */
export async function getGalleryAlbum(id: string): Promise<GalleryAlbumResponse> {
  try {
    const result = await getPostById(parseInt(id, 10), false)

    if (!result.success || !result.post) {
      return {
        success: false,
        error: result.error || '갤러리 앨범을 찾을 수 없습니다.',
        album: null,
      }
    }

    // UnifiedPost를 GalleryAlbumDetail로 변환
    const album = convertToGalleryAlbumDetail(result.post)

    return {
      success: true,
      album,
    }
  } catch (error) {
    console.error('Get gallery album error:', error)
    return {
      success: false,
      error: '갤러리 앨범을 불러오는 중 오류가 발생했습니다.',
      album: null,
    }
  }
}

/**
 * 갤러리 앨범 삭제 (관리자만) - 통합된 posts 테이블 사용 (soft delete)
 */
export async function deleteGalleryAlbum(id: string): Promise<GalleryAlbumResult> {
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
        error: '관리자만 갤러리를 삭제할 수 있습니다.',
      }
    }

    const postId = parseInt(id, 10)
    if (isNaN(postId)) {
      return {
        success: false,
        error: '유효하지 않은 갤러리 ID입니다.',
      }
    }

    const supabase = await createClient()

    // Soft delete
    const { error } = await supabase
      .from('posts')
      .update({ deleted_at: new Date().toISOString() })
      .eq('post_id', postId)
      .eq('post_type', 'gallery')

    if (error) {
      console.error('갤러리 삭제 에러:', error)
      return {
        success: false,
        error: error.message || '갤러리 삭제에 실패했습니다.',
      }
    }

    return {
      success: true,
      id,
    }
  } catch (error) {
    console.error('Delete gallery album error:', error)
    return {
      success: false,
      error: '갤러리 삭제 중 오류가 발생했습니다.',
    }
  }
}
