// 갤러리 타입 정의 (통합 posts 시스템 사용)
// 이 파일은 호환성을 위해 유지되지만, 실제 타입은 types/posts.ts에서 import합니다

export type GalleryCategory = 
  | 'all'           // 전체
  | 'worship'       // 주일예배
  | 'special'       // 특별예배
  | 'sunday-school' // 교회학교
  | 'event'         // 행사
  | 'retreat'       // 수련회
  | 'other'         // 기타

// types/posts.ts에서 타입 재export
export type {
  GalleryAlbum,
  GalleryImage,
  GalleryAlbumDetail,
  GalleryAlbumsResponse,
  GalleryAlbumResponse,
} from '@/types/posts'
