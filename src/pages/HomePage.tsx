import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../assets/ds-inventory-banner.jpg';
import { UserCheck, Wrench, FileCheck, BookOpen, Package, CheckCircle } from '../components/icons';

// Import package PNG icons
import lightPackageIcon from '../assets/icons/light-package-icon.png';
import elitePackageIcon from '../assets/icons/elite-package-icon.png';
import ultimatePackageIcon from '../assets/icons/ultimate-package-icon.png';
import supremePackageIcon from '../assets/icons/supreme-package-icon.png';

// Import equipment PNG icons
import obdScannerIcon from '../assets/icons/equipment-obd-scanner-icon.png';
import paintGaugeIcon from '../assets/icons/equipment-paint-gauge-icon.png';
import treadGaugeIcon from '../assets/icons/equipment-tread-gauge-icon.png';
import endoscopyCameraIcon from '../assets/icons/equipment-endoscopy-camera-icon.png';
import batteryTesterIcon from '../assets/icons/equipment-battery-tester-icon.png';
import irThermometerIcon from '../assets/icons/equipment-ir-thermometer-icon.png';
import underbodyMirrorIcon from '../assets/icons/equipment-underbody-mirror-icon.png';
import vinToolsIcon from '../assets/icons/equipment-vin-tools-icon.png';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="relative bg-white">
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image - Full Screen */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Luxury Car Inspection" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-6 lg:px-12 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl space-y-8"
          >
            <div className="inline-block">
              <span className="text-brand-burgundy text-sm font-semibold tracking-[0.2em] uppercase">Premium Inspection</span>
            </div>
            
            <h1 className="text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.9] tracking-tight">
              Revelro<br />Cars
            </h1>
            
            <div className="w-24 h-1 bg-brand-burgundy"></div>
            
            <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl">
              Expert Pre-Owned Car Inspection. Complete clarity before commitment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button
                onClick={() => navigate('/services')}
                className="bg-brand-burgundy text-white px-10 py-5 text-sm font-semibold tracking-wide uppercase hover:bg-brand-burgundy-dark transition-all duration-300"
              >
                View Packages
              </button>
              <button
                onClick={() => navigate('/services')}
                className="border-2 border-white text-white px-10 py-5 text-sm font-semibold tracking-wide uppercase hover:bg-white hover:text-brand-black transition-all duration-300"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inspection Packages - Minimal Grid */}
      <section className="relative py-32 bg-white -mt-10 rounded-t-[50px]">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <span className="text-brand-burgundy text-sm font-semibold tracking-[0.2em] uppercase">Our Services</span>
            <h2 className="text-5xl lg:text-6xl font-bold text-brand-black mt-4 mb-6 tracking-tight">Inspection Packages</h2>
            <div className="w-24 h-0.5 bg-brand-black"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Light',
                description: 'Essential checks for quick decisions',
                iconSrc: lightPackageIcon,
                price: '₹2,999',
              },
              {
                title: 'Elite',
                description: 'Comprehensive coverage with road test',
                iconSrc: elitePackageIcon,
                price: '₹4,999',
              },
              {
                title: 'Ultimate',
                description: '100+ point diagnostic inspection',
                iconSrc: ultimatePackageIcon,
                price: '₹7,999',
                popular: true,
              },
              {
                title: 'Supreme',
                description: 'Complete assurance with consultation',
                iconSrc: supremePackageIcon,
                price: '₹10,999',
              },
            ].map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-brand-cream p-8 hover:bg-white transition-all duration-300 border border-transparent hover:border-brand-black"
              >
                {service.popular && (
                  <div className="absolute top-0 right-0 bg-brand-burgundy text-white px-4 py-1 text-xs font-bold tracking-wider">
                    POPULAR
                  </div>
                )}
                <div className="w-16 h-16 mb-6 opacity-80">
                  <img src={service.iconSrc} alt={service.title} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-brand-black mb-2">{service.title}</h3>
                <div className="text-3xl font-bold text-brand-burgundy mb-4">{service.price}</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.description}</p>
                <button 
                  onClick={() => navigate('/services')}
                  className="text-brand-black text-sm font-semibold tracking-wide uppercase hover:text-brand-burgundy transition-colors inline-flex items-center gap-2 group"
                >
                  Learn More
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Equipment - Clean Grid */}
      <section className="py-32 bg-brand-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <span className="text-brand-burgundy text-sm font-semibold tracking-[0.2em] uppercase">Advanced Tools</span>
            <h2 className="text-5xl lg:text-6xl font-bold text-brand-black mt-4 mb-6 tracking-tight">Professional Equipment</h2>
            <div className="w-24 h-0.5 bg-brand-black"></div>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'OBD Scanner', desc: 'Engine diagnostics', iconSrc: obdScannerIcon },
              { name: 'Paint Gauge', desc: 'Accident detection', iconSrc: paintGaugeIcon },
              { name: 'Tread Gauge', desc: 'Tire assessment', iconSrc: treadGaugeIcon },
              { name: 'Endoscopy', desc: 'Hidden inspection', iconSrc: endoscopyCameraIcon },
              { name: 'Battery Tester', desc: 'Power check', iconSrc: batteryTesterIcon },
              { name: 'IR Thermometer', desc: 'Temperature scan', iconSrc: irThermometerIcon },
              { name: 'Underbody Mirror', desc: 'Rust detection', iconSrc: underbodyMirrorIcon },
              { name: 'VIN Tools', desc: 'History verification', iconSrc: vinToolsIcon },
            ].map((equipment, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  <img src={equipment.iconSrc} alt={equipment.name} className="w-full h-full object-contain" />
                </div>
                <h3 className="font-bold text-brand-black text-sm mb-1">{equipment.name}</h3>
                <p className="text-xs text-gray-500">{equipment.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspection Process - Minimal Timeline */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <span className="text-brand-burgundy text-sm font-semibold tracking-[0.2em] uppercase">How It Works</span>
            <h2 className="text-5xl lg:text-6xl font-bold text-brand-black mt-4 mb-6 tracking-tight">Inspection Process</h2>
            <div className="w-24 h-0.5 bg-brand-black"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                step: '01',
                title: 'Booking',
                description: 'Schedule appointment and choose package',
              },
              {
                step: '02',
                title: 'Scheduling',
                description: 'We coordinate with seller for inspection',
              },
              {
                step: '03',
                title: 'Inspection',
                description: 'Thorough on-site vehicle assessment',
              },
              {
                step: '04',
                title: 'Report',
                description: 'Comprehensive findings and consultation',
              },
            ].map((process, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-brand-burgundy/100 mb-4">{process.step}</div>
                <h3 className="text-2xl font-bold text-brand-black mb-3">{process.title}</h3>
                <div className="w-12 h-0.5 bg-brand-burgundy mb-4"></div>
                <p className="text-gray-600 text-sm leading-relaxed">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Minimal Feature Grid */}
      <section className="py-32 bg-brand-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <span className="text-brand-burgundy text-sm font-semibold tracking-[0.2em] uppercase">Why Revelro</span>
            <h2 className="text-5xl lg:text-6xl font-bold text-brand-black mt-4 mb-6 tracking-tight">Why Choose Us</h2>
            <div className="w-24 h-0.5 bg-brand-black"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                title: 'Expert Technicians',
                description: 'Trained automotive professionals with years of experience',
                Icon: UserCheck,
              },
              {
                title: 'Advanced Equipment',
                description: 'State-of-the-art diagnostic tools for accurate assessments',
                Icon: Wrench,
              },
              {
                title: 'Transparent Reports',
                description: 'Detailed findings with expert recommendations',
                Icon: FileCheck,
              },
              {
                title: 'Service History',
                description: 'Access to records for almost all brands in India',
                Icon: BookOpen,
              },
              {
                title: 'Flexible Packages',
                description: 'Four packages tailored to your needs and budget',
                Icon: Package,
              },
              {
                title: 'Peace of Mind',
                description: 'Make informed decisions and avoid costly repairs',
                Icon: CheckCircle,
              },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="w-12 h-12 mb-6 text-brand-burgundy">
                  <feature.Icon size={48} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-brand-black mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Bold & Minimal */}
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
              Don't take chances with your investment. Book a professional inspection today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="bg-brand-burgundy text-white px-10 py-5 text-sm font-semibold tracking-wide uppercase hover:bg-brand-burgundy-dark transition-all duration-300"
              >
                Book Inspection
              </button>
              <button
                onClick={() => navigate('/services')}
                className="border-2 border-white text-white px-10 py-5 text-sm font-semibold tracking-wide uppercase hover:bg-white hover:text-brand-black transition-all duration-300"
              >
                View Packages
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
