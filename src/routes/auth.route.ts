import { Router } from 'express';
import { loginController } from '../controllers/auth.controller';

const router = Router();

router.post('/login', (req, res, next) => {
  Promise.resolve(loginController(req, res)).catch(next);
});

export default router;
