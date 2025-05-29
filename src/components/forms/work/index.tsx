'use client';

import { Button } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Grid, Stack, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
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
import { coursesTakenData, instrumentData, workPreferenceData } from '@/constants';
import { formatMobilePhone } from '@/helpers';
import { teamWorkSchema } from '@/yup';

type WorkSchemaInfertype = InferType<typeof teamWorkSchema>;

export const TeamWorkForm: React.FC = () => {
  const navigate = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WorkSchemaInfertype>({
    resolver: yupResolver(teamWorkSchema),
  });
  const areConfirmed = watch('areConfirmed');
  const wouldToBeConfirmed = watch('wouldToBeConfirmed');
  const playAnyInstrument = watch('playAnyInstrument');
  const reasonWorkCourse = !!errors.reasonWorkCourse;

  const onSubmit = (data: WorkSchemaInfertype) => {
    console.log(data);
  };

  return (
    <Container maxWidth="md" sx={{ pb: '5%' }}>
      <Button className="w-fit" onClick={() => navigate.back()}>
        <BiChevronLeft />
        Voltar
      </Button>
      <Stack flexDirection="column" spacing={4} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack flexDirection="column" pt={4} sx={{ textAlign: 'center' }}>
          <Typography component="h1" variant="h4">
            Curso de Liderança Juvenil - CLJ
          </Typography>
          <Typography>Secretariado Diocesano de Novo Hamburgo</Typography>
          <Typography variant="h6">FICHA DE CANDIDATO(A) AO CLJ I</Typography>
        </Stack>

        <SessionForm title="Dados da ficha:">
          <Grid container spacing={2}>
            <Grid size={12}>
              <FieldDefault
                id="recordNumber"
                control={control}
                defaultValue=""
                label="Número da ficha"
              />
            </Grid>
            <Grid size={12}>
              <FieldDefault
                id="parishAcronym"
                control={control}
                defaultValue=""
                label="Sigla da paróquia/capela"
              />
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Dados do(a) Candidato(a):">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault id="studentName" control={control} defaultValue="" label="Nome" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault id="nickname" control={control} defaultValue="" label="Apelido" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault
                id="studentPhone"
                control={control}
                defaultValue=""
                onChange={(e) => formatMobilePhone(e)}
                label="Telefone"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault id="parishPriest" control={control} defaultValue="" label="Pároco" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault id="rg" control={control} defaultValue="" label="RG/CN" />
            </Grid>
            <Grid size={12}>
              <Typography>Data de Nascimento</Typography>
              <FieldDefault
                id="birthDate"
                control={control}
                defaultValue=""
                type="date"
                variant="filled"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault id="instagram" control={control} defaultValue="" label="Instagram" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault id="parish" control={control} defaultValue="" label="Paróquia/Capela" />
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Outras informações:">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldSetCheckbox
                control={control}
                id="coursesTaken"
                label="Referente a Cursos que fez"
                options={coursesTakenData}
              />
            </Grid>
            {/* <Grid size={{ xs: 12, sm: 6 }}>
            <FieldSetCheckbox
                control={control}
                id="coursesNumbers"
                label="coursesNumbers"
                options={coursesTakenData}
              />
            </Grid> */}
            {/* <Grid size={12}>
            <FieldSetCheckbox
                control={control}
                id="coursesPositions"
                label="coursesPositions"
                options={coursesTakenData}
              />
            </Grid> */}
            <Grid size={12}>
              <Typography>
                Você é consciente de que é necessário estar em estado de graça (confessado) para
                participar da equipe de trabalho?
              </Typography>
              <FieldDefault
                id="termStateGraceConfessed"
                control={control}
                defaultValue=""
                label="-"
              />
            </Grid>
            <Grid size={12}>
              <Typography>
                Você é consciente de que falsificar informações na ficha de trabalho é prejudicial
                para sua vida e para o curso?
              </Typography>
              <FieldDefault id="termNoFakeData" control={control} defaultValue="" label="-" />
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Grupo paroquial:">
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography>
                Você é consciente de que o testemunho de vida fora do curso é essencial para o êxito
                do curso?
              </Typography>
              <FieldDefault id="termLifeTestimony" control={control} defaultValue="" label="-" />
            </Grid>
            <Grid size={12}>
              <FieldDefault
                id="currentRoleParishGroup"
                control={control}
                defaultValue=""
                label="Atual função no grupo"
              />
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Vida Espiritual:">
          <Grid container spacing={2}>
            {/* <Grid size={12}>
            <FieldSetCheckbox
            control={control}
            id="lifeSpiritualStyle"
            label="lifeSpiritualStyle"
            options={livesWithData}
            />
            </Grid> */}
            <Grid size={12}>
              <FieldSetConsentCheckbox id="areConfirmed" control={control} label="É Crismado?" />
              {areConfirmed === false && (
                <FieldSetConsentCheckbox
                  id="wouldToBeConfirmed"
                  control={control}
                  label="Em caso negativo, está fazendo a catequese de Crisma?"
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
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Instrumento:">
          <Grid container size={12}>
            <FieldSetConsentCheckbox
              id="playAnyInstrument"
              control={control}
              label="Toca algum instrumento?"
            />
            {playAnyInstrument && (
              <FieldSetRadio
                control={control}
                id="instrument"
                label="Qual Instrumento?"
                options={instrumentData}
              />
            )}
          </Grid>
        </SessionForm>

        <SessionForm title="Razões para fazer o curso:">
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography color={reasonWorkCourse ? red[700] : 'inherit'}>
                Por que deseja trabalhar neste curso?
              </Typography>
              <Controller
                name="reasonWorkCourse"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FieldTextarea
                    {...field}
                    minRows={3}
                    placeholder="Digite aqui"
                    sx={{
                      ...(reasonWorkCourse && {
                        borderColor: red[700],
                      }),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid size={12}>
              <FieldSetRadio
                control={control}
                id="workPreference"
                label="Preferência de trabalho neste curso"
                options={workPreferenceData}
              />
            </Grid>
            <Grid size={12}>
              <FieldSetConsentCheckbox
                id="anotherRoleIfNecessary"
                control={control}
                label="Está disposto a exercer outra função, caso seja  necessário?"
              />
            </Grid>
            <Grid size={12}>
              <FieldSetConsentCheckbox
                id="dataConsent"
                control={control}
                label="Declaro estar ciente de que meus dados, presentes nessa ficha, serão utilizados única e exclusivamente para o curso."
              />
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Coordenação Paroquial:">
          <Grid container spacing={2}>
            {/* <Grid size={12}>
            <FieldSetCheckbox
            control={control}
            id="parishCoordinationIndications"
            label="parishCoordinationIndications"
            options={parishCoordinationIndications}
            />
            </Grid> */}
            <Grid size={12}>
              <FieldDefault
                id="coordinationObservations"
                control={control}
                defaultValue=""
                label="Observações Coordenação"
              />
            </Grid>
            <Grid size={12}>
              <FieldDefault
                id="DEPObservation"
                control={control}
                defaultValue=""
                label="Observação do DEP"
              />
            </Grid>
            <Grid size={12}>
              <Typography fontWeight={700}>
                Coordenação e pároco: no caso deste jovem não ser exemplo de perseverança no grupo e
                ausente na missa dominical, não assine a
              </Typography>
            </Grid>
          </Grid>
        </SessionForm>

        <Button type="submit" className="mt-3 mb-2 w-full">
          Enviar
        </Button>
      </Stack>
    </Container>
  );
};
