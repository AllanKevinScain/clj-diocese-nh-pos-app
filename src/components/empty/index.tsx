import { FaSadCry } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

import { Button } from '../button';
import { Heading } from '../heading';

interface EmptyInterface {
  className?: string;
  title: string;
  handleClick?: () => void;
}

export const Empty = (props: EmptyInterface) => {
  const { title, className, handleClick } = props;
  return (
    <div className={twMerge('flex flex-col items-center justify-center', 'w-full', className)}>
      <FaSadCry size={45} />
      <Heading as="h3">{title}</Heading>
      {handleClick && <Button onClick={handleClick}>Limpar filtros</Button>}
    </div>
  );
};
