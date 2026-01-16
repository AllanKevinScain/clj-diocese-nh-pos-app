'use client';

import { isEmpty } from 'lodash';
import { twMerge } from 'tailwind-merge';

import { Button } from '../button';

export type ActionButtonTypes = {
  label: string;
  icon: React.JSX.Element;
  url?: string;
  click?: () => void;
  isLoading?: boolean;
};

interface ControlButtonsInterface {
  buttons: ActionButtonTypes[];
}

export const ControlButtons = (props: ControlButtonsInterface) => {
  const { buttons } = props;

  return (
    <div className={twMerge('fixed bottom-0 left-0 w-full', 'flex', 'z-[1]')}>
      {buttons.map((action) => {
        const content = (
          <div
            className={twMerge(
              'flex items-center justify-center',
              'text-center text-sm font-semibold',
              'w-full px-4 py-2',
              'cursor-pointer',
              'sm:gap-8 sm:text-base',
            )}>
            <span className={twMerge('hidden', 'sm:inline')}>{action.label}</span>
            {action.icon}
          </div>
        );

        return (
          <div key={action.label} className="w-full">
            {!isEmpty(action.url) && (
              <Button
                isLink
                href={action.url}
                isLoading={action.isLoading}
                className="h-[70px] w-full rounded-none">
                {content}
              </Button>
            )}
            {isEmpty(action.url) && (
              <Button
                onClick={action.click}
                isLoading={action.isLoading}
                className="h-[70px] w-full rounded-none">
                {content}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};
