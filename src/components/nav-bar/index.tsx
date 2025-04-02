"use client";

import {
  AppBar,
  Avatar,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";

import { Drawer } from "./drawer";

export const NavBar: React.FC = () => {
  const [openDrwaer, setOpenDrawer] = useState(false);

  function toggleDrawer() {
    setOpenDrawer((s) => !s);
  }

  async function onLogout() {
    await signOut({ callbackUrl: "/" });
  }

  return (
    <>
      <Drawer isOpen={openDrwaer} onClose={toggleDrawer} />
      <AppBar position="static" sx={{ mb: "2%" }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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

            <Tooltip title="Open settings">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={onLogout}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="https://cljdiocesenh.com.br/wp-content/uploads/2022/10/screenshot.1698-407x270.jpg"
                />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
