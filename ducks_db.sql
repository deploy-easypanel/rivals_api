CREATE TABLE IF NOT EXISTS rivals_admins (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS rivals_banners (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  paragraph TEXT NOT NULL,
  color_start VARCHAR(7) NOT NULL,
  color_end VARCHAR(7) NOT NULL,
  data_torneio TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE rivals_chaveamento (
  id SERIAL PRIMARY KEY,
  dados JSONB NOT NULL,
  atualizado_em TIMESTAMP DEFAULT NOW()
);

