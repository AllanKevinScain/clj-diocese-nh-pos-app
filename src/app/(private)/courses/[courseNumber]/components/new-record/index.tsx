'use client';

import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';

import { Button } from '@/components';

export const Newrecord = () => {
  return (
    <Link href="#">
      <Button>
        Cadastrar curso
        <BiPlus />
      </Button>
    </Link>
  );
};
