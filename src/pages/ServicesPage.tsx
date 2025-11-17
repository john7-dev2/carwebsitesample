import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingModal from '../components/BookingModal';

export default function ServicesPage() {
  const navigate = useNavigate();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleBookNow = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsBookingModalOpen(true);
  };

  const services = [
    {
      id: 'light',
      title: 'Light Package',
      description: 'Quick essentials – Basic checks on exterior, tyres, battery, and odometer. Ideal for quick decisions.',
      price: '₹2,999',
      features: [
        'Body panel condition check',
        'Windshield & window glass inspection',
        'Headlights & taillights check',
        'Interior dashboard & AC blower',
        'Tire wear pattern & tread depth',
        'Battery terminal condition',
        'Engine oil level check',
        'Odometer & VIN verification',
      ],
    },
    {
      id: 'elite',
      title: 'Elite Package',
      description: 'Smart coverage – Adds engine bay, brakes, suspension, fluids, and short road test. Great for daily drivers.',
      price: '₹4,999',
      features: [
        'Everything in Light Package',
        'Engine oil & coolant condition',
        'Brake & power steering fluid',
        'Battery voltage test',
        'Suspension bounce test',
        'Brake pad wear check',
        'All lights & electrical systems',
        'Short road test (5-10 mins)',
      ],
    },
    {
      id: 'ultimate',
      title: 'Ultimate Package',
      description: 'Full confidence – Includes 100+ point inspection, OBD scan, underbody check, and accident trace analysis.',
      price: '₹7,999',
      features: [
        'Everything in Elite Package',
        'OBD-II diagnostic scan',
        'Paint thickness test (accident detection)',
        'Underbody inspection',
        'Chassis/structural damage check',
        'Brake disc & pad thickness',
        'Extended road test (10-20 mins)',
        'Complete system functionality check',
      ],
    },
    {
      id: 'supreme',
      title: 'Supreme Package',
      description: 'Premium assurance – All features of Ultimate, plus service history review, tyre age check, document audit, and expert consultation.',
      price: '₹10,999',
      features: [
        'Everything in Ultimate Package',
        'Comprehensive 100+ point inspection',
        'Tyre age check (DOT code)',
        'Paint thickness gauge (per panel)',
        'ECU error history check',
        'Service history review',
        'Document verification',
        'Expert consultation included',
        'Detailed inspection report',
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-b from-brand-cream-dark to-brand-cream">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block mb-3 md:mb-4 px-3 md:px-4 py-2 bg-brand-burgundy/20 backdrop-blur-sm border border-brand-burgundy/30 rounded-full text-brand-burgundy-light font-semibold text-xs sm:text-sm tracking-wider uppercase">Expert Inspection Services</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-2">Pre-Owned Car Inspection</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Complete clarity on a vehicle's condition before you make the commitment. Conducted by trained automotive professionals.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-20">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, idx) => (
            <div key={service.id} className={`group relative bg-brand-cream rounded-xl md:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 ${
              idx === 2 ? 'border-brand-burgundy lg:scale-105' : 'border-gray-100 hover:border-brand-burgundy/20'
            }`}>
              {idx === 2 && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-brand-burgundy to-brand-burgundy-dark text-white px-3 md:px-4 py-1 rounded-bl-lg text-xs md:text-sm font-semibold">
                  Popular
                </div>
              )}
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-gray-900">{service.title}</h2>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">{service.description}</p>
                <div className="mb-4 md:mb-6">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-burgundy to-brand-burgundy-dark bg-clip-text text-transparent">{service.price}</div>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">Fixed price</p>
                </div>
                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 md:h-6 md:w-6 text-green-500 mr-2 md:mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs sm:text-sm md:text-base text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleBookNow(service.title)}
                  className={`w-full py-3 md:py-4 px-4 md:px-6 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm md:text-base ${
                    idx === 1
                      ? 'bg-gradient-to-r from-brand-burgundy to-brand-burgundy-dark hover:from-brand-burgundy-dark hover:to-brand-black text-white hover:shadow-brand-burgundy/30'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20 bg-gradient-to-br from-brand-burgundy/5 to-brand-burgundy/10 rounded-2xl md:rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 text-center border border-brand-burgundy/20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900 px-2">Not sure which package you need?</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 md:mb-8 max-w-2xl mx-auto px-2">Contact us for expert guidance. We'll help you choose the perfect inspection package based on your needs and budget.</p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
          >
            Get Expert Guidance
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedService={selectedService}
      />
    </div>
  );
}
