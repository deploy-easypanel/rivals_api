import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import authRoute from './routes/auth.route';
import bannerRoute from './routes/banner.route';
import chaveamentoRoute from './routes/chaveamento.route';
import partidaRoute from './routes/partidas.route';
import torneioInfoRoute from './routes/torneio_info.route';

dotenv.config();

const app = express();
const port = 4141;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/auth', authRoute);
app.use('/banner', bannerRoute);
app.use('/chaveamento', chaveamentoRoute);
app.use('/partidas', partidaRoute);
app.use('/torneio_info', torneioInfoRoute);

// Servidor
app.listen(port, () =>
  console.log(`🚀 Servidor rodando em https://api.ducksgaming.site`)
);
