import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from the project root
const envPath = path.resolve(__dirname, '.env');
const dotenvResult = dotenv.config({ path: envPath });

if (dotenvResult.error) {
  console.error(`SERVER FATAL ERROR: Could not load .env file from ${envPath}`, dotenvResult.error);
  process.exit(1);
}

const stripeSecret = process.env.STRIPE_SECRET_KEY;
console.log(`[Server] Stripe Secret Key Loaded: ${stripeSecret ? 'Yes' : 'No, it is UNDEFINED'}`);

if (!stripeSecret) {
  console.error('SERVER FATAL ERROR: STRIPE_SECRET_KEY is not defined in your .env file.');
  console.error('Please ensure STRIPE_SECRET_KEY is set in your .env file.');
  process.exit(1);
}

// Initialize Stripe client once
let stripe;
try {
  stripe = new Stripe(stripeSecret);
  console.log('[Server] Stripe client initialized successfully');
} catch (error) {
  console.error('[Server] Failed to initialize Stripe client:', error);
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3002;
const a = process.env.NODE_ENV;

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',
      'http://localhost:5177',
      'http://localhost:5178',
      'http://localhost:5179',
      'http://localhost:5180',
      'http://localhost:5190',
      'http://localhost:5191',
      'http://localhost:5192',
      'http://localhost:5193',
      'http://localhost:5194',
      'http://localhost:5195',
      'http://localhost:5196',
      'http://localhost:5197',
      'https://watfordislamiccentre.com',
      'http://watfordislamiccentre.com',
      'https://www.watfordislamiccentre.com',
      'http://www.watfordislamiccentre.com'
    ];
    
    if (allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());

// Stripe Checkout Session endpoint
app.post('/create-stripe-session', async (req, res) => {
  const { amount, email, paymentOption } = req.body;

  if (!stripe) {
    console.error('Stripe client is not initialized!');
    return res.status(500).json({ error: 'Server configuration error.' });
  }
  
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{
        price_data: {
          currency: 'GBP',
          product_data: {
            name: 'Summer at WIC Registration'
          },
          unit_amount: Math.round(amount * 100)
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: `${req.headers.origin || 'http://localhost:5173'}/thank-you`,
      cancel_url: `${req.headers.origin || 'http://localhost:5173'}/summer-register`,
    });

    res.status(200).json({ url: session.url });

  } catch (err) {
    console.error('Stripe session creation error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/.well-known', express.static(path.join(__dirname, '.well-known')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`FATAL ERROR: Port ${PORT} is already in use. Please close the other process or change the PORT in your .env file.`);
  } else {
    console.error('An unexpected server error occurred:', err);
  }
  process.exit(1);
});

// This is a catch-all for any unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
}); 