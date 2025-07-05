import { Router } from 'express';
import {
  atualizarBanner,
  mostrarBanner,
} from '../controllers/banner.controller';

const router = Router();

router.get('/banner', mostrarBanner);
router.put('/banner', atualizarBanner);

export default router;
