import { useState } from 'react';
import { X } from './icons';

// Car database with popular Indian car models
const carDatabase = {
  'Maruti Suzuki': {
    models: ['Alto', 'Alto K10', 'S-Presso', 'WagonR', 'Celerio', 'Swift', 'Dzire', 'Baleno', 'Ignis', 'Ertiga', 'XL6', 'Vitara Brezza', 'S-Cross', 'Ciaz', 'Grand Vitara'],
    variants: {
      'Alto': ['STD', 'LX', 'LXI', 'VXI'],
      'Alto K10': ['LXI', 'VXI', 'VXI+'],
      'S-Presso': ['STD', 'LXI', 'VXI', 'VXI+'],
      'WagonR': ['LXI', 'VXI', 'ZXI', 'ZXI+'],
      'Celerio': ['LXI', 'VXI', 'ZXI', 'ZXI+'],
      'Swift': ['LXI', 'VXI', 'ZXI', 'ZXI+'],
      'Dzire': ['LXI', 'VXI', 'ZXI', 'ZXI+'],
      'Baleno': ['Sigma', 'Delta', 'Zeta', 'Alpha'],
      'Ignis': ['Sigma', 'Delta', 'Zeta', 'Alpha'],
      'Ertiga': ['LXI', 'VXI', 'ZXI', 'ZXI+'],
      'XL6': ['Zeta', 'Alpha'],
      'Vitara Brezza': ['LXI', 'VXI', 'ZXI', 'ZXI+'],
      'S-Cross': ['Sigma', 'Delta', 'Zeta', 'Alpha'],
      'Ciaz': ['Sigma', 'Delta', 'Zeta', 'Alpha'],
      'Grand Vitara': ['Sigma', 'Delta', 'Zeta', 'Alpha'],
    }
  },
  'Hyundai': {
    models: ['Santro', 'Grand i10 Nios', 'i20', 'i20 N Line', 'Aura', 'Venue', 'Verna', 'Creta', 'Alcazar', 'Tucson', 'Exter'],
    variants: {
      'Santro': ['D-Lite', 'Era', 'Magna', 'Sportz', 'Asta'],
      'Grand i10 Nios': ['Era', 'Magna', 'Sportz', 'Asta'],
      'i20': ['Magna', 'Sportz', 'Asta', 'Asta(O)'],
      'i20 N Line': ['N6', 'N8', 'N10'],
      'Aura': ['E', 'S', 'SX', 'SX+', 'SX(O)'],
      'Venue': ['E', 'S', 'SX', 'SX+', 'SX(O)'],
      'Verna': ['E', 'EX', 'S', 'SX', 'SX(O)'],
      'Creta': ['E', 'EX', 'S', 'SX', 'SX(O)'],
      'Alcazar': ['Prestige', 'Platinum', 'Signature'],
      'Tucson': ['Platinum', 'Signature'],
      'Exter': ['EX', 'S', 'SX', 'SX(O)'],
    }
  },
  'Tata': {
    models: ['Tiago', 'Tigor', 'Altroz', 'Punch', 'Nexon', 'Harrier', 'Safari', 'Tigor EV', 'Nexon EV'],
    variants: {
      'Tiago': ['XE', 'XM', 'XT', 'XZ', 'XZ+'],
      'Tigor': ['XE', 'XM', 'XT', 'XZ', 'XZ+'],
      'Altroz': ['XE', 'XM', 'XM+', 'XT', 'XZ', 'XZ+'],
      'Punch': ['Pure', 'Adventure', 'Accomplished', 'Creative', 'Creative+'],
      'Nexon': ['XE', 'XM', 'XZ', 'XZ+', 'XZ+ (O)'],
      'Harrier': ['XE', 'XM', 'XT', 'XZ', 'XZ+'],
      'Safari': ['XE', 'XM', 'XT', 'XZ', 'XZ+'],
      'Tigor EV': ['XE', 'XM', 'XZ+', 'XZ+ LUX'],
      'Nexon EV': ['XM', 'XZ+', 'XZ+ LUX', 'Max'],
    }
  },
  'Mahindra': {
    models: ['KUV100', 'XUV300', 'Bolero', 'Scorpio', 'Scorpio-N', 'XUV700', 'Thar', 'XUV400'],
    variants: {
      'KUV100': ['K2', 'K4', 'K6', 'K8'],
      'XUV300': ['W4', 'W6', 'W8', 'W8(O)'],
      'Bolero': ['B4', 'B6', 'B6(O)'],
      'Scorpio': ['S3', 'S5', 'S7', 'S9', 'S11'],
      'Scorpio-N': ['Z2', 'Z4', 'Z6', 'Z8', 'Z8 L'],
      'XUV700': ['MX', 'AX3', 'AX5', 'AX7', 'AX7 L'],
      'Thar': ['AX', 'AX OPT', 'LX'],
      'XUV400': ['EC', 'EL', 'EO'],
    }
  },
  'Honda': {
    models: ['Amaze', 'Jazz', 'City', 'City Hybrid', 'Elevate'],
    variants: {
      'Amaze': ['E', 'S', 'V', 'VX'],
      'Jazz': ['V', 'VX'],
      'City': ['SV', 'V', 'VX', 'ZX'],
      'City Hybrid': ['V', 'VX', 'ZX'],
      'Elevate': ['SV', 'V', 'VX', 'ZX'],
    }
  },
  'Toyota': {
    models: ['Glanza', 'Urban Cruiser Hyryder', 'Innova Crysta', 'Innova Hycross', 'Fortuner', 'Hilux', 'Camry', 'Vellfire'],
    variants: {
      'Glanza': ['E', 'S', 'G'],
      'Urban Cruiser Hyryder': ['E', 'S', 'G', 'V'],
      'Innova Crysta': ['GX', 'VX', 'ZX'],
      'Innova Hycross': ['GX', 'GX(O)', 'VX', 'VX(O)', 'ZX', 'ZX(O)'],
      'Fortuner': ['4x2 MT', '4x2 AT', '4x4 MT', '4x4 AT'],
      'Hilux': ['STD', 'High'],
      'Camry': ['Hybrid'],
      'Vellfire': ['Executive Lounge'],
    }
  },
  'Kia': {
    models: ['Sonet', 'Seltos', 'Carens', 'EV6'],
    variants: {
      'Sonet': ['HTE', 'HTK', 'HTX', 'GTX', 'GTX+', 'X-Line'],
      'Seltos': ['HTE', 'HTK', 'HTK+', 'HTX', 'GTX', 'GTX+', 'X-Line'],
      'Carens': ['Premium', 'Prestige', 'Prestige Plus', 'Luxury', 'Luxury Plus'],
      'EV6': ['GT-Line'],
    }
  },
  'MG': {
    models: ['Comet EV', 'ZS EV', 'Astor', 'Hector', 'Hector Plus', 'Gloster'],
    variants: {
      'Comet EV': ['Excite', 'Exclusive', 'Plush'],
      'ZS EV': ['Excite', 'Exclusive', 'Essence'],
      'Astor': ['Style', 'Super', 'Smart', 'Sharp', 'Savvy'],
      'Hector': ['Style', 'Super', 'Smart', 'Sharp', 'Savvy'],
      'Hector Plus': ['Style', 'Super', 'Smart', 'Sharp', 'Savvy'],
      'Gloster': ['Super', 'Smart', 'Sharp', 'Savvy'],
    }
  },
  'Renault': {
    models: ['Kwid', 'Triber', 'Kiger'],
    variants: {
      'Kwid': ['RXE', 'RXL', 'RXT', 'Climber'],
      'Triber': ['RXE', 'RXL', 'RXT', 'RXZ'],
      'Kiger': ['RXE', 'RXL', 'RXT', 'RXZ'],
    }
  },
  'Nissan': {
    models: ['Magnite'],
    variants: {
      'Magnite': ['XE', 'XL', 'XV', 'XV Premium', 'Turbo XV', 'Turbo XV Premium'],
    }
  },
  'Volkswagen': {
    models: ['Polo', 'Vento', 'Taigun', 'Virtus'],
    variants: {
      'Polo': ['Trendline', 'Comfortline', 'Highline', 'GT'],
      'Vento': ['Trendline', 'Comfortline', 'Highline'],
      'Taigun': ['Topline', 'Highline', 'Highline Plus', 'GT'],
      'Virtus': ['Comfortline', 'Highline', 'Topline', 'GT'],
    }
  },
  'Skoda': {
    models: ['Kushaq', 'Slavia'],
    variants: {
      'Kushaq': ['Active', 'Ambition', 'Style', 'Monte Carlo'],
      'Slavia': ['Active', 'Ambition', 'Style', 'Monte Carlo'],
    }
  },
};

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
    car_variant: '',
    car_year: '',
    preferred_date: '',
    preferred_time: '',
    additional_notes: '',
  });

  // Dropdown state management
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const services = [
    'Light Package',
    'Elite Package',
    'Ultimate Package',
    'Supreme Package',
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

  // Get available models based on selected make
  const availableModels = selectedMake && carDatabase[selectedMake as keyof typeof carDatabase] 
    ? carDatabase[selectedMake as keyof typeof carDatabase].models 
    : [];
  
  // Get available variants based on selected make and model
  const getAvailableVariants = (): string[] => {
    if (!selectedMake || !selectedModel) return [];
    const makeData = carDatabase[selectedMake as keyof typeof carDatabase];
    if (!makeData || !makeData.variants) return [];
    const variants = (makeData.variants as any)[selectedModel];
    return variants || [];
  };
  const availableVariants = getAvailableVariants();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const make = e.target.value;
    setSelectedMake(make);
    setSelectedModel('');
    setSelectedVariant('');
    setFormData(prev => ({
      ...prev,
      car_make: make,
      car_model: '',
      car_variant: ''
    }));
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const model = e.target.value;
    setSelectedModel(model);
    setSelectedVariant('');
    setFormData(prev => ({
      ...prev,
      car_model: model,
      car_variant: ''
    }));
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const variant = e.target.value;
    setSelectedVariant(variant);
    setFormData(prev => ({
      ...prev,
      car_variant: variant
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Prepare WhatsApp message
      const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919891111747'; // Number with country code, no + or spaces
      let message = `*New Appointment Booking*\n\n`;
      message += `*Customer Name:* ${formData.customer_name}\n`;
      message += `*Email:* ${formData.customer_email}\n`;
      message += `*Phone:* ${formData.customer_phone}\n\n`;
      message += `*Service Type:* ${formData.service_type}\n\n`;
      message += `*Vehicle Details:*\n`;
      message += `Make: ${formData.car_make}\n`;
      message += `Model: ${formData.car_model}\n`;
      if (formData.car_variant) {
        message += `Variant: ${formData.car_variant}\n`;
      }
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
          car_variant: '',
          car_year: '',
          preferred_date: '',
          preferred_time: '',
          additional_notes: '',
        });
        setSelectedMake('');
        setSelectedModel('');
        setSelectedVariant('');
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
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-brand-black text-white z-10">
          <div className="container mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Book Appointment</h2>
              <p className="text-gray-400 text-sm mt-1">Fill in your details below</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="container mx-auto px-6 lg:px-12 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-8 bg-green-50 border border-green-200 text-green-800 px-6 py-4">
                <p className="font-bold">✓ Appointment Booked Successfully!</p>
                <p className="text-sm mt-1">We've received your booking and will contact you shortly.</p>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="mb-8 bg-red-50 border border-red-200 text-red-700 px-6 py-4">
                <p className="font-semibold">Error:</p>
                <p className="text-sm">{submitError}</p>
              </div>
            )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-brand-black">Personal Information</h3>
            
            <div>
              <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="customer_name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all outline-none"
                required
                placeholder="John Doe"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="customer_email"
                  name="customer_email"
                  value={formData.customer_email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all outline-none"
                  required
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="customer_phone"
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all outline-none"
                  required
                  placeholder="+91 98911 11747"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="space-y-6 pt-12 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-brand-black">Vehicle Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="car_make" className="block text-sm font-medium text-gray-700 mb-2">
                  Make *
                </label>
                <select
                  id="car_make"
                  name="car_make"
                  value={selectedMake}
                  onChange={handleMakeChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all outline-none bg-white"
                  required
                >
                  <option value="">Select Car Brand</option>
                  {Object.keys(carDatabase).map((make) => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="car_model" className="block text-sm font-medium text-gray-700 mb-2">
                  Model *
                </label>
                <select
                  id="car_model"
                  name="car_model"
                  value={selectedModel}
                  onChange={handleModelChange}
                  disabled={!selectedMake}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all outline-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                >
                  <option value="">Select Car Model</option>
                  {availableModels.map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="car_variant" className="block text-sm font-medium text-gray-700 mb-2">
                  Variant
                </label>
                <select
                  id="car_variant"
                  name="car_variant"
                  value={selectedVariant}
                  onChange={handleVariantChange}
                  disabled={!selectedModel || availableVariants.length === 0}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all outline-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select Variant (Optional)</option>
                  {availableVariants.map((variant: string) => (
                    <option key={variant} value={variant}>{variant}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="car_year" className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <input
                  type="text"
                  id="car_year"
                  name="car_year"
                  value={formData.car_year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all outline-none"
                  placeholder="2023"
                />
              </div>
            </div>
          </div>

          {/* Service & Appointment Details */}
          <div className="space-y-6 pt-12 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-brand-black">Appointment Details</h3>
                
                <div>
                  <label htmlFor="service_type" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Type *
                  </label>
                  <select
                    id="service_type"
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all outline-none bg-white"
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

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="preferred_date"
                      name="preferred_date"
                      value={formData.preferred_date}
                      onChange={handleChange}
                      min={today}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="preferred_time" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time *
                    </label>
                    <select
                      id="preferred_time"
                      name="preferred_time"
                      value={formData.preferred_time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all outline-none bg-white"
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
                  <label htmlFor="additional_notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="additional_notes"
                    name="additional_notes"
                    rows={4}
                    value={formData.additional_notes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-brand-black focus:ring-1 focus:ring-brand-black transition-all outline-none resize-none"
                    placeholder="Any special requests..."
                  ></textarea>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-12">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border-2 border-brand-black text-brand-black py-4 px-6 text-sm font-semibold tracking-wide uppercase hover:bg-brand-black hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  className="flex-1 bg-brand-black text-white py-4 px-6 text-sm font-semibold tracking-wide uppercase hover:bg-brand-burgundy transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Booking...' : submitSuccess ? '✓ Booked!' : 'Book Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
