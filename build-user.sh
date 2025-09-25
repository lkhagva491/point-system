#!/bin/bash

echo "🚀 Building User App for Vercel..."

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

# Build user app
echo "🔧 Building user app..."
cd apps/user
npm run build
cd ../..

echo "✅ User app build completed successfully!"
