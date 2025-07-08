import { Router } from 'express';
import {
  atualizarTorneioInfo,
  mostrarTorneioInfo,
} from '../controllers/torneio_info.controller';

const router = Router();

router.get('/', mostrarTorneioInfo);
router.put('/', atualizarTorneioInfo);

export default router;
