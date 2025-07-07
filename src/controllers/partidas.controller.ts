import { Request, Response } from 'express';
import pool from '../config/db';

export const mostrarPartidas = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM rivals_partidas ORDER BY date, time'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar partidas:', error);
    res.status(500).json({ error: 'Erro interno ao buscar partidas' });
  }
};

export const adicionarPartida = async (req: Request, res: Response) => {
  const { date, time, team1, team2, score1, score2 } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO rivals_partidas (date, time, team1, team2, score1, score2) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [date, time, team1, team2, score1 || null, score2 || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao adicionar partida:', error);
    res.status(500).json({ error: 'Erro interno ao adicionar partida' });
  }
};

export const atualizarPartida = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, time, team1, team2, score1, score2 } = req.body;

  try {
    const result = await pool.query(
      'UPDATE rivals_partidas SET date = $1, time = $2, team1 = $3, team2 = $4, score1 = $5, score2 = $6 WHERE id = $7 RETURNING *',
      [date, time, team1, team2, score1 || null, score2 || null, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar partida:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar partida' });
  }
};

export const deletarPartida = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM rivals_partidas WHERE id = $1 RETURNING *',
      [id]
    );

    res.json({
      message: 'Partida deletada com sucesso',
      partida: result.rows[0],
    });
  } catch (error) {
    console.error('Erro ao deletar partida:', error);
    res.status(500).json({ error: 'Erro interno ao deletar partida' });
  }
};
