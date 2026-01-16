'use client';

import { useSession } from 'next-auth/react';
import { BiPlus } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/components';

interface NewTodoInterface {
  href: string;
  content: React.ReactNode;
  className?: string;
}

export const NewTodo = (props: NewTodoInterface) => {
  const { href, content, className } = props;
  const session = useSession();

  if (session.data?.user.loginType === 'admin') {
    return (
      <Button isLink href={href} className={twMerge('w-full', className)}>
        {content} <BiPlus />
      </Button>
    );
  }

  return null;
};
