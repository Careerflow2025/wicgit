#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import archiver from 'archiver';

console.log('🚀 Starting VPS-Optimized Deployment Build...');

// 1. Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully.');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error);
  process.exit(1);
}

// 2. Build the React application
console.log('\n🔨 Building the React application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Project built successfully.');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}

const deployDir = 'wic-deployment-package';
const outputZipFile = 'wiccc.zip';

// 3. Clean up old artifacts
console.log('\n🧹 Cleaning up old artifacts...');
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true, force: true });
}
if (fs.existsSync(outputZipFile)) {
  fs.rmSync(outputZipFile);
}
fs.mkdirSync(deployDir);
console.log('✅ Cleanup complete.');

// 4. Copy necessary files to deployment directory
console.log('\n📁 Copying necessary files for deployment...');
const filesToCopy = [
  'dist',
  'server.js',
  'package.json',
  'package-lock.json',
  'README.md',
];
filesToCopy.forEach(file => {
  const destPath = path.join(deployDir, file);
  if (fs.statSync(file).isDirectory()) {
    fs.cpSync(file, destPath, { recursive: true });
  } else {
    fs.copyFileSync(file, destPath);
  }
  console.log(`  -> Copied ${file}`);
});
console.log('✅ Files copied.');

// 5. Create a detailed VPS deployment guide
console.log('\n📝 Creating detailed VPS deployment guide...');

const vpsGuideContent = `
# 🚨 URGENT HOSTINGER VPS DEPLOYMENT GUIDE 🚨

You are seeing this guide because deploying a Node.js application is different from a simple website and requires steps on the server. The "403 Forbidden" error almost always means the Node.js server process isn't running or your web server isn't pointing to it.

**Follow these steps exactly on your Hostinger VPS after uploading \`wiccc.zip\`:**

---

### **Step 1: Connect to Your VPS via SSH**
Open a terminal (on macOS/Linux) or PowerShell/PuTTY (on Windows) and connect to your server. Replace \`your_vps_ip\` with your actual server IP address.
\`\`\`bash
ssh root@your_vps_ip
\`\`\`

---

### **Step 2: Upload and Unzip the Project**
If you haven't already, upload \`wiccc.zip\` to your VPS using \`scp\` or an FTP client like FileZilla. Then, unzip it.
\`\`\`bash
# Unzip the file (you might need to install it first: apt-get install unzip)
unzip wiccc.zip -d wic-app

# Navigate into the project directory
cd wic-app
\`\`\`

---

### **Step 3: Install Dependencies**
Install only the necessary production dependencies using npm.
\`\`\`bash
npm install --production
\`\`\`

---

### **Step 4: Configure Environment Variables**
Copy the example environment file and then edit it to add your secret keys.
\`\`\`bash
# Copy the template
cp .env.example .env

# Edit the file with your keys using nano
nano .env
\`\`\`
Inside the nano editor, add your Stripe and EmailJS keys. Press \`Ctrl+X\`, then \`Y\`, then \`Enter\` to save and exit.

---

### **Step 5: Test the Server Directly**
Before making it permanent, run the server to see if it works.
\`\`\`bash
node server.js
\`\`\`
You should see output like: \`Server running on port 3002\`.

Now, open your web browser and go to \`http://your_vps_ip:3002\`. You should see your website! If not, check your VPS firewall to ensure port 3002 is open.

Press \`Ctrl+C\` in the terminal to stop the server.

---

### **Step 6: Run the App with a Process Manager (PM2)**
A process manager ensures your app restarts automatically if it crashes and runs in the background. This is **essential for production**.

\`\`\`bash
# Install PM2 globally
npm install pm2 -g

# Start your application with PM2
pm2 start server.js --name "wic-app"

# Tell PM2 to automatically restart on server reboot
pm2 startup

# Save the current process list
pm2 save

# Check the status of your app
pm2 status
\`\`\`
Your app is now running permanently. You can view logs with \`pm2 logs wic-app\`.

---

### **Step 7: Configure Reverse Proxy (The Final Step)**
To access your site at \`watfordislamiccentre.com\` without the port number, you need a reverse proxy. This tells your main web server (Apache/Nginx) to forward requests to your Node.js app.

**If you use Nginx:**
Create a file \`/etc/nginx/sites-available/wic.conf\` and add:
\`\`\`nginx
server {
    listen 80;
    server_name watfordislamiccentre.com www.watfordislamiccentre.com;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`
Enable it: \`ln -s /etc/nginx/sites-available/wic.conf /etc/nginx/sites-enabled/ && nginx -t && systemctl restart nginx\`
Then add SSL with Certbot: \`certbot --nginx -d watfordislamiccentre.com -d www.watfordislamiccentre.com\`

**If you use Apache:**
Enable proxy modules: \`a2enmod proxy proxy_http\`
Create a file \`/etc/apache2/sites-available/wic.conf\` and add:
\`\`\`apache
<VirtualHost *:80>
    ServerName watfordislamiccentre.com
    ServerAlias www.watfordislamiccentre.com

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3002/
    ProxyPassReverse / http://127.0.0.1:3002/
</VirtualHost>
\`\`\`
Enable it: \`a2ensite wic.conf && systemctl restart apache2\`
Then add SSL with Certbot: \`certbot --apache -d watfordislamiccentre.com -d www.watfordislamiccentre.com\`

---
`;
fs.writeFileSync(path.join(deployDir, 'VPS_DEPLOYMENT_GUIDE.md'), vpsGuideContent.trim());

// 6. Create .env.example
console.log('📝 Creating .env.example file...');
const envTemplate = `# Copy this file to .env and fill in your values.
# Do NOT commit the .env file to version control.

# SERVER CONFIGURATION
PORT=3002
NODE_ENV=production

# STRIPE API KEYS (replace with your actual keys)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...

# EMAILJS CREDENTIALS
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
`;
fs.writeFileSync(path.join(deployDir, '.env.example'), envTemplate.trim());

// 7. Create the final ZIP file
console.log(`\n📦 Creating final deployment package: ${outputZipFile}...`);
const output = fs.createWriteStream(outputZipFile);
const archive = archiver('zip', { zlib: { level: 9 } });

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn(err);
  } else {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.directory(deployDir, false);

output.on('close', () => {
  console.log('✅ Deployment package created successfully!');
  console.log(`  -> File: ${outputZipFile}`);
  console.log(`  -> Size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
  
  // 8. Clean up the temporary deployment directory
  fs.rmSync(deployDir, { recursive: true, force: true });

  console.log('\n\n✅ DEPLOYMENT PACKAGE IS READY. Please upload `wiccc.zip` to your VPS and follow `VPS_DEPLOYMENT_GUIDE.md` exactly.');
});

archive.finalize(); 