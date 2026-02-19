'use client';

import { useState, FormEvent } from 'react';

interface ContactFormProps {
  titleFont: string;   
}

export default function ContactForm({ titleFont }: ContactFormProps) {
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });  

  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const validateForm = () => {
    if (formData.name.trim().length < 2) {
      return 'Please enter a valid name.';
    } else if (formData.name.trim().length > 50) {
      return 'Name cannot exceed 50 characters.';
    }

    if (contactMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        return 'Please enter a valid email address.';
      } else if (formData.email.trim().length > 100) {
        return 'Email cannot exceed 100 characters.';
      }
    }

    if (contactMethod === 'phone') {
      const phoneRegex = /^[0-9+\-\s()]{7,}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        return 'Please enter a valid phone number.';
      }
    }

    if (formData.message.trim().length < 10) {
      return 'Message must be at least 10 characters.';
    } else if (formData.message.trim().length > 500) {
      return 'Message cannot exceed 500 characters.';
    }

    return null;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    const dataToSend = {
      name: formData.name.trim(),
      contactMethod,
      ...(contactMethod === 'email'
        ? { email: formData.email.trim() }
        : { phone: formData.phone.trim() }),
      message: formData.message.trim(),
    };
    const validationError = validateForm();
    if (validationError) {
      setStatus({ type: 'error', message: validationError });
      return;
    }
    try {
      const res = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        setStatus({
          type: 'success',
          message: 'Your message has been sent successfully.',
        });

        setFormData({ name: '', email: '', phone: '', message: '' });
        setContactMethod('email');
      } else {
        setStatus({
          type: 'error',
          message: 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please check your connection.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="relative lg:-mb-12">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6 p-6 pb-12 lg:w-[75%] lg:mx-auto">
        {/* Name field */}
        <div className="flex flex-col">
          <label htmlFor="name" className={`${titleFont} block text-xl font-medium text-[#036d6d] mb-2`}>
            Name:
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`${titleFont} w-full px-4 py-3 bg-white border-2 border-[#036d6d] rounded-md text-[#036d6d] placeholder:text-[#036d6d]/50 font-medium text-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all`}
            placeholder="Your Name"
            required
          />
        </div>

        {/* Contact method radio buttons */}
        <div className="flex flex-col">
          <label className={`${titleFont} block text-xl font-medium text-[#036d6d] mb-3`}>
            Preferred Contact Method:
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="contactMethod"
                value="email"
                checked={contactMethod === 'email'}
                onChange={(e) => setContactMethod(e.target.value as 'email')}
                className="w-5 h-5 text-[#036d6d] focus:ring-[#FFD700]"
              />
              <span className={`${titleFont} text-xl text-[#036d6d]`}>Email</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="contactMethod"
                value="phone"
                checked={contactMethod === 'phone'}
                onChange={(e) => setContactMethod(e.target.value as 'phone')}
                className="w-5 h-5 text-[#036d6d] focus:ring-[#FFD700]"
              />
              <span className={`${titleFont} text-xl text-[#036d6d]`}>Phone</span>
            </label>
          </div>
        </div>

        {/* Conditional email/phone field */}
        {contactMethod === 'email' && (
          <div className="flex flex-col -mt-2">
            <label htmlFor="email" className={`${titleFont} block text-xl font-medium text-[#036d6d] mb-2`}>
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${titleFont} w-full px-4 py-3 bg-white border-2 border-[#036d6d] rounded-md text-[#036d6d] placeholder:text-[#036d6d]/50 font-medium text-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all`}
              placeholder="Your Email"
              required={contactMethod === 'email'}
            />
          </div>
        )}

        {contactMethod === 'phone' && (
          <div className="flex flex-col -mt-2">
            <label htmlFor="phone" className={`${titleFont} block text-xl font-medium text-[#036d6d] mb-2`}>
              Phone:
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`${titleFont} w-full px-4 py-3 bg-white border-2 border-[#036d6d] rounded-md text-[#036d6d] placeholder:text-[#036d6d]/50 font-medium text-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all`}
              placeholder="Your Phone Number"
              required={contactMethod === 'phone'}
            />
          </div>
        )}

        {/* Message field */}
        <div className="flex flex-col">
          <label htmlFor="message" className={`${titleFont} block text-xl font-medium text-[#036d6d] mb-2`}>
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className={`${titleFont} w-full px-4 py-3 bg-white border-2 border-[#036d6d] rounded-md text-[#036d6d] placeholder:text-[#036d6d]/50 font-medium text-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all`}
            placeholder="Your Message"
            required
          />
        </div>

        {status.type && (
          <div
            role={status.type === 'error' ? 'alert' : 'status'}
            aria-live={status.type === 'error' ? 'assertive' : 'polite'}
            className={`px-4 py-3 rounded-md text-lg font-medium ${
              status.type === 'success'
                ? 'bg-green-700 text-white border border-green-700'
                : 'bg-red-700 text-white border border-red-700'
            }`}
          >
            {status.message}
          </div>
        )}
        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={`${titleFont} w-full py-4 bg-[#f6d212] text-xl text-[#181818] font-bold rounded-md hover:scale-104 cursor-pointer transition-all duration-300`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}