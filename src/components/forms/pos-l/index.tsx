"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { BiChevronLeft } from "react-icons/bi";
import { InferType } from "yup";

import {
  FieldDefault,
  FieldSetCheckbox,
  FieldSetConsentCheckbox,
  FieldSetRadio,
  FieldTextarea,
  SessionForm,
} from "@/components";
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
import { pos1Schema } from "@/yup";

type Pos1SchemaInfertype = InferType<typeof pos1Schema>;

export const Pos1Form: React.FC = () => {
  const navigate = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Pos1SchemaInfertype>({
    resolver: yupResolver(pos1Schema),
  });
  const livesWith = watch("livesWith");
  const parentsReligion = watch("parentsReligion");
  const hasDisease = watch("hasDisease");
  const takesMedication = watch("takesMedication");

  const parentsCommentError = !!errors.parentsComment;

  const onSubmit = (data: Pos1SchemaInfertype) => {
    console.log(data);
  };

  return (
    <Container maxWidth="md" sx={{ pb: "5%" }}>
      <Button
        variant="outlined"
        sx={{ width: "fit-content" }}
        startIcon={<BiChevronLeft />}
        onClick={() => navigate.back()}
      >
        Voltar
      </Button>
      <Stack
        flexDirection="column"
        spacing={4}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack flexDirection="column" pt={4} sx={{ textAlign: "center" }}>
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
              <FieldDefault
                id="studentName"
                control={control}
                defaultValue=""
                label="Nome Cursista"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault
                id="nickname"
                control={control}
                defaultValue=""
                label="Apelido"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault
                id="studentPhone"
                control={control}
                defaultValue=""
                onChange={(e) => formatMobilePhone(e)}
                label="Telefone Cursista"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault
                id="parishPriest"
                control={control}
                defaultValue=""
                label="Pároco"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault
                id="rg"
                control={control}
                defaultValue=""
                label="RG"
              />
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
              <FieldDefault
                id="instagram"
                control={control}
                defaultValue=""
                label="Instagram"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault
                id="parish"
                control={control}
                defaultValue=""
                label="Paróquia/Capela"
              />
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Padrinho: ">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault
                id="godfatherName"
                control={control}
                defaultValue=""
                label="Nome Padrinho"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldDefault
                id="godfatherPhone"
                control={control}
                defaultValue=""
                onChange={(e) => formatMobilePhone(e)}
                label="Telefone Padrinho"
              />
            </Grid>
            <Grid size={12}>
              <FieldDefault
                id="godfatherEmail"
                control={control}
                defaultValue=""
                label="Email Padrinho"
              />
            </Grid>
            <Grid size={12}>
              <FieldDefault
                id="intimacyTime"
                control={control}
                defaultValue=""
                label="A quanto tempo conhece o afilhado(a)?"
              />
            </Grid>
            <Grid size={12}>
              <Typography>
                Comunicou ao candidato sobre as atitudes que deverá ter na
                participação do curso?
              </Typography>
              <FieldDefault
                id="participationTerms"
                control={control}
                defaultValue=""
                label="-"
              />
            </Grid>
            <Grid size={12}>
              <Typography>
                Comunicou ao candidato que aceitar participar do curso significa
                aceitar integralmente a Doutrina da Igreja Católica?
              </Typography>
              <FieldDefault
                id="doctrineTerms"
                control={control}
                defaultValue=""
                label="-"
              />
            </Grid>
            <Grid size={12}>
              <Typography>
                O padrinho sabe que não pode ocultar nada importante nesta
                ficha?
              </Typography>
              <FieldDefault
                id="godfatherResponsibility"
                control={control}
                defaultValue=""
                label="-"
              />
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Informações Pessoais:">
          <Grid container spacing={2}>
            <Grid size={12}>
              <FieldSetRadio
                control={control}
                id="mood"
                label="Ânimo"
                options={moodData}
              />
            </Grid>
            <Grid size={12}>
              <FieldSetRadio
                control={control}
                id="disposition"
                label="Disposição"
                options={dispositionData}
              />
            </Grid>
            <Grid size={12}>
              <FieldSetRadio
                control={control}
                id="participation"
                label="Participação"
                options={participationData}
              />
            </Grid>
            <Grid size={12}>
              <FieldSetRadio
                control={control}
                id="aboutFather"
                label="Quanto ao Pai"
                options={aboutFatherData}
              />
            </Grid>
            <Grid size={12}>
              <FieldSetRadio
                control={control}
                id="aboutMother"
                label="Quanto à Mãe"
                options={aboutMotherData}
              />
            </Grid>
            <Grid size={12}>
              <FieldSetCheckbox
                control={control}
                id="livesWith"
                label="Mora com"
                options={livesWithData}
              />
              {livesWith && livesWith.includes("outro") && (
                <FieldDefault
                  id="otherResident"
                  control={control}
                  defaultValue=""
                  label="Quem"
                  variant="standard"
                />
              )}
            </Grid>
            <Grid size={12}>
              <FieldSetRadio
                control={control}
                id="parentsReligion"
                label="Religião dos Pais"
                options={parentsReligionData}
              />
              {parentsReligion && parentsReligion.includes("outro") && (
                <FieldDefault
                  id="otherReligion"
                  control={control}
                  defaultValue=""
                  label="Outra Religião Associada"
                  variant="standard"
                />
              )}
            </Grid>
            <Grid size={12}>
              <Typography color={parentsCommentError ? red[700] : "inherit"}>
                Comentário dos pais
              </Typography>
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
              <FieldSetCheckbox
                control={control}
                id="sacraments"
                label="Sacramentos"
                options={sacramentsData}
              />
            </Grid>
            <Grid size={12}>
              <Typography fontWeight={700}>
                OBS: Caso não tenha feito a 1ª Eucaristia, fazê-la antes do
                Curso, juntamente com Diretor Espiritual Paroquial . Caso
                pratica ou tenha praticado outra religião ou confissão
                religiosa, procurar, junto do pároco, antes do curso, a
                Profissão de Fé.
              </Typography>
            </Grid>
          </Grid>
        </SessionForm>

        <SessionForm title="Observação:">
          <Grid container spacing={2}>
            <Grid size={12}>
              <FieldDefault
                id="preParishCoordinator"
                control={control}
                defaultValue=""
                label="Dep Pré e Cord Paroquial"
              />
            </Grid>
            <Grid size={12}>
              <FieldDefault
                id="spiritualDirector"
                control={control}
                defaultValue=""
                label="Diretor Espiritual"
              />
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
                options={hasDiseaseData}
              />
              {hasDisease && hasDisease.includes("sim") && (
                <FieldDefault
                  id="disease"
                  control={control}
                  defaultValue=""
                  label="Doença"
                  variant="standard"
                />
              )}
            </Grid>
            <Grid size={12}>
              <FieldSetRadio
                control={control}
                id="takesMedication"
                label="Toma Medicação"
                options={takesMedicationData}
              />
              {takesMedication && takesMedication.includes("sim") && (
                <FieldDefault
                  id="medication"
                  control={control}
                  defaultValue=""
                  label="Medicação"
                  variant="standard"
                />
              )}
            </Grid>

            <Grid size={12}>
              <FieldDefault
                id="allergy"
                label="Alergia"
                control={control}
                defaultValue=""
              />
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Enviar
        </Button>
      </Stack>
    </Container>
  );
};
