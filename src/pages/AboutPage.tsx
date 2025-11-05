import { Check } from '../components/icons';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const stats = [
    { value: '1000+', label: 'Cars Inspected' },
    { value: '98%', label: 'Customer Satisfaction' },
    { value: '4', label: 'Inspection Packages' },
    { value: 'All Brands', label: 'Service Records' },
  ];

  const features = [
    'Trained Automotive Professionals',
    'Advanced Diagnostic Equipment',
    'Comprehensive Inspection Reports',
    'On-Site Inspection Service',
    'Transparent Pricing',
    'Service History Access',
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:h-96 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60 z-10"></div>
        <div className="container mx-auto px-4 z-20 text-center text-white">
          <span className="inline-block mb-3 md:mb-4 px-3 md:px-4 py-2 bg-brand-burgundy/20 backdrop-blur-sm border border-brand-burgundy/30 rounded-full text-brand-burgundy-light font-semibold text-xs sm:text-sm tracking-wider uppercase">Our Story</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-2">About Revelro Cars</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-gray-200 leading-relaxed px-4">
            Quality, Efficiency, Reliability and Satisfaction in Pre-Owned Car Inspection
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <span className="text-brand-burgundy font-semibold text-xs sm:text-sm tracking-wider uppercase mb-3 block">Who We Are</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-gray-900 px-4">Our Story</h2>
            </div>
            <div className="prose max-w-none">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                Revelro Cars Private Limited is dedicated to providing expert pre-owned car inspection services that give you complete clarity on a vehicle's condition before you make the commitment. We believe that confidence should come standard with every car you purchase.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                Our inspections are conducted by trained automotive professionals using advanced tools and a detailed checklist to assess the car's mechanical health, structural integrity, electrical systems, and more. Whether you're buying from a private seller or dealership, our packages are tailored to match your needs and budget.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                We provide company service records for almost all brands available in India, allowing you to check the details of the car and verify service data for your satisfaction before you commit to the purchase. With Revelro's multi-tiered inspection services, you're not just checking a car—you're protecting your investment, avoiding costly repairs, and driving away with full confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="group p-4 sm:p-6 md:p-8 bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-burgundy to-brand-burgundy-dark bg-clip-text text-transparent mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <span className="text-brand-burgundy font-semibold text-xs sm:text-sm tracking-wider uppercase mb-3 block">Why Choose Us</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-gray-900 px-4">What Sets Us Apart</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-10">
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-xl md:rounded-2xl border border-gray-100 shadow-lg">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900">Our Approach</h3>
                <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 leading-relaxed">
                  We use state-of-the-art diagnostic equipment and follow a systematic, multi-stage inspection process. Our goal is to provide you with a transparent, accurate, and confidence-boosting report before you commit to any purchase.
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Every vehicle inspection receives our complete attention, from basic visual checks to advanced OBD-II diagnostics and paint thickness testing. We're not satisfied until you have all the information you need to make an informed decision.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-brand-burgundy/5 to-white p-6 md:p-8 rounded-xl md:rounded-2xl border border-brand-burgundy/20 shadow-lg">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900">Our Values</h3>
                <ul className="space-y-3 md:space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="p-1 bg-green-100 rounded-full mr-2 md:mr-3 mt-0.5 flex-shrink-0">
                        <Check className="text-green-600 w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <span className="text-sm md:text-base text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-brand-burgundy/5 via-brand-burgundy/10 to-brand-burgundy/5 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl shadow-2xl border border-brand-burgundy/20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 px-2">Ready to Inspect Your Next Car?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 md:mb-10 leading-relaxed px-2">
              Book a professional inspection today and make your purchase with complete confidence.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-gradient-to-r from-brand-burgundy to-brand-burgundy-dark hover:from-brand-burgundy-dark hover:to-brand-black text-white px-8 sm:px-10 md:px-12 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-brand-burgundy/30 transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Contact Us Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
