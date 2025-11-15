import * as yup from 'yup';

import { fieldNullIsRequired } from '../helpers';
import { posDefault } from '../pos-default';

const CutRecordDefault = posDefault.pick([
  'parishChapel',
  'candidateName',
  'nickname',
  'birthDate',
  'candidatePhone',
  'recordNumber',
  'typeOfRecord',
]);

export const reportExportWithFilterSchema = CutRecordDefault.shape({
  courseNumber: yup
    .string()
    .nullable()
    .test({ test: fieldNullIsRequired, message: 'Campo obrigatório!' }),
  search: yup.string().nullable(),
  instagram: yup.string().nullable(),
});
export type ReportExportWithFilterInfertype = yup.InferType<typeof reportExportWithFilterSchema>;

export const filterSchema = reportExportWithFilterSchema.pick(['search']);
export type SearchFilterInfertype = yup.InferType<typeof filterSchema>;

export const exportWorkTableSchema = reportExportWithFilterSchema.pick(['courseNumber']);
