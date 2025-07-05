import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import pool from '../src/config/db';

dotenv.config();

const seedAdmins = async () => {
  try {
    const adminsPath = path.resolve(__dirname, '..', 'data', 'admins.json');
    const rawAdmins = await fs.readFile(adminsPath, 'utf-8');
    const admins = JSON.parse(rawAdmins);

    for (const admin of admins) {
      if (!admin.email || !admin.senha) {
        console.warn(`⚠️ Admin inválido ignorado: ${JSON.stringify(admin)}`);
        continue;
      }
      await pool.query(
        `INSERT INTO rivals_admins (email, senha) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING`,
        [admin.email, admin.senha]
      );
      console.log(`✅ Admin inserido: ${admin.email}`);
    }
  } catch (error) {
    console.error('Erro ao fazer seed dos administradores:', error);
    throw error;
  }
};

const seedBanner = async () => {
  try {
    const bannerPath = path.resolve(__dirname, '..', 'data', 'banners.json');
    const rawBanner = await fs.readFile(bannerPath, 'utf-8');
    const banner = JSON.parse(rawBanner);

    if (!banner.title) {
      throw new Error(
        'O campo "title" está ausente ou vazio no JSON do banner.'
      );
    }

    const bannerId = banner.id || 1;

    await pool.query(
      `
      INSERT INTO rivals_banners (
        id, title, subtitle, paragraph, color_start, color_end, data_torneio
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        paragraph = EXCLUDED.paragraph,
        color_start = EXCLUDED.color_start,
        color_end = EXCLUDED.color_end,
        data_torneio = EXCLUDED.data_torneio,
        updated_at = NOW()
      `,
      [
        bannerId,
        banner.title,
        banner.subtitle,
        banner.paragraph,
        banner.color_start,
        banner.color_end,
        banner.data_torneio,
      ]
    );

    console.log('✅ Banner inserido/atualizado com sucesso.');
  } catch (error) {
    console.error('Erro ao fazer seed do banner:', error);
    throw error;
  }
};

const seedAll = async () => {
  try {
    await seedAdmins();
    await seedBanner();
    console.log('🎉 Seed finalizado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro no seed geral:', error);
    process.exit(1);
  }
};

seedAll();
