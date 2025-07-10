<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Este repositorio contiene el código fuente del backend de Clínica Dental</p>
    <p align="center">

# Sistema de Gestión para Clínica Dental - Backend

Backend desarrollado con **NestJS y TypeORM** para la gestión de pacientes, citas, roles y más.

## 🚀 Tecnologías Usadas

- **NestJS** (Framework backend en Node.js)
- **TypeORM** (ORM para la base de datos)
- **MySQL** (Gestor de base de datos)
- **JWT** (Autenticación segura)
- **Docker** (Para la base de datos en desarrollo)

## 1. Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

- **Node.js (v20+)** - [Descargar aquí](https://nodejs.org/)
- **Docker & Docker Compose** - [Descargar aquí](https://www.docker.com/)
- **Git** - [Descargar aquí](https://git-scm.com/)
- **Un editor de código** (VSCode recomendado)

## 2. Instalación y Configuración

### 1️⃣ Clonar el Repositorio

```sh
git clone https://github.com/ChristianChs/dentaloayza-backend.git
cd dentaloayza-backend
```

### 2️⃣ Configurar Variables de Entorno

Renombra el archivo `.env.example` a `.env` y configura las credenciales de la base de datos y el servidor:

### 3️⃣ Instalar Dependencias

Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```sh
yarn install
```

### 4️⃣ Levantar la Base de Datos con Docker

Para iniciar la base de datos sin necesidad de instalar MySQL localmente, usa:

```sh
docker-compose up -d
```

### 5️⃣ Ejecutar Migraciones (Por implementar)

Si es la primera vez que levantas el backend, ejecuta las migraciones para crear las tablas en la base de datos:

```sh
npm run typeorm migration:run
```

### 6️⃣ Iniciar el Servidor en Desarrollo

Para iniciar el servidor NestJS en modo desarrollo con hot-reload, usa:

```sh
yarn start:dev
```

📌 El backend estará disponible en: http://localhost:3000/

## 3. Documentación con Swagger 📖

El proyecto usa Swagger para generar documentación interactiva de la API.

Una vez que el servidor esté corriendo, puedes acceder a Swagger en:
🔗 http://localhost:3001/api/docs
