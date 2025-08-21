'use client';

import { useSession } from 'next-auth/react';
import { BiPlus } from 'react-icons/bi';

import { Button } from '@/components';

interface NewTodoInterface {
  href: string;
  content: React.ReactNode;
}

export const NewTodo = (props: NewTodoInterface) => {
  const { href, content } = props;
  const session = useSession();

  if (session.data?.user.loginType === 'admin') {
    return (
      <Button isLink href={href} className="w-full">
        {content} <BiPlus />
      </Button>
    );
  }

  return null;
};
