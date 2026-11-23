# FROM node:20-alpine

# WORKDIR /app

# COPY package.json ./
# RUN npm install

# COPY . .

# EXPOSE 3001

# CMD npx sequelize-cli db:migrate && npm run start


# Etapa 1: build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: servidor
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
