'use client';

import { Button } from '../button';
import { DefaultDialog } from '../default-dialog';
import { Text } from '../text';

interface AcceptModalInterface {
  isOpen: boolean;
  accept: () => void;
  handle: () => void;
}

export const AcceptModal = (props: AcceptModalInterface) => {
  const { isOpen, accept, handle } = props;

  return (
    <DefaultDialog
      isOpen={isOpen}
      handleModal={handle}
      title="Essa ação alterará a integração desse registro com o sistema"
      actionsButtons={
        <div className="flex justify-end gap-3">
          <Button
            className="w-[80px]"
            onClick={() => {
              accept();
              handle();
            }}>
            Sim
          </Button>
          <Button variant="outline" className="w-[80px]" onClick={handle}>
            Não
          </Button>
        </div>
      }>
      <Text>Deseja confirmar?</Text>
    </DefaultDialog>
  );
};
