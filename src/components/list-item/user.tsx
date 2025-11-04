'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import type { UserSchemaInferType } from '@/yup';

import { Heading } from '../heading';
import { Text } from '../text';

type SomePropsUserSchemaInferType = Pick<
  UserSchemaInferType,
  'coName' | 'loginType' | 'name' | 'active'
>;
interface UserListItemInterface extends SomePropsUserSchemaInferType {
  href: string;
}

export const UserListItem = (props: UserListItemInterface) => {
  const { coName, loginType, name, href, active } = props;

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
        <Text>{coName}</Text>
        <div className="flex justify-between">
          <Text as="b">{loginType}</Text>
          {!active && <b className="!font-bold text-red-500">Inativo</b>}
        </div>
      </div>
    </Link>
  );
};
