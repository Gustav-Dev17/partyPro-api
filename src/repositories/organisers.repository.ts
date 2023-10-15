import { Prisma } from "@prisma/client";
import prisma from "../services/prisma.services";

import { IOrganiser, IRequestOrganiserBody } from "../types/organiser.body.types";

export const CreateOrganisersRepo = async (body: IOrganiser) => {
  try {
    return await prisma.organisers.create({ data: body });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        if (e.meta?.target === "Organisers_id_document_number_key") {
          throw new Error("Ja existe uma conta com o número de documento informado!");
        }
        if (e.meta?.target === "Organisers_phone_key") {
          throw new Error("O telefone informado já está em uso!");
        }
        if (e.meta?.target === "Organisers_email_key") {
          throw new Error("O e-mail informado já está em uso!");
        }
      }
    }
    throw new Error((e as Error).message);
  }
};

export const ReadOrganiserByID = (id: string) => {
  try {
    return prisma.organisers.findUnique({
      where: { id },
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadOrganisers = () => {
  try {
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
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const UpdateOrganiser = async (body: IRequestOrganiserBody, id: string) => {
  try {
    return await prisma.organisers.update({ where: { id }, data: body });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        if (e.meta?.target === "Organisers_id_document_number_key") {
          throw new Error("Ja existe uma conta com o número de documento informado!");
        }
        if (e.meta?.target === "Organisers_phone_key") {
          throw new Error("O telefone informado já está em uso!");
        }
        if (e.meta?.target === "Organisers_email_key") {
          throw new Error("O e-mail informado já está em uso!");
        }
      }
      if (e.code === "P2025") {
        throw new Error("Organizador não encontrado!");
      }
    }
    throw new Error((e as Error).message);
  }
};

export const DeleteOrganiser = async (id: string) => {
  try {
    return await prisma.organisers.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2023") {
        throw new Error("Id malformado!");
      }
      if (e.code === "P2025") {
        throw new Error("Organizador não encontrado!");
      }
    }
    throw new Error((e as Error).message);
  }
};

export const ForgotPassword = (id: string, reset_token: string) => {
  try {
    return prisma.organisers.update({
      where: { id },
      data: { reset_token },
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ResetPassword = (id: string, password: string) => {
  try {
    return prisma.organisers.update({
      where: { id },
      data: {
        reset_token: "",
        password,
      },
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
