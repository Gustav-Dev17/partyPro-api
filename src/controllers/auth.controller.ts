import { Request, Response } from "express";
import { LoginService } from "../services/auth.services";

export const LoginOrganiser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const token = await LoginService(email, password);
    return res.status(200).json({ 
        token: token,
        message: 'Login autorizado!'
    });
  } catch (e) {
    return res.status(401).json({ message: (e as Error).message });
  }
};
