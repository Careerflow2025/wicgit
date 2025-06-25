# 🚀 Watford Islamic Centre - Deployment Guide

## 📦 What's New in This Deployment

This deployment package has been **completely rebuilt** to fix the blank page issue. The main fixes include:

1. **Fixed Server Configuration**: Corrected the static file serving paths
2. **Proper Build Process**: Ensured the React app is built correctly
3. **Complete Package**: Includes all necessary files for deployment
4. **Easy Setup**: Includes start scripts for both Windows and Linux/Mac

## 📋 Files Included

- `wic-deployment.zip` - Complete deployment package (552MB)
- `dist/` - Built React application
- `server.js` - Express server with Stripe integration
- `package.json` & `package-lock.json` - Dependencies
- `.env.example` - Environment variables template
- `start.sh` & `start.bat` - Easy start scripts
- Documentation files

## 🛠️ Deployment Steps

### Step 1: Upload and Extract
1. Upload `wic-deployment.zip` to your hosting provider
2. Extract the ZIP file to your server directory

### Step 2: Configure Environment
1. Copy `.env.example` to `.env`
2. Edit `.env` and add your actual API keys:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_actual_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_publishable_key

# Server Configuration
PORT=3002
NODE_ENV=production

# EmailJS Configuration (if using)
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

### Step 3: Start the Application

**Option A: Using Start Scripts (Recommended)**
- **Windows**: Double-click `start.bat` or run `start.bat` in command prompt
- **Linux/Mac**: Run `./start.sh` in terminal

**Option B: Manual Commands**
```bash
npm install
npm run server
```

### Step 4: Access Your Application
- The application will be available at: `http://your-domain:3002`
- Make sure port 3002 is open in your firewall/security groups

## 🔧 Troubleshooting

### Blank Page Issue (Fixed)
- ✅ Server now correctly serves static files from `dist/` directory
- ✅ SPA routing is properly configured
- ✅ All assets are included in the build

### Common Issues

**Port Already in Use**
```bash
# Change PORT in .env file
PORT=3003
```

**Permission Denied (Linux/Mac)**
```bash
chmod +x start.sh
```

**Missing Dependencies**
```bash
npm install
```

**Environment Variables Not Loaded**
- Ensure `.env` file exists in the root directory
- Check that variable names match exactly (case-sensitive)

## 🌐 Production Considerations

### Domain Configuration
- Set up your domain to point to your server
- Configure reverse proxy (nginx/Apache) if needed
- Set up SSL certificate for HTTPS

### Environment Variables
- Use production Stripe keys (not test keys)
- Set `NODE_ENV=production`
- Configure proper CORS origins

### Performance
- The application is optimized and minified
- Assets are properly cached
- Server includes compression

## 📞 Support

If you encounter any issues:

1. Check the server logs for error messages
2. Verify all environment variables are set correctly
3. Ensure port 3002 is accessible
4. Check that all files were extracted properly

## ✅ Verification

To verify your deployment is working:

1. Visit your domain:port (e.g., `http://yourdomain.com:3002`)
2. You should see the Watford Islamic Centre homepage
3. Test navigation between pages
4. Test the summer registration form (if configured)

---

**🎉 Your Watford Islamic Centre application is now ready for production!** 