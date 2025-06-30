import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import authRouter from './routes/auth.route';
import bannerRoutes from './routes/banner.route';

dotenv.config();

const app = express();
const port = 4141;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/auth', authRouter);
app.use(bannerRoutes);

// Servidor
app.listen(port, () =>
  console.log(`🚀 Servidor rodando em http://localhost:${port}`)
);
