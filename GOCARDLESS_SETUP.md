# GoCardless Integration Setup Guide

## Overview
This project now includes GoCardless payment integration for the Summer at WIC registration form. When users complete the registration form, they will be redirected to GoCardless to complete payment via Direct Debit.

## Prerequisites
- GoCardless account (sandbox for testing, live for production)
- GoCardless API access token

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# GoCardless Configuration
GOCARDLESS_ACCESS_TOKEN=your_gocardless_access_token_here

# Environment
NODE_ENV=development

# Server Port
PORT=3001
```

### 2. Getting GoCardless Access Token
1. Log into your GoCardless dashboard
2. Go to Developers → API Keys
3. Create a new API key
4. Copy the access token to your `.env` file

### 3. Running the Application

#### Development Mode (Both Frontend and Backend)
```bash
npm run dev:full
```
This will start both the React frontend (Vite) and the Express backend server simultaneously.

#### Running Separately
```bash
# Terminal 1 - Backend Server
npm run server

# Terminal 2 - Frontend Development Server
npm run dev
```

### 4. Testing the Integration

1. Start the application using `npm run dev:full`
2. Navigate to `/summer/register`
3. Complete the registration form
4. Click "Submit and Pay"
5. You will be redirected to GoCardless payment page
6. After successful payment, you'll be redirected to `/thank-you`

## API Endpoints

### POST `/api/create-payment`
Creates a GoCardless redirect flow and payment.

**Request Body:**
```json
{
  "amount": 150.00,
  "description": "Summer at WIC Registration - 2 children - Upfront payment",
  "customerEmail": "parent@example.com",
  "customerName": "John Doe"
}
```

**Response:**
```json
{
  "redirectUrl": "https://pay.gocardless.com/flow/RE123456789",
  "paymentId": "PM123456789",
  "mandateId": "MD123456789"
}
```

### POST `/api/gocardless-webhook`
Handles GoCardless webhooks for payment status updates.

### GET `/api/health`
Health check endpoint.

## Payment Flow

1. **User completes registration form** → Form data is sent via EmailJS
2. **Payment creation** → Backend creates GoCardless redirect flow and payment
3. **Redirect to GoCardless** → User is redirected to secure GoCardless payment page
4. **Payment completion** → User completes Direct Debit setup
5. **Success redirect** → User is redirected to `/thank-you` page
6. **Webhook notification** → GoCardless sends webhook with payment status

## Features

- ✅ **Direct Debit payments** via GoCardless
- ✅ **Secure redirect flow** - no card details stored on your server
- ✅ **Weekly payment plans** for eligible registrations
- ✅ **Automatic mandate creation** for recurring payments
- ✅ **Webhook handling** for payment status updates
- ✅ **Sandbox/Live environment** support
- ✅ **Error handling** and user feedback

## Production Deployment

### Environment Variables
For production, update your `.env` file:
```env
NODE_ENV=production
GOCARDLESS_ACCESS_TOKEN=your_live_access_token
```

### Webhook Configuration
1. In your GoCardless dashboard, go to Developers → Webhooks
2. Add webhook endpoint: `https://yourdomain.com/api/gocardless-webhook`
3. Select events: `payments.confirmed`, `payments.failed`

### Security Considerations
- Use HTTPS in production
- Validate webhook signatures
- Store sensitive data securely
- Implement proper error logging

## Troubleshooting

### Common Issues

1. **"Failed to create payment" error**
   - Check your GoCardless access token
   - Verify the token has correct permissions
   - Check network connectivity

2. **CORS errors**
   - Ensure the backend server is running on port 3001
   - Check that CORS is properly configured

3. **Payment not redirecting**
   - Verify the redirect URL is correct
   - Check browser console for errors
   - Ensure the backend server is accessible

### Debug Mode
To enable debug logging, add to your `.env`:
```env
DEBUG=gocardless:*
```

## Support

For GoCardless-specific issues, refer to:
- [GoCardless API Documentation](https://developer.gocardless.com/)
- [GoCardless Node.js SDK](https://github.com/gocardless/gocardless-nodejs)

For application-specific issues, check the server logs and browser console for error messages. 