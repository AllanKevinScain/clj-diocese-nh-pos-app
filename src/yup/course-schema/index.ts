import dayjs from 'dayjs';
import * as yup from 'yup';

const testEndDate: yup.TestFunction<string, yup.AnyObject> = (value, { parent }) => {
  const { startDate } = parent;

  const start = dayjs(startDate, 'DD/MM/YYYY');
  const end = dayjs(value, 'DD/MM/YYYY');

  return end.isAfter(start);
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
});
