'use client';

import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

import { Button } from '../button';
import { Text } from '../text';

interface CourseListItemInterface {
  href: string;
  courseNumber?: string;
  startDate?: string;
  endDate?: string;
  disabled?: boolean;
}

export const CourseListItem = (props: CourseListItemInterface) => {
  const { courseNumber, startDate, endDate, href, disabled = false } = props;

  const existsDates = startDate && endDate;

  return (
    <Button isLink href={href} variant="ghost" className="w-full p-0" disabled={disabled}>
      <div
        className={twMerge(
          'relative',
          'cursor-pointer',
          'w-full bg-neutral-300 p-4',
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
    </Button>
  );
};
