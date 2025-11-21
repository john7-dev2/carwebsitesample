import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock } from '../components/icons';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Prepare WhatsApp message
      const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '917840869888'; // Number with country code, no + or spaces
      let message = `*New Contact Form Submission*\n\n`;
      message += `*Name:* ${formData.name}\n`;
      message += `*Email:* ${formData.email}\n`;
      if (formData.phone) {
        message += `*Phone:* ${formData.phone}\n`;
      }
      if (formData.service) {
        message += `*Service Interested:* ${formData.service}\n`;
      }
      message += `\n*Message:*\n${formData.message}`;

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message);
      
      // Open WhatsApp with pre-filled message
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');

      // Also submit to backend for record keeping
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        const apiUrl = `${supabaseUrl}/functions/v1/submit-contact-form`;
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }).catch(err => console.error('Backend submission error:', err));
      }

      alert('Opening WhatsApp to send your message. Please click Send in WhatsApp to complete your submission.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-brand-burgundy" />,
      title: 'Our Location',
      details: '311, 3rd Floor, Downtown Mall, Sarojini Nagar, New Delhi - 110023',
    },
    {
      icon: <Mail className="w-6 h-6 text-brand-burgundy" />,
      title: 'Email Us',
      details: 'rohan@revelro.in',
    },
    {
      icon: <Phone className="w-6 h-6 text-brand-burgundy" />,
      title: 'Call Us',
      details: '+91 989 1111 747',
    },
    {
      icon: <Clock className="w-6 h-6 text-brand-burgundy" />,
      title: 'Website',
      details: 'www.revelro.in',
    },
  ];

  const services = [
    'Light Package - ₹2,999',
    'Elite Package - ₹4,999',
    'Ultimate Package - ₹7,999',
    'Supreme Package - ₹10,999',
    'Service History Check',
    'Other',
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-brand-cream py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="text-brand-burgundy text-sm font-semibold tracking-[0.2em] uppercase">Get In Touch</span>
            <h1 className="text-6xl lg:text-7xl font-bold text-brand-black mt-4 mb-6 tracking-tight leading-tight">
              Contact<br />Us
            </h1>
            <div className="w-24 h-0.5 bg-brand-black mb-8"></div>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Ready to book a pre-owned car inspection? Have questions? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-32">
        <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-brand-cream p-10"
          >
            <h2 className="text-3xl font-bold mb-8 text-brand-black">Send Message</h2>
            {submitError && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                <p className="font-semibold">Error:</p>
                <p>{submitError}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all outline-none bg-white"
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all outline-none bg-white"
                    required
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all outline-none bg-white"
                    placeholder="+91 98911 11747"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all outline-none bg-white"
                >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all outline-none resize-none bg-white"
                  required
                  placeholder="Tell us about your inspection needs..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-black text-white py-4 px-6 text-sm font-semibold tracking-wide uppercase hover:bg-brand-burgundy transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-brand-black">Contact Information</h2>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-black mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-12 border-t border-gray-200">
              <h3 className="text-xl font-bold text-brand-black mb-6">Company Details</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-gray-500 block mb-1">Company Name</span>
                  <span className="font-semibold text-brand-black">Revelro Cars Private Limited</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Tagline</span>
                  <span className="font-semibold text-brand-black">Quality, Efficiency, Reliability and Satisfaction</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Service Coverage</span>
                  <span className="font-semibold text-brand-black">Service records for almost all brands in India</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        </div>
      </section>
    </div>
  );
}
