import dayjs from 'dayjs';
import * as yup from 'yup';

const testEndDate: yup.TestFunction<string, yup.AnyObject> = (value, { parent }) => {
  const { startDate } = parent;

  const start = dayjs(startDate, 'DD/MM/YYYY');
  const end = dayjs(value, 'DD/MM/YYYY');

  return end.isAfter(start);
};

const existInCourseData: yup.TestFunction<string | undefined, yup.AnyObject> = function (
  value,
  context,
) {
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
      message: 'Não é permitido repetir usuários!',
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
    .mixed<'POSl' | 'POSll' | 'WORK' | 'COUPLE_WORK'>()
    .oneOf(['POSl', 'POSll', 'WORK', 'COUPLE_WORK'], 'Valor inválido')
    .required('Campo obrigatório!'),
  courseNumber: yup.string().required('Campo obrigatório!'),

  base: yup.string().test({ test: existInCourseData, message: 'Campo obrigatório!' }),
  auxiliar: yup.string().test({ test: existInCourseData, message: 'Campo obrigatório!' }),
  coordinator: yup.string().test({ test: existInCourseData, message: 'Campo obrigatório!' }),
  liturgy: yup.string().test({ test: existInCourseData, message: 'Campo obrigatório!' }),
  secretary: yup.string().test({ test: existInCourseData, message: 'Campo obrigatório!' }),
  kitchenSpiritual: yup.string().test({ test: existInCourseData, message: 'Campo obrigatório!' }),
  coupleKitchenCoordinator: yup
    .string()
    .test({ test: existInCourseData, message: 'Campo obrigatório!' }),
});
export type CourseInferType = yup.InferType<typeof courseSchema>;
