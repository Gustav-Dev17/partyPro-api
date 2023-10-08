import prisma from "../services/prisma.services";
import { IOrganiser, IRequestOrganiserBody } from "../types/organiser.body.types";

export const CreateOrganisersRepo = (body: IOrganiser) => {
  return prisma.organisers.create({ data: body });
};

export const ReadOrganiserByID = (id: string) => {
  return prisma.organisers.findUnique({
    where: { id },
  });
};

export const ReadOrganisers = () => {
  return prisma.organisers.findMany({
    select: {
      id: true,
      name: true,
      id_document: true,
      id_document_number: true,
      phone: true,
      email: true,
      created_at: true,
    },
  });
};

export const UpdateOrganiser = (body: IRequestOrganiserBody, id: string) => {
  return prisma.organisers.update({
    where: { id },
    data: body,
  });
};

export const DeleteOrganiser = (id: string) => {
  return prisma.organisers.delete({
    where: {
      id: id,
    },
  });
};

export const ForgotPassword = (id: string, reset_token: string) => {
  return prisma.organisers.update({
    where: { id },
    data: { reset_token },
  });
};

export const ResetPassword = (id: string, password: string) => {
  return prisma.organisers.update({
    where: { id },
    data: {
      reset_token: "",
      password,
    },
  });
};
