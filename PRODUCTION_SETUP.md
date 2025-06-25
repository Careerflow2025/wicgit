# 🚀 Production Setup Guide

## Environment Variables Required

Create `.env` file in root:
```env
STRIPE_SECRET_KEY=sk_live_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
PORT=3002
NODE_ENV=production
```

## Deployment Commands

```bash
# Install dependencies
npm install

# Build frontend
npm run build

# Start backend
npm run server
```

## Features Included
✅ Stripe live payments
✅ Multi-child registration (up to 5)
✅ EmailJS confirmations
✅ Responsive UI
✅ Form validation
✅ Business directory 