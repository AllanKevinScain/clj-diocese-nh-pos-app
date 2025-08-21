import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type DivProps = Pick<ComponentProps<'div'>, 'className'>;

interface TextInterface extends DivProps {
  as?: 'p' | 'span' | 'b';
  children: React.ReactNode;
}

export const Text = (props: TextInterface) => {
  const { as = 'p', children, className } = props;

  const comumStyles = twMerge('text-neutral-700', 'dark:text-neutral-300');

  if (as === 'b')
    return <b className={twMerge(comumStyles, 'font-[700]', className)}>{children}</b>;
  if (as === 'span') return <span className={twMerge(comumStyles, className)}>{children}</span>;

  return <p className={twMerge(comumStyles, className)}>{children}</p>;
};
