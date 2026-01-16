import * as yup from 'yup';

import { posDefault } from '../candidate-pos-default';
import { fieldNullIsRequired } from '../helpers';

const CutRecordDefault = posDefault.pick([
  'id',
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

export const exportWorkTableSchema = reportExportWithFilterSchema.pick(['id']);
export type ExportWorkTableSchemaInferType = yup.InferType<typeof exportWorkTableSchema>;
