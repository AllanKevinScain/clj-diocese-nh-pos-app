"use client";

import { IconButton, List, ListItem, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FaClipboardList } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";

const records = [{ id: "123", label: "Curso de fulano" }];

export const ListRecords = () => {
  const navigate = useRouter();

  return (
    <List dense={true}>
      {records.map((record) => (
        <ListItem
          disablePadding
          key={record.id}
          sx={{
            display: "flex",
            direction: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: "45px",
          }}
        >
          <Stack direction="row" gap={1} alignItems="center">
            <FaClipboardList size={24} color="gray" />
            <Typography color="gray" fontSize={18}>
              {record.label}
            </Typography>
          </Stack>

          <Stack direction="row" gap="8px" alignItems="center">
            <IconButton
              edge="end"
              aria-label="editar"
              onClick={() =>
                navigate.push(`/public/courses/${123}/edit-pos-l/${record.id}`)
              }
            >
              <RiEdit2Fill size={24} color="gray" />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="visualizar"
              onClick={() =>
                navigate.push(`/public/courses/${123}/view-pos-l/${record.id}`)
              }
            >
              <FaEye size={24} color="gray" />
            </IconButton>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
};
