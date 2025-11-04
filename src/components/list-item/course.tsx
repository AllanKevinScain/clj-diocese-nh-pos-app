'use client';

import dayjs from 'dayjs';
import { TbCircleNumber1Filled, TbCircleNumber2Filled } from 'react-icons/tb';
import { twMerge } from 'tailwind-merge';

import type { CourseInferType } from '@/yup';

import { Button } from '../button';
import { Text } from '../text';

type SomePropsCourseInferType = Partial<
  Pick<CourseInferType, 'courseNumber' | 'startDate' | 'endDate' | 'typeOfCourse'>
>;

interface CourseListItemInterface extends SomePropsCourseInferType {
  href: string;
  disabled?: boolean;
}

export const CourseListItem = (props: CourseListItemInterface) => {
  const { courseNumber, startDate, endDate, href, disabled = false, typeOfCourse } = props;

  const existsDates = startDate && endDate;
  const iconsStyle = twMerge('text-neutral-500', 'dark:text-neutral-300');

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
          {typeOfCourse === 'POSl' && <TbCircleNumber1Filled size={24} className={iconsStyle} />}
          {typeOfCourse === 'POSll' && <TbCircleNumber2Filled size={24} className={iconsStyle} />}
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
