'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import type { Control, UseFormHandleSubmit, UseFormSetValue, UseFormWatch } from 'react-hook-form';
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
import {
  aboutFatherData,
  aboutMotherData,
  dispositionData,
  hasDiseaseData,
  livesWithData,
  moodData,
  parentsReligionData,
  participationData,
  sacramentsData,
  takesMedicationData,
} from '@/constants';
import { formatMobilePhone } from '@/helpers';
import type { poslSchema } from '@/yup';

type PoslSchemaInfertype = InferType<typeof poslSchema>;
type PoslSchemaFieldType = keyof PoslSchemaInfertype;

interface ClearFieldParamsInteface {
  field: PoslSchemaFieldType;
  value: string | boolean;
}

interface Pos1FormInterface {
  onSubmit: (_: PoslSchemaInfertype) => void;
  control: Control<PoslSchemaInfertype>;
  watch: UseFormWatch<PoslSchemaInfertype>;
  setValue: UseFormSetValue<PoslSchemaInfertype>;
  handleSubmit: UseFormHandleSubmit<PoslSchemaInfertype>;
  isDisabled?: boolean;
}

export const Pos1Form = ({
  control,
  onSubmit,
  watch,
  setValue,
  handleSubmit,
  isDisabled = false,
}: Pos1FormInterface) => {
  const navigate = useRouter();

  const livesWith = watch('livesWith');
  const parentsReligion = watch('parentsReligion');
  const hasDisease = watch('hasDisease');
  const takesMedication = watch('takesMedication');

  const disease = watch('disease');
  const medication = watch('medication');
  const id = watch('id');

  function clearField({ field, value }: ClearFieldParamsInteface) {
    setValue(field, value);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20">
      <button onClick={() => navigate.back()} className="flex items-center gap-1 text-blue-600">
        <BiChevronLeft className="text-xl" />
        Voltar
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold">Curso de Liderança Juvenil - CLJ I</h1>
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
              defaultValue=""
              onChange={(e) => formatMobilePhone(e)}
              label="Telefone Cursista"
            />
            <FieldDefault disabled={isDisabled} id="priest" control={control} label="Pároco" />
            <FieldDefault disabled={isDisabled} id="document" control={control} label="RG" />
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

        <SessionForm title="Padrinho: ">
          <div className="grid grid-cols-1 gap-4">
            <FieldDefault
              disabled={isDisabled}
              id="godfatherName"
              control={control}
              label="Nome Padrinho"
            />
            <FieldDefault
              disabled={isDisabled}
              id="godfatherPhone"
              control={control}
              defaultValue=""
              onChange={(e) => formatMobilePhone(e)}
              label="Telefone Padrinho"
            />
            <FieldDefault
              disabled={isDisabled}
              id="godfatherEmail"
              control={control}
              label="Email Padrinho"
            />
            <FieldDefault
              disabled={isDisabled}
              id="affinityWithGodfather"
              control={control}
              defaultValue=""
              label="A quanto tempo conhece o afilhado(a)?"
            />
            <div>
              <p>
                Comunicou ao candidato sobre as atitudes que deverá ter na participação do curso?
              </p>
              <FieldDefault
                disabled={isDisabled}
                id="attitudeCommunication"
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
                id="doctrineCommunication"
                control={control}
                label="-"
              />
            </div>
            <div>
              <p>O padrinho sabe que não pode ocultar nada importante nesta ficha?</p>
              <FieldDefault
                disabled={isDisabled}
                id="godfatherResponsibility"
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
              id="candidateSpirit"
              label="Ânimo"
              options={moodData}
            />
            <FieldSetRadio
              disabled={isDisabled}
              control={control}
              defaultValue=""
              id="candidateDisposition"
              label="Disposição"
              options={dispositionData}
            />
            <FieldSetRadio
              disabled={isDisabled}
              control={control}
              defaultValue=""
              id="candidateParticipation"
              label="Participação"
              options={participationData}
            />
            <FieldSetRadio
              disabled={isDisabled}
              control={control}
              defaultValue=""
              id="fatherSituation"
              label="Quanto ao Pai"
              options={aboutFatherData}
            />
            <FieldSetRadio
              disabled={isDisabled}
              control={control}
              defaultValue=""
              id="motherSituation"
              label="Quanto à Mãe"
              options={aboutMotherData}
            />
            <div>
              <FieldSetCheckbox
                disabled={isDisabled}
                control={control}
                id="livesWith"
                label="Mora com"
                options={livesWithData}
              />
              {livesWith && livesWith.includes('outro') && (
                <FieldDefault disabled={isDisabled} id="otherWho" control={control} label="Quem" />
              )}
            </div>
            <div>
              <FieldSetRadio
                disabled={isDisabled}
                control={control}
                defaultValue=""
                id="parentsReligion"
                label="Religião dos Pais"
                options={parentsReligionData}
              />
              {parentsReligion && parentsReligion.includes('outro') && (
                <FieldDefault
                  disabled={isDisabled}
                  id="otherReligion"
                  control={control}
                  defaultValue=""
                  label="Outra Religião Associada"
                />
              )}
            </div>
            <FieldTextarea
              id="parentsComment"
              label="Comentário dos pais"
              control={control}
              disabled={isDisabled}
              placeholder="Comentário dos Pais"
              className="border border-neutral-200"
            />
          </div>
        </SessionForm>

        <SessionForm title="Religiosos: ">
          <div className="grid grid-cols-1">
            <FieldSetCheckbox
              disabled={isDisabled}
              control={control}
              id="spiritualLife"
              label="Sacramentos"
              options={sacramentsData}
            />
            <div>
              <p className="font-[700]">
                OBS: Caso não tenha feito a 1ª Eucaristia, fazê-la antes do Curso, juntamente com
                Diretor Espiritual Paroquial . Caso pratica ou tenha praticado outra religião ou
                confissão religiosa, procurar, junto do pároco, antes do curso, a Profissão de Fé.
              </p>
            </div>
          </div>
        </SessionForm>

        <SessionForm title="Observação:">
          <div className="grid grid-cols-1 gap-4">
            {/* <FieldDefault disabled={isDisabled}
                id="preParishCoordinator"
                control={control}
                defaultValue=""
                label="Dep Pré e Cord Paroquial"
              /> */}
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
            <div>
              <FieldSetRadio
                disabled={isDisabled}
                control={control}
                id="hasDisease"
                label="Tem Doença"
                defaultValue={disease ? hasDiseaseData[0].id : hasDiseaseData[1].id}
                options={hasDiseaseData}
                customOnChange={(e) => {
                  if (e === 'nao') {
                    clearField({ field: 'disease', value: '' });
                  }
                }}
              />
              {hasDisease && hasDisease.includes('sim') && (
                <FieldDefault disabled={isDisabled} id="disease" control={control} label="Doença" />
              )}
            </div>
            <div>
              <FieldSetRadio
                disabled={isDisabled}
                control={control}
                id="takesMedication"
                label="Toma Medicação"
                defaultValue={medication ? takesMedicationData[0].id : takesMedicationData[1].id}
                options={takesMedicationData}
                customOnChange={(e) => {
                  if (e === 'nao') {
                    clearField({ field: 'medication', value: '' });
                  }
                }}
              />
              {takesMedication && takesMedication.includes('sim') && (
                <FieldDefault
                  disabled={isDisabled}
                  id="medication"
                  control={control}
                  label="Medicação"
                />
              )}
            </div>

            <FieldDefault disabled={isDisabled} id="allergy" label="Alergia" control={control} />
          </div>
        </SessionForm>

        <SessionForm title="Consentimento de dados:">
          <div className="w-full">
            <FieldSetConsentCheckbox
              description="Declaro estar ciente de que meus dados, presentes nessa ficha, serão utilizados única e exclusivamente para o curso."
              disabled={isDisabled}
              id="dataConsent"
              control={control}
            />
          </div>
        </SessionForm>

        {!isDisabled ? (
          <Button type="submit" className="mt-3 mb-2 w-full">
            Enviar
          </Button>
        ) : (
          <Link href={`/record/pos-l/edit?id=${id}`}>
            <Button type="button">Editar ficha</Button>
          </Link>
        )}
      </form>
    </div>
  );
};
