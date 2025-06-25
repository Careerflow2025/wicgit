import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const programmes = [
  {
    title: 'Weekday Quran and Arabic',
    age: 'Ages 5–15',
  },
  {
    title: 'Weekday Quran for Adults',
    age: 'Ages 16+',
  },
  {
    title: 'Saturday Islamic Studies, Arabic, Tafseer, Sports/Creativity',
    age: 'Ages 5–15',
  },
  {
    title: 'Saturday Arabic for Adults',
    age: 'Ages 16+',
  },
  {
    title: 'Saturday Juz Amma Course for Adults',
    age: 'Ages 16+',
  },
];

const gold = 'text-[#d4af37]';
const goldBg = 'bg-[#d4af37]';

export default function EnrolPage() {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    programme: '',
    addChild: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        'service_pghoqyc',
        'template_q96tqn7',
        formRef.current,
        'TmR4Bj4RfWfUyottq'
      );

      setForm({
        name: '',
        phone: '',
        email: '',
        programme: '',
        addChild: '',
        message: '',
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 font-sans">
      {/* SECTION 1: HERO */}
      <section className="py-16 px-4 text-center flex flex-col items-center justify-center bg-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Join WIC Academy Today</h1>
        <p className="text-lg md:text-xl text-gray-700">Flexible Islamic & Arabic programmes for all ages</p>
      </section>

      {/* SECTION 2: PROGRAMMES */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {programmes.map((p) => (
            <div
              key={p.title}
              className="bg-white border border-[#d4af37]/30 rounded-xl shadow-sm p-6 flex flex-col items-start hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-900">{p.title}</h2>
              <span className="text-sm text-gray-500 mb-1">{p.age}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: FORM */}
      <section className="py-16 px-4 flex flex-col items-center justify-center bg-white">
        <div className="max-w-2xl w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">Enrolment Form</h2>
          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="programme" className="block text-sm font-medium text-gray-700">Enrol for</label>
              <select
                id="programme"
                name="programme"
                required
                value={form.programme}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              >
                <option value="">Select a programme</option>
                {programmes.map((p) => (
                  <option key={p.title} value={p.title}>{p.title} ({p.age})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Add a Child</label>
              <div className="flex gap-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="addChild"
                    value="Yes"
                    checked={form.addChild === 'Yes'}
                    onChange={handleChange}
                    className="text-primary focus:ring-primary"
                    required
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="addChild"
                    value="No"
                    checked={form.addChild === 'No'}
                    onChange={handleChange}
                    className="text-primary focus:ring-primary"
                    required
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={form.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full font-bold text-lg bg-primary text-white shadow-md hover:bg-primary/90 transition-colors duration-200 mt-2"
            >
              {loading ? 'Sending...' : 'ENROL'}
            </button>
            {submitted && (
              <div className="text-center text-green-600 font-semibold mt-4">Thank you! Your enrolment has been submitted.</div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
} 