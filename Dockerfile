FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta do Express
EXPOSE 3001

# Rodar migration e subir o servidor:
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm run start"]
