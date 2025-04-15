import dayjs from "dayjs";
import * as yup from "yup";

const testEndDate: yup.TestFunction<string, yup.AnyObject> = (
  value,
  { parent }
) => {
  const { startDate } = parent;

  const start = dayjs(startDate, "DD/MM/YYYY");
  const end = dayjs(value, "DD/MM/YYYY");

  return end.isAfter(start);
};

export const courseSchema = yup.object().shape({
  id: yup.string().uuid(),
  startDate: yup.string().required("Data de início obrigatória"),
  endDate: yup
    .string()
    .required("Data de término obrigatória")
    .test(
      "is-after-start",
      "A data de término deve ser posterior à data de início",
      testEndDate
    ),
  typeOfCourse: yup.string().required("Tipo do curso é obrigatório"),
  courseNumber: yup
    .number()
    .positive("Número do curso deve ser positivo")
    .required("Número do curso é obrigatório"),
});
