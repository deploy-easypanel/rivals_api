import express from 'express';
import {
  carregarChaveamento,
  salvarChaveamento,
} from '../controllers/chaveamento.controller';

const router = express.Router();

router.get('/chaveamento', carregarChaveamento);
router.post('/chaveamento', salvarChaveamento);

export default router;
