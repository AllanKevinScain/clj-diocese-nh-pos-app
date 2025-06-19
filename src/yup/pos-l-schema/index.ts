import dayjs from 'dayjs';
import * as yup from 'yup';

function requiredOtherResident(value: string | undefined, { parent }: yup.AnyObject) {
  if (parent.livesWith.includes('outro')) {
    return !!value;
  }

  return true;
}

function requiredOtherReligion(value: string | undefined | null, { parent }: yup.AnyObject) {
  if (value === null) return true;

  if (parent.parentsReligion.includes('outro')) {
    return !!value;
  }

  return true;
}
function requiredDisease(value: string | undefined, { parent }: yup.AnyObject) {
  if (parent.hasDisease.includes('sim')) {
    return !!value;
  }

  return true;
}
function requiredMedication(value: string | undefined, { parent }: yup.AnyObject) {
  if (parent.takesMedication.includes('sim')) {
    return !!value;
  }

  return true;
}
function required13year(value: string | undefined) {
  if (!value) return false;

  const today = dayjs();
  const birth = dayjs(value);

  return birth.isBefore(today.subtract(13, 'year'), 'day');
}

export const poslSchema = yup.object({
  id: yup.string().uuid().optional(),

  // Ficha
  typeOfRecord: yup
    .mixed<'POSl' | 'POSll' | 'WORK' | 'COUPLE_WORK'>()
    .oneOf(['POSl', 'POSll', 'WORK', 'COUPLE_WORK']),
  courseNumber: yup.number(),
  parishAcronym: yup.string().max(6, 'Máximo de 6 caracteres!').required('Campo Obrigatório !'),
  recordNumber: yup.string().required('Campo Obrigatório!'),

  // Candidato
  candidateName: yup.string().required('Campo Obrigatório!'),
  document: yup.string().required('Campo Obrigatório!'),
  nickname: yup.string().required('Campo Obrigatório!'),
  birthDate: yup.string().required('Campo Obrigatório!').test({
    name: 'test13Years',
    message: 'Idade inválida! O cursista precisa ter mais de 12 anos!',
    test: required13year,
  }),
  candidatePhone: yup
    .string()
    .min(14, 'Mínimo de 14 caracteres!')
    .max(15, 'Máximo de 15 caracteres!')
    .required('Campo Obrigatório!'),
  instagram: yup.string().required('Campo Obrigatório!'),
  priest: yup.string().required('Campo Obrigatório!'),
  parishChapel: yup.string().required('Campo Obrigatório!'),
  spiritualLife: yup.string().required('Campo Obrigatório!'),
  observationsDed: yup.string().required('Campo Obrigatório!'),

  // Saúde
  disease: yup.string().test({
    name: 'requiredDisease',
    message: 'Campo obrigatório!',
    test: requiredDisease,
  }),
  medication: yup.string().test({
    name: 'requiredMedication',
    message: 'Campo obrigatório!',
    test: requiredMedication,
  }),
  allergy: yup.string().required('Campo Obrigatório!'),

  // Consentimento
  dataConsent: yup
    .boolean()
    .oneOf([true], 'Você deve aceitar o termo!')
    .required('Campo Obrigatório!'),

  // Padrinho
  godfatherName: yup.string().required('Campo Obrigatório!'),
  godfatherPhone: yup
    .string()
    .min(14, 'Mínimo de 14 caracteres!')
    .max(15, 'Máximo de 15 caracteres!')
    .required('Campo Obrigatório!'),
  godfatherEmail: yup.string().email('E-mail inválido').required('Campo Obrigatório!'),
  affinityWithGodfather: yup.string().required('Campo Obrigatório!'),
  attitudeCommunication: yup.string().required('Campo Obrigatório!'),
  doctrineCommunication: yup.string().required('Campo Obrigatório!'),
  godfatherResponsibility: yup.string().required('Campo Obrigatório!'),

  // Personalidade
  candidateSpirit: yup.string().required('Campo Obrigatório!'),
  candidateDisposition: yup.string().required('Campo Obrigatório!'),
  candidateParticipation: yup.string().required('Campo Obrigatório!'),
  fatherSituation: yup.string(),
  motherSituation: yup.string(),
  livesWith: yup.string().required('Campo Obrigatório!'),
  otherWho: yup.string().test({
    name: 'requiredOtherResident',
    message: 'Campo obrigatório!',
    test: requiredOtherResident,
  }),
  parentsReligion: yup.string().required('Campo Obrigatório!'),
  otherReligion: yup.string().nullable().test({
    name: 'requiredOtherReligion',
    message: 'Campo obrigatório!',
    test: requiredOtherReligion,
  }),
  parentsComment: yup.string().required('Campo Obrigatório!'),

  // campos de auxlio
  hasDisease: yup.string().required('Campo Obrigatório!'),
  takesMedication: yup.string().required('Campo Obrigatório!'),
});
