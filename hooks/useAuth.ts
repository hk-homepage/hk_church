"use client"

import { useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"

export interface User {
  name?: string
  userId?: string
}

// 데이터 페칭 함수 분리
async function fetchUser(): Promise<User | null> {
  const supabase = createClient()
  const { data: { user: authUser } } = await supabase.auth.getUser()
  
  if (!authUser) return null
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('name, user_id')
    .eq('id', authUser.id)
    .single()
  
  if (!profile) return null
  
  return {
    name: profile.name || undefined,
    userId: profile.user_id || undefined,
  }
}

export function useAuth() {
  const queryClient = useQueryClient()
  
  // React Query로 데이터 페칭
  const query = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 메모리 유지
    retry: 1, // 실패 시 1번만 재시도
    refetchOnWindowFocus: true, // 창 포커스 시 자동 리페치
    refetchOnReconnect: true, // 재연결 시 자동 리페치
  })

  // 인증 상태 변경 감지
  useEffect(() => {
    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // 인증 상태 변경 시 캐시 무효화하여 자동 리페치
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
          queryClient.invalidateQueries({ queryKey: ['auth', 'user'] })
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [queryClient])

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch, // 수동 리페치 함수
  }
}
