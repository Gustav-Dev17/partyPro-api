import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { CreateOrganiserService, DeleteOrganiserService, ListOrganiserService, ListOrganisersService, UpdateOrganiserService } from "../services/organisers.services";

export const CreateOrganiser = async (req: Request, res: Response) => {
  try {
    const organiser = await CreateOrganiserService(req.body);
    return res.status(201).json({
      id: organiser.id,
      name: organiser.name,
      id_document: organiser.id_document,
      id_document_number: organiser.id_document_number,
      phone: organiser.phone,
      email: organiser.email,
      created_at: organiser.created_at,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        if (e.meta?.target === "Organisers_id_document_number_key") {
          return res.status(409).json({ message: "Ja existe uma conta com o número de documento informado!" });
        }
        if (e.meta?.target === "Organisers_phone_key") {
          return res.status(409).json({ message: "O telefone informado já está em uso!" });
        }
        if (e.meta?.target === "Organisers_email_key") {
          return res.status(409).json({ message: "O e-mail informado já está em uso!" });
        }
      }
    }
    return res.status(400).json({ message: "Erro ao criar a conta do organizador!", descripton: (e as Error).message });
  }
};

export const GetOrganiser = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const organiser = await ListOrganiserService(id);
    return res.status(200).json({
      id: organiser?.id,
      name: organiser?.name,
      id_document: organiser?.id_document,
      id_document_number: organiser?.id_document_number,
      phone: organiser?.phone,
      email: organiser?.email,
      created_at: organiser?.created_at,
    });
  } catch (e) {
    return res.status(400).json({ message: "Erro ao listar dados do organizador!", descripton: (e as Error).message });
  }
};

export const GetOrganisers = async (__: Request, res: Response) => {
  try {
    const organisers = await ListOrganisersService();
    return res.status(200).json(organisers);
  } catch (e) {
    return res.status(400).json({ message: "Erro ao listar organizadores!", descripton: (e as Error).message });
  }
};

export const UpdateOrganiser = async (req: Request, res: Response) => {
  try {
    const { id, firebaseUrl } = req;
    const organiser = await UpdateOrganiserService(req.body, id, firebaseUrl);
    return res.status(200).json({
      id: organiser.id,
      name: organiser.name,
      id_document: organiser.id_document,
      id_document_number: organiser.id_document_number,
      phone: organiser.phone,
      email: organiser.email,
      created_at: organiser.created_at,
      updated_at: organiser.updated_at
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        if (e.meta?.target === "Organisers_id_document_number_key") {
          return res.status(409).json({ message: "Ja existe uma conta com o número de documento informado!" });
        }
        if (e.meta?.target === "Organisers_phone_key") {
          return res.status(409).json({ message: "O telefone informado já está em uso!" });
        }
        if (e.meta?.target === "Organisers_email_key") {
          return res.status(409).json({ message: "O e-mail informado já está em uso!" });
        }
      }
      if (e.code === "P2023") {
        return res.status(400).json({ message: "Id malformado!!" });
      }
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Organizador não encontrado!" });
      }
    }
    return res.status(400).json({ message: "Erro ao atualizar dados do organizador!", descripton: (e as Error).message });
  }
};

export const DeleteOrganiser = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const organiser = await DeleteOrganiserService(id);
    return res.status(204).json({ organiser });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2023") {
        return res.status(400).json({ message: "Id malformado!" });
      }
      if (e.code === "P2025") {
        return res.status(404).json({ message: "Organizador não encontrado!" });
      }
    }
    return res.status(400).json({ message: "Erro ao deletar a conta do organizador!", descripton: (e as Error).message });
  }
};
