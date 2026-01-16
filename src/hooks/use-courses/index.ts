'use client';

import { useMutation } from '@tanstack/react-query';

import { deleteCourse, registerCourse, updateCourse } from './crud';
import { listCourses } from './listners';

export function useCourses() {
  const mutationRegisterCourse = useMutation({
    mutationFn: registerCourse,
    mutationKey: ['registerCourse'],
  });

  const mutationUpdateCourse = useMutation({
    mutationFn: updateCourse,
    mutationKey: ['updateCourse'],
  });

  const mutationDeleteCourse = useMutation({
    mutationFn: deleteCourse,
    mutationKey: ['deleteCourse'],
  });

  return {
    listCourses,
    registerCourse: mutationRegisterCourse,
    updateCourse: mutationUpdateCourse,
    deleteCourse: mutationDeleteCourse,
  };
}
