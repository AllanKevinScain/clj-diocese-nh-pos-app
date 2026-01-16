'use client';

import Link from 'next/link';
import type { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { LinkButton } from './link';
import { LoadingButton } from './loading';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  isLink?: boolean;
  href?: string;
  isLoading?: boolean;
}

export function Button(props: ButtonProps) {
  const {
    children,
    isLoading = false,
    variant = 'solid',
    className,
    type = 'button',
    isLink = false,
    href = '#',
    ...restProps
  } = props;

  if (isLink) {
    return (
      <Link
        href={href}
        className={twMerge((isLoading || restProps.disabled) && 'pointer-events-none')}>
        <LinkButton variant={variant} disabled={restProps.disabled} className={className}>
          {children}
        </LinkButton>
      </Link>
    );
  }

  return (
    <button
      {...restProps}
      type={type}
      disabled={isLoading || restProps.disabled}
      className={twMerge(
        'h-[50px] w-fit rounded-md px-[12px]',
        'transition-all',
        'disabled:opacity-50',
        'flex items-center justify-center gap-[6px]',
        'cursor-pointer',
        'relative',
        'overflow-hidden',
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
        className,
        isLoading && 'pointer-events-none flex-row items-center justify-center',
      )}>
      {children}
      {isLoading && <LoadingButton />}
    </button>
  );
}
