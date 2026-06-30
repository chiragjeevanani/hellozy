import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
);

export default function Footer() {
  const quickLinks = [
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contact" },
    { label: "Terms & Conditions", to: "/terms" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Refund Policy", to: "/refund" },
    { label: "Cancellation Policy", to: "/cancellation" },
    { label: "Portal Access", to: "/login" }
  ];

  const services = [
    { label: "TAXI SERVICE", href: "/#services" },
    { label: "BIKE RIDE", href: "/#services" },
    { label: "PARCEL DELIVERY", href: "/#services" },
    { label: "EVENT REGISTRATION", href: "/event-registration" },
    { label: "SPONSORSHIP SLOTS", href: "/event-registration" }
  ];

  const socials = [
    { icon: <FacebookIcon />, url: "https://www.facebook.com/" },
    { icon: <InstagramIcon />, url: "https://www.instagram.com/" },
    { icon: <LinkedinIcon />, url: "https://www.linkedin.com/" },
    { icon: <YoutubeIcon />, url: "https://youtube.com/" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#3d2314] bg-primary text-gray-300 pt-20 pb-10 px-4 md:px-8 border-t border-white/10 relative text-left">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
        
        {/* Brand Column */}
        <div className="lg:col-span-5 text-left">
          <div className="flex items-center gap-2 mb-6">
            <img src="/logo.png" alt="Hellozy" className="h-10 w-auto brightness-0 invert" />
            <span className="font-display font-extrabold text-2xl tracking-tight text-white">
              hellozy
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
            We provide the best mobility, delivery, and event coordination services in the region. Reliable, fast, and secure rides alongside seamless seat registrations and sponsorships at your fingertips.
          </p>
          <div className="flex gap-3">
            {socials.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:text-white transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="lg:col-span-3 text-left">
          <h4 className="text-white font-bold mb-6 text-lg tracking-wide border-l-4 border-accent pl-3">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3.5 text-sm">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.to} className="text-stone-300 hover:text-accent transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Services Column */}
        <div className="lg:col-span-4 text-left">
          <h4 className="text-white font-bold mb-6 text-lg tracking-wide border-l-4 border-accent pl-3">
            Our Services
          </h4>
          <ul className="flex flex-col gap-3.5 text-sm">
            {services.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="text-stone-300 hover:text-accent transition-colors block">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-400">
          Copyright 2026 © All Right Reserved Design by <span className="text-white font-semibold">Hellozy</span>
        </p>
        <div className="flex gap-6 text-sm">
          <Link to="/privacy" className="text-stone-300 hover:text-accent transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="text-stone-300 hover:text-accent transition-colors">Terms & Conditions</Link>
        </div>
      </div>

      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className="absolute bottom-10 right-4 md:right-8 bg-accent hover:bg-accent-hover text-white p-3 rounded-full shadow-lg transition-transform hover:-translate-y-1"
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  );
}
