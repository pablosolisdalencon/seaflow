#!/bin/bash

# Seaflow Unified Deployment Script for Render
# This script handles installation, seeding, building, and starting the application.

echo "🚀 Starting Unified Deployment Process..."

# 1. Database Seeding (Optional, but included for PARKO protocol)
echo "🗄️ Seeding database..."
npm run seed --prefix back

# 2. Start Application
echo "✨ Lifting application..."
node back/src/server.js
