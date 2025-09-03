'use client';

import { useContext } from 'react';
import { twMerge } from 'tailwind-merge';

import { TabContext } from '@/providers/tab';

import { Button } from '../button';

interface HeaderItemInterface {
  value: number;
  label: string;
}

export const HeaderItem = (props: HeaderItemInterface) => {
  const { value, label } = props;
  const { changeTab, activeTab } = useContext(TabContext);

  return (
    <Button
      className={twMerge(
        'w-full',
        activeTab === value && 'bg-blue-700 dark:bg-blue-300 dark:text-neutral-700',
      )}
      onClick={() => changeTab(value)}>
      {label}
    </Button>
  );
};
