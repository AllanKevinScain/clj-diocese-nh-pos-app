'use client';

import { Button, Container, Heading } from '@/components';
import { useToggleModal } from '@/hooks';

import { WorkTableModalExport } from './components';

export default function ExportPage() {
  const tableWorkModal = useToggleModal();

  return (
    <>
      <WorkTableModalExport isOpen={tableWorkModal.isOpen} handleModal={tableWorkModal.handle} />

      <Container className="flex flex-col gap-[24px]">
        <Heading>Exportar Relatórios</Heading>

        <div className="flex flex-col gap-[12px]">
          <Button className="w-full" onClick={tableWorkModal.handle}>
            Exportar mesa de fundo
          </Button>
        </div>
      </Container>
    </>
  );
}
