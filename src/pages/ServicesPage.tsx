import React, { useState } from 'react';
import { PageHeroCarousel } from '../components/PageHeroCarousel';
import {
  Users,
  Briefcase,
  Calendar,
  FileCheck2,
  GraduationCap,
  AlertTriangle,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Building,
  HelpCircle,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
  onSelectServiceForEnquiry?: (serviceName: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onSelectServiceForEnquiry,
}) => {
  const [selectedService, setSelectedService] = useState<string>('contract-staffing');

  const servicesList = [
    {
      id: 'contract-staffing',
      title: 'Contract Staffing',
      subtitle: 'Flexible manpower, managed end to end.',
      quote:
        'We provide Executive-to-Senior-level contract staffing solutions, so you can focus on business performance while we take care of your workforce.',
      tag: 'Scale your workforce up or down without adding permanent headcount.',
      icon: Users,
      image: '/src/assets/images/service_contract_staffing_1793911533906.jpg',
      points: [
        {
          heading: 'Manpower Requirement & Talent Planning',
          detail: 'Understanding client requirements and identifying the right talent for specific roles and business needs.',
        },
        {
          heading: 'Talent Sourcing & Recruitment',
          detail: 'Identifying, screening, and selecting qualified professionals from executive to senior-management levels.',
        },
        {
          heading: 'Contractual Workforce Deployment',
          detail: 'Deploying selected professionals on UNIVA’s payroll for the agreed contract period and assignment.',
        },
        {
          heading: 'Payroll & Employee Administration',
          detail: 'Managing salary processing, attendance, employee documentation, and applicable statutory compliances.',
        },
        {
          heading: 'Workforce Management & Client Support',
          detail: 'Providing continuous employee support, performance coordination, replacement assistance, and smooth workforce operations.',
        },
      ],
      complianceTags: ['EPF & ESIC on UNIVA', 'Gratuity Provisions', 'Contract Labour Act', 'Professional Tax Remittance'],
    },
    {
      id: 'recruitment-services',
      title: 'Recruitment Services',
      subtitle: 'Quality hiring, delivered on time.',
      quote: 'Shortlists that are screened, relevant, and ready for interview.',
      tag: 'End-to-end recruitment with zero candidate misrepresentation.',
      icon: Briefcase,
      image: '/src/assets/images/service_executive_search_1793911534916.jpg',
      points: [
        {
          heading: 'Permanent Recruitment',
          detail: 'End-to-end hiring for fresher, lateral and mid-level roles across technical and commercial disciplines.',
        },
        {
          heading: 'Executive Search',
          detail: 'Confidential, board-level and VP/CXO search for senior leadership and highly niche specialized positions.',
        },
        {
          heading: 'Requirement Fulfilment',
          detail: 'Structured sourcing against defined role specifications, budgetary allocations, and tight project timelines.',
        },
        {
          heading: 'Candidate Screening & Selection',
          detail: 'Rigorous profile verification, competency matrices, and technical assessment before any shortlist reaches you.',
        },
        {
          heading: 'Recruitment Process Outsourcing (RPO)',
          detail: 'A fully managed recruitment process embedded within your organization for high-volume or rapid-scaling phases.',
        },
      ],
      complianceTags: ['Reference Checks', 'Credential Audits', 'Notice Period Negotiation', 'DPDP Data Consent'],
    },
    {
      id: 'corporate-events',
      title: 'Corporate Event Management',
      subtitle: 'Events that engage teams and represent your brand.',
      quote: 'One accountable partner from concept to closing.',
      tag: 'Planning, coordination and on-ground execution for corporate occasions of every scale.',
      icon: Calendar,
      image: '/src/assets/images/hero_executive_corporate_1793911532663.jpg',
      points: [
        {
          heading: 'Corporate Event Planning',
          detail: 'Concept development, budgeting, venue scouting, vendor coordination, and seamless on-site execution.',
        },
        {
          heading: 'Conferences & Seminars',
          detail: 'Venue selection, AV production, delegate hospitality, VIP coordination, and speaker management.',
        },
        {
          heading: 'Employee Engagement Activities',
          detail: 'Customized cultural and quarterly engagement programs that build camaraderie, team morale, and culture.',
        },
        {
          heading: 'Annual Day Celebrations',
          detail: 'Recognition-led celebrations, award distribution, entertainment programming, and professional stage production.',
        },
        {
          heading: 'Team-Building Activities',
          detail: 'Structured indoor and outdoor team challenges designed to strengthen cross-functional collaboration.',
        },
      ],
      complianceTags: ['Event Safety Norms', 'Vendor GST Verification', 'Crowd Management', 'Emergency Protocols'],
    },
    {
      id: 'audit-services',
      title: 'Audit Services',
      subtitle: 'Clear visibility into compliance, process and risk.',
      quote: 'Know where you stand, and what to fix first.',
      tag: 'Actionable audit reports that preempt statutory liabilities and streamline HR operations.',
      icon: FileCheck2,
      image: '/src/assets/images/workplace_audit_safety_1793911535061.jpg',
      points: [
        {
          heading: 'Workplace Safety Compliance Audits',
          detail: 'Review of physical site practices, hazard records, and PPE usage against applicable factory and office safety norms.',
        },
        {
          heading: 'HR Process & Documentation Audits',
          detail: 'Thorough checks on personnel files, appointment letters, wage registers, statutory deduction slips, and compliance records.',
        },
        {
          heading: 'ISO Audit Support',
          detail: 'Documentation, SOP verification, and internal audit readiness support for ISO 9001, 14001, and 45001 certifications.',
        },
        {
          heading: 'Operational Risk Assessment',
          detail: 'Systematic identification and prioritization of operational vulnerabilities across contracted workforce lines.',
        },
        {
          heading: 'Compliance Gap Assessment',
          detail: 'Objective gap analysis with practical, prioritized recommendations and rectification roadmaps.',
        },
      ],
      complianceTags: ['Factories Act 1948', 'Contract Labour R&A Act', 'Shops & Establishment', 'ISO 45001 EHS'],
    },
    {
      id: 'training-development',
      title: 'Training & Skill Development',
      subtitle: 'Building capability that lasts beyond the session.',
      quote: 'Better-prepared teams and stronger on-the-job performance.',
      tag: 'Practical programs that prepare people for the role and grow them within it.',
      icon: GraduationCap,
      image: '/src/assets/images/service_contract_staffing_1793911533906.jpg',
      points: [
        {
          heading: 'Technical Skills Development',
          detail: 'Role-specific operational and technical training for plant supervisors, technicians, and engineering teams.',
        },
        {
          heading: 'Communication & Soft Skills',
          detail: 'Executive business communication, workplace etiquette, professional collaboration, and client-facing skills.',
        },
        {
          heading: 'Employee Development Programs',
          detail: 'Structured learning journeys that foster internal mobility, managerial skills, and employee retention.',
        },
        {
          heading: 'Professional Training',
          detail: 'Customized corporate modules covering project management, quality tools (5S, Kaizen), and leadership essentials.',
        },
        {
          heading: 'Workplace Safety Awareness',
          detail: 'Foundational safety awareness, ergonomics, fire drills, and incident reporting for every deployed employee.',
        },
      ],
      complianceTags: ['Pre-Deployment Training', 'Refresher Modules', 'Competency Certification', 'Skill Gap Metrics'],
    },
    {
      id: 'workplace-safety',
      title: 'Workplace Safety Training & Support',
      subtitle: 'Safer workplaces through awareness and practice.',
      quote: 'Reduce workplace risk and build a stronger safety culture.',
      tag: 'Protecting lives, preserving corporate reputation, and complying with Indian EHS standards.',
      icon: AlertTriangle,
      image: '/src/assets/images/workplace_audit_safety_1793911535061.jpg',
      points: [
        {
          heading: 'Safety Awareness Programs',
          detail: 'Targeted campaigns and floor sessions that keep personal safety front of mind among contract and permanent workers.',
        },
        {
          heading: 'Hazard Identification & Risk Assessment (HIRA)',
          detail: 'Systematic on-site review of equipment, hazardous workflows, chemical handling, and control measures.',
        },
        {
          heading: 'Workplace Safety Training',
          detail: 'Certified instructor-led training for front-line workers, site engineers, and floor safety stewards.',
        },
        {
          heading: 'Safety Compliance Support',
          detail: 'Expert guidance on documentation, safety committee minutes, and statutory safety norms under Indian law.',
        },
        {
          heading: 'Site Safety Inspections',
          detail: 'Periodic walk-through inspections with transparent observation logs, severity ratings, and actionable corrective plans.',
        },
      ],
      complianceTags: ['EHS Policy Formulation', 'Fire & Electrical Safety', 'PPE Compliance', 'Incident Logs'],
    },
    {
      id: 'onboarding-hr-support',
      title: 'Onboarding & HR Support',
      subtitle: 'From the first day to the last, handled with care.',
      quote: 'Less HR paperwork. More time for people and performance.',
      tag: 'Administrative and people-support services that keep HR operations smooth, organized, and compliant.',
      icon: UserCheck,
      image: '/src/assets/images/service_executive_search_1793911534916.jpg',
      points: [
        {
          heading: 'Employee Joining Formalities',
          detail: 'Smooth offer-to-joining coordination, digital documentation, identity verification, and company induction support.',
        },
        {
          heading: 'Documentation Management',
          detail: 'Rigorous collection, statutory verification (Aadhaar/PAN/UAN), and secure archiving of employee credentials.',
        },
        {
          heading: 'HR Records Management',
          detail: 'Organized, accurate, and confidential electronic personnel files maintained under strict data protection protocols.',
        },
        {
          heading: 'Attendance & Leave Administration',
          detail: 'Biometric/app-based attendance tracking, leave balances, and shift records reconciled accurately with payroll.',
        },
        {
          heading: 'Employee Engagement & Grievance Support',
          detail: 'A dedicated, empathetic helpline and resolution desk for employee concerns, statutory inquiries, and workplace help.',
        },
      ],
      complianceTags: ['UAN Generation', 'Form 11 & Form 2', 'ESIC Pehchan Cards', 'Grievance SLA'],
    },
  ];

  const current = servicesList.find((s) => s.id === selectedService) || servicesList[0];

  const handleHireClick = (serviceTitle: string) => {
    if (onSelectServiceForEnquiry) {
      onSelectServiceForEnquiry(serviceTitle);
    }
    onNavigate('contact');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Services Header */}
      <PageHeroCarousel page="services" className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs uppercase tracking-[0.25em] text-[#B8E9DF] font-bold">
            Comprehensive Manpower & Business Support
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Our Service Portfolio
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Seven integrated workforce and corporate support services. Deploy individual solutions for targeted requirements, or combine them under one roof for complete organizational peace of mind.
          </p>
        </div>
      </PageHeroCarousel>

      {/* Interactive Service Switcher & Details Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal Service Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-[#DCDDEE]">
          {servicesList.map((srv) => {
            const isSelected = srv.id === current.id;
            const Icon = srv.icon;
            return (
              <button
                key={srv.id}
                onClick={() => setSelectedService(srv.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#3B2FBF] text-white shadow'
                    : 'bg-white text-[#1B1A4E] hover:bg-slate-100 border border-[#DCDDEE]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#0E9F80]' : 'text-[#3B2FBF]'}`} />
                <span>
                  {srv.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Service Detailed Canvas */}
        <div className="mt-8 bg-white rounded-2xl border border-[#DCDDEE] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Summary & Visual */}
          <div className="lg:col-span-5 bg-[#1B1A4E] text-white p-8 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0E9F80]">
                </span>
                <span className="text-[11px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                  UNIVA Standard
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                {current.title}
              </h2>

              <p className="text-sm text-slate-300 font-medium">
                {current.subtitle}
              </p>

              <div className="p-4 bg-slate-800/80 border-l-2 border-[#0E9F80] rounded-r-lg">
                <p className="text-xs text-slate-200 italic leading-relaxed">
                  &ldquo;{current.quote}&rdquo;
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {current.tag}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-700">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Statutory & Compliance Assurance:
              </div>
              <div className="flex flex-wrap gap-2">
                {current.complianceTags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium bg-slate-800 text-teal-300 px-2.5 py-1 rounded border border-slate-700"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleHireClick(current.title)}
                className="w-full mt-4 py-3 bg-[#0E9F80] hover:bg-[#0c886d] text-white text-xs font-bold rounded-lg shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enquire About {current.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Deliverables & Detailed Breakdown */}
          <div className="lg:col-span-7 p-8 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-[#DCDDEE] pb-4">
                <h3 className="text-lg font-bold text-[#1B1A4E]">
                  Scope of Delivery & Core Capabilities
                </h3>
                <p className="text-xs text-[#55587A] mt-1">
                  How UNIVA HIRE TECH structures and executes this service for corporate clients.
                </p>
              </div>

              <div className="space-y-5">
                {current.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-[#3B2FBF]/10 text-[#3B2FBF] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1B1A4E]">
                        {pt.heading}
                      </h4>
                      <p className="text-xs text-[#55587A] mt-1 leading-relaxed">
                        {pt.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Footnote Banner */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#55587A]">
              <span>
                Want to combine {current.title} with our Payroll or Safety Audit solutions?
              </span>
              <button
                onClick={() => onNavigate('contact')}
                className="text-xs font-bold text-[#3B2FBF] hover:underline whitespace-nowrap"
              >
                Request Custom Proposal &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of all 7 services for reference */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h3 className="text-xl font-bold text-[#1B1A4E]">
          Complete Services Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((srv) => {
            const Icon = srv.icon;
            const isCurrent = srv.id === current.id;
            return (
              <div
                key={srv.id}
                onClick={() => {
                  setSelectedService(srv.id);
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
                className={`p-6 rounded-xl border transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-[#3B2FBF] bg-[#3B2FBF]/5 shadow-sm'
                    : 'border-[#DCDDEE] bg-white hover:border-[#3B2FBF]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className="w-5 h-5 text-[#3B2FBF]" />
                </div>
                <h4 className="text-base font-bold text-[#1B1A4E] mb-1">
                  {srv.title}
                </h4>
                <p className="text-xs text-[#55587A] line-clamp-2">
                  {srv.subtitle}
                </p>
                <div className="pt-4 mt-2 flex items-center justify-between text-xs font-semibold text-[#3B2FBF]">
                  <span>{isCurrent ? 'Viewing Above' : 'Select Service'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
