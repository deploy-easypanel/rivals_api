-- Cria o tipo ENUM 'partidas_status' apenas se ainda não existir
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'partidas_status') THEN
    CREATE TYPE partidas_status AS ENUM ('ao vivo', 'encerrada');
  END IF;
END$$;

-- Cria tabela de administradores
CREATE TABLE IF NOT EXISTS rivals_admins (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL
);

-- Cria tabela de banners
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

-- Cria tabela de chaveamento
CREATE TABLE IF NOT EXISTS rivals_chaveamento (
  id SERIAL PRIMARY KEY,
  dados JSONB NOT NULL,
  atualizado_em TIMESTAMP DEFAULT NOW()
);

-- Cria tabela de partidas
CREATE TABLE IF NOT EXISTS rivals_partidas (
  id SERIAL PRIMARY KEY,
  team1 TEXT NOT NULL,
  team2 TEXT NOT NULL,
  date TEXT NOT NULL,
  time TIME NOT NULL,
  link TEXT,
  status partidas_status NOT NULL DEFAULT 'ao vivo',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
