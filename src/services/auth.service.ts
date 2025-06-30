import bcrypt from 'bcrypt';
import pool from '../config/db';
import { generateToken } from '../utils/jwt';

export const loginService = async (email: string, password: string) => {
  const query = 'SELECT * FROM admins WHERE email = $1';
  const result = await pool.query(query, [email]);

  if (result.rows.length === 0) {
    throw new Error('Usuário não encontrado');
  }

  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Senha incorreta');
  }

  return generateToken({ id: user.id, email: user.email });
};
