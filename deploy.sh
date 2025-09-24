#!/bin/bash

echo "🚀 Deploying Point System to Vercel and Heroku..."

# Build all packages
echo "📦 Building packages..."
npm run build

# Deploy backend to Heroku
echo "🔧 Deploying backend to Heroku..."
git add .
git commit -m "Deploy: Update for production"
git push heroku main

# Deploy frontend to Vercel
echo "🎨 Deploying frontend to Vercel..."
vercel --prod

echo "✅ Deployment completed!"
echo "🌐 Backend: https://point-system-backend.herokuapp.com"
echo "🎨 Frontend: https://point-system.vercel.app"
