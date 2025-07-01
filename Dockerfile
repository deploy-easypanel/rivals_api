# Etapa de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências primeiro (cache eficiente)
COPY package.json package-lock.json* ./

RUN npm install

# Copia o restante da aplicação
COPY . .

# Executa comandos necessários para preparar o banco
RUN npm run setup && npm run db && npm run seed

# Build da aplicação
RUN npm run build

# Remove dependências de dev
RUN npm prune --production

# Etapa de produção
FROM node:18-alpine AS production

WORKDIR /app

# Copia apenas o necessário da etapa de build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

# Exponha a porta de produção
EXPOSE 4141

# Inicie o servidor
CMD ["npm", "start"]
