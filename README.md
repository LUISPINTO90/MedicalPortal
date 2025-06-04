[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/LUISPINTO90/MedicalPortal)

# 🏥 Portal Médico

Sistema de gestión médica completo desarrollado con Vue 2, Node.js, PostgreSQL y Docker para administrar pacientes, citas y tratamientos de manera eficiente.

## 🚀 Instalación y Ejecución

### Requisitos previos

- **Docker** y **Docker Compose** instalados
- **Node.js** (v18 o superior)
- **Git** para clonar el repositorio

### Pasos de instalación

#### 1. Clonar el repositorio

```bash
git clone https://github.com/LUISPINTO90/MedicalPortal.git
cd MedicalPortal
```

#### 2. Instalar dependencias localmente (opcional para desarrollo)

```bash
# Frontend
cd frontend
npm install
cd ..

# Backend
cd backend
npm install
cd ..
```

#### 3. Configurar variables de entorno

**Frontend** (`frontend/.env`):

```env
VUE_APP_API_URL=http://localhost:3001/api
```

**Backend** (`backend/.env`):

```env
# URL de conexión a PostgreSQL
DATABASE_URL="postgresql://postgres:password123@localhost:5432/medical_portal?schema=public"

# Clave secreta para JWT
JWT_SECRET="your-secret-key-here"

# Puerto del servidor backend
PORT=3001

# URL del frontend (para CORS)
FRONTEND_URL="http://localhost:8080"
```

#### 4. Levantar los servicios con Docker

```bash
# En la raíz del proyecto
docker-compose up -d
```

#### 5. Configurar la base de datos

```bash
# Configuración completa (recomendado)
docker-compose exec backend npm run db:setup

# O ejecutar comandos individuales
docker-compose exec backend npx prisma generate
docker-compose exec backend npx prisma db push
docker-compose exec backend npm run db:seed
```

#### 6. Acceder al sistema

- **Frontend:** [http://localhost:8080](http://localhost:8080)
- **Backend API:** [http://localhost:3001](http://localhost:3001)
- **Documentación API:** [http://localhost:3001/api](http://localhost:3001/api)

## 🔑 Credenciales de Prueba

```
Email: admin@admin.com
Password: adminadmin
```

## 📁 Estructura del Proyecto

```
medical-portal/
├── 📂 backend/                    # API REST con Node.js
│   ├── 📂 src/
│   │   ├── 📂 controllers/        # Controladores de rutas
│   │   ├── 📂 middleware/         # Middlewares (auth, validación)
│   │   ├── 📂 routes/             # Definición de rutas
│   │   ├── 📂 types/              # Tipos TypeScript
│   │   ├── 📄 index.ts            # Servidor principal
│   │   └── 📄 seed.ts             # Datos de prueba
│   ├── 📂 prisma/
│   │   └── 📄 schema.prisma       # Esquema de base de datos
│   ├── 📂 uploads/                # Archivos subidos
│   ├── 📄 Dockerfile
│   └── 📄 package.json
├── 📂 frontend/                   # Aplicación Vue.js
│   ├── 📂 src/
│   │   ├── 📂 components/         # Componentes reutilizables
│   │   ├── 📂 views/              # Páginas principales
│   │   ├── 📂 store/              # Estado global (Vuex)
│   │   ├── 📂 router/             # Configuración de rutas
│   │   ├── 📂 services/           # Servicios API
│   │   ├── 📂 types/              # Interfaces TypeScript
│   │   └── 📄 main.ts             # Punto de entrada
│   ├── 📄 Dockerfile
│   └── 📄 package.json
└── 📄 docker-compose.yml          # Orquestación de servicios
```

## ✨ Funcionalidades Principales

### 👥 Gestión de Pacientes

- ✅ Registro completo de pacientes con datos personales
- ✅ Subida y gestión de documentos PDF
- ✅ Historial médico detallado
- ✅ Búsqueda y filtrado avanzado
- ✅ Operaciones CRUD completas

### 📅 Sistema de Citas

- ✅ Programación de citas médicas
- ✅ Estados: Pendiente, Realizada, Cancelada
- ✅ Recordatorios
- ✅ Calendario visual interactivo
- ✅ Gestión de disponibilidad

### 💊 Tratamientos Médicos

- ✅ Registro de tratamientos por paciente
- ✅ Estados: Activo e Inactivo
- ✅ Seguimiento de medicamentos
- ✅ Notas y observaciones médicas

### 🔐 Sistema de Autenticación

- ✅ Login seguro con JWT
- ✅ Protección de rutas
- ✅ Sesiones persistentes
- 
### 📊 Dashboard y Reportes

- ✅ Estadísticas y gráficos
- ✅ Historial de Tratamientos Recientes
- ✅ Recordatorio de Próximas Citas
  
## 🛠 Stack Tecnológico

### Backend

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web minimalista
- **Prisma** - ORM moderno para bases de datos
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación segura
- **TypeScript** - Tipado estático
- **Multer** - Manejo de archivos
- **Helmet** - Seguridad HTTP

### Frontend

- **Vue 2** - Framework progresivo de JavaScript
- **Vuex** - Gestión de estado centralizada
- **Vue Router** - Enrutamiento SPA
- **TypeScript** - Desarrollo tipado
- **TailwindCSS** - Framework de utilidades CSS
- **Axios** - Cliente HTTP
- **Vue Feather Icons** - Iconografía

## 🔧 Comandos Útiles

### Docker y Servicios

```bash
# Ver estado de contenedores
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Reiniciar servicios
docker-compose restart
docker-compose restart backend

# Parar todos los servicios
docker-compose down

# Limpiar y empezar de nuevo
docker-compose down -v
docker-compose up -d --build
```

### Base de Datos

```bash
# Acceder a Prisma Studio (interfaz gráfica)
docker-compose exec backend npx prisma studio

# Resetear base de datos
docker-compose exec backend npx prisma migrate reset --force

# Recargar datos de prueba
docker-compose exec backend npm run db:seed

# Aplicar cambios del schema
docker-compose exec backend npx prisma db push

# Generar cliente Prisma
docker-compose exec backend npx prisma generate
```

### Desarrollo

```bash
# Acceder al contenedor del backend
docker-compose exec backend sh

# Acceder al contenedor del frontend
docker-compose exec frontend sh

# Instalar nuevas dependencias
docker-compose exec backend npm install <paquete>
docker-compose exec frontend npm install <paquete>
```

**Desarrollado con ❤️ por [LUISPINTO90](https://github.com/LUISPINTO90)**
