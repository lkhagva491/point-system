#!/bin/bash

echo "🚀 Building Admin App for Vercel..."

# Install all dependencies
echo "📦 Installing dependencies..."
npm install

# Build shared package
echo "📦 Building shared package..."
cd packages/shared
npm run build
cd ../..

# Build UI package
echo "🎨 Building UI package..."
cd packages/ui
npm run build
cd ../..

# Build admin app
echo "🔧 Building admin app..."
cd apps/admin
npm run build
cd ../..

echo "✅ Admin app build completed successfully!"
