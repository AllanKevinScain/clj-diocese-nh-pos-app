import * as yup from "yup";

function requiredOtherResident(
  value: string | undefined,
  { parent }: yup.AnyObject
) {
  if (parent.livesWith.includes("outro")) {
    return !!value;
  }

  return true;
}

function requiredOtherReligion(
  value: string | undefined,
  { parent }: yup.AnyObject
) {
  if (parent.parentsReligion.includes("outro")) {
    return !!value;
  }

  return true;
}
function requiredDisease(value: string | undefined, { parent }: yup.AnyObject) {
  if (parent.hasDisease.includes("sim")) {
    return !!value;
  }

  return true;
}
function requiredMedication(
  value: string | undefined,
  { parent }: yup.AnyObject
) {
  if (parent.takesMedication.includes("sim")) {
    return !!value;
  }

  return true;
}

function requiredDataConsent(value: boolean | undefined) {
  if (!value) return false;

  return true;
}

export const pos1Schema = yup.object({
  /* Ficha */
  recordNumber: yup
    .string()
    .max(2, "Máximo 2 caracteres!")
    .required("Campo Obrigatório!"),
  parishAcronym: yup
    .string()
    .max(6, "Máximo de 6 caracteres!")
    .required("Campo Obrigatório!"),
  courseNumber: yup.string(),
  /* Candidato */
  studentName: yup.string().required("Campo Obrigatório!"),
  nickname: yup.string().required("Campo Obrigatório!"),
  studentPhone: yup
    .string()
    .min(14, "Mínimo de 14 caracteres!")
    .max(15, "Máximo de 15 caracteres!")
    .required("Campo Obrigatório!"),
  parishPriest: yup.string().required("Campo Obrigatório!"),
  rg: yup.string().required("Campo Obrigatório!"),
  birthDate: yup.string().required("Campo Obrigatório!"),
  instagram: yup.string().required("Campo Obrigatório!"),
  parish: yup.string().required("Campo Obrigatório!"),
  /* Padrinho */
  godfatherName: yup.string().required("Campo Obrigatório!"),
  godfatherPhone: yup
    .string()
    .min(14, "Mínimo de 14 caracteres!")
    .max(15, "Máximo de 15 caracteres!")
    .required("Campo Obrigatório!"),
  godfatherEmail: yup.string().required("Campo Obrigatório!"),
  intimacyTime: yup.string().required("Campo Obrigatório!"),
  participationTerms: yup.string().required("Campo Obrigatório!"),
  doctrineTerms: yup.string().required("Campo Obrigatório!"),
  godfatherResponsibility: yup.string().required("Campo Obrigatório!"),
  /* Personalidade */
  mood: yup.string().required("Campo Obrigatório!"),
  disposition: yup.string().required("Campo Obrigatório!"),
  participation: yup.string().required("Campo Obrigatório!"),
  aboutFather: yup.string(),
  aboutMother: yup.string(),
  livesWith: yup.array(yup.string()).min(1, "Campo Obrigatório"),
  otherResident: yup.string().test({
    name: "requiredOtherResident",
    message: "Campo obrigatório!",
    test: requiredOtherResident,
  }),
  parentsReligion: yup.string().required("Campo Obrigatório!"),
  otherReligion: yup.string().test({
    name: "requiredOtherReligion",
    message: "Campo obrigatório!",
    test: requiredOtherReligion,
  }),
  parentsComment: yup.string().required("Campo Obrigatório!"),
  /* Sacramentos */
  sacraments: yup.array(yup.string()).min(1, "Campo Obrigatório"),
  /* Observações */
  preParishCoordinator: yup.string().required("Campo Obrigatório!"),
  spiritualDirector: yup.string().required("Campo Obrigatório!"),
  /* Saúde */
  hasDisease: yup.string().required("Campo Obrigatório!"),
  disease: yup.string().test({
    name: "requiredDisease",
    message: "Campo obrigatório!",
    test: requiredDisease,
  }),
  takesMedication: yup.string().required("Campo Obrigatório!"),
  medication: yup.string().test({
    name: "requiredMedication",
    message: "Campo obrigatório!",
    test: requiredMedication,
  }),
  allergy: yup.string().required("Campo Obrigatório!"),
  /* Consentimento */
  dataConsent: yup.boolean().test({
    name: "requiredDataConsent",
    message: "Você deve aceitar o termo!",
    test: requiredDataConsent,
  }),
});
