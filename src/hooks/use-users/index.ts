'use client';

import { useMutation } from '@tanstack/react-query';

import { changeStatusUser, registerUser, updateUser, updateUserPassword } from './crud';
import { listParishes, listUsers } from './listners';

export function useUsers() {
  const mutationRegisterUser = useMutation({
    mutationKey: ['registerUser'],
    mutationFn: registerUser,
  });

  const mutationUpdateUser = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: updateUser,
  });

  const mutationChangeStatusUser = useMutation({
    mutationKey: ['changeStatusUser'],
    mutationFn: changeStatusUser,
  });

  const mutationUpdateUserPassword = useMutation({
    mutationKey: ['updateUserPassword'],
    mutationFn: updateUserPassword,
  });

  return {
    listUsers,
    listParishes,
    registerUser: mutationRegisterUser,
    updateUser: mutationUpdateUser,
    changeStatusUser: mutationChangeStatusUser,
    updateUserPassword: mutationUpdateUserPassword,
  };
}
