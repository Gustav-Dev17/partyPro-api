import * as yup from "yup";

export const OrganiserPostSchema = yup.object().shape({
  name: yup.string().min(2, "Nome de organizador deve conter mais de 2 caracteres!").required("Informe um nome de organizador!"),
  email: yup.string().email().required("Informe um endereço de e-mail!"),
  password: yup.string().min(8, "A senha deve conter pelo menos 8 caracteres!").required("Informe uma senha!"),
  id_document: yup.mixed().oneOf(["CPF", "CNPJ"]).required("Informe um tipo de documento válido"),
  id_document_number: yup.string().when("id_document", {
    is: "CPF",
    then: yup
      .string()
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "O CPF deve ser do formato 000.000.000-00")
      .required("Informe um número de CPF válido"),
    otherwise: yup
      .string()
      .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "O CNPJ deve ser do formato 00.000.000/0000-00")
      .required("Informe um número de CNPJ válido"),
  }),
  phone: yup.string().min(11, "Telefone de ter pelo menos 11 caracteres, além do DDD!").required("Informe um número de telefone!"),
  instagram_url: yup.string().max(150, "A URL do perfil do instagram não deve ser maior que 150 caracteres").notRequired(),
});

export const OrganiserUpdateSchema = yup.object().shape({
  name: yup.string().min(2, "Nome de organizador deve conter mais de 2 caracteres!").notRequired(),
  email: yup.string().email().notRequired(),
  password: yup.string().min(8, "A senha deve conter pelo menos 8 caracteres!").notRequired(),
  id_document: yup.mixed().oneOf(["CPF", "CNPJ"]).notRequired(),
  id_document_number: yup.string().when("id_document", {
    is: "CPF",
    then: yup
      .string()
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "O CPF deve ser do formato 000.000.000-00")
      .required("Informe um número de CPF válido"),
    otherwise: yup
      .string()
      .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "O CNPJ deve ser do formato 00.000.000/0000-00")
      .required("Informe um número de CNPJ válido"),
  }),
  phone: yup.string().min(11, "Telefone de ter pelo menos 11 caracteres, além do DDD!").notRequired(),
  instagram_url: yup.string().max(150, "A URL do perfil do instagram não deve ser maior que 150 caracteres").notRequired(),
  avatar_url: yup.string().notRequired(),
  reset_token: yup.string().notRequired(),
});
