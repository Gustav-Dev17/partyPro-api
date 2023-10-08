import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../services/prisma.services";
import { authConf } from "../config/auth.config";

export const LoginService = async (email: string, password: string) => {
  try {
    const organiser = await prisma.organisers.findFirstOrThrow({ where: { email } });
    if (!organiser) {
      throw new Error("Conta de organizador não encontrada!");
    }
    const matchPassword = await bcrypt.compare(password, organiser.password);
    if (!matchPassword) {
      throw new Error("Credenciais inválidas! Verifique e-mail e senha.");
    }
    const token = jwt.sign(
      {
        organiserId: organiser.id,
        organiserEmail: organiser.email,
        organiserPass: organiser.password,
      },
      authConf.secret as string,
    );

    return token;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
