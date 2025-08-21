'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import { Button, Container, FieldDefault, FieldTextarea, Heading } from '@/components';
import { formatMobilePhone } from '@/helpers';
import { usePoslll } from '@/hooks';
import { poslllSchema } from '@/yup';

export type PoslllInferType = InferType<typeof poslllSchema>;

export default function RegisterPoslllPage() {
  const navigate = useRouter();
  const { registerPoslll } = usePoslll();

  const { handleSubmit, control } = useForm<PoslllInferType>({
    resolver: yupResolver(poslllSchema),
  });

  const onSubmit = async (data: PoslllInferType) => {
    const res = await registerPoslll(data);

    if (!res?.ok) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      navigate.push('/poslll');
    }
  };

  return (
    <Container>
      <Heading as="h2">Cadastrar CLJ lll</Heading>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <FieldDefault id="candidateName" control={control} label="Nome" />

        <FieldDefault
          id="candidatePhone"
          control={control}
          onChange={(e) => formatMobilePhone(e)}
          label="Telefone"
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

        <Button type="submit" className="w-full">
          Cadastrar
        </Button>
      </form>
    </Container>
  );
}
