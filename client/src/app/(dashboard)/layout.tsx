'use client';

import { useAuthStore } from '@/entities/user/model/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push('/login');
  }, [token, router]);

  if (!token) return null;

  return <>{children}</>;
}
