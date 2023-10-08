import prisma from "../services/prisma.services";
import { IEvent, IRequestEventBody } from "../types/events.body.typs";

export const CreateEventsRepo = (body: IEvent) => {
  return prisma.events.create({ data: body });
};

export const ReadEventsByOrganiser = (organiserID: string) => {
  return prisma.events.findMany({
    where: {
      organiserId: organiserID,
    },
  });
};

export const ReadEventByID = (id: string) => {
  return prisma.events.findUnique({
    where: { id },
  });
};

export const ReadEvents = () => {
  return prisma.events.findMany();
};

export const ReadEventsByCategories = async (categories: string[]) => {
  return prisma.events.findMany({
    where: {
      categories: {
        hasSome: categories,
      },
    },
  });
};

export const UpdateEvent = (body: IRequestEventBody, id: string) => {
  return prisma.events.update({
    where: { id },
    data: body,
  });
};

export const DeleteEvent = (id: string) => {
  return prisma.events.delete({
    where: {
      id: id,
    },
  });
};
