import dotenv from 'dotenv';

dotenv.config();

import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não está definido no .env');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
