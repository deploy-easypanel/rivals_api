import { Router } from 'express';
import {
  adicionarPartida,
  atualizarPartida,
  deletarPartida,
  mostrarPartidas,
} from '../controllers/partidas.controller';

const router = Router();

router.get('/partidas', mostrarPartidas);
router.post('/partidas', adicionarPartida);
router.put('/partidas/:id', atualizarPartida);
router.delete('/partidas/:id', deletarPartida);

export default router;
