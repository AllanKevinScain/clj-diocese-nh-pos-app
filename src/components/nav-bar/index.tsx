"use client";

import { AppBar, Container, Toolbar } from "@mui/material";
import React from "react";

import { Drawer } from "./drawer";
import { LogoutMenu } from "./menu";

export async function NavBar() {
  return (
    <>
      <AppBar position="static" sx={{ mb: "2%" }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Drawer />

            <LogoutMenu />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
