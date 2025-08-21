import { twMerge } from 'tailwind-merge';

import type { ChildrenTableInterface } from './table.type';

export const Th = (props: ChildrenTableInterface) => {
  return (
    <th
      className={twMerge(
        'px-4 py-2',
        'text-left text-sm font-semibold whitespace-nowrap text-neutral-700',
        'dark:text-neutral-300',
      )}>
      {props.children}
    </th>
  );
};
