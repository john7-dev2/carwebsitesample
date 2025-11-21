import { Menu, X } from './icons';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import revelroLogo from '../assets/Revelro_Logo.png';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: '/', label: 'Home' },
    { id: '/services', label: 'Services' },
    { id: '/about', label: 'About' },
    { id: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center cursor-pointer group">
            <img src={revelroLogo} alt="Revelro Cars" className="h-56 w-auto transition-opacity duration-300 group-hover:opacity-80" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                  location.pathname === item.id 
                    ? 'text-brand-burgundy' 
                    : 'text-brand-black hover:text-brand-burgundy'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            to="/services"
            className="hidden md:block bg-brand-black text-white px-6 py-3 text-xs font-semibold tracking-wider uppercase hover:bg-brand-burgundy transition-all duration-300"
          >
            Book Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-brand-black p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.id}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                    location.pathname === item.id 
                      ? 'text-brand-burgundy' 
                      : 'text-brand-black hover:text-brand-burgundy'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-brand-black text-white px-6 py-3 text-xs font-semibold tracking-wider uppercase text-center mt-4"
              >
                Book Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
