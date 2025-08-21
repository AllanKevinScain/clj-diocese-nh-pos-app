import { twMerge } from 'tailwind-merge';

import type { ChildrenTableInterface } from './table.type';

export const TableTag = (props: ChildrenTableInterface) => {
  return (
    <div
      className={twMerge(
        'scroll-slim',
        'overflow-auto',
        'bg-neutral-100 p-[20px]',
        'rounded-lg border border-neutral-400',
        'dark:border-neutral-700 dark:bg-neutral-700',
      )}>
      <table className={twMerge('table-auto', 'w-full', 'border-collapse')}>{props.children}</table>
    </div>
  );
};
