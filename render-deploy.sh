#!/bin/bash

# Seaflow Unified Deployment Script for Render
# This script handles installation, seeding, building, and starting the application.

echo "🚀 Starting Unified Deployment Process..."

# 1. Install Dependencies
echo "📦 Installing root dependencies..."
npm install

echo "📦 Installing backend dependencies..."
npm install --prefix back

echo "📦 Installing frontend dependencies (including dev)..."
npm install --include=dev --prefix front

# 2. Build Frontend
echo "🏗️ Building frontend assets..."
(cd front && npm run build)

# 3. Database Seeding
# We use the existing seeder script. 
# In production, this ensures the DB is populated with the base blueprint.
echo "🗄️ Seeding database..."
npm run seed --prefix back

# 4. Start Application
# The backend will now serve the frontend assets.
echo "✨ Lifting application..."
node back/src/server.js
