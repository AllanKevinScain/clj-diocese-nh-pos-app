'use client';

import { FaClipboardList } from 'react-icons/fa';
import { RiEdit2Fill } from 'react-icons/ri';

import type { InfertypePoslSchema } from '../../client-page';

interface ListRecordsInterface {
  records: InfertypePoslSchema[];
}

export const ListRecords = ({ records }: ListRecordsInterface) => {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-bold">Fixas de curso</h2>

      <ul className="divide-y">
        {records.map((record) => (
          <li key={record.id}>
            <a
              href={`/record/pos-l/view?id=${record.id}`}
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
