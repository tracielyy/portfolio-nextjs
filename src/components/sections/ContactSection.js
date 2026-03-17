// components/ContactForm.jsx (Client Component)
'use client';
import { useState } from 'react';
import { getDictionary } from '@/lib/dictionary';


export default function ContactSection({ locale }) {
  const dict = getDictionary(locale);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For handling of different fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to send message' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-container">
      <h1 className="section-title">{dict.section.contact.title}</h1>
      <p className="text-gray-500 mb-8 text-center">Fill out the form below and I'll get back to you as soon as possible.</p>

      {status.message && (
        <div className={`p-4 mb-6 rounded-lg 
          ${status.type === 'success'
            ? 'bg-green-900/30 text-green-400 border border-green-800'
            : 'bg-red-900/30 text-red-400 border border-red-800'
          }`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="contact-form-fields"
              placeholder={dict.section.contact.fields.name}
            />
          </div>

          <div className="space-y-2">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="contact-form-fields"
              placeholder={dict.section.contact.fields.email}
            />
          </div>
        </div>

        <div className="space-y-2">
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="contact-form-fields"
            placeholder={dict.section.contact.fields.subject}
          />
        </div>

        <div className="space-y-2">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            className="contact-form-fields"
            placeholder={dict.section.contact.fields.message}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-base btn-border general-btn default-border-btn-color"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </span>
          ) : (
            dict.section.contact.sendbutton
          )}
        </button>
      </form>
    </section>
  );
}