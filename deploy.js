#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import archiver from 'archiver';

console.log('🚀 Starting deployment build...\n');

// Step 1: Clean and install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed');
} catch (error) {
  console.error('❌ Failed to install dependencies');
  process.exit(1);
}

// Step 2: Build the project
console.log('\n🔨 Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Project built successfully');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

// Step 3: Create deployment directory
const deployDir = 'deployment';
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true });
}
fs.mkdirSync(deployDir);

// Step 4: Copy necessary files
console.log('\n📁 Copying deployment files...');

// Copy built files
fs.cpSync('dist', path.join(deployDir, 'dist'), { recursive: true });

// Copy server files
fs.copyFileSync('server.js', path.join(deployDir, 'server.js'));
fs.copyFileSync('package.json', path.join(deployDir, 'package.json'));
fs.copyFileSync('package-lock.json', path.join(deployDir, 'package-lock.json'));

// Copy documentation
fs.copyFileSync('README.md', path.join(deployDir, 'README.md'));
fs.copyFileSync('DEPLOYMENT.md', path.join(deployDir, 'DEPLOYMENT.md'));
fs.copyFileSync('PRODUCTION_SETUP.md', path.join(deployDir, 'PRODUCTION_SETUP.md'));

// Create .env template
const envTemplate = `# Environment Variables
# Copy this file to .env and fill in your actual values

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here

# Server Configuration
PORT=3002
NODE_ENV=production

# EmailJS Configuration (if using)
EMAILJS_PUBLIC_KEY=your_emailjs_public_key_here
EMAILJS_SERVICE_ID=your_emailjs_service_id_here
EMAILJS_TEMPLATE_ID=your_emailjs_template_id_here
`;

fs.writeFileSync(path.join(deployDir, '.env.example'), envTemplate);

// Create start script
const startScript = `#!/bin/bash
echo "🚀 Starting Watford Islamic Centre Application..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "Please copy .env.example to .env and configure your environment variables"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Start the server
echo "🌐 Starting server..."
npm run server
`;

fs.writeFileSync(path.join(deployDir, 'start.sh'), startScript);
fs.chmodSync(path.join(deployDir, 'start.sh'), '755');

// Create Windows start script
const startScriptWin = `@echo off
echo 🚀 Starting Watford Islamic Centre Application...

REM Check if .env exists
if not exist .env (
    echo ❌ .env file not found!
    echo Please copy .env.example to .env and configure your environment variables
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Start the server
echo 🌐 Starting server...
npm run server
pause
`;

fs.writeFileSync(path.join(deployDir, 'start.bat'), startScriptWin);

// Step 5: Create ZIP file
console.log('\n📦 Creating deployment package...');
const output = fs.createWriteStream('wic-deployment.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log('✅ Deployment package created: wic-deployment.zip');
  console.log(`📊 Total size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
  
  // Clean up deployment directory
  fs.rmSync(deployDir, { recursive: true });
  
  console.log('\n🎉 Deployment package ready!');
  console.log('\n📋 Next steps:');
  console.log('1. Upload wic-deployment.zip to your hosting provider');
  console.log('2. Extract the files');
  console.log('3. Copy .env.example to .env and configure your API keys');
  console.log('4. Run: ./start.sh (Linux/Mac) or start.bat (Windows)');
  console.log('5. Or manually: npm install && npm run server');
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.directory(deployDir, false);
archive.finalize(); 