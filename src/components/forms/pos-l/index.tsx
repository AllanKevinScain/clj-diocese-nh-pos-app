'use client';

import { Button } from '@headlessui/react';
import { Container, Grid, Stack, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import type {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { BiChevronLeft } from 'react-icons/bi';
import type { InferType } from 'yup';

import {
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
  errors: FieldErrors<PoslSchemaInfertype>;
  control: Control<PoslSchemaInfertype>;
  watch: UseFormWatch<PoslSchemaInfertype>;
  setValue: UseFormSetValue<PoslSchemaInfertype>;
  handleSubmit: UseFormHandleSubmit<PoslSchemaInfertype>;
  isDisabled?: boolean;
}

export const Pos1Form = (props: Pos1FormInterface) => {
  const { control, errors, onSubmit, watch, setValue, handleSubmit, isDisabled = false } = props;
  const navigate = useRouter();

  const livesWith = watch('livesWith');
  const parentsReligion = watch('parentsReligion');
  const hasDisease = watch('hasDisease');
  const takesMedication = watch('takesMedication');

  const disease = watch('disease');
  const medication = watch('medication');
  const id = watch('id');

  const parentsCommentError = !!errors.parentsComment;

  function clearField({ field, value }: ClearFieldParamsInteface) {
    setValue(field, value);
  }

  return (
    <Container maxWidth="md" sx={{ pb: '5%' }}>
      <Button className="w-fit" onClick={() => navigate.back()}>
        <BiChevronLeft />
        Voltar
      </Button>
      <Stack flexDirection="column" spacing={4} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack flexDirection="column" pt={4} sx={{ textAlign: 'center' }}>
          <Typography component="h1" variant="h4">
            Curso de Liderança Juvenil - CLJ I
          </Typography>
          <Typography>Secretariado Diocesano de Novo Hamburgo</Typography>
          <Typography variant="h6">FICHA DE CANDIDATO(A) AO CLJ I</Typography>
        </Stack>

        <SessionForm title="Dados da ficha:">
          <Grid container spacing={2}>
            <Grid size={12}>
              <FieldDefault
                disabled={isDisabled}
                id="recordNumber"
                control={control}
                label="Número da ficha"
              />
            </Grid>
            <Grid size={12}>
              <FieldDefault
                disabled={isDisabled}
                id="parishAcronym"
                control={control}
                label="Sigla da paróquia/capela"
              />
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Dados do(a) Candidato(a):">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault
                disabled={isDisabled}
                id="candidateName"
                control={control}
                label="Nome Cursista"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault disabled={isDisabled} id="nickname" control={control} label="Apelido" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault
                disabled={isDisabled}
                id="candidatePhone"
                control={control}
                defaultValue=""
                onChange={(e) => formatMobilePhone(e)}
                label="Telefone Cursista"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault disabled={isDisabled} id="priest" control={control} label="Pároco" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault disabled={isDisabled} id="document" control={control} label="RG" />
            </Grid>
            <Grid size={12}>
              <Typography>Data de Nascimento</Typography>
              <FieldDefault
                disabled={isDisabled}
                id="birthDate"
                control={control}
                type="date"
                variant="filled"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault
                disabled={isDisabled}
                id="instagram"
                control={control}
                label="Instagram"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault
                disabled={isDisabled}
                id="parishChapel"
                control={control}
                label="Paróquia/Capela"
              />
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Padrinho: ">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault
                disabled={isDisabled}
                id="godfatherName"
                control={control}
                label="Nome Padrinho"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault
                disabled={isDisabled}
                id="godfatherPhone"
                control={control}
                defaultValue=""
                onChange={(e) => formatMobilePhone(e)}
                label="Telefone Padrinho"
              />
            </Grid>
            <Grid size={12}>
              <FieldDefault
                disabled={isDisabled}
                id="godfatherEmail"
                control={control}
                label="Email Padrinho"
              />
            </Grid>
            <Grid size={12}>
              <FieldDefault
                disabled={isDisabled}
                id="affinityWithGodfather"
                control={control}
                defaultValue=""
                label="A quanto tempo conhece o afilhado(a)?"
              />
            </Grid>
            <Grid size={12}>
              <Typography>
                Comunicou ao candidato sobre as atitudes que deverá ter na participação do curso?
              </Typography>
              <FieldDefault
                disabled={isDisabled}
                id="attitudeCommunication"
                control={control}
                label="-"
              />
            </Grid>
            <Grid size={12}>
              <Typography>
                Comunicou ao candidato que aceitar participar do curso significa aceitar
                integralmente a Doutrina da Igreja Católica?
              </Typography>
              <FieldDefault
                disabled={isDisabled}
                id="doctrineCommunication"
                control={control}
                label="-"
              />
            </Grid>
            <Grid size={12}>
              <Typography>
                O padrinho sabe que não pode ocultar nada importante nesta ficha?
              </Typography>
              <FieldDefault
                disabled={isDisabled}
                id="godfatherResponsibility"
                control={control}
                label="-"
              />
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Informações Pessoais:">
          <Grid container spacing={2}>
            <Grid size={12}>
              <FieldSetRadio
                disabled={isDisabled}
                control={control}
                id="candidateSpirit"
                label="Ânimo"
                options={moodData}
              />
            </Grid>
            <Grid size={12}>
              <FieldSetRadio
                disabled={isDisabled}
                control={control}
                defaultValue=""
                id="candidateDisposition"
                label="Disposição"
                options={dispositionData}
              />
            </Grid>
            <Grid size={12}>
              <FieldSetRadio
                disabled={isDisabled}
                control={control}
                defaultValue=""
                id="candidateParticipation"
                label="Participação"
                options={participationData}
              />
            </Grid>
            <Grid size={12}>
              <FieldSetRadio
                disabled={isDisabled}
                control={control}
                defaultValue=""
                id="fatherSituation"
                label="Quanto ao Pai"
                options={aboutFatherData}
              />
            </Grid>
            <Grid size={12}>
              <FieldSetRadio
                disabled={isDisabled}
                control={control}
                defaultValue=""
                id="motherSituation"
                label="Quanto à Mãe"
                options={aboutMotherData}
              />
            </Grid>
            <Grid size={12}>
              <FieldSetCheckbox
                disabled={isDisabled}
                control={control}
                id="livesWith"
                label="Mora com"
                options={livesWithData}
              />
              {livesWith && livesWith.includes('outro') && (
                <FieldDefault
                  disabled={isDisabled}
                  id="otherWho"
                  control={control}
                  label="Quem"
                  variant="standard"
                />
              )}
            </Grid>
            <Grid size={12}>
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
                  variant="standard"
                />
              )}
            </Grid>
            <Grid size={12}>
              <Typography color={parentsCommentError ? red[700] : 'inherit'}>
                Comentário dos pais
              </Typography>
              <Controller
                name="parentsComment"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FieldTextarea
                    {...field}
                    disabled={isDisabled}
                    minRows={3}
                    placeholder="Comentário dos Pais"
                    className="border border-neutral-200"
                    sx={{
                      ...(parentsCommentError && {
                        borderColor: red[700],
                      }),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Religiosos: ">
          <Grid container>
            <Grid size={12}>
              <FieldSetCheckbox
                disabled={isDisabled}
                control={control}
                id="spiritualLife"
                label="Sacramentos"
                options={sacramentsData}
              />
            </Grid>
            <Grid size={12}>
              <Typography fontWeight={700}>
                OBS: Caso não tenha feito a 1ª Eucaristia, fazê-la antes do Curso, juntamente com
                Diretor Espiritual Paroquial . Caso pratica ou tenha praticado outra religião ou
                confissão religiosa, procurar, junto do pároco, antes do curso, a Profissão de Fé.
              </Typography>
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Observação:">
          <Grid container spacing={2}>
            {/* <Grid size={12}>
              <FieldDefault disabled={isDisabled}
                id="preParishCoordinator"
                control={control}
                defaultValue=""
                label="Dep Pré e Cord Paroquial"
              />
            </Grid> */}
            <Grid size={12}>
              <FieldDefault
                disabled={isDisabled}
                id="observationsDed"
                control={control}
                label="Diretor Espiritual"
              />
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Saúde:">
          <Grid container spacing={2}>
            <Grid size={12}>
              <FieldSetRadio
                disabled={isDisabled}
                control={control}
                id="hasDisease"
                label="Tem Doença"
                defaultValue={disease ? hasDiseaseData[0].id : hasDiseaseData[1].id}
                options={hasDiseaseData}
                customOnChange={(e) => {
                  if (e.target.value === 'nao') {
                    clearField({ field: 'disease', value: '' });
                  }
                }}
              />
              {hasDisease && hasDisease.includes('sim') && (
                <FieldDefault
                  disabled={isDisabled}
                  id="disease"
                  control={control}
                  label="Doença"
                  variant="standard"
                />
              )}
            </Grid>
            <Grid size={12}>
              <FieldSetRadio
                disabled={isDisabled}
                control={control}
                id="takesMedication"
                label="Toma Medicação"
                defaultValue={medication ? takesMedicationData[0].id : takesMedicationData[1].id}
                options={takesMedicationData}
                customOnChange={(e) => {
                  if (e.target.value === 'nao') {
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
                  variant="standard"
                />
              )}
            </Grid>

            <Grid size={12}>
              <FieldDefault disabled={isDisabled} id="allergy" label="Alergia" control={control} />
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Consentimento de dados:">
          <Grid container size={12}>
            <FieldSetConsentCheckbox
              disabled={isDisabled}
              id="dataConsent"
              control={control}
              label="Declaro estar ciente de que meus dados, presentes nessa ficha, serão utilizados única e exclusivamente para o curso."
            />
          </Grid>
        </SessionForm>

        {!isDisabled && (
          <Button type="submit" className="mt-3 mb-2 w-full">
            Enviar
          </Button>
        )}

        {isDisabled && (
          <Link href={`/record/pos-l/edit?id=${id}`}>
            <Button type="button" className="mt-3 mb-2 w-full">
              Editar ficha
            </Button>
          </Link>
        )}
      </Stack>
    </Container>
  );
};
