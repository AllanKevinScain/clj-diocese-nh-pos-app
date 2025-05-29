'use client';

import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { isEmpty } from 'lodash';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { FaCross, FaEdit, FaUserEdit, FaUserFriends } from 'react-icons/fa';

import type { DrawerInterface } from '.';

interface DrawerListInterface extends Pick<DrawerInterface, 'onClose'> {
  handleNavigate: (v: string) => void;
}

export const DrawerList: React.FC<DrawerListInterface> = (props) => {
  const { onClose = () => null, handleNavigate = () => null } = props;

  const { data } = useSession();

  const drawerItems = useMemo(() => {
    const defaultLists = [{ id: 'courses', content: 'Cursos', Icon: FaCross, path: '/courses' }];
    if (!isEmpty(data) && data.user.loginType !== 'admin') {
      return defaultLists;
    }

    return [
      ...defaultLists,
      {
        id: 'register-courses',
        content: 'Cadastrar curso',
        Icon: FaEdit,
        path: '/register/course',
      },
      {
        id: 'register-users',
        content: 'Cadastrar usuário',
        Icon: FaUserEdit,
        path: '/register/user',
      },
      {
        id: 'view-users',
        content: 'Visualizar todos os usuários',
        Icon: FaUserFriends,
        path: '/view/users',
      },
    ];
  }, [data]);

  return (
    <Stack
      flexDirection="column"
      sx={{ width: 250 }}
      role="presentation"
      spacing="8px"
      pt="8px"
      onClick={onClose}>
      <Avatar
        src="/logo_clj.jpg"
        alt="Logo CLJ"
        sx={{
          width: 56,
          height: 56,
          border: '1px solid black',
          alignSelf: 'center',
        }}
      />

      <Typography className="text-center">Olá, {data?.user?.name}</Typography>

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
