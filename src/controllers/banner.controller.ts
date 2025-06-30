import { Request, Response } from 'express';
import pool from '../config/db';

// GET /banner
export const getBanner = async (_req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM rivals_banners LIMIT 1');
  res.json(result.rows[0]);
};

// PUT /banner
export const updateBanner = async (req: Request, res: Response) => {
  const { title, subtitle, paragraph, colorStart, colorEnd, dataTorneio } =
    req.body;

  await pool.query(
    `UPDATE rivals_banners SET
      title = $1,
      subtitle = $2,
      paragraph = $3,
      color_start = $4,
      color_end = $5,
      data_torneio = $6,
      updated_at = NOW()
     WHERE id = 1`,
    [title, subtitle, paragraph, colorStart, colorEnd, dataTorneio]
  );

  res.json({ message: 'Banner atualizado com sucesso' });
};
