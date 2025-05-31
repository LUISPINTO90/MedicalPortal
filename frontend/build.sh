#!/bin/bash
echo "🔨 Building Vue.js application for production..."
npm ci
npm run build
echo "✅ Build completed!"