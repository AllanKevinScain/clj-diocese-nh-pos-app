'use client';

import { useLinkStatus } from 'next/link';
import { FiLoader } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

import type { ButtonProps } from '.';

export function LinkButton(props: ButtonProps) {
  const { children, variant = 'solid', className, disabled = false } = props;
  const loadingLink = useLinkStatus();

  return (
    <div
      className={twMerge(
        'h-full min-h-[50px] w-full px-[12px]',
        'transition-all',
        'rounded-md',
        'flex items-center justify-center gap-[6px]',
        'cursor-pointer',
        variant === 'solid' &&
          twMerge(
            'bg-neutral-700 text-white',
            'active:bg-neutral-900',
            'dark:bg-neutral-900 dark:text-neutral-200',
            'dark:active:bg-neutral-700',
          ),
        variant === 'outline' &&
          twMerge(
            'border border-neutral-700 text-neutral-700',
            'active:bg-neutral-900 active:text-neutral-300',
            'dark:border-neutral-400 dark:text-neutral-400',
            'dark:active:border-neutral-700 dark:active:bg-neutral-700',
          ),
        variant === 'ghost' &&
          twMerge(
            'text-neutral-700',
            'active:bg-neutral-400 active:text-neutral-900',
            'dark:text-neutral-400',
            'active:text-neutral-300 dark:active:bg-neutral-700',
          ),
        disabled && 'opacity-75',
        className,
        loadingLink.pending && 'pointer-events-none flex-row items-center justify-center',
      )}>
      {loadingLink.pending ? <FiLoader className="h-5 w-5 animate-spin" /> : children}
    </div>
  );
}
