import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type DivProps = ComponentProps<'div'>;

export const Container = (props: DivProps) => {
  const { className, children, ...restProps } = props;
  return (
    <div
      {...restProps}
      className={twMerge(
        'px-[16px] py-[16px] pb-[10%]',
        'min-h-[90vh]',
        'bg-gray-50',
        'dark:bg-neutral-600',
        className,
      )}>
      {children}
    </div>
  );
};
