"use client";

import { List, ListItem, Typography } from "@mui/material";
import { FaClipboardList } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";

import { InfertypePoslSchema } from "../../client-page";

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
      }
    >
      {records.map((record) => (
        <ListItem
          component="a"
          disablePadding
          key={record.id}
          className="flex items-center !justify-between w-full py-[10px] border-b last:border-b-0"
          href={`/record/pos-l/edit`}
        >
          <div className="flex gap-[8px] items-center">
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
