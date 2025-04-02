"use client";

import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { ComponentDialogInterface } from "./context";

export const ComponentDialog: React.FC<ComponentDialogInterface> = (props) => {
  const { onClose, isOpen } = props;

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>Ocorreu um erro!</DialogTitle>
      <Stack flexDirection="column">
        <Typography>Ta dando BO</Typography>
        <Stack>
          <Button>OK</Button>
          <Button>Fechar</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};
