'use client';

import { twMerge } from 'tailwind-merge';

import { useVerifyToken } from '@/hooks';

import { NavBarDrawer } from './drawer-nav-bar';

interface NavBarProps {
  showDrawer?: boolean;
}

export function NavBar({ showDrawer = true }: NavBarProps) {
  useVerifyToken();

  return (
    <header
      className={twMerge(
        'flex items-center',
        'bg-neutral-700 px-4 py-4',
        'shadow-md',
        'sticky top-0 z-[2]',
      )}>
      <NavBarDrawer showDrawer={showDrawer} />
    </header>
  );
}
