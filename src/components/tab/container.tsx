'use client';

import type { ReactNode } from 'react';
import React, { Children } from 'react';

import { TabProvider } from '@/providers/tab';

interface ContainerInterface {
  children: ReactNode;
}

export const Container = ({ children }: ContainerInterface) => {
  const childBody = Children.toArray(children).find((child) => {
    if (!React.isValidElement(child)) return false;
    if (typeof child.type === 'function') {
      return (child.type as React.ComponentType<unknown>).name === 'Body';
    }
    return false;
  });
  const childHeader = Children.toArray(children).find((child) => {
    if (!React.isValidElement(child)) return false;
    if (typeof child.type === 'function') {
      return (child.type as React.ComponentType<unknown>).name === 'Header';
    }
    return false;
  });

  return (
    <TabProvider>
      <div className="flex w-full flex-col gap-[12px]">
        <div className="flex w-full">{childHeader}</div>
        <div className="flex w-full">{childBody}</div>
      </div>
    </TabProvider>
  );
};
