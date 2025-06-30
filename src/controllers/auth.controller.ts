import { Request, Response } from 'express';
import { loginService } from '../services/auth.service';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await loginService(email, password);
    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
