CREATE TYPE partidas_status AS ENUM ('ao vivo', 'encerrada');

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

CREATE TABLE IF NOT EXISTS rivals_chaveamento (
  id SERIAL PRIMARY KEY,
  dados JSONB NOT NULL,
  atualizado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rivals_partidas (
  id SERIAL PRIMARY KEY,
  team1 TEXT NOT NULL,
  team2 TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  link TEXT,
  status partidas_status NOT NULL DEFAULT 'ao vivo',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

