'use client';

import { LoginForm } from '@/features/auth/components/LoginForm';
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { useGoogleLoginCallback } from '@/features/auth/api/auth.api';

function LoginContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { mutate: handleGoogleCallback, isPending } = useGoogleLoginCallback();

  useEffect(() => {
    if (token) {
      handleGoogleCallback(token);
    }
  }, [token, handleGoogleCallback]);

  if (isPending || token) {
    return <div className="text-center text-slate-500">Авторизація через Google...</div>;
  }

  return <LoginForm />;
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Suspense fallback={<div className="text-slate-500">Завантаження...</div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}