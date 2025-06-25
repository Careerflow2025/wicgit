import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ageGroups = [
  '4-6 years',
  '7-9 years',
  '10-12 years',
  '13-15 years',
  '16-18 years',
  'Adult',
];

const programmes = [
  'Library',
  'Youth Club',
  'WIC FC',
  'Business and Barakah',
  'Over 60s',
  'Baby and Mum',
  'Quran Breakfast Circle',
];

export default function Enrol() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');
    emailjs.sendForm(
      'service_pghoqyc',
      'template_q96tqn7',
      form.current,
      'TmR4Bj4RfWfUyottq'
    ).then(
      (result) => {
        setSubmitSuccess(true);
        form.current.reset();
      },
      (error) => {
        setSubmitError('Failed to send. Please try again.');
      }
    ).finally(() => setIsSubmitting(false));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Enroll Now</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Enrollment Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-4">✅</div>
                    <h2 className="text-2xl font-semibold text-primary mb-2">
                      Enrollment Submitted!
                    </h2>
                    <p className="text-gray-600">
                      Thank you for your interest. We will contact you shortly.
                    </p>
                  </div>
                ) : (
                  <form ref={form} onSubmit={sendEmail} className="space-y-6">
                    <div>
                      <label htmlFor="from_name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="from_name"
                        name="from_name"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label htmlFor="from_email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="from_email"
                        name="from_email"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label htmlFor="age_group" className="block text-sm font-medium text-gray-700">
                        Age Group
                      </label>
                      <select
                        id="age_group"
                        name="age_group"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      >
                        <option value="">Select Age Group</option>
                        {ageGroups.map((age) => (
                          <option key={age} value={age}>
                            {age}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="programme" className="block text-sm font-medium text-gray-700">
                        Programme
                      </label>
                      <select
                        id="programme"
                        name="programme"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      >
                        <option value="">Select Programme</option>
                        {programmes.map((programme) => (
                          <option key={programme} value={programme}>
                            {programme}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn btn-primary"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Enrollment'}
                    </button>
                    {submitError && <p className="text-red-600 text-center mt-4">{submitError}</p>}
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  Have questions? Reach out to us directly through WhatsApp.
                </p>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent w-full"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Why Choose WIC?</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Qualified Teachers
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Modern Facilities
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Safe Environment
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Comprehensive Curriculum
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 