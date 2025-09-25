#!/bin/bash

echo "🚀 Building Point System for Render (Direct Commands)..."

# Install all dependencies
echo "📦 Installing root dependencies..."
npm install

# Build shared package
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
