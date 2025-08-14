import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
type TrProps = ComponentProps<'td'>;

export const Td = (props: TrProps) => {
  return (
    <td {...props} className={twMerge('px-4 py-2', 'text-sm text-gray-700', props.className)}>
      {props.children}
    </td>
  );
};
