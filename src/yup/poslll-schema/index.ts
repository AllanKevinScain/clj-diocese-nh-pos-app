import { isEmpty } from 'lodash';
import * as yup from 'yup';

const instagramWomanTest: yup.TestFunction<string | null | undefined, yup.AnyObject> = (
  value,
  { parent },
) => {
  const { isCouple } = parent;

  if (!isCouple) return true;
  if (isCouple && isEmpty(value)) {
    return false;
  }

  return true;
};

export const poslllSchema = yup.object({
  id: yup.string().uuid(),
  candidateName: yup.string().trim().required('Campo obrigatório!'),
  parishChapel: yup.string().trim().required('Campo obrigatório!'),
  instagram: yup.string().trim().required('Campo obrigatório!'),
  instagramWoman: yup.string().trim().nullable().test({
    test: instagramWomanTest,
    message: 'Campo obrigatório!',
  }),
  courseOne: yup
    .string()
    .trim()
    .matches(/^[0-9]+$/, 'Apenas números positivos são permitidos')
    .required('Campo obrigatório!'),
  courseTwo: yup
    .string()
    .trim()
    .matches(/^[0-9]+$/, 'Apenas números positivos são permitidos')
    .required('Campo obrigatório!'),
  courseThree: yup
    .string()
    .trim()
    .matches(/^[0-9]+$/, 'Apenas números positivos são permitidos')
    .required('Campo obrigatório!'),
  formations: yup.string().required('Campo obrigatório!'),
  isCouple: yup.boolean().required('Campo obrigatório!'),

  active: yup.boolean().optional(),
  createdAt: yup.string().optional(),
  updatedAt: yup.string().optional(),
});

export type PoslllSchemaInferType = yup.InferType<typeof poslllSchema>;
