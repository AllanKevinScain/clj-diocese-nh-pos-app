'use client';

import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

interface LoadingInterface {
  message?: string;
  overlay?: boolean;
}

export const Loading = (props: LoadingInterface) => {
  const { message = 'Carregando...', overlay = true } = props;

  return (
    <div
      role="status"
      aria-live="polite"
      className={twMerge(
        overlay
          ? 'fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm'
          : 'flex items-center justify-center p-4',
      )}>
      <div className="flex w-full max-w-xs flex-col items-center gap-4 rounded-2xl bg-white/90 p-6 text-center">
        <FaSpinner
          className={twMerge('animate-spin text-5xl text-black', 'dark:text-neutral-500')}
          aria-hidden
        />

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
};
