"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
            gcTime: 10 * 60 * 1000, // 10분간 메모리 유지 (이전 cacheTime)
            retry: 1, // 실패 시 1번만 재시도
            refetchOnWindowFocus: true, // 창 포커스 시 자동 리페치
            refetchOnReconnect: true, // 재연결 시 자동 리페치
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}
