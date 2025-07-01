import { Request, Response } from 'express';
import db from '../config/db';

export const carregarChaveamento = async (req: Request, res: Response) => {
  try {
    const result = await db.query(
      'SELECT dados FROM rivals_chaveamento WHERE id = 1'
    );
    res.json(result.rows[0] || null);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar chaveamento' });
  }
};

export const salvarChaveamento = async (req: Request, res: Response) => {
  const dados = req.body;

  try {
    await db.query(
      `INSERT INTO rivals_chaveamento (id, dados, atualizado_em)
       VALUES (1, $1, NOW())
       ON CONFLICT (id) DO UPDATE SET dados = $1, atualizado_em = NOW()`,
      [dados]
    );

    res.status(200).json({ message: 'Chaveamento salvo com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar chaveamento' });
  }
};
