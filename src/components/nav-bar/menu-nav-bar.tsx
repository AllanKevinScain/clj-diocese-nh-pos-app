'use client';

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import { Fragment } from 'react';

interface NavBarMenuInterface {
  showMenu?: boolean;
}

export function NavBarMenu(props: NavBarMenuInterface) {
  const { showMenu } = props;

  if (!showMenu) return;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="rounded-full focus:ring-2 focus:ring-white focus:outline-none">
          <img
            src="https://cljdiocesenh.com.br/wp-content/uploads/2022/10/screenshot.1698-407x270.jpg"
            alt="Avatar"
            width={36}
            height={36}
            className="rounded-full border border-white"
          />
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <MenuItems transition anchor="bottom end">
          <div className="py-1">
            <MenuItem>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full px-4 py-2 text-left text-sm text-gray-700">
                Sair
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
