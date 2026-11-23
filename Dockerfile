FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta do Express
EXPOSE 3001

# Executa as migrations do Postgres e inicia o servidor Node
CMD npx sequelize-cli db:migrate && npm run start