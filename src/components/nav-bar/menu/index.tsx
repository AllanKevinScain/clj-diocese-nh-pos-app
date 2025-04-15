"use client";

import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface LogoutMenuInterface {
  showMenu?: boolean;
}

export const LogoutMenu = (props: LogoutMenuInterface) => {
  const { showMenu = true } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  async function onLogout() {
    await signOut({ callbackUrl: "/" });
  }

  const options = [{ id: "logout", content: "Sair", onClick: onLogout }];

  if (!showMenu) return null;

  return (
    <div>
      <Tooltip title="Menu de perfil">
        <IconButton
          size="large"
          aria-label="account of current user"
          color="inherit"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Avatar
            alt="Remy Sharp"
            src="https://cljdiocesenh.com.br/wp-content/uploads/2022/10/screenshot.1698-407x270.jpg"
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => {
              item.onClick();
              handleClose();
            }}
          >
            {item.content}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
