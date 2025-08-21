import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type TrProps = ComponentProps<'tr'>;

export const Tr = (props: TrProps) => {
  return (
    <tr
      {...props}
      className={twMerge(
        'border-b border-neutral-300 not-odd:bg-gray-200',
        'dark:not-odd:bg-neutral-600',
        props.className,
      )}>
      {props.children}
    </tr>
  );
};
