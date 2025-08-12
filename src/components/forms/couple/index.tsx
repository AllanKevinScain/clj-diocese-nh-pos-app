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
import type { coupleSchema } from '@/yup';

import { CoursesOneDoneFields } from './courses-one-done';
import { CoursesThreeDoneFields } from './courses-three-done';
import { CoursesTwoDoneFields } from './courses-two-done';
import { WorkPreferenceFields } from './work-preference';

export type CoupleSchemaInfertype = InferType<typeof coupleSchema>;

export interface CoupleFormInterface {
  onSubmit: (_: CoupleSchemaInfertype) => void;
  isDisabled?: boolean;
}

export const CoupleForm = (props: CoupleFormInterface) => {
  const { onSubmit, isDisabled } = props;

  const { control, handleSubmit } = useFormContext<CoupleSchemaInfertype>();

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
            <FieldDefault
              disabled={isDisabled}
              id="parishChapel"
              control={control}
              label="Paróquia/Capela"
              onChange={(e) => e.replace(/[0-9]/g, '')}
              maxLength={50}
            />
            <FieldDefault
              disabled={isDisabled}
              id="priest"
              control={control}
              label="Pároco"
              onChange={(e) => e.replace(/[0-9]/g, '')}
              maxLength={50}
            />
          </div>
        </SessionForm>

        <SessionForm title="Dados do tio:">
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
              label="Telefone"
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
            <FieldSetCheckbox
              id="spiritualLife"
              disabled={isDisabled}
              control={control}
              label="Vida Espiritual: (Assinale somente as alternativas que praticas com frequência)"
              options={[
                { id: 'oracaoDiaria', label: 'Oração Diária' },
                { id: 'missaDominicalSemanal', label: 'Missa Dominical' },
                { id: 'confissaoFrequente', label: 'Confissão' },
                { id: 'visitaAoSacrario', label: 'Visita ao Sacrário' },
                { id: 'leituraDoEvangelioDiaria', label: 'Leitura do Evangelho' },
                { id: 'reuniaoDeComunidade', label: 'Reunião de Comunidade' },
              ]}
            />
          </div>
        </SessionForm>

        <SessionForm title="Dados da tia:">
          <div className="grid grid-cols-1 gap-4">
            <FieldDefault
              id="recordCouple.womanName"
              disabled={isDisabled}
              control={control}
              label="Nome"
              onChange={(e) => e.replace(/[0-9]/g, '')}
              maxLength={50}
            />
            <FieldDefault
              id="recordCouple.womanNickname"
              disabled={isDisabled}
              control={control}
              label="Apelido"
              maxLength={50}
            />
            <FieldDefault
              id="recordCouple.womanPhone"
              disabled={isDisabled}
              control={control}
              onChange={(e) => formatMobilePhone(e)}
              label="Telefone"
            />
            <FieldDefault
              id="recordCouple.womanBirthDate"
              disabled={isDisabled}
              control={control}
              type="date"
              label="Data de Nascimento"
            />
            <FieldDefault
              id="recordCouple.womanInstagram"
              disabled={isDisabled}
              control={control}
              label="Instagram"
              maxLength={30}
            />
            <FieldSetCheckbox
              id="recordCouple.womanSpiritualLife"
              disabled={isDisabled}
              control={control}
              label="Vida Espiritual: (Assinale somente as alternativas que praticas com frequência)"
              options={[
                { id: 'oracaoDiaria', label: 'Oração Diária' },
                { id: 'missaDominicalSemanal', label: 'Missa Dominical' },
                { id: 'confissaoFrequente', label: 'Confissão' },
                { id: 'visitaAoSacrario', label: 'Visita ao Sacrário' },
                { id: 'leituraDoEvangelioDiaria', label: 'Leitura do Evangelho' },
                { id: 'reuniaoDeComunidade', label: 'Reunião de Comunidade' },
              ]}
            />
          </div>
        </SessionForm>

        <SessionForm title="Dados do casal:">
          <div className="grid grid-cols-1 gap-4">
            <WorkPreferenceFields isDisabled={isDisabled} />
            <CoursesOneDoneFields isDisabled={isDisabled} />
            <CoursesTwoDoneFields isDisabled={isDisabled} />
            <CoursesThreeDoneFields isDisabled={isDisabled} />

            <FieldTextarea
              id="recordCouple.coursesDone"
              disabled={isDisabled}
              control={control}
              label="Referente ao trabalho em Cursos, número do Curso e função exercida"
              maxLength={200}
            />
            <FieldTextarea
              id="recordCouple.currentGroupFunction"
              disabled={isDisabled}
              control={control}
              label="Departamento que faz parte no grupo"
              maxLength={200}
            />
            <FieldTextarea
              id="recordCouple.participatedOtherGroups"
              disabled={isDisabled}
              control={control}
              label="Participa de algum movimento de casais? Qual?"
              maxLength={200}
            />
            <FieldSetRadio
              id="recordCouple.familyLife"
              control={control}
              disabled={isDisabled}
              label="Preferência de trabalho neste curso"
              options={[
                { value: 'boa', label: 'Boa' },
                { value: 'regular', label: 'Regular' },
                { value: 'inexistente', label: 'Inexistente' },
              ]}
            />
            <FieldDefault
              id="recordCouple.religiousWeddingDate"
              disabled={isDisabled}
              control={control}
              type="date"
              label="Data de casamento religioso"
            />
            <FieldSetRadio
              id="recordCouple.participatedInRetreat"
              control={control}
              disabled={isDisabled}
              label="Já participou do retiro de tios?"
              options={[
                { label: 'Sim', value: true },
                { label: 'Regular', value: false },
              ]}
            />
            <FieldTextarea
              id="recordCouple.motivationToParticipate"
              disabled={isDisabled}
              control={control}
              label="O que os motiva a participar do Movimento CLJ?"
              maxLength={200}
            />
          </div>
        </SessionForm>

        <SessionForm title="Coordenação Paroquial:">
          <div className="grid grid-cols-1 gap-4">
            <FieldSetCheckbox
              id="recordCouple.parishIndication"
              disabled={isDisabled}
              control={control}
              label="Indicações"
              options={[
                { id: 'assistente', label: 'Casal Assistente' },
                { id: 'bem-estar', label: 'Casal Bem-Estar' },
                { id: 'cozinha', label: 'Casal Coord. Cozinha' },
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

        {!isDisabled && (
          <Button type="submit" className="mt-3 mb-2 w-full">
            Enviar
          </Button>
        )}
      </form>
    </div>
  );
};
