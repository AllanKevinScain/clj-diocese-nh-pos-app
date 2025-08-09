'use client';

import React from 'react';
import { FaSpinner } from 'react-icons/fa';

interface LoadingProps {
  message?: string;
  overlay?: boolean;
}

export default function Loading({ message = 'Carregando...', overlay = true }: LoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={
        overlay
          ? 'fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm'
          : 'flex items-center justify-center p-4'
      }>
      <div className="flex w-full max-w-xs flex-col items-center gap-4 rounded-2xl bg-white/90 p-6 text-center shadow-lg">
        <FaSpinner className="animate-spin text-5xl text-blue-600" aria-hidden />

        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-semibold text-gray-700">{message}</span>
          <div className="mt-2 flex items-center gap-2">
            <span className="h-2 w-8 animate-pulse rounded-full bg-gray-200" />
            <span className="h-2 w-8 animate-pulse rounded-full bg-gray-200 delay-75" />
            <span className="h-2 w-8 animate-pulse rounded-full bg-gray-200 delay-150" />
          </div>
        </div>
      </div>
    </div>
  );
}
