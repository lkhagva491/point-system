#!/bin/bash

echo "🚀 Building Point System for Render..."

# Build shared package first
echo "📦 Building shared package..."
cd packages/shared
npm install
npm run build
cd ../..

# Build backend
echo "🔧 Building backend..."
cd apps/backend
npm install
npm run build
cd ../..

echo "✅ Build completed successfully!"
