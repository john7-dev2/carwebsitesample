import { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send } from '../components/icons';

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
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block mb-3 md:mb-4 px-3 md:px-4 py-2 bg-brand-burgundy/20 backdrop-blur-sm border border-brand-burgundy/30 rounded-full text-brand-burgundy-light font-semibold text-xs sm:text-sm tracking-wider uppercase">Get In Touch</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-2">Contact Us</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Ready to book a pre-owned car inspection? Have questions? We're here to help.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl md:rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-gray-900">Send us a Message</h2>
            {submitError && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                <p className="font-semibold">Error:</p>
                <p>{submitError}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy transition-all duration-200 outline-none"
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy transition-all duration-200 outline-none"
                    required
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy transition-all duration-200 outline-none"
                    placeholder="+91 98911 11747"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy transition-all duration-200 outline-none bg-white"
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
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy transition-all duration-200 outline-none resize-none"
                  required
                  placeholder="Tell us about the car you want to inspect and which package you're interested in..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-brand-burgundy to-brand-burgundy-dark hover:from-brand-burgundy-dark hover:to-brand-black text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-brand-burgundy/30 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 text-gray-900">Get in Touch</h2>
            <p className="text-gray-600 mb-6 md:mb-10 text-sm sm:text-base md:text-lg leading-relaxed">
              Want to schedule an inspection or have questions about our packages? Fill out the form or contact us directly using the information below.
            </p>

            <div className="space-y-3 md:space-y-5">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 md:space-x-4 p-4 md:p-5 bg-gradient-to-br from-gray-50 to-white rounded-lg md:rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">
                  <div className="flex-shrink-0 mt-1 p-2 md:p-3 bg-brand-burgundy/10 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-12 bg-gradient-to-br from-brand-burgundy/5 to-brand-burgundy/10 p-6 md:p-8 rounded-xl md:rounded-2xl border border-brand-burgundy/20 shadow-lg">
              <h3 className="font-bold text-lg md:text-xl mb-4 md:mb-5 text-gray-900">Company Information</h3>
              <div className="space-y-2 md:space-y-3">
                <div className="py-2">
                  <span className="text-xs sm:text-sm text-gray-700 font-medium block mb-1">Company Name</span>
                  <span className="text-sm sm:text-base font-bold text-gray-900">Revelro Cars Private Limited</span>
                </div>
                <div className="py-2 border-t border-brand-burgundy/20">
                  <span className="text-xs sm:text-sm text-gray-700 font-medium block mb-1">Tagline</span>
                  <span className="text-sm sm:text-base font-bold text-gray-900">Quality, Efficiency, Reliability and Satisfaction</span>
                </div>
                <div className="py-2 border-t border-brand-burgundy/20">
                  <span className="text-xs sm:text-sm text-gray-700 font-medium block mb-1">Service Coverage</span>
                  <span className="text-sm sm:text-base font-bold text-gray-900">Service records for almost all brands in India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      {/* <div className="h-96 w-full bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.715619761724!2d72.8341!3d19.0759837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7f1890c3c1b%3A0x6a4a6e8e0b8a6a6e8!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Our Location"
        ></iframe>
      </div> */}
    </div>
  );
}
