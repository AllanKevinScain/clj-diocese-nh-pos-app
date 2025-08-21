'use client';

import { useSession } from 'next-auth/react';

import { Button } from '@/components';

export const NewCourse = () => {
  const session = useSession();

  if (session.data?.user.loginType === 'admin') {
    return (
      <Button isLink href="/register/course" className="w-full">
        Cadastrar curso
      </Button>
    );
  }

  return null;
};
