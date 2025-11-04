'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  AcceptModal,
  Button,
  Container,
  FieldDefault,
  FieldTextarea,
  Heading,
  SelectDefault,
} from '@/components';
import { useCreateQuery, usePoslll, useToggleModal, useUsers } from '@/hooks';
import type { PoslllSchemaInferType } from '@/yup';
import { poslllSchema } from '@/yup';

interface PoslllClientPageInterface {
  poslll: PoslllSchemaInferType;
}

export const PoslllClientPage = (props: PoslllClientPageInterface) => {
  const { poslll } = props;
  const navigate = useRouter();

  const { updatePoslll, changeStatusPoslll } = usePoslll();
  const { isOpen, handle } = useToggleModal();
  const { listParishes } = useUsers();

  const isActive = poslll.active;

  const { handleSubmit, control } = useForm<PoslllSchemaInferType>({
    resolver: yupResolver(poslllSchema),
    defaultValues: poslll,
  });

  const { data: parishes } = useCreateQuery({
    queryKey: ['list-parishes'],
    queryFn: listParishes,
  });

  const onSubmit = async (data: PoslllSchemaInferType) => {
    const res = await updatePoslll(data);

    if (!res?.ok) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      navigate.push('/poslll');
    }
  };

  async function deletePoslllById() {
    const response = await changeStatusPoslll(poslll.id!);

    if (!response?.ok) {
      toast.error(response.data.message);
    } else {
      toast.success(response.data.message);
      navigate.push('/poslll');
    }
  }

  return (
    <>
      <AcceptModal isOpen={isOpen} handle={handle} accept={deletePoslllById} />

      <Container>
        <Heading>Edição do CLJ lll {poslll.candidateName}</Heading>
        <Heading as="h2">{poslll.instagram}</Heading>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
          <FieldDefault id="candidateName" control={control} label="Nome" />

          <SelectDefault
            id="parishChapel"
            control={control}
            label="Paróquia/Capela"
            options={parishes?.data || []}
          />

          <FieldDefault id="instagram" control={control} label="Instagram" />

          <div className="flex items-start gap-[10px]">
            <FieldDefault
              id="courseOne"
              control={control}
              label="Curso CLJ 1 que fez"
              type="number"
              maxLength={4}
            />
            <FieldDefault
              id="courseTwo"
              control={control}
              label="Curso CLJ 2 que fez"
              type="number"
              maxLength={4}
            />
            <FieldDefault
              id="courseThree"
              control={control}
              label="Curso CLJ 3 que fez"
              type="number"
              maxLength={4}
            />
          </div>

          <FieldTextarea id="formations" control={control} label="Formações" />

          <div className="flex gap-[16px]">
            <Button type="button" variant="outline" className="w-full" onClick={handle}>
              {!isActive ? 'Ativar' : 'Desativar'} registro
            </Button>
            <Button type="submit" className="w-full">
              Atualizar
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};
