"use client";

import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";

import { drawerItems } from "@/constants";

import { DrawerInterface } from ".";

interface DrawerListInterface extends Pick<DrawerInterface, "onClose"> {
  handleNavigate: (v: string) => void;
}

export const DrawerList: React.FC<DrawerListInterface> = (props) => {
  const { onClose = () => null, handleNavigate = () => null } = props;

  return (
    <Stack
      flexDirection="column"
      sx={{ width: 250 }}
      role="presentation"
      spacing="8px"
      pt="8px"
      onClick={onClose}
    >
      <Avatar
        src="/logo_clj.jpg"
        alt="Logo CLJ"
        sx={{
          width: 56,
          height: 56,
          border: "1px solid black",
          alignSelf: "center",
        }}
      />
      <Divider />
      <List>
        {drawerItems.map(({ id, content, Icon, path }) => (
          <ListItem key={id} disablePadding>
            <ListItemButton onClick={() => handleNavigate(path)}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={content} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};
