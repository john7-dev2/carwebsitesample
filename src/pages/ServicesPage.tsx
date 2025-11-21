import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
            <span className="text-brand-burgundy text-sm font-semibold tracking-[0.2em] uppercase">Our Services</span>
            <h1 className="text-6xl lg:text-7xl font-bold text-brand-black mt-4 mb-6 tracking-tight leading-tight">
              Inspection<br />Packages
            </h1>
            <div className="w-24 h-0.5 bg-brand-black mb-8"></div>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Complete clarity on a vehicle's condition before commitment. Conducted by trained automotive professionals.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Packages Grid */}
      <section className="py-32">
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative bg-brand-cream p-10 border-2 transition-all duration-300 ${
                idx === 2 ? 'border-brand-burgundy' : 'border-transparent hover:border-brand-black'
              }`}
            >
              {idx === 2 && (
                <div className="absolute top-0 right-0 bg-brand-burgundy text-white px-4 py-1 text-xs font-bold tracking-wider">
                  POPULAR
                </div>
              )}
              
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-brand-black mb-3">{service.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{service.description}</p>
                <div className="text-4xl font-bold text-brand-burgundy">{service.price}</div>
              </div>
              
              <div className="w-full h-px bg-gray-300 mb-8"></div>
              
              <ul className="space-y-3 mb-10">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-brand-burgundy mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleBookNow(service.title)}
                className="w-full bg-brand-black text-white px-8 py-4 text-sm font-semibold tracking-wide uppercase hover:bg-brand-burgundy transition-all duration-300"
              >
                Book This Package
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-brand-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-brand-black mb-6 tracking-tight">
              Not Sure Which Package?
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Contact us for expert guidance. We'll help you choose the perfect inspection package.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="bg-brand-black text-white px-10 py-5 text-sm font-semibold tracking-wide uppercase hover:bg-brand-burgundy transition-all duration-300"
            >
              Get Expert Guidance
            </button>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedService={selectedService}
      />
    </div>
  );
}
