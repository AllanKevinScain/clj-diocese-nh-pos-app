'use client';

import { Button } from '@headlessui/react';
import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';

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
