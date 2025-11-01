import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-white text-2xl font-bold mb-4 bg-gradient-to-r from-brand-burgundy-light to-brand-burgundy bg-clip-text text-transparent">Revelro Cars</h3>
            <p className="text-sm mb-6 leading-relaxed text-gray-400">
              Expert Solutions for Your Needs - Quality, Efficiency, Reliability and Satisfaction
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-brand-burgundy transition-all duration-300 transform hover:-translate-y-1">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-brand-burgundy transition-all duration-300 transform hover:-translate-y-1">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-brand-burgundy transition-all duration-300 transform hover:-translate-y-1">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-brand-burgundy-light transition-colors text-sm hover:translate-x-1 inline-block transform duration-200"
                >
                  → Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-brand-burgundy-light transition-colors text-sm hover:translate-x-1 inline-block transform duration-200"
                >
                  → Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-brand-burgundy-light transition-colors text-sm hover:translate-x-1 inline-block transform duration-200"
                >
                  → About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-brand-burgundy-light transition-colors text-sm hover:translate-x-1 inline-block transform duration-200"
                >
                  → Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-burgundy rounded-full"></span>
                <span className="text-gray-400">Light Package</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-burgundy rounded-full"></span>
                <span className="text-gray-400">Elite Package</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-burgundy rounded-full"></span>
                <span className="text-gray-400">Ultimate Package</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-burgundy rounded-full"></span>
                <span className="text-gray-400">Supreme Package</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="flex-shrink-0 mt-1 text-brand-burgundy" />
                <span className="text-gray-400">311, 3rd Floor, Downtown Mall, Sarojini Nagar, New Delhi - 110023</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={18} className="text-brand-burgundy" />
                <a href="tel:+919891111747" className="hover:text-brand-burgundy-light transition-colors text-gray-400">
                  +91 989 1111 747
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={18} className="text-brand-burgundy" />
                <a href="mailto:rohan@revelro.in" className="hover:text-brand-burgundy-light transition-colors text-gray-400">
                  rohan@revelro.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-400">&copy; 2025 <span className="text-brand-burgundy-light font-semibold">Revelro Cars Private Limited</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
