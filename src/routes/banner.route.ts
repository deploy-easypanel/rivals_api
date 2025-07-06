import { Router } from 'express';
import {
  atualizarBanner,
  mostrarBanner,
} from '../controllers/banner.controller';

const router = Router();

router.get('/', mostrarBanner);
router.put('/', atualizarBanner);

export default router;
