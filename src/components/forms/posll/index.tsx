'use client';

import type { Session } from 'next-auth';
import React, { useCallback, useEffect } from 'react';
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
import type { PosllSchemaInfertype } from '@/yup';

export interface PosllFormInterface {
  onSubmit: (_: PosllSchemaInfertype) => void;
  isDisabled?: boolean;
  isSending?: boolean;
  session?: Session;
}

export const PosllForm = (props: PosllFormInterface) => {
  const { onSubmit, isDisabled = false, isSending = false, session } = props;

  const { control, handleSubmit, setValue } = useFormContext<PosllSchemaInfertype>();

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
          {/* <FieldDefault
            disabled={isDisabled}
            id="parishAcronym"
            control={control}
            label="Sigla do grupo"
            onChange={(e) => e.replace(/[0-9]/g, '')}
            maxLength={10}
          /> */}
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
          {/* <FieldDefault
            disabled={isDisabled}
            id="priest"
            control={control}
            label="Pároco"
            onChange={(e) => e.replace(/[0-9]/g, '')}
            maxLength={50}
          /> */}
          <FieldDefault
            disabled={isDisabled}
            id="birthDate"
            control={control}
            type="date"
            label="Data de nascimento"
          />
          {/* <FieldDefault
            disabled={isDisabled}
            id="instagram"
            control={control}
            label="Instagram"
            maxLength={30}
          /> */}
          {/* <FieldDefault
            disabled={session?.user.loginType !== 'admin'}
            id="parishChapel"
            control={control}
            label="Paróquia/Capela"
            onChange={(e) => e.replace(/[0-9]/g, '')}
            maxLength={50}
            value={parishValue}
          /> */}
        </SessionForm>

        {/* <SessionForm title="Consenso ao âmbito do curso:">
          <FieldDefault
            disabled={isDisabled}
            id="recordPOSll.courseOneDone"
            control={control}
            label="CLJ l que fez"
            onChange={(e) => e.replace(/\D/g, '')}
            maxLength={4}
          />
          <FieldTextarea
            disabled={isDisabled}
            id="recordPOSll.motivationToParticipate"
            control={control}
            label="O que o (a) motiva a participar do Movimento CLJ?"
            maxLength={200}
          />
          <FieldTextarea
            disabled={isDisabled}
            id="recordPOSll.reasonForCLJII"
            control={control}
            label="Por que deseja fazer o CLJ II?"
            maxLength={200}
          />
          <FieldTextarea
            disabled={isDisabled}
            id="recordPOSll.approachToChrist"
            control={control}
            label="Desde o teu CLJ I, aproximaste pessoas de Cristo e da Igreja?"
            maxLength={100}
          />
          <FieldTextarea
            disabled={isDisabled}
            id="recordPOSll.acceptsChurchDoctrine"
            control={control}
            label="Você procura entender e aceitar a Doutrina da Igreja Católica, buscando aumentar sua fé?"
            maxLength={100}
          />
          <FieldDefault
            disabled={isDisabled}
            id="recordPOSll.commitmentToCLJ"
            control={control}
            label="Você sabe que participar do CLJ é se comprometer com Cristo, com a paróquia e com o grupo?"
            maxLength={50}
          />
          <FieldDefault
            disabled={isDisabled}
            id="recordPOSll.perseveranceInCommunity"
            control={control}
            label="Você é consciente de que não deve fazer o curso caso não queira perseverar na sua comunidade e no seu grupo?"
            maxLength={50}
          /> 
          <FieldSetRadio
            disabled={isDisabled}
            control={control}
            id="recordPOSll.hideImportantInfo"
            label="É consciente de que não deve ocultar nenhuma informação importante nesta ficha?"
            options={[
              { label: 'Sim', value: true },
              { label: 'Não', value: false },
            ]}
          />
        </SessionForm> */}

        {/*  <SessionForm title="Sua função na comunidade hoje:">
          <FieldDefault
            disabled={isDisabled}
            id="recordPOSll.currentGroupFunction"
            control={control}
            label="Atual função no grupo"
            maxLength={50}
          />
          <FieldTextarea
            disabled={isDisabled}
            id="recordPOSll.parishChapelActivities"
            control={control}
            label="Exerce ou já exerceu outra atividade na Paróquia/Capela? Qual?"
            maxLength={100}
          />
        </SessionForm> */}

        {/* <SessionForm title="Religiosos:">
          <FieldSetCheckbox
            disabled={isDisabled}
            control={control}
            id="spiritualLife"
            label="Vida Espiritual: (Assinale somente as alternativas que praticas com freqüência)"
            options={[
              { id: 'oracaoDiaria', label: 'Oração Diária' },
              { id: 'missaDominicalSemanal', label: 'Missa Dominical Semanal' },
              { id: 'confissaoFrequente', label: 'Confissão Frequente' },
              { id: 'visitaAoSacrario', label: 'Visita ao Sacrário Semanal' },
              { id: 'leituraDoEvangelioDiaria', label: 'Leitura do Evangelho Diária' },
              { id: 'reuniaoDeComunidade', label: 'Reunião de Comunidade' },
            ]}
          />
        </SessionForm> */}

        {/* <SessionForm title="Crisma:">
          <ConfirmationFields isDisabled={isDisabled} />
        </SessionForm> */}

        {/* <SessionForm title="Observações:">
          <FieldTextarea
            disabled={isDisabled}
            id="observationsCoordinator"
            control={control}
            label="Observação do Depto. de Pós e Coordenação paroquial"
            maxLength={200}
          />
          <FieldTextarea
            disabled={isDisabled}
            id="observationsDed"
            control={control}
            label="Observação do Diretor Espiritual Paroquial"
            maxLength={200}
          />
        </SessionForm>

        <SessionForm title="Saúde:">
          <DiseaseFields isDisabled={isDisabled} />
          <MedicationFields isDisabled={isDisabled} />

          <FieldDefault
            disabled={isDisabled}
            id="allergy"
            label="Tem algum tipo de alergia (medicamentos, alimentos, etc.)?"
            control={control}
          />
        </SessionForm> */}

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
