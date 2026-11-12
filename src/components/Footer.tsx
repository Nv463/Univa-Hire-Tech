import React from 'react';
import { UnivaLogo } from './UnivaLogo';
import { Download, Mail, Phone, ExternalLink, CheckCircle2, Instagram, Facebook, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1B1A4E] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-700/60">
          {/* Col 1 & 2: Brand & Profile */}
          <div className="lg:col-span-2 space-y-4">
            <UnivaLogo variant="white" size="lg" />
            <p className="text-sm text-slate-300 font-medium leading-relaxed max-w-sm">
              &ldquo;The Right Talent, On Our Payroll, For Your Growth&rdquo;
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              UNIVA HIRE TECH is an Indian third-party staffing, recruitment and workforce management company delivering integrated manpower and business support solutions to organizations across India.
            </p>

            <div className="pt-2">
              <a
                href="/public/assets/aistudio/UNIVA_HIRE_TECH_Company_Profile_50c91189.pdf"
                download="UNIVA_HIRE_TECH_Company_Profile.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#3B2FBF] hover:bg-[#3227a8] text-white text-xs font-semibold rounded-lg shadow-sm transition-all group"
              >
                <Download className="w-4 h-4 text-[#0E9F80] group-hover:translate-y-0.5 transition-transform" />
                <span>Download Company Profile (PDF)</span>
              </a>
            </div>

          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E9F80] mb-4">
              Integrated Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contract Staffing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Recruitment & Executive Search
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Corporate Event Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Audit Services (Safety & HR)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Training & Skill Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Workplace Safety & Inspection
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Onboarding & HR Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Key Sectors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E9F80] mb-4">
              Sectors We Serve
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors">
                  IT & Software (GCC / Tech)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors">
                  Manufacturing & Automotive
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors">
                  Construction & Infrastructure
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors">
                  Banking & Financial Services (BFSI)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors">
                  Pharmaceuticals & Healthcare
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors">
                  Retail & E-commerce
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors">
                  Logistics & Supply Chain
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors">
                  FMCG & Consumer Goods
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors">
                  Telecom
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors">
                  Food & Beverage
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors">
                  Oil, Gas & Energy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors">
                  Corporate & Professional Services
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Hubs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E9F80] mb-4">
              Get in touch
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0E9F80] shrink-0" />
                <a href="tel:+918049208000" className="hover:text-white">
                  +91 80 4920 8000
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0E9F80] shrink-0" />
                <a href="mailto:Info@univahtech.com" className="hover:text-white break-all">
                  Info@univahtech.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0E9F80] shrink-0" />
                <a href="mailto:Contact@univahtech.com" className="hover:text-white break-all">
                  Contact@univahtech.com
                </a>
              </div>
              <div className="pt-2 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-200">Regional Desks:</span> Mumbai · Gurugram (NCR) · Pune · Hyderabad · Chennai
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span>&copy; 2026 UNIVA HIRE TECH Pvt. Ltd. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <button onClick={() => handleNav('privacy')} className="hover:text-white">
              Privacy Policy (DPDP Act)
            </button>
          </div>

          <nav aria-label="Social media" className="flex items-center gap-3">
            <a href="https://www.instagram.com/univahtech/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full border border-white/15 p-3 text-slate-300 transition-colors hover:border-[#C8B37A] hover:text-[#C8B37A]">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61596353462036&amp;sk=directory_education" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full border border-white/15 p-2 text-slate-300 transition-colors hover:border-[#C8B37A] hover:text-[#C8B37A]">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/univa-hire-tech-05049b44a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-full border border-white/15 p-2 text-slate-300 transition-colors hover:border-[#C8B37A] hover:text-[#C8B37A]">
              <Linkedin className="h-6 w-6" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
