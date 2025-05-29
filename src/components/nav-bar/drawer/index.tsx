'use client';

import { Button } from '@headlessui/react';
import { Drawer as MuiDrawer } from '@mui/material';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { BiMenu } from 'react-icons/bi';

import { DrawerList } from './list-drawer';

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
      <Button
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={toggleDrawer}>
        <BiMenu />
      </Button>
      <MuiDrawer open={openDrawer} onClose={toggleDrawer} sx={{ position: 'relative' }}>
        <DrawerList onClose={toggleDrawer} handleNavigate={handleNavigate} />
        <Button onClick={() => signOut()} className="b-[5%] absolute w-full">
          Sair
        </Button>
      </MuiDrawer>
    </div>
  );
};
