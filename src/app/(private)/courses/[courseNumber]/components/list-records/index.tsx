'use client';

import { List, ListItem, Typography } from '@mui/material';
import { FaClipboardList } from 'react-icons/fa';
import { RiEdit2Fill } from 'react-icons/ri';

import type { InfertypePoslSchema } from '../../client-page';

interface ListRecordsInterface {
  records: InfertypePoslSchema[];
}

export const ListRecords = (props: ListRecordsInterface) => {
  const { records } = props;

  return (
    <List
      dense={true}
      subheader={
        <Typography variant="h2" className="!text-[30px]">
          Fixas de curso
        </Typography>
      }>
      {records.map((record) => (
        <ListItem
          component="a"
          disablePadding
          key={record.id}
          className="flex w-full items-center !justify-between border-b py-[10px] last:border-b-0"
          href={`/record/pos-l/view?id=${record.id}`}>
          <div className="flex items-center gap-[8px]">
            <FaClipboardList size={24} color="gray" />
            <Typography color="gray" fontSize={18}>
              {record.candidateName} ({record.nickname})
            </Typography>
          </div>

          <RiEdit2Fill size={24} color="gray" />
        </ListItem>
      ))}
    </List>
  );
};
