'use client';

import { Button } from '@/components';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="mb-2 text-2xl font-semibold text-gray-800">Página não encontrada</h1>

      <p className="mb-6 text-sm text-gray-600">
        A página que você está procurando não existe ou foi removida.
      </p>

      <Button isLink href="/">
        Voltar para a Home
      </Button>
      <img src="/page_not_found.png" alt="Página não encontrada" className="mb-6 max-w-[40vw]" />
    </div>
  );
}
