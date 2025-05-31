FROM node:18-alpine

WORKDIR /app

# Instalar dependencias del sistema
RUN apk add --no-cache postgresql-client

# Copiar package files
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependencias (incluyendo dev para desarrollo)
RUN npm ci

# Copiar prisma schema
COPY prisma ./prisma/

# Generar Prisma client
RUN npx prisma generate

# Copiar código fuente
COPY src ./src

# Crear directorio uploads
RUN mkdir -p uploads

# Exponer puerto
EXPOSE 3001

# 🔥 COMANDO PARA DESARROLLO CON WATCH
CMD ["sh", "-c", "until pg_isready -h postgres -p 5432 -U postgres; do echo 'Waiting for PostgreSQL...'; sleep 2; done && echo 'PostgreSQL is ready!' && npm run dev"]