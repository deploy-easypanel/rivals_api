import { randomBytes } from 'crypto';
import fs from 'fs';
import path from 'path';

const ENV_PATH = path.resolve(__dirname, '..', '.env');
const JWT_SECRET = randomBytes(32).toString('hex');

const existingEnv = fs.existsSync(ENV_PATH)
  ? fs.readFileSync(ENV_PATH, 'utf-8')
  : '';
let updatedEnv = existingEnv;

if (existingEnv.includes('JWT_SECRET=')) {
  updatedEnv = existingEnv.replace(
    /JWT_SECRET=.*/g,
    `JWT_SECRET=${JWT_SECRET}`
  );
  console.log('🔁 JWT_SECRET atualizado no .env');
} else {
  updatedEnv += `${
    existingEnv.endsWith('\n') ? '' : '\n'
  }JWT_SECRET=${JWT_SECRET}\n`;
  console.log('✅ JWT_SECRET adicionado ao .env');
}

// Escreve o arquivo
fs.writeFileSync(ENV_PATH, updatedEnv);
console.log('📝 Arquivo .env salvo com sucesso!');
