'use client';

import { isEmpty } from 'lodash';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export type ActionButtonTypes = {
  label: string;
  type?: 'error' | 'warning' | 'primary';
  icon: React.JSX.Element;
  url: string;
  click: () => void;
};

interface ControlButtonsInterface {
  buttons: ActionButtonTypes[];
}

export const ControlButtons = (props: ControlButtonsInterface) => {
  const { buttons } = props;

  return (
    <div className={twMerge('fixed bottom-0 left-0 w-full', 'flex')}>
      {buttons.map((action) => {
        const { type = 'primary' } = action;

        const content = (
          <div
            className={twMerge(
              'flex w-full items-center justify-center',
              'text-center text-sm font-semibold text-white transition-colors',
              'px-4 py-2',
              'cursor-pointer',
              'sm:gap-8 sm:text-base',
              type === 'primary' && 'bg-blue-600 hover:bg-blue-700',
              type === 'warning' && 'bg-yellow-500 hover:bg-yellow-600',
              type === 'error' && 'bg-red-500 hover:bg-red-600',
            )}>
            <span className={twMerge('hidden', 'sm:inline')}>{action.label}</span>
            {action.icon}
          </div>
        );

        return (
          <div key={action.label} className="w-full">
            {!isEmpty(action.url) ? (
              <Link href={action.url} className="block">
                {content}
              </Link>
            ) : (
              <button onClick={action.click} className="w-full">
                {content}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
