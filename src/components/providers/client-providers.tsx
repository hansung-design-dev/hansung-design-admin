'use client';

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { MenuProvider } from '@/components/providers/menu-provider';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  // React Query 클라이언트 생성 - 컴포넌트 내부에서 생성하여 SSR 문제 방지
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1분
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <MenuProvider>{children}</MenuProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
