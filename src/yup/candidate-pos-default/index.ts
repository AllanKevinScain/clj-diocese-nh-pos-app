import dayjs from 'dayjs';
import * as yup from 'yup';

import { fieldNullIsRequired } from '../helpers';

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
  typeOfRecord: yup.mixed<'POSl' | 'POSll' | 'POSlll'>().oneOf(['POSl', 'POSll', 'POSlll']),
  courseNumber: yup.string().nullable(),
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
  parishChapel: yup.string().required('Campo Obrigatório!'),
  isWork: yup.boolean().default(false),
  isCoupleWork: yup.boolean().default(false),

  // Consentimento
  dataConsent: yup
    .boolean()
    .nullable()
    .test({ test: fieldNullIsRequired, message: 'Você precisa aceitar o termo!' }),

  createdAt: yup.string().nullable(),
  updatedAt: yup.string().nullable(),
});

export type PosDefaultInferType = yup.InferType<typeof posDefault>;
