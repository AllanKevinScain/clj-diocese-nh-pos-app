'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BiChevronLeft } from 'react-icons/bi';
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
import { teamWorkSchema } from '@/yup';

type WorkSchemaInfertype = InferType<typeof teamWorkSchema>;

export const TeamWorkForm: React.FC = () => {
  const navigate = useRouter();

  const { control, handleSubmit, watch } = useForm<WorkSchemaInfertype>({
    resolver: yupResolver(teamWorkSchema),
  });
  const areConfirmed = watch('areConfirmed');
  const wouldToBeConfirmed = watch('wouldToBeConfirmed');
  const playAnyInstrument = watch('playAnyInstrument');

  const onSubmit = (data: WorkSchemaInfertype) => {
    console.log(data);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-[5%]">
      <Button className="flex w-fit items-center gap-1" onClick={() => navigate.back()}>
        <BiChevronLeft />
        Voltar
      </Button>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Curso de Liderança Juvenil - CLJ</h1>
          <p>Secretariado Diocesano de Novo Hamburgo</p>
          <h2 className="text-xl font-semibold">FICHA DE CANDIDATO(A) AO CLJ I</h2>
        </div>

        <SessionForm title="Dados da ficha:">
          <div className="grid grid-cols-1 gap-4">
            <FieldDefault
              id="recordNumber"
              control={control}
              defaultValue=""
              label="Número da ficha"
            />
            <FieldDefault
              id="parishAcronym"
              control={control}
              defaultValue=""
              label="Sigla da paróquia/capela"
            />
          </div>
        </SessionForm>

        <SessionForm title="Dados do(a) Candidato(a):">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FieldDefault id="studentName" control={control} defaultValue="" label="Nome" />
            <FieldDefault id="nickname" control={control} defaultValue="" label="Apelido" />
            <FieldDefault
              id="studentPhone"
              control={control}
              defaultValue=""
              onChange={(e) => formatMobilePhone(e)}
              label="Telefone"
            />
            <FieldDefault id="parishPriest" control={control} defaultValue="" label="Pároco" />
            <FieldDefault id="rg" control={control} defaultValue="" label="RG/CN" />
            <div className="col-span-full">
              <p className="font-medium">Data de Nascimento</p>
              <FieldDefault id="birthDate" control={control} defaultValue="" type="date" />
            </div>
            <FieldDefault id="instagram" control={control} defaultValue="" label="Instagram" />
            <FieldDefault id="parish" control={control} defaultValue="" label="Paróquia/Capela" />
          </div>
        </SessionForm>

        <SessionForm title="Outras informações:">
          <div className="grid grid-cols-1 gap-4">
            <FieldSetCheckbox
              control={control}
              id="coursesTaken"
              label="Referente a Cursos que fez"
              options={[
                { id: 'CLJI', label: 'CLJ I' },
                { id: 'CLJII', label: 'CLJ II' },
                { id: 'CLJIII', label: 'CLJ III' },
              ]}
            />
            <div>
              <p className="mb-1">
                Você é consciente de que é necessário estar em estado de graça (confessado) para
                participar da equipe de trabalho?
              </p>
              <FieldDefault
                id="termStateGraceConfessed"
                control={control}
                defaultValue=""
                label="-"
              />
            </div>
            <div>
              <p className="mb-1">
                Você é consciente de que falsificar informações na ficha de trabalho é prejudicial
                para sua vida e para o curso?
              </p>
              <FieldDefault id="termNoFakeData" control={control} defaultValue="" label="-" />
            </div>
          </div>
        </SessionForm>

        <SessionForm title="Grupo paroquial:">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="mb-1">
                Você é consciente de que o testemunho de vida fora do curso é essencial para o êxito
                do curso?
              </p>
              <FieldDefault id="termLifeTestimony" control={control} defaultValue="" label="-" />
            </div>
            <FieldDefault
              id="currentRoleParishGroup"
              control={control}
              defaultValue=""
              label="Atual função no grupo"
            />
          </div>
        </SessionForm>

        <SessionForm title="Vida Espiritual:">
          <div className="grid grid-cols-1 gap-4">
            <FieldSetConsentCheckbox
              id="areConfirmed"
              control={control}
              label="É Crismado?"
              description="É Crismado?"
            />
            {areConfirmed === false && (
              <FieldSetConsentCheckbox
                id="wouldToBeConfirmed"
                control={control}
                label="Em caso negativo, está fazendo a catequese de Crisma?"
                description="Em caso negativo, está fazendo a catequese de Crisma?"
              />
            )}
            {wouldToBeConfirmed === false && (
              <FieldDefault
                id="notConfirmatedReason"
                control={control}
                defaultValue=""
                label="Não, por quê?"
              />
            )}
          </div>
        </SessionForm>

        <SessionForm title="Instrumento:">
          <div className="grid grid-cols-1 gap-4">
            <FieldSetConsentCheckbox
              id="playAnyInstrument"
              control={control}
              label="Toca algum instrumento?"
              description="Toca algum instrumento?"
            />
            {playAnyInstrument && (
              <FieldSetRadio
                control={control}
                id="instrument"
                label="Qual Instrumento?"
                options={[
                  { value: 'violao', label: 'Violão' },
                  { value: 'teclado', label: 'Teclado' },
                  { value: 'cajon', label: 'Cajon' },
                ]}
              />
            )}
          </div>
        </SessionForm>

        <SessionForm title="Razões para fazer o curso:">
          <div className="grid grid-cols-1 gap-4">
            <FieldTextarea
              id="reasonWorkCourse"
              control={control}
              label="Por que deseja trabalhar neste curso?"
              placeholder="Digite aqui"
            />
            <FieldSetRadio
              control={control}
              id="workPreference"
              label="Preferência de trabalho neste curso"
              options={[
                { value: 'sala', label: 'Sala' },
                { value: 'cozinha', label: 'Cozinha' },
              ]}
            />
            <FieldSetConsentCheckbox
              id="anotherRoleIfNecessary"
              control={control}
              label="Está disposto a exercer outra função, caso seja  necessário?"
              description="Está disposto a exercer outra função, caso seja  necessário?"
            />
            <FieldSetConsentCheckbox
              id="dataConsent"
              control={control}
              label="Declaro estar ciente de que meus dados, presentes nessa ficha, serão utilizados única e exclusivamente para o curso."
              description="Declaro estar ciente de que meus dados, presentes nessa ficha, serão utilizados única e exclusivamente para o curso."
            />
          </div>
        </SessionForm>

        <SessionForm title="Coordenação Paroquial:">
          <div className="grid grid-cols-1 gap-4">
            <FieldDefault
              id="coordinationObservations"
              control={control}
              defaultValue=""
              label="Observações Coordenação"
            />
            <FieldDefault
              id="DEPObservation"
              control={control}
              defaultValue=""
              label="Observação do DEP"
            />
            <p className="font-bold">
              Coordenação e pároco: no caso deste jovem não ser exemplo de perseverança no grupo e
              ausente na missa dominical, não assine a
            </p>
          </div>
        </SessionForm>

        <Button type="submit" className="mt-3 mb-2 w-full">
          Enviar
        </Button>
      </form>
    </div>
  );
};
