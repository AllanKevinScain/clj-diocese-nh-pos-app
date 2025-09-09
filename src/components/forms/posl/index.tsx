'use client';

import React, { useCallback } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import {
  Button,
  Container,
  FieldDefault,
  FieldSetCheckbox,
  FieldSetConsentCheckbox,
  FieldSetRadio,
  FieldTextarea,
  Heading,
  Loading,
  SessionForm,
  Text,
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
  isSending?: boolean;
}

export const PoslForm = (props: PoslFormInterface) => {
  const { onSubmit, isDisabled = false, isSending = false } = props;

  const { control, handleSubmit } = useFormContext<PoslSchemaInfertype>();

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
          <Heading as="h2">FICHA DE CANDIDATO(A) AO CLJ I</Heading>
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
            disabled={isDisabled}
            id="parishAcronym"
            control={control}
            label="Sigla da paróquia/capela"
            onChange={(e) => e.replace(/[0-9]/g, '')}
            maxLength={10}
          />
        </SessionForm>

        <SessionForm title="Dados do(a) Candidato(a):">
          <FieldDefault
            disabled={isDisabled}
            id="candidateName"
            control={control}
            label="Nome Cursista"
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
            label="Telefone Cursista"
          />
          <FieldDefault
            disabled={isDisabled}
            id="priest"
            control={control}
            label="Pároco"
            onChange={(e) => e.replace(/[0-9]/g, '')}
            maxLength={50}
          />
          <FieldDefault
            disabled={isDisabled}
            id="birthDate"
            control={control}
            type="date"
            label="Data de Nascimento"
          />
          <FieldDefault
            disabled={isDisabled}
            id="instagram"
            control={control}
            label="Instagram"
            maxLength={30}
          />
          <FieldDefault
            disabled={isDisabled}
            id="parishChapel"
            control={control}
            label="Paróquia/Capela"
            onChange={(e) => e.replace(/[0-9]/g, '')}
            maxLength={50}
          />
        </SessionForm>

        <SessionForm title="Padrinho:">
          <FieldDefault
            disabled={isDisabled}
            id="recordPOSl.godfatherName"
            control={control}
            label="Nome Padrinho"
            onChange={(e) => e.replace(/[0-9]/g, '')}
            maxLength={50}
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
            maxLength={50}
          />
          <FieldDefault
            disabled={isDisabled}
            id="recordPOSl.attitudeCommunication"
            control={control}
            label="Comunicou ao candidato sobre as atitudes que deverá ter na participação do curso?"
            maxLength={50}
          />
          <FieldDefault
            disabled={isDisabled}
            id="recordPOSl.doctrineCommunication"
            control={control}
            label="Comunicou ao candidato que aceitar participar do curso significa aceitar
                integralmente a Doutrina da Igreja Católica?"
            maxLength={50}
          />
          <FieldDefault
            disabled={isDisabled}
            id="recordPOSl.godfatherResponsibility"
            control={control}
            label="O padrinho sabe que não pode ocultar nada importante nesta ficha?"
            maxLength={50}
          />
        </SessionForm>

        <SessionForm title="Informações Pessoais:">
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
              { value: 'presente', label: 'Presente' },
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
              { value: 'presente', label: 'Presente' },
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
            maxLength={200}
          />
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
          <FieldTextarea
            disabled={isDisabled}
            id="observationsCoordinator"
            control={control}
            label="Observações do coordenador:"
            placeholder="Observações do coordenador"
            maxLength={200}
          />
          <FieldTextarea
            disabled={isDisabled}
            id="observationsDed"
            control={control}
            label="Diretor Espiritual"
            placeholder="Observações do Diretor Espiritual"
            maxLength={200}
          />
        </SessionForm>

        <SessionForm title="Saúde:">
          <DiseaseFields isDisabled={isDisabled} />
          <MedicationFields isDisabled={isDisabled} />

          <FieldDefault
            disabled={isDisabled}
            id="allergy"
            label="Se tiver algum tipo de alergia, qual? (medicamentos, alimentos, etc.)"
            control={control}
            maxLength={100}
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
