#!/bin/bash

echo "Creating backend folder structure..."

mkdir -p backend/prisma
mkdir -p backend/src/controllers
mkdir -p backend/src/routes

# Create empty files

# Prisma schema
touch backend/prisma/schema.prisma

# Express app entry points
touch backend/src/app.ts
touch backend/src/server.ts

# Controllers
touch backend/src/controllers/productController.ts
touch backend/src/controllers/reviewController.ts
touch backend/src/controllers/aiController.ts

# Routes
touch backend/src/routes/productRoutes.ts
touch backend/src/routes/reviewRoutes.ts
touch backend/src/routes/aiRoutes.ts

# Config files
touch backend/.env
touch backend/package.json
touch backend/tsconfig.json

echo "Backend structure created!"
