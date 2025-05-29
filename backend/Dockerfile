FROM node:18-alpine

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar prisma schema
COPY prisma ./prisma/

# Generar Prisma client
RUN npx prisma generate

# Copiar código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Crear directorio para uploads
RUN mkdir -p uploads

# Exponer puerto
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["sh", "-c", "npx prisma db push && npm run db:seed && npm start"]