import React from 'react';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {/* Page Title for accessibility */}
          <h1 className="text-4xl font-bold mb-6 text-center" tabIndex={0}>Terms & Conditions</h1>
          {/* Placeholder terms text, update as needed */}
          <section className="text-gray-700 space-y-4">
            <p>
              By using this website, you agree to comply with and be bound by the following terms and conditions of use.
            </p>
            <p>
              <strong>Use of Site:</strong> The content of this website is for your general information and use only. It is subject to change without notice.
            </p>
            <p>
              <strong>Intellectual Property:</strong> All content, trademarks, and data on this website are the property of Watford Islamic Centre or its licensors.
            </p>
            <p>
              <strong>Contact:</strong> For any questions regarding these terms, please contact us at <a href="mailto:info@watfordislamiccentre.org" className="text-primary underline">info@watfordislamiccentre.org</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 