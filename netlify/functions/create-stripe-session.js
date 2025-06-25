import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
  try {
    const { amount, email } = JSON.parse(event.body);
    
    // Validate amount is a number and greater than 0
    if (isNaN(amount) || amount <= 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid amount' }),
      };
    }
    
    // Use the origin from the Netlify request headers
    const origin = event.headers.origin || process.env.URL;

    if (!origin) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not determine request origin.'})
        }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Summer at WIC Registration',
            },
            unit_amount: Math.round(amount * 100), // Amount in pence
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/thank-you`,
      cancel_url: `${origin}/summer/register`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error('Stripe session creation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}; 