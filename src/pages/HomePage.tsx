import React from 'react';
import {
  ArrowRight,
  Briefcase,
  Users,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  FileCheck2,
  GraduationCap,
  AlertTriangle,
  UserCheck,
  MapPin,
  Clock,
  ArrowUpRight,
  Sparkles,
  Building2,
  TrendingUp,
} from 'lucide-react';
import { Job } from '../types';

interface HomePageProps {
  onNavigate: (page: string) => void;
  jobs: Job[];
  onSelectJob: (job: Job) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  jobs,
  onSelectJob,
}) => {
  const latestJobs = jobs.slice(0, 6);

  const trustPoints = [
    {
      title: 'Executive-to-Senior-Level',
      subtitle: 'Niche leadership & specialized mandates',
      icon: Users,
    },
    {
      title: 'Compliance-Oriented',
      subtitle: 'EPF, ESIC & statutory rigor on our payroll',
      icon: ShieldCheck,
    },
    {
      title: 'Transparent Commercials',
      subtitle: 'Clear terms with zero hidden charges',
      icon: TrendingUp,
    },
    {
      title: 'Pan-India Sourcing',
      subtitle: 'Multi-region delivery across 6 metropolitan hubs',
      icon: MapPin,
    },
  ];

  const services = [
    {
      num: '01',
      title: 'Contract Staffing',
      desc: "Executive-to-Senior-level contract staffing on UNIVA's payroll, payroll and statutory administration, scale up or down without permanent headcount.",
      icon: Users,
      badge: 'Core Solution',
    },
    {
      num: '02',
      title: 'Recruitment Services',
      desc: 'Permanent Recruitment, Executive Search, Requirement Fulfilment, Candidate Screening, and Recruitment Process Outsourcing (RPO).',
      icon: Briefcase,
      badge: 'Executive Search',
    },
    {
      num: '03',
      title: 'Corporate Event Management',
      desc: 'Planning, coordination and on-ground execution for conferences, seminars, employee engagement activities, and annual celebrations.',
      icon: Calendar,
      badge: 'Engagement',
    },
    {
      num: '04',
      title: 'Audit Services',
      desc: 'Workplace safety compliance audits, HR process & documentation audits, ISO audit support, operational risk assessment, and gap analyses.',
      icon: FileCheck2,
      badge: 'Governance',
    },
    {
      num: '05',
      title: 'Training & Skill Development',
      desc: 'Technical skills development, communication and soft-skills, employee development journeys, professional corporate programs, and safety awareness.',
      icon: GraduationCap,
      badge: 'Capability',
    },
    {
      num: '06',
      title: 'Workplace Safety Training & Support',
      desc: 'Safety awareness programs, hazard identification & risk assessment (HIRA), instructor-led training, and site safety inspections.',
      icon: AlertTriangle,
      badge: 'Safety First',
    },
    {
      num: '07',
      title: 'Onboarding & HR Support',
      desc: 'Joining formalities, documentation verification, HR records management, attendance & leave administration, and employee grievance support.',
      icon: UserCheck,
      badge: 'Lifecycle',
    },
  ];

  const industries = [
    { name: 'IT & Software', desc: 'Technical, support and IT GCC operations', icon: '💻' },
    { name: 'Manufacturing', desc: 'Plant, production, quality and maintenance', icon: '⚙️' },
    { name: 'Construction & Infra', desc: 'Site, civil, project and skilled trades', icon: '🏗️' },
    { name: 'Banking & Financial (BFSI)', desc: 'Risk, compliance, sales and back office', icon: '🏛️' },
    { name: 'Healthcare & Pharma', desc: 'Clinical support, admin and hospital facilities', icon: '🏥' },
    { name: 'Retail & E-commerce', desc: 'Store, fulfillment and customer service operations', icon: '🛍️' },
    { name: 'Logistics & Supply Chain', desc: 'Warehouse, transport and distribution hubs', icon: '🚚' },
    { name: 'Corporate & Professional', desc: 'Corporate, HR, finance and support leadership', icon: '🏢' },
  ];

  const whyChooseUs = [
    { num: '1', title: 'Dedicated Recruitment Support', desc: 'A focused team that understands your requirement and cultural dynamics.' },
    { num: '2', title: 'Quality Candidate Screening', desc: 'Every profile checked and rigorously verified before it reaches you.' },
    { num: '3', title: 'Faster Requirement Fulfilment', desc: 'Structured sourcing pipelines so high-priority roles do not stay vacant.' },
    { num: '4', title: 'Flexible Workforce Solutions', desc: 'Permanent, contract or bulk staffing: scale up or down as business demands.' },
    { num: '5', title: 'Transparent Commercial Terms', desc: 'Clear commercial SLAs and transparent markups with zero hidden fees.' },
    { num: '6', title: 'Professional Client Coordination', desc: 'Single accountable point of contact and timely executive status updates.' },
    { num: '7', title: 'Compliance-Oriented Operations', desc: 'Strict adherence to EPF, ESIC, Contract Labour, and India DPDP Act 2023.' },
    { num: '8', title: 'Long-Term Business Partnership', desc: 'We grow alongside your corporate hiring roadmaps and strategic expansions.' },
  ];

  const processSteps = [
    { step: '01', title: 'Understand Requirements', desc: 'Role, volume, budget and timeline clarity.' },
    { step: '02', title: 'Requirement Planning', desc: 'Sourcing plan, milestones and stakeholder ownership.' },
    { step: '03', title: 'Candidate Sourcing', desc: 'Executive databases, talent networks and referrals.' },
    { step: '04', title: 'Screening & Shortlisting', desc: 'Deep profile checks and competency evaluation.' },
    { step: '05', title: 'Client Interview', desc: 'Seamlessly coordinated with your hiring committee.' },
    { step: '06', title: 'Documentation & Verification', desc: 'Credential collection and thorough background checks.' },
    { step: '07', title: 'Employee Onboarding', desc: 'Offer issuance, induction and statutory enrollments.' },
    { step: '08', title: 'Workforce Deployment', desc: 'Placement at site with clear reporting structures.' },
    { step: '09', title: 'Performance Monitoring', desc: 'Regular reviews and structured client feedback loops.' },
    { step: '10', title: 'Continuous Support', desc: 'A dedicated relationship partner, always reachable.' },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#1B1A4E] text-white py-20 lg:py-28">
        {/* Background Image with Measured Contrast Scrim */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="/src/assets/images/hero_executive_corporate_1793911532663.jpg"
            alt="UNIVA HIRE TECH Corporate Boardroom"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B1A4E] via-[#1B1A4E]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            {/* Editorial Category Kicker (No pill badge) */}
            <div className="text-xs uppercase tracking-[0.25em] text-[#0E9F80] font-bold">
              Third-Party Staffing · Recruitment · Workforce Management
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              The Right Talent,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0E9F80] to-teal-200">
                On Our Payroll,
              </span>{' '}
              For Your Growth.
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed max-w-2xl">
              Your Trusted Strategic Manpower Partner. Delivering integrated manpower, executive recruitment, and compliance-driven workforce solutions across corporate India.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('jobs')}
                className="px-7 py-3.5 bg-white text-[#1B1A4E] hover:bg-slate-100 font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-[#3B2FBF]" />
                <span>Browse Open Jobs</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-7 py-3.5 bg-[#3B2FBF] hover:bg-[#3227a8] text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-indigo-400/30"
              >
                <span>Hire Talent / Request Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
              <div>
                <span className="block text-xl font-bold text-white tabular-nums">100%</span>
                <span className="text-slate-400">Statutory Compliant</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-white tabular-nums">10-Step</span>
                <span className="text-slate-400">Rigorous Delivery Model</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-white tabular-nums">7 Services</span>
                <span className="text-slate-400">Under One Roof</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-white tabular-nums">Pan-India</span>
                <span className="text-slate-400">Metropolitan Presence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strip of 4 Key Points */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="bg-white rounded-xl shadow-md border border-[#DCDDEE] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-2 transition-transform hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-lg bg-[#3B2FBF]/10 text-[#3B2FBF] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1B1A4E] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#55587A] mt-1 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Services Portfolio (7 Integrated Services) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DCDDEE] pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#3B2FBF]">
              What We Offer
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B1A4E] mt-1 tracking-tight">
              Our Integrated Service Portfolio
            </h2>
            <p className="text-sm text-[#55587A] mt-2 max-w-2xl">
              Seven integrated services. Use one, or combine them for complete workforce and workplace transformation.
            </p>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-bold text-[#3B2FBF] hover:text-[#1B1A4E] flex items-center gap-1 shrink-0 group self-start md:self-end"
          >
            <span>Explore All 7 Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.num}
                onClick={() => onNavigate('services')}
                className="bg-white rounded-xl border border-[#DCDDEE] p-6 hover:shadow-md hover:border-[#3B2FBF]/40 transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#3B2FBF] tracking-wider">
                      SERVICE {srv.num}
                    </span>
                    <span className="text-[11px] font-semibold text-[#0E9F80] bg-teal-50 px-2 py-0.5 rounded">
                      {srv.badge}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-[#3B2FBF] group-hover:text-white text-[#1B1A4E] flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1B1A4E] group-hover:text-[#3B2FBF] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-[#55587A] leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#3B2FBF]">
                  <span>Learn details & deliverables</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}

          {/* Unified Value Box */}
          <div className="bg-[#1B1A4E] text-white rounded-xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0E9F80]">
                Unified Delivery
              </span>
              <h3 className="text-2xl font-extrabold leading-tight">
                One Partner.<br />
                Every Workforce Need.
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                From finding top executive leaders to deploying 200+ contractual workers on UNIVA&apos;s payroll with complete statutory coverage, we streamline manpower complexity.
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-2.5 px-4 bg-[#0E9F80] hover:bg-[#0c886d] text-white text-xs font-bold rounded-lg transition-colors text-center"
              >
                Talk to a Manpower Consultant
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors We Serve */}
      <section className="bg-slate-50 py-16 border-y border-[#DCDDEE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3B2FBF]">
              Industry Specialization
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B1A4E] tracking-tight">
              Sectors We Serve
            </h2>
            <p className="text-sm text-[#55587A]">
              Our specialized workforce and recruitment solutions are tailored to the unique operational demands and regulatory nuances of key Indian industries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {industries.map((ind, i) => (
              <div
                key={i}
                onClick={() => onNavigate('industries')}
                className="bg-white p-5 rounded-xl border border-[#DCDDEE] hover:border-[#3B2FBF] hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="text-2xl mb-3">{ind.icon}</div>
                <h3 className="text-sm font-bold text-[#1B1A4E] group-hover:text-[#3B2FBF] transition-colors">
                  {ind.name}
                </h3>
                <p className="text-xs text-[#55587A] mt-1.5 leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('industries')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3B2FBF] hover:underline"
            >
              <span>View full sector breakdown & candidate profiles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 10-Step Process Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3B2FBF]">
            Our Business Approach
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B1A4E] tracking-tight">
            A Structured 10-Step Delivery Process
          </h2>
          <p className="text-sm text-[#55587A]">
            From the initial requirements dialogue to ongoing employee deployment and performance governance, every step is transparent, documented, and SLA-bound.
          </p>
        </div>

        {/* Stepper Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {processSteps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-[#DCDDEE] hover:border-[#3B2FBF] transition-all relative flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-full bg-[#1B1A4E] text-white flex items-center justify-center text-xs font-extrabold mb-3">
                  {s.step}
                </div>
                <h3 className="text-sm font-bold text-[#1B1A4E] leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs text-[#55587A] mt-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] uppercase font-bold tracking-wider text-[#0E9F80]">
                {idx < 5 ? 'Talent Phase' : 'Deployment Phase'}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => onNavigate('how-we-work')}
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#1B1A4E] rounded-lg transition-colors"
          >
            Review the Full Step-by-Step Methodology &rarr;
          </button>
        </div>
      </section>

      {/* Why Choose Us Grid (8 Reasons) */}
      <section className="bg-[#1B1A4E] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0E9F80]">
              Strategic Differentiation
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Why Choose UNIVA HIRE TECH?
            </h2>
            <p className="text-sm text-slate-300">
              Eight compelling reasons leading enterprises trust us as their long-term manpower and recruitment partner across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((reason) => (
              <div
                key={reason.num}
                className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 hover:border-[#0E9F80] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#0E9F80] text-[#1B1A4E] flex items-center justify-center text-xs font-extrabold mb-3">
                  {reason.num}
                </div>
                <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                  {reason.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Open Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#DCDDEE] pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#3B2FBF]">
              Executive Career Opportunities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B1A4E] mt-1 tracking-tight">
              Featured Job Openings
            </h2>
            <p className="text-sm text-[#55587A] mt-2">
              Explore senior and leadership positions currently active with our top corporate clients.
            </p>
          </div>
          <button
            onClick={() => onNavigate('jobs')}
            className="text-xs font-bold text-[#3B2FBF] hover:text-[#1B1A4E] flex items-center gap-1.5 shrink-0"
          >
            <span>View All Jobs ({jobs.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-[#DCDDEE] p-6 hover:shadow-md hover:border-[#3B2FBF] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#55587A]">
                  <span className="font-semibold text-[#3B2FBF]">{job.industry}</span>
                  <span className="font-mono text-[11px]">
                    {job.employment_type}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#1B1A4E] group-hover:text-[#3B2FBF] transition-colors leading-snug">
                  {job.title}
                </h3>

                <p className="text-xs text-[#55587A] line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-[#55587A]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.location}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.experience_min}–{job.experience_max} Yrs</span>
                  </span>
                </div>

                {job.show_salary && (
                  <div className="text-xs font-bold text-[#0E9F80] pt-1">
                    {job.salary_range}
                  </div>
                )}
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectJob(job)}
                  className="text-xs font-bold text-[#3B2FBF] hover:underline"
                >
                  View Details &rarr;
                </button>
                <button
                  onClick={() => onSelectJob(job)}
                  className="px-3.5 py-1.5 bg-[#1B1A4E] hover:bg-[#3B2FBF] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-[#1B1A4E]">
              Can&apos;t find a role matching your senior profile?
            </h4>
            <p className="text-xs text-[#55587A] mt-1">
              Submit your CV to our confidential Executive Talent Pool for upcoming leadership mandates.
            </p>
          </div>
          <button
            onClick={() => onNavigate('jobs')}
            className="px-5 py-2.5 bg-[#3B2FBF] text-white text-xs font-bold rounded-lg hover:bg-[#3227a8] transition-colors whitespace-nowrap"
          >
            Submit General Resume
          </button>
        </div>
      </section>

      {/* Final High-Impact CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1B1A4E] to-[#3B2FBF] text-white rounded-2xl p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0E9F80]">
              Partner With UNIVA HIRE TECH
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Ready to scale your workforce or take your next executive leap?
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed">
              Whether you are an enterprise seeking compliant, high-performing contractual or lateral manpower, or a senior leader exploring career advancement, our partners are ready to assist.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 bg-[#0E9F80] hover:bg-[#0c886d] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all text-center"
            >
              Hire Talent / Corporate Enquiry
            </button>
            <button
              onClick={() => onNavigate('jobs')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-lg border border-white/20 transition-all text-center"
            >
              Explore Careers
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
