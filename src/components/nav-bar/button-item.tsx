'use client';

import Link, { useLinkStatus } from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

import { Button } from '../button';
interface ButtonItemInterface {
  children: React.ReactNode;
  isLink?: boolean;
  href?: string;
  click?: () => void;
  ended?: () => void;
}

const LinkItem = (props: Pick<ButtonItemInterface, 'children' | 'ended'>) => {
  const { children, ended } = props;
  const isLoading = useLinkStatus();
  const [isPending, setIsPending] = useState(false);

  const callback = useCallback(() => {
    if (isLoading.pending) {
      setIsPending(true);
    }

    if (isPending && !isLoading.pending) {
      ended?.();
    }
  }, [ended, isLoading, isPending]);

  useEffect(() => {
    callback();
  }, [callback]);

  return (
    <Button variant="ghost" className={twMerge('w-full', 'justify-start')}>
      {isLoading.pending ? <FaSpinner className="animate-spin" /> : children}
    </Button>
  );
};

export const ButtonItem = (props: ButtonItemInterface) => {
  const { children, click, isLink, href = '#', ended } = props;

  if (isLink) {
    return (
      <Link href={href} onClick={click}>
        <LinkItem ended={ended}>{children}</LinkItem>
      </Link>
    );
  }

  return (
    <Button variant="ghost" className={twMerge('w-full', 'justify-start')} onClick={click}>
      {children}
    </Button>
  );
};
