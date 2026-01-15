'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { HiArrowUturnLeft } from 'react-icons/hi2';

import type { ActionButtonTypes } from '@/components';
import { AcceptModal, ControlButtons } from '@/components';
import { useCourses, useToggleModal } from '@/hooks';
import type { ReturnHandlerApiType } from '@/types';
import type { CourseInferType } from '@/yup';

interface CoursesBottomBarInterface {
  courseId?: string;
}

export const CoursesBottomBar = (props: CoursesBottomBarInterface) => {
  const { courseId = '' } = props;
  const { data } = useSession();
  const navigate = useRouter();
  const client = useQueryClient();

  const { isOpen, handle } = useToggleModal();
  const { deleteCourse } = useCourses();

  const actionButtons = useMemo(() => {
    const baseButtons: ActionButtonTypes[] = [
      {
        label: 'Voltar',
        icon: <HiArrowUturnLeft size={40} />,
        click: () => navigate.back(),
      },
    ];
    if (data?.user.loginType === 'admin') {
      return [
        {
          label: 'Editar curso',
          icon: <BiEdit size={40} />,
          url: `/edit/course/${courseId}`,
        },
        {
          label: 'Excluir curso',
          icon: <BiTrash size={40} />,
          click: () => handle(),
        },
        ...baseButtons,
      ];
    }
    return baseButtons;
  }, [courseId, data?.user.loginType, handle, navigate]);

  async function deleteCourseById() {
    await deleteCourse.mutateAsync(courseId, {
      onSuccess: (data: ReturnHandlerApiType<CourseInferType>) => {
        toast.success(data.message);
        client.refetchQueries({ queryKey: ['cursos'] });
        navigate.push('/courses');
      },
      onError: (e) => toast.error(e.message),
    });
  }

  return (
    <>
      <AcceptModal
        isOpen={isOpen}
        handle={handle}
        accept={deleteCourseById}
        isLoading={deleteCourse.isPending}
      />
      <ControlButtons buttons={actionButtons} />
    </>
  );
};
