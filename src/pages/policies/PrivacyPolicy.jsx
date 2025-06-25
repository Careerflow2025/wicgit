import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {/* Page Title for accessibility */}
          <h1 className="text-4xl font-bold mb-6 text-center" tabIndex={0}>Privacy Policy</h1>
          {/* Placeholder policy text, update as needed */}
          <section className="text-gray-700 space-y-4">
            <p>
              Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website.
            </p>
            <p>
              <strong>Information We Collect:</strong> We may collect personal information such as your name, email address, and phone number when you contact us or use our services.
            </p>
            <p>
              <strong>How We Use Information:</strong> We use your information to provide and improve our services, respond to inquiries, and communicate important updates.
            </p>
            <p>
              <strong>Contact:</strong> If you have any questions about this policy, please contact us at <a href="mailto:info@watfordislamiccentre.org" className="text-primary underline">info@watfordislamiccentre.org</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 