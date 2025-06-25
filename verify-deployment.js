#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const requiredFiles = [
  'dist/',
  'server.js',
  'package.json',
  'package-lock.json',
  '.env.example',
  'start.sh',
  'start.bat',
  'README.md',
  'DEPLOYMENT.md',
  'PRODUCTION_SETUP.md'
];

const requiredDistFiles = [
  'dist/index.html',
  'dist/assets/'
];

console.log('🔍 Verifying deployment files...\n');

let allGood = true;

// Check if deployment ZIP exists
if (!fs.existsSync('wic-deployment.zip')) {
  console.log('❌ wic-deployment.zip not found!');
  process.exit(1);
}

console.log('✅ wic-deployment.zip found');

// Check if dist directory exists and has content
if (fs.existsSync('dist')) {
  console.log('✅ dist/ directory exists');
  
  if (fs.existsSync('dist/index.html')) {
    console.log('✅ dist/index.html exists');
    
    // Check if the built index.html has the correct structure
    const indexContent = fs.readFileSync('dist/index.html', 'utf8');
    if (indexContent.includes('<div id="root"></div>') && 
        indexContent.includes('script type="module"') &&
        indexContent.includes('assets/')) {
      console.log('✅ dist/index.html has correct structure');
    } else {
      console.log('❌ dist/index.html structure is incorrect');
      allGood = false;
    }
  } else {
    console.log('❌ dist/index.html - MISSING');
    allGood = false;
  }
  
  if (fs.existsSync('dist/assets')) {
    console.log('✅ dist/assets/ directory exists');
    const assets = fs.readdirSync('dist/assets');
    if (assets.length > 0) {
      console.log(`✅ dist/assets/ contains ${assets.length} files`);
    } else {
      console.log('❌ dist/assets/ is empty');
      allGood = false;
    }
  } else {
    console.log('❌ dist/assets/ - MISSING');
    allGood = false;
  }
} else {
  console.log('❌ dist/ directory - MISSING');
  allGood = false;
}

// Check required files exist
console.log('\n📁 Checking deployment files...');
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allGood = false;
  }
}

// Check package.json dependencies
console.log('\n📦 Checking package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = ['react', 'react-dom', 'react-router-dom', 'stripe', '@stripe/stripe-js', '@emailjs/browser', 'axios', 'express', 'cors', 'dotenv'];
  
  for (const dep of requiredDeps) {
    if (packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]) {
      console.log(`✅ ${dep}`);
    } else {
      console.log(`❌ ${dep} - MISSING from dependencies`);
      allGood = false;
    }
  }
} catch (error) {
  console.log('❌ Error reading package.json');
  allGood = false;
}

// Check server.js for correct configuration
console.log('\n🔧 Checking server configuration...');
try {
  const serverContent = fs.readFileSync('server.js', 'utf8');
  
  // Check for correct static file serving
  if (serverContent.includes("express.static(path.join(__dirname, 'dist'))")) {
    console.log('✅ Static file serving correctly configured');
  } else {
    console.log('❌ Static file serving not configured correctly');
    allGood = false;
  }
  
  // Check for SPA fallback
  if (serverContent.includes("res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))")) {
    console.log('✅ SPA fallback correctly configured');
  } else {
    console.log('❌ SPA fallback not configured correctly');
    allGood = false;
  }
  
  if (serverContent.includes('payment_method_types: [\'card\']')) {
    console.log('✅ Stripe payment method correctly configured');
  } else {
    console.log('❌ Stripe payment method not found or incorrect');
    allGood = false;
  }
  
  if (serverContent.includes('stripe.checkout.sessions.create')) {
    console.log('✅ Stripe checkout session creation found');
  } else {
    console.log('❌ Stripe checkout session creation not found');
    allGood = false;
  }
} catch (error) {
  console.log('❌ Error reading server.js');
  allGood = false;
}

// Check if .env.example exists
console.log('\n🔐 Checking environment configuration...');
if (fs.existsSync('.env.example')) {
  console.log('✅ .env.example template exists');
  const envContent = fs.readFileSync('.env.example', 'utf8');
  if (envContent.includes('STRIPE_SECRET_KEY') && envContent.includes('PORT')) {
    console.log('✅ .env.example has required variables');
  } else {
    console.log('❌ .env.example missing required variables');
    allGood = false;
  }
} else {
  console.log('❌ .env.example - MISSING');
  allGood = false;
}

console.log('\n📊 Summary:');
if (allGood) {
  console.log('🎉 All files verified successfully!');
  console.log('📦 wic-deployment.zip is ready for deployment');
  console.log('\n📋 Deployment Instructions:');
  console.log('1. Upload wic-deployment.zip to your hosting provider');
  console.log('2. Extract the files');
  console.log('3. Copy .env.example to .env and configure your API keys');
  console.log('4. Run: ./start.sh (Linux/Mac) or start.bat (Windows)');
  console.log('5. Or manually: npm install && npm run server');
  console.log('\n🌐 The application will be available at: http://your-domain:3002');
} else {
  console.log('❌ Some files are missing or incorrect');
  console.log('Please check the errors above and fix them before deployment');
  process.exit(1);
} 