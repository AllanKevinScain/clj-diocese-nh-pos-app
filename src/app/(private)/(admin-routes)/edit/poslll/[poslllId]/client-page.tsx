'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
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
import { usePoslll, useToggleModal, useUsers } from '@/hooks';
import type { ReturnHandlerApiType } from '@/types';
import type { PoslllSchemaInferType } from '@/yup';
import { poslllSchema } from '@/yup';

import { CoupleField } from './components';

interface PoslllClientPageInterface {
  poslll: PoslllSchemaInferType;
}

export const PoslllClientPage = (props: PoslllClientPageInterface) => {
  const { poslll } = props;

  const navigate = useRouter();
  const client = useQueryClient();
  const { updatePoslll, changeStatusPoslll } = usePoslll();
  const { isOpen, handle } = useToggleModal();
  const { listParishes } = useUsers();

  const isActive = poslll.active;

  const methods = useForm<PoslllSchemaInferType>({
    resolver: yupResolver(poslllSchema),
    defaultValues: poslll,
  });
  const { handleSubmit, control } = methods;

  const { data: parishes, isLoading: isLoadingParishes } = useQuery({
    queryKey: ['list-parishes'],
    queryFn: listParishes,
  });

  const onSubmit = async (data: PoslllSchemaInferType) => {
    await updatePoslll.mutateAsync(data, {
      onSuccess: (data: ReturnHandlerApiType<PoslllSchemaInferType>) => {
        toast.success(data.message);
        client.refetchQueries({ queryKey: ['listPoslll'] });
        navigate.push('/poslll');
      },
      onError: (e) => toast.error(e.message),
    });
  };

  async function deletePoslllById() {
    await changeStatusPoslll.mutateAsync(poslll.id!, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        navigate.push('/poslll');
      },
      onError: (e) => toast.error(e.message),
    });
  }

  return (
    <>
      <AcceptModal
        isOpen={isOpen}
        handle={handle}
        accept={deletePoslllById}
        isLoading={changeStatusPoslll.isPending}
      />

      <Container>
        <Heading>Edição do CLJ lll {poslll.candidateName}</Heading>
        <Heading as="h2">{poslll.instagram}</Heading>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
            <FieldDefault id="candidateName" control={control} label="Nome" />

            <CoupleField />

            <SelectDefault
              id="parishChapel"
              control={control}
              label="Paróquia/Capela"
              options={parishes?.data || []}
              isLoading={isLoadingParishes}
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
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handle}
                isLoading={updatePoslll.isPending}>
                {!isActive ? 'Ativar' : 'Desativar'} registro
              </Button>
              <Button type="submit" className="w-full" isLoading={updatePoslll.isPending}>
                Atualizar
              </Button>
            </div>
          </form>
        </FormProvider>
      </Container>
    </>
  );
};
