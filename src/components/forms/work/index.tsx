'use client';

import React, { useCallback } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import {
  Button,
  FieldDefault,
  FieldSetCheckbox,
  FieldSetConsentCheckbox,
  FieldSetRadio,
  FieldTextarea,
  SessionForm,
} from '@/components';
import { formatMobilePhone } from '@/helpers';
import type { workSchema } from '@/yup';

import { ConfirmationFields } from './confirmation';
import { InstrumentFields } from './instrument';

export type WorkSchemaInfertype = InferType<typeof workSchema>;

export interface WorkFormInterface {
  onSubmit: (_: WorkSchemaInfertype) => void;
  isDisabled?: boolean;
}

export const WorkForm = (props: WorkFormInterface) => {
  const { onSubmit, isDisabled } = props;

  const { control, handleSubmit } = useFormContext<WorkSchemaInfertype>();

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

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20">
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Erros no onSubmit:', errors);
            showErrors(errors);
          }
        })}
        className="mt-6 flex flex-col gap-8">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold">Curso de Liderança Juvenil - CLJ</h1>
          <p>Secretariado Diocesano de Novo Hamburgo</p>
          <h2 className="text-lg font-semibold">FICHA DE CANDIDATO(A) À EQUIPE DE TRABALHO</h2>
        </div>

        <SessionForm title="Dados da ficha:">
          <div className="grid grid-cols-1 gap-4">
            <FieldDefault
              id="recordNumber"
              disabled={isDisabled}
              control={control}
              label="Número da ficha"
              type="number"
              maxLength={2}
            />
            <FieldDefault
              id="parishAcronym"
              disabled={isDisabled}
              control={control}
              label="Sigla da paróquia/capela"
              onChange={(e) => e.replace(/[0-9]/g, '')}
              maxLength={10}
            />
          </div>
        </SessionForm>

        <SessionForm title="Dados do(a) Candidato(a):">
          <div className="grid grid-cols-1 gap-4">
            <FieldDefault
              id="candidateName"
              disabled={isDisabled}
              control={control}
              label="Nome"
              onChange={(e) => e.replace(/[0-9]/g, '')}
              maxLength={50}
            />
            <FieldDefault
              id="nickname"
              disabled={isDisabled}
              control={control}
              label="Apelido"
              maxLength={50}
            />
            <FieldDefault
              id="candidatePhone"
              disabled={isDisabled}
              control={control}
              onChange={(e) => formatMobilePhone(e)}
              label="Telefone Cursista"
            />
            <FieldDefault
              id="priest"
              disabled={isDisabled}
              control={control}
              label="Pároco"
              onChange={(e) => e.replace(/[0-9]/g, '')}
              maxLength={50}
            />
            <FieldDefault
              id="birthDate"
              disabled={isDisabled}
              control={control}
              type="date"
              label="Data de Nascimento"
            />
            <FieldDefault
              id="instagram"
              disabled={isDisabled}
              control={control}
              label="Instagram"
              maxLength={30}
            />
            <FieldDefault
              id="parishChapel"
              disabled={isDisabled}
              control={control}
              label="Paróquia/Capela"
              onChange={(e) => e.replace(/[0-9]/g, '')}
              maxLength={50}
            />
          </div>
        </SessionForm>

        <SessionForm title="Outras Informações:">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FieldDefault
              id="recordWork.courseOneDone"
              disabled={isDisabled}
              control={control}
              label="Curso CLJ I"
              maxLength={4}
            />
            <FieldDefault
              id="recordWork.courseTwoDone"
              disabled={isDisabled}
              control={control}
              label="Curso CLJ II"
              maxLength={4}
            />
            <FieldDefault
              id="recordWork.courseThreeDone"
              disabled={isDisabled}
              control={control}
              label="Curso CLJ III"
              maxLength={4}
            />
            <FieldDefault
              id="recordWork.currentGroupFunction"
              disabled={isDisabled}
              control={control}
              label="Atual função no grupo"
              maxLength={200}
            />
            <FieldTextarea
              id="recordWork.parishActivities"
              disabled={isDisabled}
              control={control}
              label="Exerce ou já exerceu outra atividade na Paróquia/Capela? Qual?"
              maxLength={200}
            />
            <FieldTextarea
              id="recordWork.workedInWhichCourses"
              disabled={isDisabled}
              control={control}
              label="Referente ao trabalho em Cursos (número do Curso e função exercida): "
              maxLength={200}
            />
          </div>
        </SessionForm>

        <SessionForm title="Tenho consciência dos meus atos:">
          <div className="grid grid-cols-1 gap-4">
            <FieldDefault
              id="recordWork.graceStateAwareness"
              disabled={isDisabled}
              control={control}
              label="Você é consciente de que é necessário estar em estado de graça (confessado) para participar da equipe de trabalho?"
              maxLength={50}
            />
            <FieldSetRadio
              id="recordWork.notFalsifyData"
              disabled={isDisabled}
              control={control}
              label="Você é consciente de que falsificar informações na ficha de trabalho é prejudicial para sua vida e para o curso?"
              options={[
                { label: 'Sim', value: true },
                { label: 'Não', value: false },
              ]}
            />
            <FieldDefault
              id="recordWork.showLifeTestimony"
              disabled={isDisabled}
              control={control}
              label="Você é consciente de que o testemunho de vida fora do curso é essencial para o êxito do curso?"
              maxLength={50}
            />
          </div>
        </SessionForm>

        <SessionForm title="Vida Espiritual (Assinale somente as alternativas que praticas com frequência):">
          <FieldSetCheckbox
            id="spiritualLife"
            disabled={isDisabled}
            control={control}
            label="Vida Espiritual: (Assinale somente as alternativas que praticas com freqüência)"
            options={[
              { id: 'oracaoDiaria', label: 'Oração Diária' },
              { id: 'missaDominicalSemanal', label: 'Missa Dominical Semanal' },
              { id: 'confissaoFrequente', label: 'Confissão Frequente' },
              { id: 'visitaAoSacrario', label: 'Visita ao Sacrário Semanal' },
              { id: 'leituraDoEvangelioDiaria', label: 'Leitura do Evangelho Diária' },
              { id: 'reuniaoDeComunidade', label: 'Reunião de Comunidade Semanal' },
            ]}
          />
        </SessionForm>

        <SessionForm title="Crisma:">
          <ConfirmationFields isDisabled={isDisabled} />
        </SessionForm>

        <SessionForm title="Instrumento:">
          <InstrumentFields isDisabled={isDisabled} />
        </SessionForm>

        <SessionForm title="Razões para fazer o curso:">
          <div className="grid grid-cols-1 gap-4">
            <FieldTextarea
              id="recordWork.reasonToWork"
              disabled={isDisabled}
              control={control}
              label="Por que deseja trabalhar neste curso?"
              maxLength={200}
            />
            <FieldSetRadio
              id="recordWork.workPreference"
              control={control}
              disabled={isDisabled}
              label="Preferência de trabalho neste curso"
              options={[
                { value: 'sala', label: 'Sala' },
                { value: 'cozinha', label: 'Cozinha' },
              ]}
            />
            <FieldSetRadio
              id="recordWork.willingToOtherFunction"
              disabled={isDisabled}
              control={control}
              label="Está disposto a exercer outra função, caso seja  necessário?"
              options={[
                { label: 'Sim', value: true },
                { label: 'Não', value: false },
              ]}
            />
          </div>
        </SessionForm>

        <SessionForm title="Coordenação Paroquial:">
          <div className="grid grid-cols-1 gap-4">
            <FieldSetCheckbox
              id="recordWork.parishIndication"
              disabled={isDisabled}
              control={control}
              label="Indicações"
              options={[
                { id: 'cozinha', label: 'Cozinha' },
                { id: 'liturgia', label: 'Liturgia' },
                { id: 'secretaria', label: 'Secretaria' },
                { id: 'auxSecretaria', label: 'Aux. Secretaria' },
                { id: 'bar', label: 'Bar' },
                { id: 'coordFolclore', label: 'Coord. Folclore' },
                { id: 'monitor', label: 'Monitor' },
                { id: 'palestrante', label: 'Palestrante' },
                { id: 'acolito', label: 'Acólito' },
              ]}
            />
            <FieldTextarea
              id="observationsCoordinator"
              disabled={isDisabled}
              control={control}
              label="Observação do Depto. de Pós e Coordenação paroquial"
              maxLength={200}
            />
            <FieldTextarea
              id="observationsDed"
              disabled={isDisabled}
              control={control}
              label="Observação do Diretor Espiritual Paroquial"
              maxLength={200}
            />
          </div>
        </SessionForm>

        <SessionForm title="Consentimento de dados:">
          <FieldSetConsentCheckbox
            id="dataConsent"
            disabled={isDisabled}
            control={control}
            description="Declaro estar ciente de que meus dados, presentes nessa ficha, serão utilizados única e exclusivamente para o curso."
          />
        </SessionForm>

        <span className="mb-3 rounded-lg border bg-gray-200 p-2">
          Coordenação e pároco: no caso deste jovem não ser exemplo de perseverança no grupo e
          ausente na missa dominical, não assine a ficha, afinal, será um contra-testemunho para o
          Movimento!
        </span>

        {!isDisabled && (
          <Button type="submit" className="mt-3 mb-2 w-full">
            Enviar
          </Button>
        )}
      </form>
    </div>
  );
};
