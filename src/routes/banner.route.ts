import { Router } from 'express';
import { getBanner, updateBanner } from '../controllers/banner.controller';

const router = Router();

router.get('/banner', getBanner);
router.put('/banner', updateBanner);

export default router;
