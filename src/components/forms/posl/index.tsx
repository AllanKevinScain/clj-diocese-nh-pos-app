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
import type { poslSchema } from '@/yup';

import { DiseaseFields } from './disease';
import { MedicationFields } from './medication';
import { ParentsFields } from './parents';
import { ParentsReligionFields } from './parentsReligion';

export type PoslSchemaInfertype = InferType<typeof poslSchema>;
type PoslSchemaFieldType = keyof PoslSchemaInfertype;

export interface ClearFieldParamsInteface {
  field: PoslSchemaFieldType;
  value: string | boolean;
}

export interface PoslFormInterface {
  onSubmit: (_: PoslSchemaInfertype) => void;
  isDisabled?: boolean;
}

export const PoslForm = (props: PoslFormInterface) => {
  const { onSubmit, isDisabled = false } = props;

  const { control, handleSubmit } = useFormContext<PoslSchemaInfertype>();

  const showErrors = useCallback((errors: FieldErrors, pathPrefix = '') => {
    Object.entries(errors).forEach(([key, value]) => {
      const path = pathPrefix ? `${pathPrefix}.${key}` : key;

      if (value?.message) {
        toast.error(`Campo: ${path}, Erro: ${value.message}`);
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
        className="mt-6 flex flex-col gap-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold">Curso de Liderança Juvenil - CLJ</h1>
          <p>Secretariado Diocesano de Novo Hamburgo</p>
          <h2 className="text-lg font-semibold">FICHA DE CANDIDATO(A) AO CLJ I</h2>
        </div>

        <SessionForm title="Dados da ficha:">
          <div className="grid grid-cols-1 gap-4">
            <FieldDefault
              disabled={isDisabled}
              id="recordNumber"
              control={control}
              label="Número da ficha"
            />
            <FieldDefault
              disabled={isDisabled}
              id="parishAcronym"
              control={control}
              label="Sigla da paróquia/capela"
            />
          </div>
        </SessionForm>

        <SessionForm title="Dados do(a) Candidato(a):">
          <div className="grid grid-cols-1 gap-4">
            <FieldDefault
              disabled={isDisabled}
              id="candidateName"
              control={control}
              label="Nome Cursista"
            />
            <FieldDefault disabled={isDisabled} id="nickname" control={control} label="Apelido" />
            <FieldDefault
              disabled={isDisabled}
              id="candidatePhone"
              control={control}
              onChange={(e) => formatMobilePhone(e)}
              label="Telefone Cursista"
            />
            <FieldDefault disabled={isDisabled} id="priest" control={control} label="Pároco" />
            <div>
              <p>Data de Nascimento</p>
              <FieldDefault disabled={isDisabled} id="birthDate" control={control} type="date" />
            </div>
            <FieldDefault
              disabled={isDisabled}
              id="instagram"
              control={control}
              label="Instagram"
            />
            <FieldDefault
              disabled={isDisabled}
              id="parishChapel"
              control={control}
              label="Paróquia/Capela"
            />
          </div>
        </SessionForm>

        <SessionForm title="Padrinho:">
          <div className="grid grid-cols-1 gap-4">
            <FieldDefault
              disabled={isDisabled}
              id="recordPOSl.godfatherName"
              control={control}
              label="Nome Padrinho"
            />
            <FieldDefault
              disabled={isDisabled}
              id="recordPOSl.godfatherPhone"
              control={control}
              onChange={(e) => formatMobilePhone(e)}
              label="Telefone Padrinho"
            />
            <FieldDefault
              disabled={isDisabled}
              id="recordPOSl.godfatherEmail"
              control={control}
              label="Email Padrinho"
            />
            <FieldDefault
              disabled={isDisabled}
              id="recordPOSl.affinityWithGodfather"
              control={control}
              label="A quanto tempo conhece o afilhado(a)?"
            />
            <div>
              <p>
                Comunicou ao candidato sobre as atitudes que deverá ter na participação do curso?
              </p>
              <FieldDefault
                disabled={isDisabled}
                id="recordPOSl.attitudeCommunication"
                control={control}
                label="-"
              />
            </div>
            <div>
              <p>
                Comunicou ao candidato que aceitar participar do curso significa aceitar
                integralmente a Doutrina da Igreja Católica?
              </p>
              <FieldDefault
                disabled={isDisabled}
                id="recordPOSl.doctrineCommunication"
                control={control}
                label="-"
              />
            </div>
            <div>
              <p>O padrinho sabe que não pode ocultar nada importante nesta ficha?</p>
              <FieldDefault
                disabled={isDisabled}
                id="recordPOSl.godfatherResponsibility"
                control={control}
                label="-"
              />
            </div>
          </div>
        </SessionForm>

        <SessionForm title="Informações Pessoais:">
          <div className="grid grid-cols-1 gap-4">
            <FieldSetRadio
              disabled={isDisabled}
              control={control}
              id="recordPOSl.candidateSpirit"
              label="Ânimo"
              options={[
                { value: 'timido', label: 'Tímido' },
                { value: 'Ponderado', label: 'Ponderado' },
                { value: 'extrovertido', label: 'Extrovertido' },
              ]}
            />
            <FieldSetRadio
              disabled={isDisabled}
              control={control}
              id="recordPOSl.candidateDisposition"
              label="Disposição"
              options={[
                { value: 'retraido', label: 'Retraído' },
                { value: 'facilComunicacao', label: 'Fácil Comunicação' },
                { value: 'muitoComunicativo', label: 'Muito Comunicativo' },
              ]}
            />
            <FieldSetRadio
              disabled={isDisabled}
              control={control}
              id="recordPOSl.candidateParticipation"
              label="Participação"
              options={[
                { value: 'semIniciativa', label: 'Sem Iniciativa' },
                { value: 'iniciativaEmPartes', label: 'Iniciativa em Partes' },
                { value: 'totalParticipacao', label: 'Total Participação' },
              ]}
            />
            <FieldSetRadio
              disabled={isDisabled}
              control={control}
              id="recordPOSl.fatherSituation"
              label="Quanto ao Pai"
              options={[
                { value: 'falecido', label: 'Falecido' },
                { value: 'separadoDivorciado', label: 'Separado/Divorciado' },
                { value: 'padrasto', label: 'Padrasto' },
              ]}
            />
            <FieldSetRadio
              disabled={isDisabled}
              control={control}
              id="recordPOSl.motherSituation"
              label="Quanto à Mãe"
              options={[
                { value: 'falecida', label: 'Falecida' },
                { value: 'separadaDivorciada', label: 'Separada/Divorciada' },
                { value: 'madrasta', label: 'Madrasta' },
              ]}
            />
            <ParentsFields isDisabled={isDisabled} />
            <ParentsReligionFields isDisabled={isDisabled} />

            <FieldTextarea
              id="recordPOSl.parentsComment"
              label="Comentário dos pais"
              control={control}
              disabled={isDisabled}
              placeholder="Comentário dos Pais"
              className="border border-neutral-200"
            />
          </div>
        </SessionForm>

        <SessionForm title="Religiosos: ">
          <FieldSetCheckbox
            disabled={isDisabled}
            control={control}
            id="spiritualLife"
            label="Sacramentos"
            options={[
              { id: 'batismo', label: 'Batismo' },
              { id: 'comumhao', label: 'Comunhão' },
              { id: 'crisma', label: 'Crisma' },
              { id: 'confissaoFrequente', label: 'Confissão Frequente' },
              { id: 'missaDominicalFrequente', label: 'Missa Dominical Frequente' },
            ]}
            observation="OBS: Caso não tenha feito a 1ª Eucaristia, fazê-la antes do Curso, juntamente com
                Diretor Espiritual Paroquial . Caso pratica ou tenha praticado outra religião ou
                confissão religiosa, procurar, junto do pároco, antes do curso, a Profissão de Fé."
          />
        </SessionForm>

        <SessionForm title="Observações:">
          <div className="grid grid-cols-1 gap-4">
            <FieldDefault
              disabled={isDisabled}
              id="observationsCoordinator"
              control={control}
              label="Observações do coordenador:"
            />
            <FieldDefault
              disabled={isDisabled}
              id="observationsDed"
              control={control}
              label="Diretor Espiritual"
            />
          </div>
        </SessionForm>

        <SessionForm title="Saúde:">
          <div className="grid grid-cols-1 gap-4">
            <DiseaseFields isDisabled={isDisabled} />
            <MedicationFields isDisabled={isDisabled} />

            <FieldDefault
              disabled={isDisabled}
              id="allergy"
              label="Tem algum tipo de alergia (medicamentos, alimentos, etc.)?"
              control={control}
            />
          </div>
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
          <Button type="submit" className="mt-3 mb-2 w-full">
            Enviar
          </Button>
        )}
      </form>
    </div>
  );
};
