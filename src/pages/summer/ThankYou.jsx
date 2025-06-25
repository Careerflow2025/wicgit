import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ThankYou() {
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [details, setDetails] = useState(null);

  useEffect(() => {
    // Check for Stripe session data
    const stripeSession = JSON.parse(localStorage.getItem('stripeSession') || '{}');
    if (!stripeSession.user || !stripeSession.amount) {
      setStatus('no-session');
      return;
    }
    
    // Payment was successful if user reached this page
    setStatus('success');
    setDetails(stripeSession);
    localStorage.removeItem('stripeSession');
  }, []);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Processing your payment...</div>;
  }
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white font-sans flex flex-col items-center justify-center py-8 px-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-4">Payment Successful!</h1>
            <p className="text-lg mb-2">Thank you for registering for Summer at WIC.</p>
            <p className="text-md text-gray-600 mb-4">A confirmation email will be sent to you soon.</p>
            {details && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Amount paid: £{details.amount}</p>
                <p className="text-sm text-gray-600">Payment method: {details.paymentOption === 'weekly' ? 'Weekly (3 payments)' : 'Full payment'}</p>
              </div>
            )}
            <div className="mt-4">
              <a href="/" className="text-green-700 underline">Return to homepage</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (status === 'error') {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }
  if (status === 'no-session') {
    return <div className="min-h-screen flex items-center justify-center text-red-600">Invalid or expired payment session.</div>;
  }
  return null;
} 