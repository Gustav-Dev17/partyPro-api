import prisma from "../services/prisma.services";
import { IEvent, IRequestEventBody } from "../types/events.body.typs";

export const CreateEventsRepo = (body: IEvent) => {
  try {
    return prisma.events.create({ data: body });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadEventsByOrganiser = (organiserID: string) => {
  try {
    return prisma.events.findMany({
      where: {
        organiserId: organiserID,
      },
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadEventByID = (id: string) => {
  try {
    return prisma.events.findUnique({
      where: { id },
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadEvents = () => {
  try {
    return prisma.events.findMany();
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ReadEventsByCategories = async (categories: string[]) => {
  try {
    return prisma.events.findMany({
      where: {
        categories: {
          hasSome: categories,
        },
      },
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const UpdateEvent = (body: IRequestEventBody, id: string) => {
  try {
    return prisma.events.update({
      where: { id },
      data: body,
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const DeleteEvent = (id: string) => {
  try {
    return prisma.events.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
