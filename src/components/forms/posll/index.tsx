'use client';

import type { Session } from 'next-auth';
import { useCallback, useEffect } from 'react';
import { type FieldErrors, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  Button,
  Container,
  FieldDefault,
  FieldSetConsentCheckbox,
  Heading,
  Loading,
  SessionForm,
  Text,
} from '@/components';
import { formatMobilePhone } from '@/helpers';
import type { CandidatePosllSchemaInfertype } from '@/yup';

interface PosllFormInterface {
  onSubmit: (_: CandidatePosllSchemaInfertype) => void;
  isDisabled?: boolean;
  isSending?: boolean;
  session?: Session;
}

export const PosllForm = (props: PosllFormInterface) => {
  const { onSubmit, isDisabled = false, isSending = false, session } = props;

  const { control, handleSubmit, setValue } = useFormContext<CandidatePosllSchemaInfertype>();

  const showErrors = useCallback((errors: FieldErrors, pathPrefix = '') => {
    Object.entries(errors).forEach(([key, value]) => {
      const path = pathPrefix ? `${pathPrefix}.${key}` : key;

      if (value?.message) {
        return toast.error(`Campo: ${path}, Erro: ${value.message}`, {
          duration: 5000,
        });
      } else if (typeof value === 'object') {
        showErrors(value as FieldErrors, path);
      }
    });
  }, []);

  const parishValue = useCallback(() => {
    if (session) {
      const {
        user: { coName },
      } = session;

      setValue('parishChapel', coName);
    }
  }, [session, setValue]);

  useEffect(() => {
    parishValue();
  }, [parishValue]);

  return (
    <Container>
      {isSending && <Loading />}
      <form
        className="flex flex-col gap-6 pb-[30%]"
        onSubmit={handleSubmit(onSubmit, (errors) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Erros no onSubmit:', errors);
            showErrors(errors);
          }
        })}>
        <div className="space-y-1 text-center">
          <Heading>Curso de Liderança Juvenil - CLJ</Heading>
          <Text>Secretariado Diocesano de Novo Hamburgo</Text>
          <Heading as="h2">FICHA DE CANDIDATO(A) AO CLJ II</Heading>
        </div>

        <SessionForm title="Dados da ficha:">
          <FieldDefault
            disabled={isDisabled}
            id="recordNumber"
            control={control}
            label="Número da ficha"
            type="number"
            maxLength={2}
          />
          <FieldDefault
            disabled={session?.user.loginType !== 'admin'}
            id="parishChapel"
            control={control}
            label="Sigla do grupo"
            onChange={(e) => e.replace(/[0-9]/g, '')}
            maxLength={50}
          />
        </SessionForm>

        <SessionForm title="Dados do(a) Candidato(a):">
          <FieldDefault
            disabled={isDisabled}
            id="candidateName"
            control={control}
            label="Nome"
            onChange={(e) => e.replace(/[0-9]/g, '')}
            maxLength={50}
          />
          <FieldDefault
            disabled={isDisabled}
            id="nickname"
            control={control}
            label="Apelido"
            maxLength={50}
          />
          <FieldDefault
            disabled={isDisabled}
            id="candidatePhone"
            control={control}
            onChange={(e) => formatMobilePhone(e)}
            label="Telefone"
          />
          <FieldDefault
            disabled={isDisabled}
            id="birthDate"
            control={control}
            type="date"
            label="Data de nascimento"
          />
        </SessionForm>

        <SessionForm title="Consentimento de dados:">
          <FieldSetConsentCheckbox
            description="Declaro estar ciente de que meus dados, presentes nessa ficha, serão utilizados única e exclusivamente para o curso."
            disabled={isDisabled}
            id="dataConsent"
            control={control}
          />
        </SessionForm>

        {!isDisabled && (
          <Button type="submit" className="w-full">
            Enviar
          </Button>
        )}
      </form>
    </Container>
  );
};
