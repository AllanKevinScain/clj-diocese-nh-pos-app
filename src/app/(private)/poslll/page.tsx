'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import { TbLoaderQuarter } from 'react-icons/tb';
import { twMerge } from 'tailwind-merge';
import type { InferType } from 'yup';

import { useCreateQuery, usePoslll } from '@/hooks';
import type { poslllSchema } from '@/yup';

import { NewCourse } from './components';

type PoslllSchemaInferType = InferType<typeof poslllSchema>;

export default function PosCLJlllPage() {
  const { listPoslll } = usePoslll();

  const { data, isLoading } = useCreateQuery<PoslllSchemaInferType[]>({
    queryKey: ['listPoslll'],
    queryFn: listPoslll,
    onError: (error) => {
      toast.error(String(error.data?.message));
    },
  });

  const isEmptyPoslll = data && data.length === 0 && !isLoading;

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <TbLoaderQuarter size={30} className="animate-spin" />
      </div>
    );
  }

  if (isEmptyPoslll) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-2">
        <h2 className="text-center text-2xl font-semibold">Nenhum CLJ lll foi cadastrado!</h2>
        <NewCourse />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-lg px-4 pb-[10%]">
      <h1 className="mt-6 mb-4 text-3xl font-bold">Cursos</h1>

      <div className="space-y-6">
        {data?.map((pos) => (
          <Link key={pos.id} href={`/edit/poslll/${pos.id}`} className="flex">
            <span
              className={twMerge(
                'w-full cursor-pointer p-4 shadow-sm',
                'hover:shadow-md',
                'rounded-lg border',
                'text-lg font-medium',
              )}>
              {pos.candidateName}
            </span>
          </Link>
        ))}

        <div className="pt-4 text-center">
          <NewCourse />
        </div>
      </div>
    </div>
  );
}
