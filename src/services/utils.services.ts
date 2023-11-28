import { ReadCategoriesRepo } from "../repositories/utils.repository";

export const ListCategoriesService = () => {
  try {
    return ReadCategoriesRepo();
  } catch (e) {
    throw new Error((e as Error).message);
  }
};