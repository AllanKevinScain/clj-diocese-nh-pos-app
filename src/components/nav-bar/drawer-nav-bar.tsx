'use client';

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { isEmpty } from 'lodash';
import { signOut, useSession } from 'next-auth/react';
import { Fragment, useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { FaCross, FaUserEdit, FaUserFriends } from 'react-icons/fa';
import { SiBlockbench } from 'react-icons/si';
import { twMerge } from 'tailwind-merge';

import { Button } from '../button';
import { Divider } from '../divider';
import { Heading } from '../heading';
import { ButtonItem } from './button-item';

interface NavBarDrawerInterface {
  showDrawer?: boolean;
}

export function NavBarDrawer(props: NavBarDrawerInterface) {
  const { showDrawer } = props;
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = !isEmpty(data) && data.user.loginType === 'admin';

  if (!showDrawer) return;

  return (
    <>
      <button className="text-white" onClick={() => setIsOpen(true)}>
        <BiMenu size={50} />
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
          <Transition show={isOpen}>
            <TransitionChild as={Fragment}>
              <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
            </TransitionChild>

            <div className="fixed inset-0 flex">
              <TransitionChild as={Fragment}>
                <DialogPanel
                  className={twMerge(
                    'flex flex-col justify-between',
                    'w-72 bg-neutral-100 p-[30px]',
                    'shadow-xl',
                    'dark:bg-neutral-900',
                  )}>
                  <nav className="flex flex-col gap-6">
                    <Heading as="h3">Olá, {data?.user?.name}</Heading>
                    <Divider />

                    <div className="flex flex-col gap-[6px]">
                      <ButtonItem isLink ended={() => setIsOpen(false)} href="/courses">
                        <FaCross />
                        Cursos
                      </ButtonItem>
                      <ButtonItem isLink ended={() => setIsOpen(false)} href="/poslll">
                        <FaUserFriends />
                        CLJ{"'"}s lll
                      </ButtonItem>
                      {isAdmin && (
                        <>
                          <ButtonItem isLink ended={() => setIsOpen(false)} href="/view/users">
                            <FaUserFriends />
                            Usuários
                          </ButtonItem>
                          <ButtonItem isLink ended={() => setIsOpen(false)} href="/all">
                            <FaUserFriends />
                            Filtro
                          </ButtonItem>
                        </>
                      )}
                      {!isEmpty(data) && data.user.loginType === 'admin' && (
                        <>
                          <ButtonItem isLink ended={() => setIsOpen(false)} href="/register/course">
                            <FaUserEdit />
                            Cadastrar curso
                          </ButtonItem>
                          <ButtonItem isLink ended={() => setIsOpen(false)} href="/register/user">
                            <FaUserEdit />
                            Cadastrar usuário
                          </ButtonItem>
                          <ButtonItem isLink ended={() => setIsOpen(false)} href="/register/poslll">
                            <FaUserEdit />
                            Cadastrar CLJ lll
                          </ButtonItem>
                          <ButtonItem
                            isLink
                            ended={() => setIsOpen(false)}
                            href="/setup-background-table/courses">
                            <SiBlockbench />
                            Montar mesa de fundo
                          </ButtonItem>
                        </>
                      )}
                    </div>
                  </nav>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => signOut({ callbackUrl: '/' })}>
                    Sair
                  </Button>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Transition>
        </Dialog>
      </Transition>
    </>
  );
}
