'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { BiPlus } from 'react-icons/bi';

import { Button } from '@/components';

export const NewCourse = () => {
  const session = useSession();

  if (session.data?.user.loginType === 'admin') {
    return (
      <Link href="/register/poslll">
        <Button>
          Cadastrar novo CLJ lll <BiPlus />
        </Button>
      </Link>
    );
  }

  return null;
};
