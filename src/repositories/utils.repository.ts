import prisma from "../services/prisma.services";

export const ReadOrganiserByDocNumber = (docNumber: string) => {
  return prisma.organisers.findUnique({
    where: {
      id_document_number: docNumber,
    },
  });
};

export const ReadOrganiserByEmail = (email: string) => {
  return prisma.organisers.findUnique({
    where: {
      email: email,
    },
  });
};

export const ReadOrganiserByPhone = (phone: string) => {
  return prisma.organisers.findUnique({
    where: {
      phone: phone,
    },
  });
};
