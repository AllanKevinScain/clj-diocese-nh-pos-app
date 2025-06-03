'use client';

import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';
import toast from 'react-hot-toast';
import { BiEdit, BiPlus, BiTrash } from 'react-icons/bi';
import { HiArrowUturnLeft } from 'react-icons/hi2';

import { AcceptModal } from '@/components';
import { useCourses, useToggleModal } from '@/hooks';

interface ControlButtonsInterface {
  courseId: string;
  courseNumber: string;
}

export const ControlButtons = ({ courseId, courseNumber }: ControlButtonsInterface) => {
  const { data } = useSession();
  const navigate = useRouter();
  const { isOpen, handle } = useToggleModal();
  const { deleteCourse } = useCourses();

  const isAdmin = data?.user.loginType === 'admin';

  const actionForAdmin = [
    {
      label: 'Editar curso',
      icon: <BiEdit className="ml-2" />,
      url: `/edit/course/${courseId}`,
      click: () => {},
    },
    {
      label: 'Excluir curso',
      icon: <BiTrash className="ml-2" />,
      url: '',
      click: () => handle(),
    },
  ];

  const actionButtons = [
    ...(isAdmin ? actionForAdmin : []),
    {
      label: 'Voltar',
      icon: <HiArrowUturnLeft className="ml-2" />,
      url: '',
      click: () => navigate.back(),
    },
    {
      label: 'Criar ficha nova',
      icon: <BiPlus className="ml-2" />,
      url: `/record/pos-l/register?courseNumber=${courseNumber}`,
      click: () => {},
    },
  ];

  async function deleteCourseById() {
    const response = await deleteCourse(courseId);

    if (!response?.ok) {
      toast.error(response.data.message);
    } else {
      toast.success(response.data.message);
      navigate.push('/courses');
    }
  }

  return (
    <>
      <AcceptModal isOpen={isOpen} handle={handle} accept={deleteCourseById} />

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {actionButtons.map((action) => {
          const baseStyle =
            'flex h-24 w-full items-center justify-center rounded-xl text-white font-semibold text-center text-sm sm:text-base transition-colors';

          const colorVariants = {
            primary: 'bg-blue-600 hover:bg-blue-700',
            warning: 'bg-yellow-500 hover:bg-yellow-600',
            error: 'bg-red-500 hover:bg-red-600',
          };

          const colorClass =
            colorVariants[
              (action.label.includes('Excluir')
                ? 'error'
                : action.label.includes('Editar')
                  ? 'warning'
                  : 'primary') as keyof typeof colorVariants
            ];

          const content = (
            <button onClick={action.click} className={`${baseStyle} ${colorClass}`} type="button">
              {action.label}
              {action.icon}
            </button>
          );

          return (
            <div key={action.label} className="w-full">
              {!isEmpty(action.url) ? (
                <Link href={action.url} className="block">
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
