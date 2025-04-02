import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required("Campo obrigatório!"),
  password: yup.string().required("Campo obrigatório!"),
});
