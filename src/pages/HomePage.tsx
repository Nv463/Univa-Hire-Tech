import React from 'react';
import { PageHeroCarousel } from '../components/PageHeroCarousel';
import staffingImage from '../assets/images/service_contract_staffing_1793911533906.jpg';
import executiveSearchImage from '../assets/images/service_executive_search_1793911534916.jpg';
import workplaceAuditImage from '../assets/images/workplace_audit_safety_1793911535061.jpg';

const corporateEventImage = 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85';
const trainingImage = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85';
const safetyTrainingImage = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85';
const onboardingImage = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85';
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
      title: 'Contract Staffing',
      desc: "Executive-to-Senior-level contract staffing on UNIVA's payroll, payroll and statutory administration, scale up or down without permanent headcount.",
      icon: Users,
      badge: 'Core Solution',
      image: staffingImage,
    },
    {
      title: 'Recruitment Services',
      desc: 'Permanent Recruitment, Executive Search, Requirement Fulfilment, Candidate Screening, and Recruitment Process Outsourcing (RPO).',
      icon: Briefcase,
      badge: 'Executive Search',
      image: executiveSearchImage,
    },
    {
      title: 'Corporate Event Management',
      desc: 'Planning, coordination and on-ground execution for conferences, seminars, employee engagement activities, and annual celebrations.',
      icon: Calendar,
      badge: 'Engagement',
      image: corporateEventImage,
    },
    {
      title: 'Audit Services',
      desc: 'Workplace safety compliance audits, HR process & documentation audits, ISO audit support, operational risk assessment, and gap analyses.',
      icon: FileCheck2,
      badge: 'Governance',
      image: workplaceAuditImage,
    },
    {
      title: 'Training & Skill Development',
      desc: 'Technical skills development, communication and soft-skills, employee development journeys, professional corporate programs, and safety awareness.',
      icon: GraduationCap,
      badge: 'Capability',
      image: trainingImage,
    },
    {
      title: 'Workplace Safety Training & Support',
      desc: 'Safety awareness programs, hazard identification & risk assessment (HIRA), instructor-led training, and site safety inspections.',
      icon: AlertTriangle,
      badge: 'Safety First',
      image: safetyTrainingImage,
    },
    {
      title: 'Onboarding & HR Support',
      desc: 'Joining formalities, documentation verification, HR records management, attendance & leave administration, and employee grievance support.',
      icon: UserCheck,
      badge: 'Lifecycle',
      image: onboardingImage,
    },
  ];

  const industries = [
    { name: 'IT & Software', desc: 'Technical, support and IT GCC operations', icon: '💻' },
    { name: 'Manufacturing', desc: 'Plant, production, quality and maintenance', icon: '⚙️' },
    { name: 'Construction & Infra', desc: 'Site, civil, project and skilled trades', icon: '🏗️' },
    { name: 'Banking & Financial (BFSI)', desc: 'Risk, compliance, sales and back office', icon: '🏛️' },
    { name: 'Pharmaceuticals & Healthcare', desc: 'Pharmaceuticals, clinical support, hospital administration and facilities', icon: '🏥' },
    { name: 'Retail & E-commerce', desc: 'Store, fulfillment and customer service operations', icon: '🛍️' },
    { name: 'Logistics & Supply Chain', desc: 'Warehouse, transport and distribution hubs', icon: '🚚' },
    { name: 'FMCG & Consumer Goods', desc: 'Consumer brands, product quality and distribution operations', icon: '🛒' },
    { name: 'Telecom', desc: 'Telecom networks, infrastructure and customer operations', icon: '📡' },
    { name: 'Food & Beverage', desc: 'Food production, quality, packaging and supply chains', icon: '🥗' },
    { name: 'Oil, Gas & Energy', desc: 'Energy production, infrastructure, maintenance and safety', icon: '⚡' },
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
    <div className="space-y-24 sm:space-y-28 pb-24">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-[#07162C] text-white py-16 sm:py-20 lg:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_20%,rgba(14,159,128,0.18),transparent_36%),radial-gradient(ellipse_at_10%_90%,rgba(200,179,122,0.14),transparent_44%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.04fr_0.96fr] gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-3 text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#C8B37A] font-bold"><span className="h-px w-8 bg-[#C8B37A]" />Third-party staffing · Recruitment · Workforce management</div>
            <h1 className="text-4xl sm:text-5xl lg:text-[4.25rem] font-semibold tracking-[-0.045em] text-white leading-[1.04]">
              The right people,
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#B8E9DF] via-[#E8E0C7] to-[#C8B37A]">behind every</span>
              <span className="block">business milestone.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-xl">
              Your strategic manpower partner for executive recruitment, flexible staffing, and compliance-led workforce solutions across India.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button onClick={() => onNavigate('contact')} className="px-6 py-3.5 bg-[#C8B37A] text-[#101A2B] hover:bg-[#DDCCA0] font-bold text-sm rounded-xl shadow-lg shadow-black/20 transition-all flex items-center justify-center gap-2 cursor-pointer"><span>Discuss your hiring needs</span><ArrowRight className="w-4 h-4" /></button>
              <button onClick={() => onNavigate('jobs')} className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/15"><Briefcase className="w-4 h-4 text-[#B8E9DF]" /><span>Explore open roles</span></button>
            </div>
            <div className="pt-6 border-t border-white/15 grid grid-cols-2 gap-x-6 gap-y-5 text-xs text-slate-300">
              <div><span className="block text-xl sm:text-2xl font-semibold text-white tabular-nums">10-step</span><span className="text-slate-400">structured delivery model</span></div>
              <div><span className="block text-xl sm:text-2xl font-semibold text-white tabular-nums">7 services</span><span className="text-slate-400">under one partner</span></div>
              <div><span className="block text-xl sm:text-2xl font-semibold text-white">Pan-India</span><span className="text-slate-400">metropolitan sourcing</span></div>
              <div><span className="block text-xl sm:text-2xl font-semibold text-white">People-first</span><span className="text-slate-400">with compliance built in</span></div>
            </div>
          </div>
          <div className="relative max-w-2xl w-full mx-auto lg:mx-0 lg:ml-auto">
            <div aria-hidden="true" className="absolute -inset-3 sm:-inset-4 rounded-[2rem] border border-[#C8B37A]/30 rotate-2" />
            <PageHeroCarousel page="home" imageOnly className="relative aspect-[4/3] overflow-hidden rounded-[1.7rem] border border-white/15 bg-[#142942] shadow-2xl shadow-black/40">
              <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full border border-white/20 bg-[#07162C]/45 px-3 py-2 backdrop-blur-md"><span className="h-1.5 w-1.5 rounded-full bg-[#B8E9DF]" /><span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white">Talent. Trust. Transformation.</span></div>
              <div className="absolute bottom-5 right-5 text-right"><span className="block text-[10px] uppercase tracking-[0.2em] text-[#E8E0C7]">Built around</span><span className="text-lg sm:text-xl font-semibold text-white">your next chapter</span></div>
            </PageHeroCarousel>
            <div className="absolute -bottom-7 left-3 sm:left-8 flex items-center gap-3 rounded-2xl border border-[#E8E0C7]/70 bg-[#FCFBF7] px-4 py-3 shadow-xl shadow-black/20">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0E9F80]/10 text-[#0E7664]"><ShieldCheck className="h-5 w-5" /></div>
              <div><span className="block text-xs font-bold text-[#101A2B]">Compliance, considered.</span><span className="block text-[10px] text-slate-500">Clear processes from day one</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Strip of 4 Key Points */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="bg-[#FCFBF7] rounded-2xl shadow-xl shadow-[#101A2B]/10 border border-[#E8E0C7] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <button type="button" key={srv.title} onClick={() => onNavigate('services')} className="group flex h-full min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-[#E4E4E8] bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C8B37A]/70 hover:shadow-xl hover:shadow-[#101A2B]/10">
                {srv.image ? (
                  <div className="relative h-48 w-full overflow-hidden bg-[#142942]">
                    <img src={srv.image} alt={srv.title + ' at UNIVA HIRE TECH'} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07162C]/75 via-[#07162C]/5 to-transparent" />
                    <span className="absolute bottom-4 left-5 rounded-full border border-white/20 bg-[#07162C]/45 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">{srv.badge}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between px-6 pt-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0E9F80]/10 text-[#0E7664] transition-colors group-hover:bg-[#07162C] group-hover:text-[#B8E9DF]"><Icon className="h-5 w-5" /></div>
                    <span className="rounded-full bg-[#F3F0E7] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#78663A]">{srv.badge}</span>
                  </div>
                )}
                <div className="flex flex-1 flex-col px-6 py-5">
                  <h3 className="text-base font-bold leading-snug text-[#101A2B] transition-colors group-hover:text-[#0E7664]">{srv.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#626B7A]">{srv.desc}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-[#EEF0F2] pt-4 mt-5 text-xs font-semibold text-[#253B55]"><span>Learn details & deliverables</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
                </div>
              </button>
            );
          })}

                    {/* Unified Value Box */}
          <div className="bg-gradient-to-br from-[#0B1A2F] to-[#172B45] text-white rounded-2xl p-6 flex flex-col justify-between border border-white/10">
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
                className="w-full py-2.5 px-4 bg-[#C8B37A] hover:bg-[#DDCCA0] text-[#101A2B] text-xs font-bold rounded-xl transition-colors text-center"
              >
                Talk to a Manpower Consultant
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors We Serve */}
      <section className="bg-[#F6F4EE] py-20 border-y border-[#E8E0C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3B2FBF]">
              Industry Specialization
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1B1A4E] tracking-tight">
              Sectors We Serve
            </h2>
            <p className="text-sm text-[#55587A]">
              Our workforce and recruitment solutions are tailored to the distinct roles, skills and operational needs of each industry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {industries.map((ind, i) => (
              <div
                key={i}
                onClick={() => onNavigate('industries')}
                className="bg-[#FCFBF7] p-5 rounded-2xl border border-[#E8E0C7] hover:border-[#C8B37A] hover:shadow-lg hover:shadow-[#101A2B]/5 transition-all cursor-pointer group"
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

      {/* Editorial workforce feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[1.75rem] bg-[#0B1A2F] text-white shadow-2xl shadow-[#101A2B]/15 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <span className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#C8B37A]"><span className="h-px w-8 bg-[#C8B37A]" /> The UNIVA difference</span>
            <h2 className="mt-5 text-2xl font-semibold leading-tight tracking-tight sm:text-4xl">People are the strategy.<span className="mt-1 block text-[#B8E9DF]">The details make it work.</span></h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300">Great hiring is thoughtful at every stage. We bring sourcing, screening, onboarding, and workforce compliance together in one accountable partnership.</p>
            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-white/15 pt-5">
              <div><span className="block text-lg font-semibold text-white">01</span><span className="mt-1 block text-[10px] leading-snug text-slate-400">Listen closely</span></div>
              <div><span className="block text-lg font-semibold text-white">02</span><span className="mt-1 block text-[10px] leading-snug text-slate-400">Source precisely</span></div>
              <div><span className="block text-lg font-semibold text-white">03</span><span className="mt-1 block text-[10px] leading-snug text-slate-400">Support all the way</span></div>
            </div>
            <button onClick={() => onNavigate('how-we-work')} className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#E8E0C7] transition-colors hover:text-white">See how we work <ArrowUpRight className="h-4 w-4" /></button>
          </div>
          <div className="relative min-h-[17rem] sm:min-h-[22rem] lg:min-h-[30rem]">
            <img src={workplaceAuditImage} alt="A safety and compliance review in a modern workplace" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1A2F]/50 via-[#0B1A2F]/5 to-transparent lg:from-[#0B1A2F]/35" />
            <div className="absolute bottom-5 left-5 rounded-xl border border-white/20 bg-[#07162C]/55 px-4 py-3 backdrop-blur-md sm:bottom-7 sm:left-7"><span className="block text-[10px] uppercase tracking-[0.18em] text-[#E8E0C7]">One connected approach</span><span className="mt-1 block text-xs font-semibold text-white">Talent · operations · compliance</span></div>
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
              className="bg-white p-5 rounded-2xl border border-[#E4E4E8] hover:border-[#C8B37A]/70 hover:shadow-lg transition-all relative flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-full bg-[#C8B37A] text-[#101A2B] flex items-center justify-center text-xs font-extrabold mb-3">
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
      <section className="bg-[#0B1A2F] text-white py-20">
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
                className="bg-white/[0.045] p-6 rounded-2xl border border-white/10 hover:border-[#C8B37A]/60 hover:bg-white/[0.07] transition-all"
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
              className="bg-[#FCFBF7] rounded-2xl border border-[#E8E0C7] p-6 hover:shadow-xl hover:shadow-[#101A2B]/8 hover:border-[#C8B37A] transition-all flex flex-col justify-between group"
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

        <div className="bg-[#F1EEE5] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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
        <div className="bg-gradient-to-br from-[#0B1A2F] via-[#142942] to-[#1B1A4E] text-white rounded-[1.75rem] p-8 sm:p-12 shadow-2xl border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
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
              className="px-6 py-3.5 bg-[#C8B37A] hover:bg-[#DDCCA0] text-[#101A2B] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all text-center"
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
