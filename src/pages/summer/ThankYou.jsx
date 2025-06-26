import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

export default function ThankYou() {
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [details, setDetails] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    // Initialize EmailJS once when component mounts
    if (window && emailjs) {
      emailjs.init('TmR4Bj4RfWfUyottq'); // Use the same public key as Enrol.jsx
      console.log('EmailJS initialized');
    }
  }, []);

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

  useEffect(() => {
    // Only send email if payment is successful and email hasn't been sent yet
    if (status === 'success' && details && !emailSent) {
      const sendBothEmails = async () => {
        try {
          // Format amount (if in pennies, convert to pounds)
          let amount = details.amount;
          if (typeof amount === 'number' && amount > 1000) {
            amount = (amount / 100).toFixed(2);
          }
          if (typeof amount === 'string') {
            amount = amount.replace(/[^0-9.]/g, '');
          }
          if (!amount || isNaN(amount)) {
            amount = 'N/A';
          }

          // Fallbacks for all fields
          const clientName = details.user?.parentName || 'Customer';
          const clientEmail = details.user?.parentEmail || 'no-reply@watfordislamiccentre.com';
          const paymentId = details.paymentId || 'N/A';
          const paymentDate = new Date().toLocaleString('en-GB');
          const programmeInfo = details.children ?
            details.children.map(c =>
              c.programmes?.map(p => p.name).join(', ')
            ).join('; ') : 'N/A';
          const fromName = clientName;
          const replyTo = clientEmail;

          // Template params (always filled)
          const templateParams = {
            to_email: '', // will be set per email
            client_name: clientName,
            amount_paid: `£${amount}`,
            payment_id: paymentId,
            payment_date: paymentDate,
            programme_info: programmeInfo,
            name: fromName,
            email: replyTo,
          };

          // Send to client
          await emailjs.send(
            'service_pghoqyc',
            'template_svb82lr',
            { ...templateParams, to_email: clientEmail }
          );
          // Send to admin
          await emailjs.send(
            'service_pghoqyc',
            'template_svb82lr',
            { ...templateParams, to_email: 'info@watfordislamiccentre.com' }
          );

          setEmailSent(true);
        } catch (error) {
          console.error('Failed to send payment confirmation email:', error);
          setEmailError('Failed to send confirmation email: ' + error.message);
        }
      };

      sendBothEmails();
    }
  }, [status, details, emailSent]);

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
                <p className="text-sm text-gray-600">Amount paid: £{typeof details.amount === 'number' && details.amount > 1000 ? (details.amount / 100).toFixed(2) : details.amount}</p>
                <p className="text-sm text-gray-600">Payment method: {details.paymentOption === 'weekly' ? 'Weekly (3 payments)' : 'Full payment'}</p>
              </div>
            )}
            {emailSent && (
              <div className="mt-4 text-green-700 font-semibold">Payment successful, confirmation sent!</div>
            )}
            {emailError && (
              <div className="mt-4 text-red-600 font-semibold">{emailError}</div>
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