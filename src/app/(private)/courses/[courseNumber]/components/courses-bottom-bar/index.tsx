'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { BiEdit, BiPlus, BiTrash } from 'react-icons/bi';
import { HiArrowUturnLeft } from 'react-icons/hi2';

import type { ActionButtonTypes } from '@/components';
import { AcceptModal, ControlButtons } from '@/components';
import { useCourses, useToggleModal } from '@/hooks';

interface CoursesBottomBarInterface {
  courseId: string;
  courseNumber: string;
}

export const CoursesBottomBar = (props: CoursesBottomBarInterface) => {
  const { courseId, courseNumber } = props;
  const { data } = useSession();
  const navigate = useRouter();
  const { isOpen, handle } = useToggleModal();
  const { deleteCourse } = useCourses();

  const isAdmin = data?.user.loginType === 'admin';

  const actionForAdmin: ActionButtonTypes[] = [
    {
      label: 'Editar curso',
      type: 'warning',
      icon: <BiEdit size={40} />,
      url: `/edit/course/${courseId}`,
      click: () => {},
    },
    {
      label: 'Excluir curso',
      type: 'error',
      icon: <BiTrash size={40} />,
      url: '',
      click: () => handle(),
    },
  ];

  const actionButtons = [
    ...(isAdmin ? actionForAdmin : []),
    {
      label: 'Criar ficha nova',
      icon: <BiPlus size={40} />,
      url: `/record/pos-l/register?courseNumber=${courseNumber}`,
      click: () => {},
    },
    {
      label: 'Voltar',
      icon: <HiArrowUturnLeft size={40} />,
      url: '',
      click: () => navigate.back(),
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
      <ControlButtons buttons={actionButtons} />
    </>
  );
};
