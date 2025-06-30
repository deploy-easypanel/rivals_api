import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../config/db';

export const loginController = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  const result = await pool.query(
    'SELECT * FROM rivals_admins WHERE email = $1',
    [email]
  );
  const admin = result.rows[0];

  if (!admin) {
    return res.status(401).json({ error: 'Administrador não encontrado.' });
  }

  // Aqui deveria validar a senha (com hash), mas vamos simplificar por enquanto
  if (admin.senha !== senha) {
    return res.status(401).json({ error: 'Senha incorreta.' });
  }

  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  res.json({ accessToken: token });
};
