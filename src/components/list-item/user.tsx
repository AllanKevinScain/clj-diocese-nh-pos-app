'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { Heading } from '../heading';
import { Text } from '../text';

interface UserListItemInterface {
  loginType?: string;
  city?: string;
  name?: string;
  href: string;
}

export const UserListItem = (props: UserListItemInterface) => {
  const { city, loginType, name, href } = props;

  return (
    <Link href={href}>
      <div
        className={twMerge(
          'relative',
          'cursor-pointer',
          'bg-neutral-300 p-4',
          'rounded-xl border border-neutral-700',
          'shadow-sm',
          'dark:border-neutral-300 dark:bg-neutral-700',
          'dark:active:bg-neutral-500',
        )}>
        <Heading as="h3">{name}</Heading>
        <Text>{city}</Text>
        <Text as="b">{loginType}</Text>
      </div>
    </Link>
  );
};
