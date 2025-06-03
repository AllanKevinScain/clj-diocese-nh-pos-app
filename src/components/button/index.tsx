'use client';

import { Button as HButton } from '@headlessui/react';
import type { ButtonHTMLAttributes } from 'react';
import { FiLoader } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  loading?: boolean;
}

export function Button(props: ButtonProps) {
  const { children, loading, variant = 'solid', ...restProps } = props;
  const baseClasses = twMerge(
    'cursor-pointer',
    'py-3 px-4 rounded-md font-medium transition w-full text-center',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  );

  const variants = {
    solid: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-blue-600 hover:bg-blue-50',
  };

  return (
    <HButton
      {...restProps}
      disabled={loading || props.disabled}
      className={twMerge(baseClasses, variants[variant])}>
      {loading && <FiLoader className="h-5 w-5 animate-spin" />}
      {!loading && children}
    </HButton>
  );
}
