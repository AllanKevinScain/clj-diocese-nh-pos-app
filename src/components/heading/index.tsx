'use client';

import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type DivProps = Pick<ComponentProps<'div'>, 'className'>;

interface HeadingInterface extends DivProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
}

export const Heading = (props: HeadingInterface) => {
  const { as = 'h1', children, className } = props;

  const comumStyles = twMerge('font-semibold text-neutral-700', 'dark:text-neutral-300', className);

  if (as === 'h2') return <h2 className={twMerge('text-2xl', comumStyles)}>{children}</h2>;
  if (as === 'h3') return <h3 className={twMerge('text-xl', comumStyles)}>{children}</h3>;
  if (as === 'h4') return <h4 className={twMerge('text-lg', comumStyles)}>{children}</h4>;
  if (as === 'h5') return <h5 className={twMerge('text-md', comumStyles)}>{children}</h5>;
  if (as === 'h6') return <h6 className={twMerge('text-sm', comumStyles)}>{children}</h6>;

  return <h1 className={twMerge('text-3xl', comumStyles)}>{children}</h1>;
};
