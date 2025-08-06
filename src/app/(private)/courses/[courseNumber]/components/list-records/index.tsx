'use client';

import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useMemo } from 'react';
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
  typeOfRecord: RecordType;
}

export const ListRecords = (props: ListRecordsInterface) => {
  const { records, courseNumber, typeOfRecord } = props;

  const recordsCandidate = useMemo(() => {
    const filtered = records?.filter(
      (record) => record.typeOfRecord === 'POSll' || record.typeOfRecord === 'POSl',
    );
    return filtered;
  }, [records]);

  const recordsWork = useMemo(() => {
    const filtered = records?.filter((record) => record.typeOfRecord === 'WORK');
    return filtered;
  }, [records]);

  const recordsCouple = useMemo(() => {
    const filtered = records?.filter((record) => record.typeOfRecord === 'COUPLE_WORK');
    return filtered;
  }, [records]);

  return (
    <div className="w-full">
      <h1 className="mb-4 text-2xl font-bold">Fixas de curso {courseNumber}</h1>

      {/* Cursistas */}
      <div className="mb-4">
        <h3 className="text-lg font-bold">Cursistas:</h3>

        {!isEmpty(recordsCandidate) && (
          <ul className="divide-y">
            {recordsCandidate?.map((record) => (
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
        )}
        <Link
          href={`/record/${typeOfRecord.toLocaleLowerCase()}/register?courseNumber=${courseNumber}`}>
          <Button className="h-[40px]">
            <BiPlus />
            Criar ficha para cursista
          </Button>
        </Link>
      </div>

      {/* Equipde de trabalho */}
      <div className="mb-4">
        <h3 className="text-lg font-bold">Equipe de trabalho:</h3>

        {!isEmpty(recordsWork) && (
          <ul className="divide-y">
            {recordsWork?.map((record) => (
              <li key={record.id}>
                <a
                  href={`/record/work/view?id=${record.id}`}
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
        )}
        <Link href={`/record/work/register?courseNumber=${courseNumber}`}>
          <Button className="h-[40px]">
            <BiPlus />
            Criar ficha de trabalho
          </Button>
        </Link>
      </div>

      {/* Casal */}
      <div className="mb-4">
        <h3 className="mb-4 text-lg font-bold">Casais:</h3>

        {!isEmpty(recordsCouple) && (
          <ul className="divide-y">
            {recordsCouple?.map((record) => (
              <li key={record.id}>
                <a
                  href={`/record/couple-work/view?id=${record.id}`}
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
        )}

        <Link href={`/record/couple-work/register?courseNumber=${courseNumber}`}>
          <Button className="h-[40px]">
            <BiPlus />
            Criar ficha para casal
          </Button>
        </Link>
      </div>
    </div>
  );
};
