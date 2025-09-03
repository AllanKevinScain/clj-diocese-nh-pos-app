'use client';

import { useContext } from 'react';

import { TabContext } from '@/providers/tab';

interface BodyItemInterface {
  value: number;
  children: React.ReactNode;
}

export const BodyItem = (props: BodyItemInterface) => {
  const { children, value } = props;
  const { activeTab } = useContext(TabContext);

  if (value !== activeTab) return null;

  return <div className="flex w-full">{children}</div>;
};
