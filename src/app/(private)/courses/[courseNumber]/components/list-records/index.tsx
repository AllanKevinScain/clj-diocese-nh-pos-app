'use client';

import { isEmpty } from 'lodash';
import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';
import { FaClipboardList } from 'react-icons/fa';
import { RiEdit2Fill } from 'react-icons/ri';

import { Button } from '@/components';
import type { RecordType } from '@/types';

interface ListRecordsInterface {
  records?: {
    id?: string;
    nickname?: string;
    candidateName?: string;
    typeOfRecord?: RecordType;
  }[];
  courseNumber: string;
  registerUrl: string;
}

export const ListRecords = (props: ListRecordsInterface) => {
  const { records, courseNumber, registerUrl } = props;

  if (isEmpty(records) && records) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-2 px-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Nenhuma ficha foi cadastrada no {courseNumber}!
        </h2>
        <Link href={registerUrl}>
          <Button>
            <BiPlus />
            Cadastrar ficha
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-bold">Fixas de curso</h2>

      <ul className="divide-y">
        {records?.map((record) => (
          <li key={record.id}>
            <a
              href={`/record/${record.typeOfRecord?.toLocaleLowerCase()}/view?id=${record.id}`}
              className="flex items-center justify-between py-3 transition hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <FaClipboardList size={24} className="text-gray-500" />
                <span className="text-base text-gray-700">
                  {record.candidateName} ({record.nickname})
                </span>
              </div>
              <RiEdit2Fill size={24} className="text-gray-500" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
