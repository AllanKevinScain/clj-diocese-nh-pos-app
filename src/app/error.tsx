'use client';

import { signOut } from 'next-auth/react';
import { useCallback, useEffect } from 'react';

import { Button } from '@/components';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Erro capturado:', error);
  }, [error]);

  const conunter = useCallback(() => {
    if (window.localStorage.getItem('errorCounts')) {
      const count = Number(window.localStorage.getItem('errorCounts'));
      if (count >= 3) {
        window.localStorage.removeItem('errorCounts');
        return signOut();
      }

      window.localStorage.setItem('errorCounts', String(count + 1));
      return reset();
    }

    window.localStorage.setItem('errorCounts', '1');

    reset();
  }, [reset]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <img src="/logo_clj.jpg" alt="Erro" className="mb-6" />

      <h1 className="mb-2 text-2xl font-semibold text-gray-800">Opa! Algo deu errado.</h1>

      <p className="mb-6 text-sm text-gray-600">
        {error.message || 'Não conseguimos processar sua solicitação.'}
      </p>

      <Button onClick={conunter} className="w-1/2 justify-center">
        Tentar novamente
      </Button>
    </div>
  );
}
