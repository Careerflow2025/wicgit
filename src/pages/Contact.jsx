import React, { useState } from 'react';
import BusinessSubmissionForm from '../components/BusinessSubmissionForm';
import toast from 'react-hot-toast';

export default function Contact() {
  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingContact(true);

    try {
      // Validate required fields
      if (!contactForm.fullName || !contactForm.email || !contactForm.message) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactForm.email)) {
        toast.error('Please enter a valid email address');
        return;
      }

      // Simulate form submission (replace with actual email service)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setContactForm({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      });

      toast.success('Thank you for your message! We will get back to you soon.');
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmittingContact(false);
    }
  };

  return (
    <div className="bg-gray-100 py-12 md:py-20">
      <div className="container mx-auto px-4">
        
        {/* Contact Us Form Section */}
        <section className="mb-16">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={contactForm.fullName}
                  onChange={handleContactInputChange}
                  className="input-style"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactInputChange}
                  className="input-style"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactInputChange}
                  className="input-style"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactInputChange}
                  rows={5}
                  className="input-style"
                  placeholder="Please tell us how we can assist you..."
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmittingContact}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingContact ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="border-t border-gray-300"></div>
          <div className="text-center mt-4">
            <span className="bg-gray-100 px-4 text-gray-500 text-sm">OR</span>
          </div>
        </div>

        {/* Business Submission Section */}
        <section id="list-your-business">
          <BusinessSubmissionForm />
        </section>

      </div>
    </div>
  );
} 