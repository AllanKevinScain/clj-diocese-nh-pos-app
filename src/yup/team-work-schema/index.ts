import * as yup from "yup";

function requiredNotConfirmatedReason(
  _: string | undefined,
  { parent }: yup.AnyObject
) {
  return !parent.wouldToBeConfirmed;
}
function requiredPlayAnyInstrument(
  value: string | undefined,
  { parent }: yup.AnyObject
) {
  if (parent.playAnyInstrument) {
    return !!value;
  }

  return true;
}

function requiredDataConsent(value: boolean | undefined) {
  if (!value) return false;

  return true;
}

export const teamWorkSchema = yup.object().shape({
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
  /* Outras informações */
  coursesTaken: yup.array(yup.string()).min(1, "Campo Obrigatório!"),
  coursesNumbers: yup.array(yup.string()).min(1, "Campo Obrigatório!"),
  coursesPositions: yup.array(yup.string()).min(1, "Campo Obrigatório!"),
  termStateGraceConfessed: yup.string().required("Campo Obrigatório!"),
  termNoFakeData: yup.string().required("Campo Obrigatório!"),
  termLifeTestimony: yup.string().required("Campo Obrigatório!"),
  /* Grupo paroquial */
  currentRoleParishGroup: yup.string().required("Campo Obrigatório!"),
  activitiesParish: yup.array(yup.string()),
  /* Vida Espiritual */
  lifeSpiritualStyle: yup.array(yup.string()).min(1, "Campo Obrigatório"),
  areConfirmed: yup.boolean(),
  wouldToBeConfirmed: yup.boolean(),
  notConfirmatedReason: yup.string().test({
    name: "requiredNotConfirmatedReason",
    message: "Campo obrigatório!",
    test: requiredNotConfirmatedReason,
  }),
  /* Instrumento */
  playAnyInstrument: yup.boolean(),
  instrument: yup.string().test({
    name: "requiredPlayAnyInstrument",
    message: "Campo obrigatório!",
    test: requiredPlayAnyInstrument,
  }),
  /* Razões para fazer o curso */
  reasonWorkCourse: yup.string().required("Campo Obrigatório!"),
  workPreference: yup.string().required("Campo Obrigatório!"),
  anotherRoleIfNecessary: yup.boolean(),
  dataConsent: yup.boolean().test({
    name: "requiredDataConsent",
    message: "Você deve aceitar o termo!",
    test: requiredDataConsent,
  }),
  /* Coordenação Paroquial */
  parishCoordinationIndications: yup
    .array(yup.string())
    .min(1, "Campo Obrigatório!"),
  coordinationObservations: yup.string().required("Campo Obrigatório!"),
  DEPObservation: yup.string().required("Campo Obrigatório!"),
});
