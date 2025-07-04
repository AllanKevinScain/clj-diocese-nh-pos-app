import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import * as yup from 'yup';

function requiredDisease(value: string | undefined | null, { parent }: yup.AnyObject) {
  if (parent.hasDisease) return !isEmpty(value);

  return true;
}
function requiredMedication(value: string | undefined | null, { parent }: yup.AnyObject) {
  if (parent.takesMedication) return !isEmpty(value);

  return true;
}
function required13year(value: string | undefined) {
  if (!value) return false;

  const today = dayjs();
  const birth = dayjs(value);

  return birth.isBefore(today.subtract(13, 'year'), 'day');
}

export const posDefault = yup.object({
  id: yup.string().uuid().optional(),
  recordId: yup.string().uuid().optional(),

  // Ficha
  typeOfRecord: yup
    .mixed<'POSl' | 'POSll' | 'WORK' | 'COUPLE_WORK'>()
    .oneOf(['POSl', 'POSll', 'WORK', 'COUPLE_WORK']),
  courseNumber: yup.number(),
  parishAcronym: yup.string().max(6, 'Máximo de 6 caracteres!').required('Campo Obrigatório !'),
  recordNumber: yup.string().required('Campo Obrigatório!'),

  // Candidato
  candidateName: yup.string().required('Campo Obrigatório!'),
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

  // Vida espiritual
  spiritualLife: yup.array().of(yup.string().required()).required('Campo Obrigatório!'),

  // observações
  observationsCoordinator: yup.string().required('Campo Obrigatório!'),
  observationsDed: yup.string().required('Campo Obrigatório!'),

  // Saúde
  disease: yup.string().nullable().test({
    name: 'requiredDisease',
    message: 'Campo obrigatório!',
    test: requiredDisease,
  }),
  medication: yup.string().nullable().test({
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

  // -------- campos de auxilio - não vao pro back
  hasDisease: yup.boolean().required('Campo Obrigatório!'),
  takesMedication: yup.boolean().required('Campo Obrigatório!'),
  createdAt: yup.string().nullable(),
  updatedAt: yup.string().nullable(),
});
