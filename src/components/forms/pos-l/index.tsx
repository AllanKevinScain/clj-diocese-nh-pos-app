"use client";

import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import React from "react";
import { Control, Controller, FieldErrors, UseFormHandleSubmit, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { BiChevronLeft } from "react-icons/bi";
import { InferType } from "yup";

import { FieldDefault, FieldSetCheckbox, FieldSetConsentCheckbox, FieldSetRadio, FieldTextarea, SessionForm } from "@/components";
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
} from "@/constants";
import { formatMobilePhone } from "@/helpers";
import { poslSchema } from "@/yup";

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
}

export const Pos1Form = (props: Pos1FormInterface) => {
  const { control, errors, onSubmit, watch, setValue, handleSubmit } = props;
  const navigate = useRouter();

  const livesWith = watch("livesWith");
  const parentsReligion = watch("parentsReligion");
  const hasDisease = watch("hasDisease");
  const takesMedication = watch("takesMedication");

  const disease = watch("disease");
  const medication = watch("medication");

  const parentsCommentError = !!errors.parentsComment;

  function clearField({ field, value }: ClearFieldParamsInteface) {
    setValue(field, value);
  }

  return (
    <Container maxWidth="md" sx={{ pb: "5%" }}>
      <Button variant="outlined" sx={{ width: "fit-content" }} startIcon={<BiChevronLeft />} onClick={() => navigate.back()}>
        Voltar
      </Button>
      <Stack flexDirection="column" spacing={4} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack flexDirection="column" pt={4} sx={{ textAlign: "center" }}>
          <Typography component="h1" variant="h4">
            Curso de Liderança Juvenil - CLJ I
          </Typography>
          <Typography>Secretariado Diocesano de Novo Hamburgo</Typography>
          <Typography variant="h6">FICHA DE CANDIDATO(A) AO CLJ I</Typography>
        </Stack>

        <SessionForm title="Dados da ficha:">
          <Grid container spacing={2}>
            <Grid size={12}>
              <FieldDefault id="recordNumber" control={control} defaultValue="" label="Número da ficha" />
            </Grid>
            <Grid size={12}>
              <FieldDefault id="parishAcronym" control={control} defaultValue="" label="Sigla da paróquia/capela" />
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Dados do(a) Candidato(a):">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault id="candidateName" control={control} defaultValue="" label="Nome Cursista" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault id="nickname" control={control} defaultValue="" label="Apelido" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault id="candidatePhone" control={control} defaultValue="" onChange={(e) => formatMobilePhone(e)} label="Telefone Cursista" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault id="priest" control={control} defaultValue="" label="Pároco" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault id="document" control={control} defaultValue="" label="RG" />
            </Grid>
            <Grid size={12}>
              <Typography>Data de Nascimento</Typography>
              <FieldDefault id="birthDate" control={control} defaultValue="" type="date" variant="filled" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault id="instagram" control={control} defaultValue="" label="Instagram" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault id="parishChapel" control={control} defaultValue="" label="Paróquia/Capela" />
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Padrinho: ">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault id="godfatherName" control={control} defaultValue="" label="Nome Padrinho" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault id="godfatherPhone" control={control} defaultValue="" onChange={(e) => formatMobilePhone(e)} label="Telefone Padrinho" />
            </Grid>
            <Grid size={12}>
              <FieldDefault id="godfatherEmail" control={control} defaultValue="" label="Email Padrinho" />
            </Grid>
            <Grid size={12}>
              <FieldDefault id="affinityWithGodfather" control={control} defaultValue="" label="A quanto tempo conhece o afilhado(a)?" />
            </Grid>
            <Grid size={12}>
              <Typography>Comunicou ao candidato sobre as atitudes que deverá ter na participação do curso?</Typography>
              <FieldDefault id="attitudeCommunication" control={control} defaultValue="" label="-" />
            </Grid>
            <Grid size={12}>
              <Typography>
                Comunicou ao candidato que aceitar participar do curso significa aceitar integralmente a Doutrina da Igreja Católica?
              </Typography>
              <FieldDefault id="doctrineCommunication" control={control} defaultValue="" label="-" />
            </Grid>
            <Grid size={12}>
              <Typography>O padrinho sabe que não pode ocultar nada importante nesta ficha?</Typography>
              <FieldDefault id="godfatherResponsibility" control={control} defaultValue="" label="-" />
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Informações Pessoais:">
          <Grid container spacing={2}>
            <Grid size={12}>
              <FieldSetRadio control={control} defaultValue="" id="candidateSpirit" label="Ânimo" options={moodData} />
            </Grid>
            <Grid size={12}>
              <FieldSetRadio control={control} defaultValue="" id="candidateDisposition" label="Disposição" options={dispositionData} />
            </Grid>
            <Grid size={12}>
              <FieldSetRadio control={control} defaultValue="" id="candidateParticipation" label="Participação" options={participationData} />
            </Grid>
            <Grid size={12}>
              <FieldSetRadio control={control} defaultValue="" id="fatherSituation" label="Quanto ao Pai" options={aboutFatherData} />
            </Grid>
            <Grid size={12}>
              <FieldSetRadio control={control} defaultValue="" id="motherSituation" label="Quanto à Mãe" options={aboutMotherData} />
            </Grid>
            <Grid size={12}>
              <FieldSetCheckbox control={control} id="livesWith" label="Mora com" options={livesWithData} />
              {livesWith && livesWith.includes("outro") && (
                <FieldDefault id="otherWho" control={control} defaultValue="" label="Quem" variant="standard" />
              )}
            </Grid>
            <Grid size={12}>
              <FieldSetRadio control={control} defaultValue="" id="parentsReligion" label="Religião dos Pais" options={parentsReligionData} />
              {parentsReligion && parentsReligion.includes("outro") && (
                <FieldDefault id="otherReligion" control={control} defaultValue="" label="Outra Religião Associada" variant="standard" />
              )}
            </Grid>
            <Grid size={12}>
              <Typography color={parentsCommentError ? red[700] : "inherit"}>Comentário dos pais</Typography>
              <Controller
                name="parentsComment"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FieldTextarea
                    {...field}
                    minRows={3}
                    placeholder="Comentário dos Pais"
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
              <FieldSetCheckbox control={control} id="spiritualLife" label="Sacramentos" options={sacramentsData} />
            </Grid>
            <Grid size={12}>
              <Typography fontWeight={700}>
                OBS: Caso não tenha feito a 1ª Eucaristia, fazê-la antes do Curso, juntamente com Diretor Espiritual Paroquial . Caso pratica ou tenha
                praticado outra religião ou confissão religiosa, procurar, junto do pároco, antes do curso, a Profissão de Fé.
              </Typography>
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Observação:">
          <Grid container spacing={2}>
            {/* <Grid size={12}>
              <FieldDefault
                id="preParishCoordinator"
                control={control}
                defaultValue=""
                label="Dep Pré e Cord Paroquial"
              />
            </Grid> */}
            <Grid size={12}>
              <FieldDefault id="observationsDed" control={control} defaultValue="" label="Diretor Espiritual" />
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Saúde:">
          <Grid container spacing={2}>
            <Grid size={12}>
              <FieldSetRadio
                control={control}
                id="hasDisease"
                label="Tem Doença"
                defaultValue={disease ? hasDiseaseData[0].id : hasDiseaseData[1].id}
                options={hasDiseaseData}
                customOnChange={(e) => {
                  if (e.target.value === "nao") {
                    clearField({ field: "disease", value: "" });
                  }
                }}
              />
              {hasDisease && hasDisease.includes("sim") && (
                <FieldDefault id="disease" control={control} defaultValue="" label="Doença" variant="standard" />
              )}
            </Grid>
            <Grid size={12}>
              <FieldSetRadio
                control={control}
                id="takesMedication"
                label="Toma Medicação"
                defaultValue={medication ? takesMedicationData[0].id : takesMedicationData[1].id}
                options={takesMedicationData}
                customOnChange={(e) => {
                  if (e.target.value === "nao") {
                    clearField({ field: "medication", value: "" });
                  }
                }}
              />
              {takesMedication && takesMedication.includes("sim") && (
                <FieldDefault id="medication" control={control} defaultValue="" label="Medicação" variant="standard" />
              )}
            </Grid>

            <Grid size={12}>
              <FieldDefault id="allergy" label="Alergia" control={control} defaultValue="" />
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Consentimento de dados:">
          <Grid container size={12}>
            <FieldSetConsentCheckbox
              id="dataConsent"
              control={control}
              label="Declaro estar ciente de que meus dados, presentes nessa ficha, serão utilizados única e exclusivamente para o curso."
            />
          </Grid>
        </SessionForm>

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Enviar
        </Button>
      </Stack>
    </Container>
  );
};
