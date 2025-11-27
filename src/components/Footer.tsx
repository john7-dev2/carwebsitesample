import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white border-t border-gray-800">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Revelro Cars</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Quality, Efficiency, Reliability and Satisfaction
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/services', label: 'Services' },
                { to: '/vehicle-history', label: 'Vehicle History' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-brand-burgundy transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-6">Packages</h4>
            <ul className="space-y-3">
              {['Light', 'Elite', 'Ultimate', 'Supreme'].map((pkg) => (
                <li key={pkg}>
                  <span className="text-sm text-gray-400">{pkg} Package</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>New Delhi, India</li>
              <li>
                <a href="tel:+919891111747" className="hover:text-brand-burgundy transition-colors">
                  +91 989 1111 747
                </a>
              </li>
              <li>
                <a href="mailto:rohan@revelro.in" className="hover:text-brand-burgundy transition-colors">
                  rohan@revelro.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              &copy; 2025 Revelro Cars Private Limited. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              www.revelro.in
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
