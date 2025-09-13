# 🏫 School Management System

A production-ready School Management System built with Fastify, TypeScript, SOLID Principles, and OOP.
This project provides a robust backend for managing Students, Teachers, Classes, and Addresses, designed for scalability and maintainability with Docker, Redis, Nginx, and Drizzle ORM.

## 🚀 Features

👩‍🏫 Teacher Management – Create, update, fetch, and delete teacher details
👨‍🎓 Student Management – Handle student records with validation and persistence
🏠 Address Management – Associate and manage addresses
🏢 Class Management – Manage school classes efficiently
⚡ Fastify with TypeScript – High-performance and type-safe APIs
📐 SOLID & OOP – Clean, maintainable, and testable architecture
🐳 Dockerized – Easy containerized deployment
⚡ Redis – Caching layer for performance optimization
🌐 Nginx – Reverse proxy & load balancing
🗄️ Drizzle ORM – Type-safe SQL with migration support

## 🛠️ Tech Stack

Backend Framework: Fastify
Language: TypeScript
Architecture: SOLID Principles + OOP
Database: PostgreSQL (via Drizzle ORM)
Caching: Redis
Reverse Proxy: Nginx
Containerization: Docker & Docker Compose
Validation: Fastify Schema-based validation  

## 📌 API Endpoints
### Address Routes (/api/v1/address)
- `POST   /create` → Create new address  
- `GET    /get-all-address` → Fetch all addresses  
- `PATCH  /:id/update` → Update an address  
- `GET    /:id/get-address` → Get single address by ID  
- `DELETE /:id/delete` → Delete address  

### Class Routes (/api/v1/classes)
POST /create → Create new class
GET /get-all-classes → Fetch all classes
PATCH /:id/update → Update class details
GET /:id/get-class → Get single class by ID
DELETE /:id/delete → Delete class

### Student Routes (/api/v1/students)
POST /create → Create new student
GET /get-all-students → Fetch all students
PATCH /:id/update → Update student details
GET /:id/get-student → Get single student by ID
DELETE /:id/delete → Delete student

### Teacher Routes (/api/v1/teacher)
POST /create → Create new teacher
GET /get-all-teacher → Fetch all teachers
PATCH /:id/update → Update teacher details
GET /:id/get-teacher → Get single teacher by ID
DELETE /:id/delete → Delete teacher

## ⚙️ Installation & Setup

```
# Clone repo
git clone https://github.com/your-username/school-management-system.git
cd school-management-system

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run migrations (Drizzle ORM)
npm run db:migrate

# Start development
npm run dev

# Or run with Docker
docker-compose up --build

```
## 🐳 Dockerfile

```
# -----------------------------
# 1. Build Stage
# -----------------------------
FROM node:20-alpine AS builder


# Install build tools for native dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy dependency files first (cache-friendly)
COPY package*.json ./

# ✅ Copy drizzle config explicitly (before npm install)
COPY ./drizzle.config.ts ./drizzle.config.ts

# Use npm ci (clean + reliable installs)
RUN npm config set registry https://registry.npmmirror.com/ \
    && npm set fetch-retries 5 \
    && npm set fetch-retry-mintimeout 20000 \
    && npm set fetch-retry-maxtimeout 120000 \
    && npm ci --legacy-peer-deps



# Copy all source files
COPY . .

# Build TypeScript -> dist
RUN npm run build


# -----------------------------
# 2. Production Stage
# -----------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# ✅ Copy drizzle config explicitly (before npm install)
COPY ./drizzle.config.ts ./drizzle.config.ts


# Install only production dependencies
RUN npm config set registry https://registry.npmmirror.com/ \
    && npm ci --omit=dev --legacy-peer-deps

# Install pg_isready
RUN apk add --no-cache postgresql-client        

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# 🔹 Copy entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Set environment variable for app port
ENV PORT=5000
EXPOSE 5000

# 🔹 Use entrypoint instead of CMD
ENTRYPOINT ["/app/entrypoint.sh"]

```

## 🐳 Docker-compose.yml


```
version: "3.9"

services:
  school-management:
    build:
      context: .   # 👈 path to your project folder
      dockerfile: Dockerfile
    container_name: schoolManagment
    ports:
      - "5000:5000"   # maps container port → host port
    env_file:
      - ./.env
    depends_on:
      - db
      - school-redis
    environment:
      DATABASE_URL: postgresql://username:password@db:5432/school_management  
    networks:
      - app-network
    volumes:
      - ./src/migrations:/app/src/migrations
      - ./package.json:/app/package.json
      - ./tsconfig.json:/app/tsconfig.json
      - ./.env:/app/.env:ro

  nginx:
    image: nginx:latest
    container_name: school_nginx
    ports:
      - "80:80"    # 👈 Now you can call http://192.168.29.172/api/...
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro   # custom config
    depends_on:
      - school-management
    networks:
      - app-network
  db:
    image: postgres:17
    container_name: school_db
    restart: always
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: school_management
    ports:
      - "5432:5432"
    networks:
      - app-network
  
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: school_pgadmin
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@school.com
      PGADMIN_DEFAULT_PASSWORD: admin123
    ports:
      - "8080:80"   # Access pgAdmin on http://localhost:8080
    depends_on:
      - db
    networks:
      - app-network
    volumes:
      - pgadmin-data:/var/lib/pgadmin

  school-redis:
    image: redis:7
    container_name: schoolManagent_redis
    ports:
      - "6379:6379"
    networks:
      - app-network
    volumes:
      - redis-data:/data


networks:
  app-network:

volumes:
  school-db-data:
  redis-data:
  pgadmin-data:

```

## 🐳 Docker Entrypoint Script (entrypoint.sh)
This script ensures that PostgreSQL is ready before starting the application.
It prevents the app from crashing due to the database not being available during startup.

## 🔧 Responsibilities

⏳ Waits for Postgres to be available on db:5432
🚀 Runs database migrations (npm run db:migrate)
✅ Starts the Fastify app


## 📜 Script

```
#!/bin/sh
set -e

# Wait for Postgres
echo "⏳ Waiting for Postgres at db:5432..."
until pg_isready -h db -p 5432 -U postgres; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 2
done

echo "🚀 Postgres is up! Running migrations..."
npm run db:migrate

echo "✅ Starting app..."
exec node dist/server.js

```













