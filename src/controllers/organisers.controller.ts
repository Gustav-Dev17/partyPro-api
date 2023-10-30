import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { CreateOrganiserService, DeleteOrganiserService, ListOrganiserService, ListOrganisersService, UpdateOrganiserService } from "../services/organisers.services";

export const CreateOrganiser = async (req: Request, res: Response) => {
  try {
    await CreateOrganiserService(req.body);
    return res.status(201).json({ message: "Conta criada com sucesso!" });
  } catch (e) {
    return res.status(400).json({ message: (e as Error).message });
  }
};

export const GetOrganiser = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const organiser = await ListOrganiserService(id);
    return res.status(200).json(organiser);
  } catch (e) {
    return res.status(400).json({ message: (e as Error).message });
  }
};

export const GetOrganisers = async (__: Request, res: Response) => {
  try {
    const organisers = await ListOrganisersService();
    return res.status(200).json(organisers);
  } catch (e) {
    return res.status(400).json({ message: (e as Error).message });
  }
};

export const UpdateOrganiser = async (req: Request, res: Response) => {
  try {
    const { id, firebaseUrl } = req;
    await UpdateOrganiserService(req.body, id, firebaseUrl);
    return res.status(200).json({ message: "Dados da conta atualizados com sucesso!" });
  } catch (e) {
    return res.status(400).json({ message: (e as Error).message });
  }
};

export const DeleteOrganiser = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    await DeleteOrganiserService(id, req.body.password);

    return res.status(204).json({ message: "Conta excluída com sucesso!" });
  } catch (e) {
    return res.status(400).json({ message: (e as Error).message });
  }
};
