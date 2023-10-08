import * as yup from "yup";

const CurretDate = new Date();

export const EventPostSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "O título do evento deve conter mais de 2 caracteres!")
    .max(30, "O título deve conter no máximo 30 caracteres!")
    .required("Informe um título para o evento!"),

  description: yup
    .string()
    .min(10, "A descrição do evento deve conter pelo menos 10 caracteres!")
    .max(255, "A descrição do evento deve conter no máximo 255 caracteres!")
    .required("Informe uma descrição para o evento!"),

  location: yup.string().max(255, "As informações de localização devem conter no máximo 255 caracteres!").notRequired(),

  start_date: yup
    .date()
    .min(new Date(CurretDate.getTime() + 24 * 60 * 60 * 1000), "A data inicial do evento deve ser de no mínimo 1 dia após a data atual!")
    .required("A data inicial do evento é obrigatória!"),

  end_date: yup.date().min(yup.ref("start_date"), "A data final do evento deve ser maior que a data inicial!").notRequired(),

  type: yup.mixed().oneOf(["Online", "FaceToFace"]).required("O tipo de evento é obrigatório!"),

  url: yup.string().max(255, "A URL do evento deve conter no máximo 255 caracteres!").notRequired(),

  purchase_link: yup.string().max(255, "A URL de compra do ingresso deve conter no máximo 255 caracteres!").notRequired(),

  categories: yup.array().of(yup.string()).min(1, "Pelo menos uma categoria deve ser selecionada").required("Pelo menos uma categoria deve ser selecionada"),
});
