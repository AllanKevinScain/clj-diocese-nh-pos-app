import * as yup from 'yup';

import { fieldNullIsRequired } from '../helpers';

export const reportExportWithFilterSchema = yup.object({
  courseNumber: yup
    .string()
    .nullable()
    .test({ test: fieldNullIsRequired, message: 'Campo obrigatório!' }),

  parishAcronym: yup.string().nullable(),
  candidateName: yup.string().nullable(),
  nickname: yup.string().nullable(),
  birthDate: yup.string().nullable(),
  candidatePhone: yup.string().nullable(),
  instagram: yup.string().nullable(),
  priest: yup.string().nullable(),
  parishChapel: yup.string().nullable(),
  recordNumber: yup.string().nullable(),
  typeOfRecord: yup.mixed<'POSl' | 'POSll' | 'WORK' | 'COUPLE_WORK'>().nullable(),
  search: yup.string().nullable(),
});

export const filterSchema = reportExportWithFilterSchema.pick(['search']);
export const exportWorkTableSchema = reportExportWithFilterSchema.pick(['courseNumber']);
