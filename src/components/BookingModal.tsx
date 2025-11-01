import { useState } from 'react';
import { X, Calendar, Clock, Car, User, Mail, Phone, MessageSquare } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
}

export default function BookingModal({ isOpen, onClose, selectedService = '' }: BookingModalProps) {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    service_type: selectedService,
    car_make: '',
    car_model: '',
    car_year: '',
    preferred_date: '',
    preferred_time: '',
    additional_notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const services = [
    'Exterior Detailing',
    'Interior Detailing',
    'Ceramic Coating',
    'Paint Correction',
    'Full Detailing Package',
    'Other',
  ];

  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
    '6:00 PM - 7:00 PM',
  ];

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
      const whatsappNumber = '917840869888'; // Number with country code, no + or spaces
      let message = `*New Appointment Booking*\n\n`;
      message += `*Customer Name:* ${formData.customer_name}\n`;
      message += `*Email:* ${formData.customer_email}\n`;
      message += `*Phone:* ${formData.customer_phone}\n\n`;
      message += `*Service Type:* ${formData.service_type}\n\n`;
      message += `*Vehicle Details:*\n`;
      message += `Make: ${formData.car_make}\n`;
      message += `Model: ${formData.car_model}\n`;
      if (formData.car_year) {
        message += `Year: ${formData.car_year}\n`;
      }
      message += `\n*Preferred Date:* ${formData.preferred_date}\n`;
      message += `*Preferred Time:* ${formData.preferred_time}\n`;
      if (formData.additional_notes) {
        message += `\n*Additional Notes:*\n${formData.additional_notes}`;
      }

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message);
      
      // Open WhatsApp with pre-filled message
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');

      // Also submit to backend for record keeping
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        const apiUrl = `${supabaseUrl}/functions/v1/book-appointment`;
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }).catch(err => console.error('Backend submission error:', err));
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
        setFormData({
          customer_name: '',
          customer_email: '',
          customer_phone: '',
          service_type: '',
          car_make: '',
          car_model: '',
          car_year: '',
          preferred_date: '',
          preferred_time: '',
          additional_notes: '',
        });
      }, 3000);
    } catch (error) {
      console.error('Error booking appointment:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-brand-burgundy to-brand-burgundy-dark text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Book Your Appointment</h2>
            <p className="text-brand-burgundy-light mt-1">Fill in your details and we'll get back to you soon</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="m-6 bg-green-50 border-2 border-green-200 text-green-800 px-6 py-4 rounded-xl">
            <p className="font-bold text-lg">🎉 Appointment Booked Successfully!</p>
            <p className="mt-1">We've received your booking and will contact you shortly to confirm.</p>
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="m-6 bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl">
            <p className="font-semibold">Error:</p>
            <p>{submitError}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <User className="w-5 h-5 mr-2 text-brand-burgundy" />
              Personal Information
            </h3>
            
            <div>
              <label htmlFor="customer_name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="customer_name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy transition-all duration-200 outline-none"
                required
                placeholder="John Doe"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="customer_email" className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="customer_email"
                  name="customer_email"
                  value={formData.customer_email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy transition-all duration-200 outline-none"
                  required
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="customer_phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="customer_phone"
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy transition-all duration-200 outline-none"
                  required
                  placeholder="+91 98911 11747"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="space-y-4 pt-4 border-t-2 border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <Car className="w-5 h-5 mr-2 text-brand-burgundy" />
              Vehicle Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="car_make" className="block text-sm font-semibold text-gray-700 mb-2">
                  Make *
                </label>
                <input
                  type="text"
                  id="car_make"
                  name="car_make"
                  value={formData.car_make}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy transition-all duration-200 outline-none"
                  required
                  placeholder="Toyota"
                />
              </div>
              <div>
                <label htmlFor="car_model" className="block text-sm font-semibold text-gray-700 mb-2">
                  Model *
                </label>
                <input
                  type="text"
                  id="car_model"
                  name="car_model"
                  value={formData.car_model}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy transition-all duration-200 outline-none"
                  required
                  placeholder="Camry"
                />
              </div>
              <div>
                <label htmlFor="car_year" className="block text-sm font-semibold text-gray-700 mb-2">
                  Year
                </label>
                <input
                  type="text"
                  id="car_year"
                  name="car_year"
                  value={formData.car_year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy transition-all duration-200 outline-none"
                  placeholder="2023"
                />
              </div>
            </div>
          </div>

          {/* Service & Appointment Details */}
          <div className="space-y-4 pt-4 border-t-2 border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-brand-burgundy" />
              Service & Appointment Details
            </h3>
            
            <div>
              <label htmlFor="service_type" className="block text-sm font-semibold text-gray-700 mb-2">
                Service Type *
              </label>
              <select
                id="service_type"
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy transition-all duration-200 outline-none bg-white"
                required
              >
                <option value="">Select a service</option>
                {services.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="preferred_date" className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Preferred Date *
                </label>
                <input
                  type="date"
                  id="preferred_date"
                  name="preferred_date"
                  value={formData.preferred_date}
                  onChange={handleChange}
                  min={today}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy transition-all duration-200 outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="preferred_time" className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Preferred Time *
                </label>
                <select
                  id="preferred_time"
                  name="preferred_time"
                  value={formData.preferred_time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy transition-all duration-200 outline-none bg-white"
                  required
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="additional_notes" className="block text-sm font-semibold text-gray-700 mb-2">
                <MessageSquare className="w-4 h-4 inline mr-1" />
                Additional Notes
              </label>
              <textarea
                id="additional_notes"
                name="additional_notes"
                rows={3}
                value={formData.additional_notes}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy transition-all duration-200 outline-none resize-none"
                placeholder="Any special requests or information we should know..."
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || submitSuccess}
              className="flex-1 bg-gradient-to-r from-brand-burgundy to-brand-burgundy-dark hover:from-brand-burgundy-dark hover:to-brand-black text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-brand-burgundy/30 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Booking...</span>
                </>
              ) : submitSuccess ? (
                <>
                  <span>✓ Booked!</span>
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  <span>Book Appointment</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
