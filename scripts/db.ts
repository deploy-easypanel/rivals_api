import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

dotenv.config();

const fullUrl = process.env.DATABASE_URL!;
const dbName = fullUrl.split('/').pop()!;
const adminUrl = fullUrl.replace(`/${dbName}`, '/postgres');

const initDbAndRunSql = async () => {
  const adminClient = new Client({ connectionString: adminUrl });

  try {
    await adminClient.connect();

    const res = await adminClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (res.rowCount === 0) {
      await adminClient.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Banco de dados '${dbName}' criado com sucesso.`);
    } else {
      console.log(`ℹ️ Banco de dados '${dbName}' já existe.`);
    }
  } catch (err) {
    console.error('❌ Erro ao criar banco:', err);
    await adminClient.end();
    process.exit(1);
  } finally {
    await adminClient.end();
  }

  const client = new Client({ connectionString: fullUrl });
  try {
    await client.connect();

    const sqlPath = path.resolve(__dirname, '..', 'ducks_db.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    await client.query(sql);
    console.log('✅ SQL executado com sucesso.');
  } catch (err) {
    console.error('❌ Erro ao executar SQL:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
};

initDbAndRunSql();
