'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { HiArrowUturnLeft } from 'react-icons/hi2';

import type { ActionButtonTypes } from '@/components';
import { AcceptModal, ControlButtons } from '@/components';
import { useCourses, useToggleModal } from '@/hooks';

interface CoursesBottomBarInterface {
  courseId: string;
}

export const CoursesBottomBar = (props: CoursesBottomBarInterface) => {
  const { courseId } = props;
  const { data } = useSession();
  const navigate = useRouter();
  const { isOpen, handle } = useToggleModal();
  const { deleteCourse } = useCourses();

  const isAdmin = data?.user.loginType === 'admin';

  const actionForAdmin: ActionButtonTypes[] = [
    {
      label: 'Editar curso',
      icon: <BiEdit size={40} />,
      url: `/edit/course/${courseId}`,
      click: () => {},
    },
    {
      label: 'Excluir curso',
      icon: <BiTrash size={40} />,
      url: '',
      click: () => handle(),
    },
  ];

  const actionButtons = [
    ...(isAdmin ? actionForAdmin : []),
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
