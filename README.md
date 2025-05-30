# 🏥 Portal Médico

Sistema de gestión médica con Vue 2, Node.js, PostgreSQL y Docker para administrar pacientes, citas y tratamientos.

## 🚀 Instalación y Ejecución

### Requisitos

- Docker y Docker Compose

### Pasos

```bash
# 1. Clonar repositorio
git clone <repository-url>
cd medical-portal

# 2. Levantar servicios
docker compose up -d --build

# 3. Configurar base de datos
docker exec -it medical-portal-backend-1 npx prisma db push
docker exec -it medical-portal-backend-1 npm run db:seed

# 4. Acceder al sistema
# Frontend: http://localhost:8081
# Backend API: http://localhost:3001
```

### Credenciales de Prueba

```
Email: admin@test.com
Password: admin123
```

## 📁 Estructura

```
medical-portal/
├── backend/          # Node.js + Express + Prisma
├── frontend/         # Vue 2 + TypeScript + TailwindCSS
└── docker-compose.yml
```

## ✨ Funcionalidades

- **👥 Pacientes:** CRUD completo con subida de PDFs
- **📅 Citas:** Programación con estados (Pendiente/Realizada/Cancelada)
- **💊 Tratamientos:** Gestión con estados Activo/Inactivo
- **🔐 Autenticación:** Login con JWT
- **📊 Dashboard:** Estadísticas en tiempo real

## 🛠 Tecnologías

**Backend:** Node.js, Express, Prisma, PostgreSQL, JWT  
**Frontend:** Vue 2, Vuex, Vue Router, TypeScript, TailwindCSS  
**DevOps:** Docker, Docker Compose

## 🔧 Comandos Útiles

```bash
# Ver logs
docker compose logs -f

# Reiniciar servicios
docker compose restart

# Limpiar y empezar de nuevo
docker compose down -v
docker compose up -d --build

# Recargar datos de prueba
docker exec -it medical-portal-backend-1 npm run db:seed
```

## 📋 Datos Incluidos

El seed incluye:

- 1 usuario administrador
- 6 pacientes con datos mexicanos realistas
- 6 citas con diferentes estados
- 6 tratamientos activos e inactivos
