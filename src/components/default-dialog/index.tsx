'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { HiX } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';

import { Button } from '../button';
import { Text } from '../text';

interface DefaultDialogInterface {
  isOpen: boolean;
  handleModal: () => void;
  title: string;
  children: React.ReactNode;
  actionsButtons: React.ReactNode;
  size?: 'dinamic' | 'full';
}

export const DefaultDialog = (props: DefaultDialogInterface) => {
  const { isOpen, handleModal, title, children, actionsButtons, size = 'dinamic' } = props;

  return (
    <Dialog open={isOpen} as="div" className="relative z-10" onClose={handleModal}>
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div
        className={twMerge(
          'fixed inset-0',
          'flex items-center justify-center',
          size === 'full' ? 'px-0' : 'px-[16px]',
        )}>
        <DialogPanel
          className={twMerge(
            'relative',
            'w-full',
            'rounded-xl',
            'overflow-hidden',
            'bg-white',
            'dark:bg-neutral-600',
            size === 'full' && 'h-screen w-screen',
          )}>
          {/* Botão de fechar */}
          <Button
            onClick={handleModal}
            aria-label="Fechar filtro"
            variant="ghost"
            className={twMerge('absolute top-0 right-0', 'dark:text-neutral-300')}>
            <HiX size={30} aria-hidden="true" />
          </Button>
          {/* Cabeçalho */}
          <DialogTitle as="h3">
            <Text
              className={twMerge(
                'border-b border-gray-300',
                'bg-neutral-100 px-[24px] py-[12px]',
                'dark:border-neutral-300 dark:bg-neutral-500',
              )}>
              {title}
            </Text>
          </DialogTitle>
          {/* container */}
          <div
            className={twMerge(
              'relative',
              'overflow-auto',
              'p-[24px]',
              size === 'full' ? 'h-[84vh]' : 'max-h-[70vh]',
            )}>
            {children}
          </div>

          {/* Botões */}
          <div
            className={twMerge(
              'border-t border-gray-300',
              'bg-neutral-100 px-[24px] py-[12px]',
              'dark:border-neutral-300 dark:bg-neutral-500',
            )}>
            {actionsButtons}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
