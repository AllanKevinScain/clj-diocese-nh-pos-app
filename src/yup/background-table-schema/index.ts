import * as yup from 'yup';

import { fieldNullIsRequired } from '../helpers';

const memberSchema = yup.object({
  communityId: yup.string().uuid(),
  recordId: yup.string().uuid(),
});

export const backgroundTableCommunitySchema = yup.object({
  id: yup.string().uuid().required('Campo obrigatório'),
  workTableId: yup.string().uuid(),
  number: yup.string().required('Campo obrigatório'),
  members: yup.array().of(memberSchema).required('Campo obrigatório'),
});

export const backgroundTableSchema = yup.object().shape({
  id: yup.string().uuid(),
  coordinator: yup.string().uuid().nullable().test({ test: fieldNullIsRequired }),
  base: yup.string().uuid().nullable().test({ test: fieldNullIsRequired }),
  auxiliar: yup.string().uuid().nullable().test({ test: fieldNullIsRequired }),
  courseNumber: yup.string().nullable(),

  coupleSafeToBe: yup.string().uuid().nullable(),
  coupleKitchenCoordinator: yup.string().uuid().nullable(),
  kitchenSpiritual: yup.string().uuid().nullable(),
  liturgy: yup.string().uuid().nullable(),
  secretary: yup.string().uuid().nullable(),
  auxiliarLiturgy: yup.string().uuid().nullable(),
  auxiliarSecretary: yup.string().uuid().nullable(),
  folkloreCoordinator: yup.string().uuid().nullable(),
  bar: yup.string().uuid().nullable(),

  copeWorkRecords: yup.array().of(yup.string().uuid()),
  cleanWorkRecords: yup.array().of(yup.string().uuid()),
  kitchenWorkRecords: yup.array().of(yup.string().uuid()),
  communities: yup.array().of(backgroundTableCommunitySchema),
});
