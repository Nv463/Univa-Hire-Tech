import React from 'react';
import { PageHeroCarousel } from '../components/PageHeroCarousel';
import aboutImage from '../assets/images/service_executive_search_1793911534916.jpg';
import {
  ShieldCheck,
  Target,
  Compass,
  HeartHandshake,
  CheckCircle2,
  Download,
  Users,
  Eye,
  Award,
  Sparkles,
  Building,
  Briefcase,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const coreValues = [
    {
      name: 'Integrity',
      desc: 'Honest communication and ethical practice in every engagement.',
      icon: ShieldCheck,
    },
    {
      name: 'Reliability',
      desc: 'We commit to timelines and consistently deliver on them.',
      icon: CheckCircle2,
    },
    {
      name: 'Transparency',
      desc: 'Clear commercial terms with zero hidden charges or surprise markups.',
      icon: Eye,
    },
    {
      name: 'Compliance',
      desc: 'Operations built around strict adherence to applicable Indian statutory requirements.',
      icon: Award,
    },
    {
      name: 'Client Focus',
      desc: 'Your business priorities shape how we source, screen, and deploy.',
      icon: Target,
    },
    {
      name: 'Respect for People',
      desc: 'Fair, respectful, and dignified treatment for every candidate and employee.',
      icon: HeartHandshake,
    },
  ];

  const objectives = [
    'Deliver quality manpower on time, every time across all mandated levels.',
    'Build long-term corporate partnerships based on accountability and mutual trust.',
    'Run compliance-oriented operations that insulate clients from statutory liabilities.',
    'Offer integrated workforce and business support under one unified roof.',
    'Strengthen candidate sourcing networks across Tier-1, Tier-2, and industrial regions.',
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Page Header Banner */}
      <PageHeroCarousel page="about" className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs uppercase tracking-[0.25em] text-[#B8E9DF] font-bold">
            About UNIVA HIRE TECH
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            One Partner for the Workforce & the Workplace.
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Delivering Compliance focussed contract staffing and business support designed to help organizations operate with total confidence across India.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <a
              href="/public/assets/aistudio/UNIVA_HIRE_TECH_Company_Profile_50c91189.pdf"
              download="UNIVA_HIRE_TECH_Company_Profile.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3B2FBF] hover:bg-[#3227a8] text-white text-xs font-bold rounded-lg transition-all shadow-md group"
            >
              <Download className="w-4 h-4 text-[#0E9F80] group-hover:translate-y-0.5 transition-transform" />
              <span>Download Official Company Profile (PDF)</span>
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/20 transition-colors"
            >
              Speak to Our Executive Team
            </button>
          </div>
        </div>
      </PageHeroCarousel>

      {/* Who We Are & Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3B2FBF]">
                Corporate Background
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B1A4E]">
                Who We Are
              </h2>
            </div>

            <p className="text-sm text-[#55587A] leading-relaxed">
              <strong className="text-[#1B1A4E]">UNIVA HIRE TECH</strong> is an Indian third-party staffing, recruitment and workforce management company delivering integrated manpower and business support solutions to organizations across key industries.
            </p>

            <p className="text-sm text-[#55587A] leading-relaxed">
              We help clients find the right people, deploy and manage them where needed, and stay aligned with applicable Indian employment regulations, so leadership can focus squarely on core business performance and growth.
            </p>

            <p className="text-sm text-[#55587A] leading-relaxed">
              Beyond traditional staffing, we support corporate clients with technical training, workplace safety audits, HR compliance, and corporate events: creating a single, dependable business support partner.
            </p>

            <div className="p-4 bg-slate-50 border-l-4 border-[#3B2FBF] rounded-r-lg">
              <p className="text-sm font-semibold text-[#1B1A4E] italic">
                &ldquo;Right people. Right time. Right fit.&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#DCDDEE] shadow-lg relative bg-white">
              <img
                src={aboutImage}
                alt="UNIVA Leadership Consultants"
                className="w-full h-80 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-6 bg-white space-y-2">
                <span className="text-xs font-bold text-[#0E9F80] uppercase tracking-wider">
                  Our Brand Creed
                </span>
                <h4 className="text-base font-bold text-[#1B1A4E]">
                  &ldquo;The Right Talent, On Our Payroll, For Your Growth&rdquo;
                </h4>
                <p className="text-xs text-[#55587A]">
                  Guiding every hiring mandate, compliance check, and on-site workforce deployment across India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy, Mission & Vision */}
      <section className="bg-slate-50 py-16 border-y border-[#DCDDEE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3B2FBF]">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B1A4E]">
              Philosophy, Mission & Vision
            </h2>
            <p className="text-xs sm:text-sm text-[#55587A]">
              What guides every client engagement, candidate interaction, and operational decision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Philosophy */}
            <div className="bg-white p-8 rounded-xl border border-[#DCDDEE] shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#3B2FBF]/10 text-[#3B2FBF] flex items-center justify-center mb-4">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1B1A4E] mb-2">
                  Business Philosophy
                </h3>
                <p className="text-xs sm:text-sm text-[#55587A] leading-relaxed">
                  Workforce solutions work best when they are simple, transparent, and strictly compliant. We treat every corporate requirement as an urgent business priority and every candidate as a respected professional.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-[#3B2FBF]">
                Simplicity · Transparency · Rigor
              </div>
            </div>

            {/* Mission */}
            <div className="bg-[#1B1A4E] text-white p-8 rounded-xl shadow-md flex flex-col justify-between space-y-4">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#0E9F80] text-white flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Our Mission
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  To deliver reliable, compliant, and cost-effective manpower and business support solutions that empower Indian organizations to scale operations smoothly and operate with complete confidence.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-700 text-[11px] font-bold text-[#0E9F80]">
                Confidence · Execution · Value
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-xl border border-[#DCDDEE] shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#0E9F80]/15 text-[#0E9F80] flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1B1A4E] mb-2">
                  Our Vision
                </h3>
                <p className="text-xs sm:text-sm text-[#55587A] leading-relaxed">
                  To be the trusted strategic manpower partner that drives business growth and talent growth together, across industrial corridors and commercial capitals in India.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-[11px] font-bold text-[#0E9F80]">
                Pan-India Leadership · Shared Growth
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3B2FBF]">
            Ethical Foundation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B1A4E]">
            Our Core Values
          </h2>
          <p className="text-xs sm:text-sm text-[#55587A]">
            Principles we apply without compromise to every client, candidate, and deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-[#DCDDEE] hover:border-[#3B2FBF] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#3B2FBF]/10 text-[#3B2FBF] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#1B1A4E] mb-2">
                  {val.name}
                </h3>
                <p className="text-xs text-[#55587A] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Objectives & Dual Commitments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Strategic Objectives */}
          <div className="lg:col-span-6 bg-white p-8 rounded-xl border border-[#DCDDEE] space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3B2FBF]">
              Looking Ahead
            </span>
            <h3 className="text-xl font-bold text-[#1B1A4E]">
              Strategic Objectives
            </h3>
            <ul className="space-y-4">
              {objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1B1A4E] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-xs sm:text-sm text-[#1B1A4E] leading-relaxed font-medium">
                    {obj}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Commitments to Clients & Employees */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#1B1A4E] text-white p-6 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-[#0E9F80] font-bold text-xs uppercase tracking-wider">
                <Building className="w-4 h-4" />
                <span>Our Commitment to Clients</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0E9F80] shrink-0" />
                  <span>Timely, quality-screened manpower aligned with business requirements</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0E9F80] shrink-0" />
                  <span>Transparent commercial terms with SLA commitments</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0E9F80] shrink-0" />
                  <span>A professional, responsive single point of coordination</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#0E9F80] text-white p-6 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>Our Commitment to Employees</span>
              </div>
              <ul className="space-y-2 text-xs text-white/95">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-100 shrink-0" />
                  <span>Fair, respectful, and on-time onboarding and wage disbursement</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-100 shrink-0" />
                  <span>Clear documentation, EPF/ESIC passbooks, and statutory support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-100 shrink-0" />
                  <span>Responsive, accessible grievance handling and employee welfare</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-100 border border-[#DCDDEE] rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h4 className="text-base font-bold text-[#1B1A4E]">
              Explore how we can support your business requirements.
            </h4>
            <p className="text-xs text-[#55587A]">
              Connect with our leadership team for a confidential workforce requirement discussion.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-2.5 bg-[#3B2FBF] text-white text-xs font-bold rounded-lg hover:bg-[#3227a8] transition-colors whitespace-nowrap"
          >
            Initiate Corporate Enquiry
          </button>
        </div>
      </section>
    </div>
  );
};
