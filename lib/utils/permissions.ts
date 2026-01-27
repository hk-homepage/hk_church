import { getCurrentUser } from '@/app/actions/auth'

export type UserRole = 'admin' | 'member' | 'guest'

export interface User {
  id: string
  email: string
  userId?: string
  name?: string
  role: UserRole
  status?: string
  phone?: string
}

/**
 * 사용자가 관리자인지 확인
 */
export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin' || false
}

/**
 * 공지사항 작성 권한 확인 (관리자만)
 */
export function canCreateNotice(user: User | null): boolean {
  return isAdmin(user)
}

/**
 * 공지사항 수정 권한 확인 (관리자만)
 */
export function canEditNotice(user: User | null): boolean {
  return isAdmin(user)
}

/**
 * 공지사항 삭제 권한 확인 (관리자만)
 */
export function canDeleteNotice(user: User | null): boolean {
  return isAdmin(user)
}

/**
 * 서버 컴포넌트에서 현재 사용자 정보 가져오기
 */
export async function getCurrentUserForServer() {
  return await getCurrentUser()
}
