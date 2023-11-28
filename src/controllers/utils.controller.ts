import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { ListCategoriesService } from "../services/utils.services";

export const GetCategories = async (__: Request, res: Response) => {
  try {
    const categories = await ListCategoriesService();
    return res.status(200).json(categories);
  } catch (e) {
    return res.status(400).json({ message: (e as Error).message });
  }
};
