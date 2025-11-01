import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import revelroLogo from '../assets/Revelro_Logo.png';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
            <img src={revelroLogo} alt="Revelro Cars" className="h-20 sm:h-24 md:h-28 lg:h-36 w-auto transition-transform duration-300 group-hover:scale-105" />
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg text-gray-700 hover:text-brand-burgundy hover:bg-brand-burgundy/5 transition-all duration-200 font-medium relative ${
                  currentPage === item.id ? 'text-brand-burgundy bg-brand-burgundy/5' : ''
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-brand-burgundy rounded-full"></span>
                )}
              </button>
            ))}
          </nav>

          <a
            href="tel:+919891111747"
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-brand-burgundy to-brand-burgundy-dark hover:from-brand-burgundy-dark hover:to-brand-black text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-brand-burgundy/30 transform hover:-translate-y-0.5 text-sm md:text-base"
          >
            <Phone size={18} className="md:w-5 md:h-5" />
            <span className="hidden lg:inline">+91 989 1111 747</span>
            <span className="lg:hidden">Call Us</span>
          </a>

          <button
            className="md:hidden text-gray-700 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-gray-700 hover:text-brand-burgundy hover:bg-brand-burgundy/5 transition-all duration-200 font-medium px-4 py-2.5 rounded-lg mx-2 text-sm ${
                    currentPage === item.id ? 'text-brand-burgundy bg-brand-burgundy/5' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="tel:+919891111747"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-burgundy to-brand-burgundy-dark text-white px-4 py-2.5 rounded-xl font-semibold mx-4 mt-2 shadow-md text-sm"
              >
                <Phone size={18} />
                +91 989 1111 747
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
