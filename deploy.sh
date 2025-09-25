#!/bin/bash

echo "🚀 Deploying Point System to Vercel and Render..."

# Build all packages
echo "📦 Building packages..."
npm run build

# Deploy frontend to Vercel
echo "🎨 Deploying frontend to Vercel..."
vercel --prod

echo "✅ Deployment completed!"
echo "🌐 Backend: https://point-system-backend.onrender.com"
echo "🎨 Frontend: https://point-system.vercel.app"
echo ""
echo "📝 Note: Backend will be automatically deployed to Render when you push to GitHub"
