import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/ds-inventory-banner.jpg';
import { Search, Settings, Shield, Crown, Plug, Ruler, Gauge, Camera, Battery, Thermometer, Eye, ClipboardList, Phone, Calendar, Wrench, FileText, UserCheck, Cog, FileCheck, BookOpen, Package, CheckCircle } from '../components/icons';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:h-[90vh] flex items-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50 z-10"></div>
        </div>
        <div className="container mx-auto px-4 z-20 text-center">
          <div className="inline-block mb-4 px-3 py-2 bg-brand-burgundy/20 backdrop-blur-sm border border-brand-burgundy/30 rounded-full">
            <span className="text-brand-burgundy-light font-semibold text-xs sm:text-sm tracking-wider uppercase">Quality, Efficiency, Reliability and Satisfaction</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Revelro Cars
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-10 max-w-3xl mx-auto text-gray-200 leading-relaxed px-2">
            Expert Pre-Owned Car Inspection services. Complete clarity on a vehicle's condition before you make the commitment.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4">
            <button
              onClick={() => navigate('/services')}
              className="bg-gradient-to-r from-brand-burgundy to-brand-burgundy-dark hover:from-brand-burgundy-dark hover:to-brand-black text-white px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-brand-burgundy/50 transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              View Inspection Packages
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-white/50 transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Book Inspection
            </button>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-brand-burgundy font-semibold text-xs sm:text-sm tracking-wider uppercase mb-3 block">What We Offer</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 px-4">Inspection Packages</h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">Four different packages to choose from according to your needs</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                title: 'Light Package',
                description: 'Quick essentials – Basic checks on exterior, tyres, battery, and odometer.',
                Icon: Search,
                gradient: 'from-blue-600 to-cyan-600',
                price: '₹2,999',
              },
              {
                title: 'Elite Package',
                description: 'Smart coverage – Adds engine bay, brakes, suspension, and road test.',
                Icon: Settings,
                gradient: 'from-purple-600 to-pink-600',
                price: '₹4,999',
              },
              {
                title: 'Ultimate Package',
                description: '100+ point inspection, OBD scan, underbody check, accident analysis.',
                Icon: Shield,
                gradient: 'from-orange-600 to-red-600',
                price: '₹7,999',
              },
              {
                title: 'Supreme Package',
                description: 'Premium assurance with service history, document audit, and consultation.',
                Icon: Crown,
                gradient: 'from-emerald-600 to-green-600',
                price: '₹10,999',
              },
            ].map((service, index) => (
              <div key={index} className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <service.Icon className="text-white" size={28} strokeWidth={2} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-gray-900">{service.title}</h3>
                <div className="text-2xl md:text-3xl font-bold text-brand-burgundy mb-2 md:mb-3">{service.price}</div>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center gap-2 text-brand-burgundy font-semibold hover:gap-4 transition-all duration-300 text-lg group"
            >
              View All Packages
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-brand-burgundy font-semibold text-xs sm:text-sm tracking-wider uppercase mb-3 block">Advanced Tools</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 px-4">Professional Equipment</h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">State-of-the-art diagnostic tools for comprehensive vehicle inspection</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: 'OBD-II Scanner', desc: 'Engine health & error codes', Icon: Plug },
              { name: 'Paint Thickness Gauge', desc: 'Accident detection', Icon: Ruler },
              { name: 'Tyre Tread Depth Gauge', desc: 'Tyre wear assessment', Icon: Gauge },
              { name: 'Endoscopy Camera', desc: 'Hidden area inspection', Icon: Camera },
              { name: 'Battery Tester', desc: 'Battery condition check', Icon: Battery },
              { name: 'IR Thermometers', desc: 'Temperature diagnostics', Icon: Thermometer },
              { name: 'Underbody Mirror', desc: 'Rust & leak detection', Icon: Eye },
              { name: 'VIN Tools', desc: 'Service record verification', Icon: ClipboardList },
            ].map((equipment, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-4 md:p-6 rounded-xl border border-gray-200 hover:border-brand-burgundy/30 hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-burgundy/10 rounded-lg flex items-center justify-center mb-3">
                  <equipment.Icon className="text-brand-burgundy" size={20} strokeWidth={2} />
                </div>
                <h3 className="font-bold text-sm md:text-base text-gray-900 mb-2">{equipment.name}</h3>
                <p className="text-xs md:text-sm text-gray-600">{equipment.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-brand-burgundy font-semibold text-xs sm:text-sm tracking-wider uppercase mb-3 block">How It Works</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 px-4">Inspection Process</h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">Simple, transparent, and professional</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                step: '01',
                title: 'Booking',
                description: 'Call us to schedule an appointment. Choose your package and make advance payment.',
                Icon: Phone,
              },
              {
                step: '02',
                title: 'Scheduling',
                description: 'We contact the seller and schedule the inspection at their convenience.',
                Icon: Calendar,
              },
              {
                step: '03',
                title: 'Inspection',
                description: 'Our technician visits the site and conducts a thorough inspection (30-60 mins).',
                Icon: Wrench,
              },
              {
                step: '04',
                title: 'Report',
                description: 'Receive a comprehensive report with observations and expert consultation.',
                Icon: FileText,
              },
            ].map((process, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-brand-burgundy to-brand-burgundy-dark rounded-xl flex items-center justify-center mb-3 md:mb-4">
                    <process.Icon className="text-white" size={28} strokeWidth={2} />
                  </div>
                  <div className="text-brand-burgundy font-bold text-xs md:text-sm mb-2">STEP {process.step}</div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-gray-900">{process.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{process.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-brand-burgundy text-2xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-br from-brand-burgundy to-brand-burgundy-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-brand-burgundy-light font-semibold text-xs sm:text-sm tracking-wider uppercase mb-3 block">Why Revelro</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-4">Why Choose Us</h2>
            <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">Protecting your investment with expertise and transparency</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: 'Expert Technicians',
                description: 'Trained automotive professionals with years of experience in vehicle inspection.',
                Icon: UserCheck,
              },
              {
                title: 'Advanced Equipment',
                description: 'State-of-the-art diagnostic tools for accurate and comprehensive assessments.',
                Icon: Cog,
              },
              {
                title: 'Transparent Reports',
                description: 'Detailed inspection reports with clear findings and expert recommendations.',
                Icon: FileCheck,
              },
              {
                title: 'Service History',
                description: 'Access to company service records for almost all brands available in India.',
                Icon: BookOpen,
              },
              {
                title: 'Flexible Packages',
                description: 'Four different packages tailored to match your needs and budget.',
                Icon: Package,
              },
              {
                title: 'Peace of Mind',
                description: 'Make informed decisions and avoid costly repairs with our thorough inspections.',
                Icon: CheckCircle,
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-xl flex items-center justify-center mb-3 md:mb-4">
                  <feature.Icon className="text-white" size={24} strokeWidth={2} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-200 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 text-center text-white shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-2">Ready to Inspect Your Next Car?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-10 max-w-2xl mx-auto px-2">
              Don't take chances with your investment. Book a professional inspection today.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4">
              <button
                onClick={() => navigate('/contact')}
                className="bg-gradient-to-r from-brand-burgundy to-brand-burgundy-dark hover:from-brand-burgundy-dark hover:to-brand-black text-white px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-brand-burgundy/50 transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                Book Now
              </button>
              <button
                onClick={() => navigate('/services')}
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-white/50 transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                View Packages
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
