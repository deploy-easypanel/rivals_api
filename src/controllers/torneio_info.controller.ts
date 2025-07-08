import { Request, Response } from 'express';
import db from '../config/db';

export const mostrarTorneioInfo = async (_req: Request, res: Response) => {
  try {
    const result = await db.query('SELECT * FROM rivals_torneio_info LIMIT 1');
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar torneio:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const atualizarTorneioInfo = async (req: Request, res: Response) => {
  try {
    const { local, horario, formato, data, equipes, regulamento } = req.body;
    const result = await db.query(
      `UPDATE rivals_torneio_info
       SET local = $1, horario = $2, formato = $3, data = $4, equipes = $5, regulamento = $6
       WHERE id = 1
       RETURNING *`,
      [local, horario, formato, data, equipes, regulamento]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar torneio:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
