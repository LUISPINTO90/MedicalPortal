FROM node:18-alpine

WORKDIR /app

# Instalar dependencias del sistema
RUN apk add --no-cache postgresql-client

# Copiar package files
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependencias
RUN npm ci

# Copiar prisma schema
COPY prisma ./prisma/

# Generar Prisma client
RUN npx prisma generate

# Copiar código fuente
COPY src ./src

# Compilar TypeScript
RUN npm run build

# Crear directorio uploads
RUN mkdir -p uploads

# Exponer puerto
EXPOSE 10000

# Comando de inicio
CMD ["npm", "run", "start:prod"]