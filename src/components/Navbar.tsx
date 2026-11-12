import React, { useState } from 'react';
import { UnivaLogo } from './UnivaLogo';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'industries', label: 'Industries' },
    { id: 'how-we-work', label: 'How We Work' },
    { id: 'jobs', label: 'Careers / Jobs' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#DCDDEE] transition-all">
      {/* Top micro-bar for Pan-India service presence */}
      <div className="bg-[#1B1A4E] text-white text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between text-slate-300">
        <div className="flex items-center gap-2 text-[11px] sm:text-xs">
          <span>Integrated Workforce Solutions · Recruitment · Pan-India Delivery</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-300">
          <span>Pan India Corporate Solutions</span>
          <span aria-hidden="true">·</span>
          <span>Delhi NCR · Bengaluru · Mumbai · Gurugram · Pune · Hyderabad · Chennai</span>
          <span aria-hidden="true">·</span>
        </div>
      </div>

      {/* Main Top Bar: 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark & Emblem */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center text-left cursor-pointer group focus:outline-none"
        >
          <UnivaLogo size="md" />
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#55587A]">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer relative ${
                  isActive
                    ? 'text-[#3B2FBF] font-bold'
                    : 'hover:text-[#1B1A4E]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B2FBF] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('jobs')}
            className="px-4 py-2.5 text-xs font-semibold text-[#1B1A4E] hover:text-[#3B2FBF] bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Find a Job
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#3B2FBF] hover:bg-[#3227a8] active:scale-[0.98] rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <span>Hire Talent</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => handleNavClick('contact')}
            className="px-3 py-1.5 text-xs font-bold text-white bg-[#3B2FBF] rounded-md sm:hidden"
          >
            Hire
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1B1A4E] hover:bg-slate-100 rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#DCDDEE] px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                activePage === link.id
                  ? 'bg-[#3B2FBF]/10 text-[#3B2FBF]'
                  : 'text-[#1B1A4E] hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#3B2FBF] rounded-lg shadow"
            >
              Hire Talent / Submit Enquiry
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
