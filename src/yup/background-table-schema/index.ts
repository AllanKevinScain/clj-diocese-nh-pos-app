import * as yup from 'yup';

import { fieldNullIsRequired } from '../helpers';

export const backgroundTableCommunitySchema = yup.object({
  id: yup.string().uuid().required('Campo obrigatório'),
  number: yup.string().required('Campo obrigatório'),
  members: yup.array().of(yup.string().uuid()).required('Campo obrigatório'),
});

export const backgroundTableSchema = yup.object().shape({
  id: yup.string().uuid(),
  coordinator: yup.string().uuid().nullable().test({ test: fieldNullIsRequired }),
  base: yup.string().uuid().nullable().test({ test: fieldNullIsRequired }),
  auxiliar: yup.string().uuid().nullable().test({ test: fieldNullIsRequired }),
  courseNumber: yup.string(),

  coupleSafeToBe: yup.string().uuid(),
  coupleKitchenCoordinator: yup.string().uuid(),
  kitchenSpiritual: yup.string().uuid(),
  liturgy: yup.string().uuid(),
  secretary: yup.string().uuid(),
  auxiliarLiturgy: yup.string().uuid(),
  auxiliarSecretary: yup.string().uuid(),
  folkloreCoordinator: yup.string().uuid(),
  bar: yup.string().uuid(),

  copeWorkRecords: yup.array().of(yup.string().uuid()),
  cleanWorkRecords: yup.array().of(yup.string().uuid()),
  kitchenWorkRecords: yup.array().of(yup.string().uuid()),
  communities: yup.array().of(backgroundTableCommunitySchema),
});
