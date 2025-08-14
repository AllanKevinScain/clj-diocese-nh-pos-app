'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { HiX } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';

import { Button } from '../button';

interface DefaultDialogInterface {
  isOpen: boolean;
  handleModal: () => void;
  title: string;
  children: React.ReactNode;
  actionsButtons: React.ReactNode;
}

export const DefaultDialog = (props: DefaultDialogInterface) => {
  const { isOpen, handleModal, title, children, actionsButtons } = props;

  return (
    <Dialog open={isOpen} as="div" className="relative z-10" onClose={handleModal}>
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center px-[16px]">
        <DialogPanel
          className={twMerge('relative', 'w-full bg-white', 'rounded-xl', 'overflow-hidden')}>
          <Button
            onClick={handleModal}
            aria-label="Fechar filtro"
            variant="ghost"
            className={twMerge(
              'absolute top-0 right-0',
              'h-[40px] w-[40px] p-1',
              'flex items-center justify-center',
            )}>
            <HiX className="h-5 w-5" aria-hidden="true" />
          </Button>
          <DialogTitle
            as="h3"
            className={twMerge(
              'text-start text-lg font-medium text-gray-900',
              'border-b border-gray-300',
              'bg-neutral-100 px-[24px] py-[12px]',
            )}>
            {title}
          </DialogTitle>
          <div className="p-[24px]">
            {/* Botão de fechar */}

            {/* Cabeçalho */}

            {/* container */}
            <div className={twMerge('relative', 'max-h-[70vh] overflow-auto')}>{children}</div>
          </div>

          {/* Botões */}
          <div
            className={twMerge('border-t border-gray-300', 'bg-neutral-100 px-[24px] py-[12px]')}>
            {actionsButtons}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
