import { IRequestOrganiserBody, IOrganiser } from "../types/organiser.body.types";
import { CreateOrganisersRepo, ReadOrganisers, ReadOrganiserByID, UpdateOrganiser, DeleteOrganiser, ForgotPassword, ResetPassword } from "../repositories/organisers.repository";
import { ReadOrganiserByDocNumber, ReadOrganiserByEmail, ReadOrganiserByPhone } from "../repositories/utils.repository";
import { sign } from "jsonwebtoken";
import { authConf } from "../config/auth.config";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

export const CreateOrganiserService = (body: IOrganiser) => {
  try {
    body.password = bcrypt.hashSync(body.password, 8);
    return CreateOrganisersRepo(body);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ListOrganiserService = (id: string) => {
  try {
    return ReadOrganiserByID(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ListOrganisersService = () => {
  try {
    return ReadOrganisers();
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const UpdateOrganiserService = async (body: IRequestOrganiserBody, id: string, image: string) => {
  try {
    const organiser = await ReadOrganiserByID(id);

    if (body.id_document_number) {
      const existingDocNumber = await ReadOrganiserByDocNumber(body.id_document_number);
      if (existingDocNumber && existingDocNumber.id !== id) {
        throw new Prisma.PrismaClientKnownRequestError("Ja existe uma conta com o número de documento informado!", {
          code: "P2002",
          clientVersion: "5.1.1",
          meta: {
            target: "Organisers_id_document_number_key",
          },
        });
      }
    }

    if (body.phone) {
      const existingPhoneNumber = await ReadOrganiserByPhone(body.phone);
      if (existingPhoneNumber && existingPhoneNumber.id !== id) {
        throw new Prisma.PrismaClientKnownRequestError("O telefone informado já está em uso!", {
          code: "P2002",
          clientVersion: "5.1.1",
          meta: {
            target: "Organisers_phone_key",
          },
        });
      }
    }

    if (body.email) {
      const existingEmail = await ReadOrganiserByEmail(body.email);
      if (existingEmail && existingEmail.id !== id) {
        throw new Prisma.PrismaClientKnownRequestError("O e-mail informado já está em uso!", {
          code: "P2002",
          clientVersion: "5.1.1",
          meta: {
            target: "Organisers_email_key",
          },
        });
      }
    }

    const { password } = body;
    body.password = password ? bcrypt.hashSync(password as string, 10) : organiser?.password;

    return UpdateOrganiser({ ...body }, id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const DeleteOrganiserService = async (id: string, password: string) => {
  try {
    const organiser = await ReadOrganiserByID(id);

    if (organiser) {
      const matchPassword = await bcrypt.compare(password, organiser.password);

      if (!matchPassword) {
        throw new Error("A senha informada está incorreta!");
      }
    }

    return DeleteOrganiser(id);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ForgotOrganiserPassword = async (id: string) => {
  try {
    const organiser = await ReadOrganiserByID(id);
    const resetToken = sign({ organiserId: organiser?.id }, authConf.secret);
    return ForgotPassword(id, resetToken);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const ResetOrganiserPassword = async (id: string, password: string) => {
  try {
    const organiser = await ReadOrganiserByID(id);
    const newPass = password || organiser?.password;
    const passHash = bcrypt.hashSync(newPass as string, 8);

    return ResetPassword(id, passHash);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
