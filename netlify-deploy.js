#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

console.log('🚀 Creating Netlify Deployment Package...');

const outputZipFile = 'wicnetlify.zip';
const tempDir = 'wic_netlify_package';

// Clean up old artifacts
if (fs.existsSync(outputZipFile)) fs.rmSync(outputZipFile);
if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
fs.mkdirSync(tempDir);

// Define all files and directories to include in the zip
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

console.log('📁 Copying project files...');
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

// Create instructions for Netlify deployment
const instructions = `
# How to Deploy to Netlify

This project is now configured for a simple drag-and-drop deployment to Netlify.

**IMPORTANT**: Your Stripe payments will NOT work until you add your API keys to the Netlify UI.

---

### Step 1: Drag and Drop to Deploy

1.  Log in to your Netlify account.
2.  Go to the "Sites" tab.
3.  Drag and drop the \`wicnetlify.zip\` file onto the deployment area.

Netlify will automatically unzip, build, and deploy your site.

---

### Step 2: Add Your Environment Variables

This is the most important step for making payments work.

1.  Once the site is deployed, go to **Site settings**.
2.  In the side menu, go to **Build & deploy > Environment**.
3.  Click **Edit variables** and add the following keys, one by one:

-   **Key:** \`VITE_STRIPE_PUBLISHABLE_KEY\`
-   **Value:** \`pk_live_...\` (Your *publishable* Stripe key)

-   **Key:** \`STRIPE_SECRET_KEY\`
-   **Value:** \`sk_live_...\` (Your *secret* Stripe key)

-   **Key:** \`EMAILJS_PUBLIC_KEY\`
-   **Value:** Your EmailJS Public Key

-   **Key:** \`EMAILJS_SERVICE_ID\`
-   **Value:** Your EmailJS Service ID

-   **Key:** \`EMAILJS_TEMPLATE_ID\`
-   **Value:** Your EmailJS Template ID

---

### Step 3: Trigger a Redeploy

After adding the variables, you need to trigger a new deploy to make them available to your site.

1.  Go to the **Deploys** tab for your site.
2.  Click the **Trigger deploy** dropdown and select **Deploy site**.

Once the new deploy is finished, your site will be live and all functions, including payments, will work correctly.
`;
fs.writeFileSync(path.join(tempDir, 'NETLIFY_INSTRUCTIONS.md'), instructions.trim());

// Create the zip file
const output = fs.createWriteStream(outputZipFile);
const archive = archiver('zip', { zlib: { level: 9 } });

archive.pipe(output);
archive.directory(tempDir, false);
archive.finalize();

output.on('close', () => {
  console.log('✅ Netlify package created successfully!');
  console.log(`  -> File: ${outputZipFile}`);
  console.log(`  -> Size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log('\nDeployment package `wicnetlify.zip` is ready. Drag and drop it to your Netlify dashboard and follow the instructions.');
}); 