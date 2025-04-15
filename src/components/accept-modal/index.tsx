"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface AcceptModalInterface {
  isOpen: boolean;
  accept: () => void;
  handle: () => void;
}

export const AcceptModal = (props: AcceptModalInterface) => {
  const { isOpen, accept, handle } = props;

  return (
    <Dialog open={isOpen} onClose={handle} fullWidth maxWidth="xs">
      <DialogTitle>Deseja confirmar?</DialogTitle>
      <DialogContent>
        <Box mt={2}>Essa ação é irreversível. Tem certeza?</Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            accept();
            handle();
          }}
        >
          Sim
        </Button>
        <Button variant="outlined" onClick={handle}>
          Não
        </Button>
      </DialogActions>
    </Dialog>
  );
};
