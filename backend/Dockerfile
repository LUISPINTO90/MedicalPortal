# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache postgresql-client

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias (incluyendo dev para ts-node)
RUN npm ci

# Copiar prisma schema
COPY prisma ./prisma/

# Generar Prisma client
RUN npx prisma generate

# Copiar código fuente
COPY . .

# Crear directorio para uploads
RUN mkdir -p uploads

# Exponer puerto
EXPOSE 3001

# Solo iniciar el servidor, sin migraciones ni seed
CMD ["sh", "-c", "until pg_isready -h postgres -p 5432 -U postgres; do echo 'Waiting for PostgreSQL...'; sleep 2; done && echo 'PostgreSQL is ready!' && npm run dev"]