'use client';

import { Button as HButton } from '@headlessui/react';
import type { ButtonHTMLAttributes } from 'react';
import { FiLoader } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export function Button(props: ButtonProps) {
  const {
    children,
    isLoading = false,
    variant = 'solid',
    className,
    type = 'button',
    ...restProps
  } = props;

  return (
    <HButton
      {...restProps}
      type={type}
      disabled={isLoading || props.disabled}
      className={twMerge(
        'w-full rounded-md px-4 py-3 text-center font-medium transition',
        'disabled:opacity-50',
        'flex items-center justify-between',
        'cursor-pointer',
        variant === 'solid' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'outline' && 'border border-blue-600 text-blue-600 hover:bg-blue-50',
        variant === 'ghost' && 'text-blue-600 hover:bg-blue-50',
        className,
      )}>
      {isLoading && <FiLoader className="h-5 w-5 animate-spin" />}
      {children}
    </HButton>
  );
}
