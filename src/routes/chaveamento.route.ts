import express from 'express';
import {
  carregarChaveamento,
  salvarChaveamento,
} from '../controllers/chaveamento.controller';

const router = express.Router();

router.get('/', carregarChaveamento);
router.post('/', salvarChaveamento);

export default router;
