'use client';

import { useRouter } from 'next/navigation';
import { TbLoaderQuarter } from 'react-icons/tb';
import type { InferType } from 'yup';

import { useCreateQuery, useUsers } from '@/hooks';
import type { userSchema } from '@/yup/user-schema';

type UserSchemaInferType = InferType<typeof userSchema>;

export default function UserClientPage() {
  const navigate = useRouter();
  const { listUsers } = useUsers();

  const { data, isLoading } = useCreateQuery<UserSchemaInferType[]>({
    queryKey: ['users'],
    queryFn: listUsers,
  });

  const isEmptyUsers = data?.length === 0 && !isLoading;

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <TbLoaderQuarter size={30} className="animate-spin text-gray-600" />
      </div>
    );
  }

  if (isEmptyUsers) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-2 px-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Nenhum usuário foi cadastrado!</h2>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-lg px-4 pb-[10%]">
      <h2 className="mt-6 mb-4 text-2xl font-bold text-gray-900">Usuários</h2>

      <div className="grid grid-cols-1 gap-4">
        {data?.map((user) => (
          <div
            key={user.id}
            onClick={() => navigate.push(`/edit/user/${user.id}`)}
            className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg">
            <h3 className="text-lg font-semibold text-blue-600">{user.name}</h3>
            <p className="truncate text-gray-700">{user.city}</p>
            <p className="font-medium text-blue-600 uppercase">{user.loginType}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
