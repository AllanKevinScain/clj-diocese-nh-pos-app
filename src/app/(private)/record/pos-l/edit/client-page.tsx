"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { InferType } from "yup";

import { Pos1Form } from "@/components/forms";
import { poslSchema } from "@/yup";

type PoslSchemaInfertype = InferType<typeof poslSchema>;

const valoresPadrao = {
  recordNumber: 1,
  parishAcronym: "C.SC",
  candidateName: "Allan",
  nickname: "Allazin",
  candidatePhone: "51995368765",
  parishChapel: "Capela Santa Cecília",
  document: "5118676948",
  birthDate: "2000-05-04",
  instagram: "@allan_scain",
  godfatherName: "Luiz",
  godfatherPhone: "51999816010",
  godfatherEmail: "luis@gmail.com",
  affinityWithGodfather: "5 anos",
  godfatherResponsibility: "Sim",
  candidateSpirit: "extrovertido",
  candidateDisposition: "facilComunicacao",
  candidateParticipation: "totalParticipacao",
  livesWith: "mae,pai,outro",
  otherWho: "Vó",
  parentsReligion: "outro",
  otherReligion: "Ateus",
  parentsComment: "Gente muito boa",
  spiritualLife: "batismo,comumhao,crisma,confissaoFrequente,missaDominicalFrequente",
  observationsDed: "Gente boa",
  disease: "Doente de amor",
  medication: "Decongex plus",
  allergy: "Picles",
  dataConsent: true,
  priest: "Ezequiel Persch",
  fatherSituation: "separadoDivorciado",
  motherSituation: "separadaDivorciada",
  attitudeCommunication: "Simm",
  doctrineCommunication: "Si",
};

export const RegisterRecordPoslPage = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PoslSchemaInfertype>({
    resolver: yupResolver(poslSchema),
    defaultValues: valoresPadrao,
  });
  console.log("🚀 ~ RegisterRecordPoslPage ~ errors:", errors);

  function onSubmit(record: PoslSchemaInfertype) {
    const { takesMedication: _takesMedication, hasDisease: _hasDisease, ...data } = record;

    const formatedData = {
      ...data,
      dataConsent: Boolean(data.dataConsent),
      recordNumber: Number(data.recordNumber),
      candidatePhone: data.candidatePhone.replace(/[^\d]/g, ""),
      godfatherPhone: data.godfatherPhone.replace(/[^\d]/g, ""),
    };
    console.log("🚀 ~ onSubmit ~ formatedData:", formatedData);
  }

  return <Pos1Form control={control} errors={errors} onSubmit={onSubmit} watch={watch} setValue={setValue} handleSubmit={handleSubmit} />;
};
