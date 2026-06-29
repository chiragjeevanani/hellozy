import React, { useState } from 'react';
import { Phone, Mail, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full z-50">
      {/* Top bar */}
      <div className="bg-primary text-white text-xs py-2 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-2 border-b border-white/10">
        <div className="flex items-center gap-6">
          <a href="tel:91-93-911-911" className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Phone size={14} className="text-accent" />
            <span>91-93-911-911</span>
          </a>
          <a href="mailto:customercare@hellozy.com" className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Mail size={14} className="text-accent" />
            <span>customercare@hellozy.com</span>
          </a>
        </div>
        <div className="hidden md:flex gap-4">
          <Link to="/about" className="hover:text-accent transition-colors">About Us</Link>
          <span>|</span>
          <Link to="/faqs" className="hover:text-accent transition-colors">FAQs</Link>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-white/95 backdrop-blur-md sticky top-0 shadow-sm border-b border-gray-100 py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Hellozy" className="h-10 w-auto object-contain" />
            <span className="font-display font-extrabold text-2xl tracking-tight text-primary">
              hellozy
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8 font-semibold text-stone-600">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <Link to="/about" className="hover:text-accent transition-colors">Company</Link>
            <a href="/#services" className="hover:text-accent transition-colors">Our Taxi</a>
            <Link to="/faqs" className="hover:text-accent transition-colors">FAQs</Link>
            <Link to="/blog" className="hover:text-accent transition-colors">Blog</Link>
            <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
            <Link to="/event-registration" className="relative group overflow-hidden bg-accent/10 border border-accent/25 text-accent px-3 py-1 rounded-full text-xs font-bold tracking-wide transition-all hover:bg-accent hover:text-white inline-flex items-center gap-1">
              Book Events
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping absolute -top-0.5 -right-0.5"></span>
            </Link>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-gray-700 hover:text-primary font-semibold transition-colors px-4 py-2"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-primary hover:bg-primary-light text-white font-semibold py-2.5 px-6 rounded-full shadow-md shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Join Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-700 hover:text-primary p-1.5 focus:outline-none"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-100 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-750 font-bold px-2 py-1.5 hover:text-accent"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-750 font-bold px-2 py-1.5 hover:text-accent"
            >
              Company
            </Link>
            <a 
              href="/#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-750 font-bold px-2 py-1.5 hover:text-accent"
            >
              Our Taxi
            </a>
            <Link 
              to="/faqs" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-750 font-bold px-2 py-1.5 hover:text-accent"
            >
              FAQs
            </Link>
            <Link 
              to="/blog" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-750 font-bold px-2 py-1.5 hover:text-accent"
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-750 font-bold px-2 py-1.5 hover:text-accent"
            >
              Contact
            </Link>
            <Link 
              to="/event-registration" 
              onClick={() => setMobileMenuOpen(false)}
              className="mx-2 my-1 text-center bg-accent/10 border border-accent/20 text-accent font-bold py-2 rounded-xl flex justify-center items-center gap-1.5"
            >
              Book Events
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping"></span>
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-gray-700 font-semibold py-2.5"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-primary hover:bg-primary-light text-white font-semibold py-2.5 rounded-xl shadow-md transition-colors"
              >
                Join Us
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
