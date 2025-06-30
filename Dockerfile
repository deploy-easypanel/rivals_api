FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Aqui rodar os scripts
RUN npm run setup
RUN npm run db
RUN npm run seed

CMD ["node", "start"]

EXPOSE 4141