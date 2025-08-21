'use client';

import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type HrProps = ComponentProps<'hr'>;

export const Divider = (props: HrProps) => {
  return (
    <hr
      {...props}
      className={twMerge('text-neutral-600', 'dark:text-neutral-300', props.className)}
    />
  );
};
