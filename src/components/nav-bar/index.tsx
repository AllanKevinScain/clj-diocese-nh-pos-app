"use client";

import { AppBar, Container, Toolbar } from "@mui/material";

import { Drawer } from "./drawer";
import { LogoutMenu } from "./menu";

interface NavBarInterface {
  showMenu?: boolean;
  showDrawer?: boolean;
}

export function NavBar(props: NavBarInterface) {
  const { showDrawer = true, showMenu = true } = props;

  return (
    <AppBar position="static" sx={{ mb: "2%" }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {showDrawer && <Drawer />}

          {showMenu && <LogoutMenu />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
