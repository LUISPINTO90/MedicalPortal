# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 8080

# Comando para desarrollo con hot reload
CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0", "--port", "8080"]