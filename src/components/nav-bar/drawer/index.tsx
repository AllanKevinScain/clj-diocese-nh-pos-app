"use client";

import { Button, Drawer as MUIDrawer, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";

import { DrawerList } from "./list-drawer";

export interface DrawerInterface {
  isOpen: boolean;
  onClose: () => void;
}

export const Drawer = () => {
  const navigate = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  function toggleDrawer() {
    setOpenDrawer((s) => !s);
  }

  function handleNavigate(path: string) {
    if (location?.pathname === path) return;

    navigate.push(path);
  }

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={toggleDrawer}
      >
        <BiMenu />
      </IconButton>
      <MUIDrawer
        open={openDrawer}
        onClose={toggleDrawer}
        sx={{ position: "relative" }}
      >
        <DrawerList onClose={toggleDrawer} handleNavigate={handleNavigate} />
        <Button
          onClick={() => signOut()}
          sx={{ bottom: "5%", position: "absolute", width: "100%" }}
        >
          Sair
        </Button>
      </MUIDrawer>
    </div>
  );
};
