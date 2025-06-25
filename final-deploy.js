#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import archiver from 'archiver';

console.log('🚀 Starting Final Deployment Build...');

// 1. Ensure dependencies are installed
console.log('📦 Ensuring dependencies are up-to-date...');
execSync('npm install', { stdio: 'inherit' });

// 2. Build the React application
console.log('\n🔨 Building the React application...');
execSync('npm run build', { stdio: 'inherit' });

const deployDir = 'wic_live_package';
const outputZipFile = 'wic_live.zip';

// 3. Clean up old artifacts
console.log('\n🧹 Cleaning up old artifacts...');
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true, force: true });
}
if (fs.existsSync(outputZipFile)) {
  fs.rmSync(outputZipFile);
}
fs.mkdirSync(deployDir);

// 4. Copy necessary files to deployment directory
console.log('\n📁 Copying essential files for deployment...');
const filesToCopy = [
  { src: 'dist', dest: 'dist' },
  { src: 'server.js', dest: 'server.js' },
  { src: 'package.json', dest: 'package.json' },
  { src: 'package-lock.json', dest: 'package-lock.json' },
];
filesToCopy.forEach(file => {
  const destPath = path.join(deployDir, file.dest);
  if (fs.statSync(file.src).isDirectory()) {
    fs.cpSync(file.src, destPath, { recursive: true });
  } else {
    fs.copyFileSync(file.src, destPath);
  }
  console.log(`  -> Copied ${file.src}`);
});

// 5. Create the simple, one-time setup instructions
console.log('\n📝 Creating simple instructions...');
const instructionsContent = `
# One-Time Server Setup Instructions

To get your website live, you only need to run these commands **once** inside your Hostinger VPS terminal after unzipping \`wic_live.zip\`.

This works by running the essential \`server.js\` file, which makes your payment system and other features work.

---

### **Step 1: Unzip and Enter the Directory**

\`\`\`bash
unzip wic_live.zip -d wic-app
cd wic-app
\`\`\`

---

### **Step 2: Run the One-Time Setup**

Copy and paste these commands into your server terminal.

\`\`\`bash
# Install dependencies
npm install --production

# Install PM2 (a tool to keep your site online 24/7)
npm install pm2 -g

# Start your website with PM2 using npx (this fixes 'command not found' errors)
npx pm2 start server.js --name "wic-live"

# Tell PM2 to automatically restart your site if the server reboots
npx pm2 startup

# Save the configuration
npx pm2 save
\`\`\`
---

That's it! Your site is now running permanently. You do not need to do this again.

To see your site at your domain (\`watfordislamiccentre.com\`), you may need to configure a "reverse proxy" in your Hostinger control panel to point your domain to the application running on port \`3002\`. This is a standard step for Node.js apps.
`;
fs.writeFileSync(path.join(deployDir, 'INSTRUCTIONS.md'), instructionsContent.trim());

// 6. Create the final ZIP file
console.log(`\n📦 Creating final deployment package: ${outputZipFile}...`);
const output = fs.createWriteStream(outputZipFile);
const archive = archiver('zip', { zlib: { level: 9 } });
archive.pipe(output);
archive.directory(deployDir, false);
archive.finalize();

output.on('close', () => {
  console.log('\n\n✅ DEPLOYMENT PACKAGE READY!');
  console.log(`  -> File: ${outputZipFile}`);
  console.log(`  -> Size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
  fs.rmSync(deployDir, { recursive: true, force: true });
  console.log('\nUpload `wic_live.zip` to your VPS and follow the simple `INSTRUCTIONS.md` inside.');
}); 