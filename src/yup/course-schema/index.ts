import dayjs from 'dayjs';
import * as yup from 'yup';

const testEndDate: yup.TestFunction<string, yup.AnyObject> = (value, { parent }) => {
  const { startDate } = parent;

  const start = dayjs(startDate, 'DD/MM/YYYY');
  const end = dayjs(value, 'DD/MM/YYYY');

  return end.isAfter(start);
};

const existInCourseData: yup.TestFunction<string, yup.AnyObject> = function (value, context) {
  const { parent, path, createError } = context;

  const fields = [
    'base',
    'auxiliar',
    'coordinator',
    'liturgy',
    'secretary',
    'kitchenSpiritual',
    'coupleKitchenCoordinator',
  ];

  const otherFields = fields.filter((f) => f !== path.split('.').pop());
  const otherValues = otherFields.map((f) => parent[f]).filter(Boolean);

  if (value && otherValues.includes(value)) {
    return createError({
      path,
      message: 'Esse usuário já tem função!',
    });
  }

  return true;
};

export const courseSchema = yup.object().shape({
  id: yup.string().uuid(),
  startDate: yup.string().required('Campo obrigatório!'),
  endDate: yup
    .string()
    .required('Campo obrigatório!')
    .test('is-after-start', 'A data de término deve ser posterior à data de início', testEndDate),
  typeOfCourse: yup
    .mixed<'POSl' | 'POSll' | 'POSlll'>()
    .oneOf(['POSl', 'POSll', 'POSlll'], 'Valor inválido')
    .required('Campo obrigatório!'),
  courseNumber: yup.string(),

  base: yup.string().required('Campo obrigatório!').test({ test: existInCourseData }),
  auxiliar: yup.string().required('Campo obrigatório!').test({ test: existInCourseData }),
  coordinator: yup.string().required('Campo obrigatório!').test({ test: existInCourseData }),
  liturgy: yup.string().required('Campo obrigatório!').test({ test: existInCourseData }),
  secretary: yup.string().required('Campo obrigatório!').test({ test: existInCourseData }),
  kitchenSpiritual: yup.string().required('Campo obrigatório!').test({ test: existInCourseData }),
  coupleKitchenCoordinator: yup
    .string()
    .required('Campo obrigatório!')
    .test({ test: existInCourseData }),
});
export type CourseInferType = yup.InferType<typeof courseSchema>;
