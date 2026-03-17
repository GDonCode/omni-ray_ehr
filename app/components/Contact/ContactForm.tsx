'use client';

import { useState, FormEvent } from 'react';
import localFont from 'next/font/local';
import { TriangleAlert } from 'lucide-react'; 

const inter_heading = localFont ({
  src: "../../fonts/Inter/Inter-Medium.otf"
})
const inter = localFont ({
  src: "../../fonts/Inter/Inter-Regular.otf"
})

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
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s'-]{2,}$/;
      // Required field validations
      if (!formData.name || formData.name.trim() === '') {
        return 'Name is required';
      } else if (formData.name.trim().length < 2) {
        return 'Name must be at least 2 characters long';
      } else if (formData.name.trim().length > 50) {
        return 'Name cannot exceed 50 characters';
      } else if (!nameRegex.test(formData.name)) {
        return 'Name can only contain letters';
      }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      return 'Please enter a valid email address.';
    } else if (formData.email.trim().length > 100) {
      return 'Email cannot exceed 100 characters.';
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
      email: formData.email.trim(),
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

        setFormData({ name: '', email: '', message: '' });
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
            className={`${titleFont} w-full px-4 py-3 rounded-sm border border-[#D0E6E6] bg-white text-[#181818] font-medium text-xl placeholder:text-[#9DBDBD] transition-all duration-200 outline-none focus:border-2 focus:border-b-[#058080] focus:border-x-[#D0E6E6] focus:border-t-[#D0E6E6] focus:rounded-b-[2px] hover:ring-1 hover:ring-gray-300`}
            style={{ boxShadow: '0px 6px 12px -16px #000' }}
            placeholder="Your Name"
            required
          />
        </div>

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
            className={`${titleFont} w-full px-4 py-3 rounded-sm border border-[#D0E6E6] bg-white text-[#181818] font-medium text-xl placeholder:text-[#9DBDBD] transition-all duration-200 outline-none focus:border-2 focus:border-b-[#058080] focus:border-x-[#D0E6E6] focus:border-t-[#D0E6E6] focus:rounded-b-[2px] hover:ring-1 hover:ring-gray-300`}
            style={{ boxShadow: '0px 6px 12px -16px #000' }}
            placeholder="Your Email"
            required={contactMethod === 'email'}
          />
        </div>

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
            className={`${titleFont} w-full px-4 py-3 rounded-sm border border-[#D0E6E6] bg-white text-[#181818] font-medium text-xl placeholder:text-[#9DBDBD] transition-all duration-200 outline-none focus:border-2 focus:border-b-[#058080] focus:border-x-[#D0E6E6] focus:border-t-[#D0E6E6] focus:rounded-b-[2px] hover:ring-1 hover:ring-gray-300`}
            style={{ boxShadow: '0px 6px 12px -16px #000' }}
            placeholder="Your Message"
            required
          />
        </div>

        {status.type && (
          <div
            role={status.type === 'error' ? 'alert' : 'status'}
            aria-live={status.type === 'error' ? 'assertive' : 'polite'}
            className={`${inter_heading.className} px-4 py-3 flex items-center rounded-md text-lg font-medium ${
              status.type === 'success'
                ? 'bg-green-500/20 text-[#181818] border border-green-500/50 tracking-wide'
                : 'bg-red-500/20 text-[#181818] border border-red-500/50 tracking-wide'
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
          className={`${titleFont} w-full py-4 text-xl text-[#181818] font-bold rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed`}
          style={{
            background: 'linear-gradient(180deg, #ffe14d 0%, #ffd808 50%, #e6b800 100%)',
            boxShadow: '0px 0.5px 0.5px rgba(180,130,0,0.3), 0px 1px 0.5px rgba(180,130,0,0.15)',
          }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}