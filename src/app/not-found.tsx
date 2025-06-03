'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <img src="/page_not_found.png" alt="Página não encontrada" className="mb-6" />

      <h1 className="mb-2 text-2xl font-semibold text-gray-800">Página não encontrada</h1>

      <p className="mb-6 text-sm text-gray-600">
        A página que você está procurando não existe ou foi removida.
      </p>

      <button
        onClick={() => router.push('/')}
        className="rounded-md bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
        Voltar para a Home
      </button>
    </div>
  );
}
