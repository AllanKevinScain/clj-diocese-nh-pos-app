'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { Text } from '../text';

interface CourseListItemInterface {
  courseNumber?: string;
  startDate?: string;
  endDate?: string;
  href: string;
}

export const CourseListItem = (props: CourseListItemInterface) => {
  const { courseNumber, startDate, endDate, href } = props;

  const existsDates = startDate && endDate;

  return (
    <Link href={href}>
      <div
        className={twMerge(
          'relative',
          'bg-neutral-300 p-4',
          'rounded-xl border border-neutral-700',
          'shadow-sm',
          'dark:border-neutral-300 dark:bg-neutral-700',
          'dark:active:bg-neutral-500',
        )}>
        <div className="flex items-center justify-between gap-[12px]">
          <Text>Curso Nº {courseNumber}</Text>
          {existsDates && (
            <Text>
              {dayjs(startDate).format('DD/MM/YYYY')} - {dayjs(endDate).format('DD/MM/YYYY')}
            </Text>
          )}
        </div>
      </div>
    </Link>
  );
};
