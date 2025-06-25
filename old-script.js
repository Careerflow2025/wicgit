#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

console.log('🚀 Creating Final Netlify Deployment Package...');

const outputZipFile = 'wicwic.zip';
const tempDir = 'wic_final_package';

// Clean up old artifacts
if (fs.existsSync(outputZipFile)) fs.rmSync(outputZipFile);
if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
fs.mkdirSync(tempDir);

// Define all files and directories to include in the zip for Netlify to build
const itemsToCopy = [
  'src',
  'public',
  'netlify',
  'package.json',
  'package-lock.json',
  'netlify.toml',
  'vite.config.js',
  'tailwind.config.js',
  'postcss.config.js',
  'index.html',
  'README.md'
];

console.log('📁 Copying all project source files...');
for (const item of itemsToCopy) {
  if (fs.existsSync(item)) {
    const destPath = path.join(tempDir, item);
    if (fs.statSync(item).isDirectory()) {
      fs.cpSync(item, destPath, { recursive: true });
    } else {
      fs.copyFileSync(item, destPath);
    }
  }
}

// Create the zip file
const output = fs.createWriteStream(outputZipFile);
const archive = archiver('zip', { zlib: { level: 9 } });

archive.pipe(output);
archive.directory(tempDir, false);
archive.finalize();

output.on('close', () => {
  console.log('✅ Final Netlify package created successfully!');
  console.log(`  -> File: ${outputZipFile}`);
  console.log(`  -> Size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log('\nUpload `wicwic.zip` to Netlify. It is now correctly configured.');
}); 