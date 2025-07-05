# Etapa de build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

# Etapa de produção
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 4141

CMD ["npm", "start"]
