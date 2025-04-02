"use client";

import { Button, Drawer as MUIDrawer } from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { DrawerList } from "./list-drawer";

export interface DrawerInterface {
  isOpen: boolean;
  onClose: () => void;
}

export const Drawer: React.FC<DrawerInterface> = (props) => {
  const { isOpen, onClose } = props;
  const navigate = useRouter();

  function handleNavigate(path: string) {
    if (location?.pathname === path) return;

    navigate.push(path);
  }

  return (
    <MUIDrawer open={isOpen} onClose={onClose} sx={{ position: "relative" }}>
      <DrawerList onClose={onClose} handleNavigate={handleNavigate} />
      <Button
        onClick={() => signOut()}
        sx={{ bottom: "5%", position: "absolute", width: "100%" }}
      >
        Sair
      </Button>
    </MUIDrawer>
  );
};
