'use client';

import { useEffect } from 'react';

import { Button } from '@/components';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Erro capturado:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <img src="/logo_clj.jpg" alt="Erro" className="mb-6" />

      <h1 className="mb-2 text-2xl font-semibold text-gray-800">Opa! Algo deu errado.</h1>

      <p className="mb-6 text-sm text-gray-600">
        {error.message || 'Não conseguimos processar sua solicitação.'}
      </p>

      <Button onClick={reset}>Tentar novamente</Button>
    </div>
  );
}
