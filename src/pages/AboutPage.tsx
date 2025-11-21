import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from '../components/icons';

export default function AboutPage() {
  const navigate = useNavigate();
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
      <section className="bg-brand-cream py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="text-brand-burgundy text-sm font-semibold tracking-[0.2em] uppercase">Our Story</span>
            <h1 className="text-6xl lg:text-7xl font-bold text-brand-black mt-4 mb-6 tracking-tight leading-tight">
              About<br />Revelro Cars
            </h1>
            <div className="w-24 h-0.5 bg-brand-black mb-8"></div>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Quality, Efficiency, Reliability and Satisfaction in Pre-Owned Car Inspection
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-brand-black mb-8 tracking-tight">Our Mission</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Revelro Cars Private Limited is dedicated to providing expert pre-owned car inspection services that give you complete clarity on a vehicle's condition before you make the commitment.
                </p>
                <p>
                  Our inspections are conducted by trained automotive professionals using advanced tools and a detailed checklist to assess the car's mechanical health, structural integrity, electrical systems, and more.
                </p>
                <p>
                  We provide company service records for almost all brands available in India, allowing you to verify service data before purchase. With Revelro's multi-tiered inspection services, you're protecting your investment and driving away with full confidence.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 bg-brand-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl lg:text-6xl font-bold text-brand-burgundy mb-3">{stat.value}</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-20"
            >
              <span className="text-brand-burgundy text-sm font-semibold tracking-[0.2em] uppercase">Why Choose Us</span>
              <h2 className="text-5xl lg:text-6xl font-bold text-brand-black mt-4 mb-6 tracking-tight">What Sets Us Apart</h2>
              <div className="w-24 h-0.5 bg-brand-black"></div>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-3xl font-bold text-brand-black mb-6">Our Approach</h3>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    We use state-of-the-art diagnostic equipment and follow a systematic, multi-stage inspection process. Our goal is to provide you with a transparent, accurate, and confidence-boosting report.
                  </p>
                  <p>
                    Every vehicle inspection receives our complete attention, from basic visual checks to advanced OBD-II diagnostics and paint thickness testing.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-3xl font-bold text-brand-black mb-6">Our Values</h3>
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="text-brand-burgundy w-5 h-5 mt-1 flex-shrink-0" strokeWidth={2.5} />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-brand-black text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h2 className="text-5xl lg:text-7xl font-bold mb-8 tracking-tight leading-tight">
              Ready to Inspect<br />Your Next Car?
            </h2>
            <div className="w-24 h-0.5 bg-brand-burgundy mb-8"></div>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl">
              Book a professional inspection today and make your purchase with complete confidence.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="bg-brand-burgundy text-white px-10 py-5 text-sm font-semibold tracking-wide uppercase hover:bg-brand-burgundy-dark transition-all duration-300"
            >
              Contact Us Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
