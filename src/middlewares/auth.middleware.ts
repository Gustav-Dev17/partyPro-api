import { verify } from "jsonwebtoken";
import { authConf } from "../config/auth.config";
import { Request, Response, NextFunction } from "express";

interface TokenPayload {
  organiserId?: string;
  organiserEmail: string;
  organiserPass?: string;
}

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Não autorizado!" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = verify(token, authConf.secret) as TokenPayload;
    if (decoded.organiserId) {
      req.id = decoded.organiserId;
    }

    return next();
  } catch {
    return res.status(400).json({ message: "Token inválido!" });
  }
};
