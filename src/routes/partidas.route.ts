import { Router } from 'express';
import {
  adicionarPartida,
  atualizarPartida,
  deletarPartida,
  mostrarPartidas,
} from '../controllers/partidas.controller';

const router = Router();

router.get('/', mostrarPartidas);
router.post('/', adicionarPartida);
router.put('/:id', atualizarPartida);
router.delete('/:id', deletarPartida);

export default router;
