'use client';

import { useState } from 'react';

import { Button, Container, Heading } from '@/components';

import { CourseModalExport, WorkTableModalExport } from './components';

type ModalType = 'course' | 'table' | null;

export default function ExportPage() {
  const [modalsState, setModalsOpen] = useState<ModalType>(null);

  function handleModals(modalType: ModalType) {
    if (modalType === null) return setModalsOpen(null);

    setModalsOpen((s) => {
      if (s === modalType) return null;
      return modalType;
    });
  }

  return (
    <>
      <CourseModalExport
        isOpen={modalsState === 'course'}
        handleModal={() => handleModals('course')}
      />
      <WorkTableModalExport
        isOpen={modalsState === 'table'}
        handleModal={() => handleModals('table')}
      />

      <Container className="flex flex-col gap-[24px]">
        <Heading>Exportar Relatórios</Heading>

        <div className="flex flex-col gap-[12px]">
          <Button className="w-full" onClick={() => handleModals('course')}>
            Exportar curso em geral
          </Button>
          <Button className="w-full" onClick={() => handleModals('table')}>
            Exportar mesa de fundo
          </Button>
        </div>
      </Container>
    </>
  );
}
