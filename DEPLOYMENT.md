# 🚀 Production Deployment Guide

## 📦 Project Overview
This is a complete React + Node.js application for Watford Islamic Centre with:
- ✅ Working Stripe live payment integration
- ✅ Multi-child registration system (up to 5 children)
- ✅ EmailJS confirmation emails with dynamic child data
- ✅ Responsive UI with Tailwind CSS
- ✅ Form validation and summary screens
- ✅ Business directory with submission forms

## 🛠️ Tech Stack
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Payment**: Stripe (Live keys configured)
- **Email**: EmailJS
- **Styling**: Tailwind CSS + Custom components

## 📋 Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Access to a hosting provider (Vercel, Netlify, Hostinger VPS, cPanel with Node.js)

## 🔧 Environment Variables Setup

Create a `.env` file in the project root with the following variables:

```env
# Stripe Configuration (REQUIRED - Get from Stripe Dashboard)
STRIPE_SECRET_KEY=sk_live_your_live_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key_here

# EmailJS Configuration (REQUIRED - Get from EmailJS Dashboard)
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Server Configuration
PORT=3002
NODE_ENV=production
```

## 🏗️ Build Commands

```bash
# Install dependencies
npm install

# Build frontend for production
npm run build

# Start backend server
npm run server
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Option 2: Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Set environment variables in Netlify dashboard

### Option 3: Hostinger VPS
1. Upload files to server
2. Run `npm install`
3. Set up PM2: `npm install -g pm2`
4. Start with PM2: `pm2 start server.js --name "wic-app"`
5. Set up nginx reverse proxy

### Option 4: cPanel with Node.js
1. Upload files via File Manager
2. Set up Node.js app in cPanel
3. Configure environment variables
4. Start the application

## 📁 Project Structure

```
wicprod/
├── src/                    # React source code
│   ├── pages/             # Page components
│   ├── components/        # Reusable components
│   └── index.css          # Global styles
├── public/                # Static assets
├── server.js              # Express backend
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── .env                   # Environment variables (create this)
```

## ✅ Features Included

- ✅ **Stripe Live Payment Integration** - Working card payments
- ✅ **Multi-Child Registration** - Up to 5 children per registration
- ✅ **EmailJS Confirmation Emails** - Dynamic child info layout
- ✅ **Responsive UI/UX** - Mobile-friendly design
- ✅ **Form Validation** - Complete validation logic
- ✅ **Business Directory** - Local business listings
- ✅ **Dynamic Pricing** - Age-based program eligibility
- ✅ **Discount Logic** - Sibling and early bird discounts
- ✅ **Terms & Conditions** - Legal compliance
- ✅ **Thank You Page** - Post-registration confirmation

## 🔒 Security Notes

- Never commit `.env` file to version control
- Use HTTPS in production
- Keep Stripe keys secure
- Regularly update dependencies

## 🐛 Troubleshooting

### Common Issues:
1. **Port already in use**: Change PORT in .env file
2. **Stripe authentication error**: Check API keys in .env
3. **EmailJS not working**: Verify service/template IDs
4. **Build errors**: Run `npm install` and clear cache

### Support:
- Check browser console for frontend errors
- Check server logs for backend errors
- Verify all environment variables are set correctly

## 📞 Support

For technical support, check:
1. Server logs for error messages
2. Browser console for frontend errors
3. Environment variable configuration
4. Network connectivity and firewall settings

## 🔄 Updates and Maintenance
1. **Regular Updates**:
   ```bash
   npm update
   npm audit fix
   ```

2. **Backup Strategy**:
   - Database backups (if applicable)
   - Code repository backups
   - Environment variable backups

3. **Monitoring**:
   - Set up uptime monitoring
   - Configure error tracking
   - Monitor payment success rates

---
**Last Updated**: December 2024
**Version**: Production Ready v1.0 