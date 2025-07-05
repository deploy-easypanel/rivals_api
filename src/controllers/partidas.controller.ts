import { Request, Response } from 'express';
import pool from '../config/db';

export const mostrarPartidas = async (_req: Request, res: Response) => {
  const result = await pool.query(
    'SELECT * FROM rivals_partidas ORDER BY date, time'
  );
  res.json(result.rows);
};

export const adicionarPartida = async (req: Request, res: Response) => {
  const { team1, team2, date, time, link, status } = req.body;

  const result = await pool.query(
    `INSERT INTO rivals_partidas (team1, team2, date, time, link, status)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [team1, team2, date, time, link, status]
  );

  res.status(201).json(result.rows[0]);
};

export const atualizarPartida = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { team1, team2, date, time, link, status } = req.body;

  await pool.query(
    `UPDATE rivals_partidas SET
      team1 = $1,
      team2 = $2,
      date = $3,
      time = $4,
      link = $5,
      status = $6,
      updated_at = NOW()
     WHERE id = $7`,
    [team1, team2, date, time, link, status, id]
  );

  res.json({ message: 'Partida atualizada com sucesso' });
};

export const deletarPartida = async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query('DELETE FROM rivals_partidas WHERE id = $1', [id]);
  res.json({ message: 'Partida deletada com sucesso' });
};
