import { SchemaOf } from "yup";
import { ILogin } from "../types/login.body.types";
import { IOrganiser, IOrganiserUpdate } from "../types/organiser.body.types";
import { NextFunction, Request, Response } from "express";

export const Validate = (schema: SchemaOf<ILogin | IOrganiser | IOrganiserUpdate>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      await schema.validate(data, {
        stripUnknown: true,
        abortEarly: false,
      });
      return next();
    } catch (e: any) {
      return res.status(400).json({ error: e.errors });
    }
  };
};
