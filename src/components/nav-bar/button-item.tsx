'use client';

import { twMerge } from 'tailwind-merge';

import { Button } from '../button';
interface ButtonItemInterface {
  children: React.ReactNode;
  navigate: () => void;
}

export const ButtonItem = (props: ButtonItemInterface) => {
  const { children, navigate } = props;

  return (
    <Button variant="ghost" className={twMerge('w-full', 'justify-start')} onClick={navigate}>
      {children}
    </Button>
  );
};
