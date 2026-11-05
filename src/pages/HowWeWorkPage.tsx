import React from 'react';
import {
  Search,
  FileSpreadsheet,
  Network,
  UserCheck2,
  CalendarCheck,
  ShieldAlert,
  FileCheck,
  Building,
  Activity,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';

interface HowWeWorkPageProps {
  onNavigate: (page: string) => void;
}

export const HowWeWorkPage: React.FC<HowWeWorkPageProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Understand Requirements',
      short: 'Role, volume, budget and timeline clarity',
      desc: 'We conduct in-depth scoping sessions with your HR leadership and technical managers to define job competencies, team culture, expected CTC benchmarks, and target deployment deadlines.',
      icon: Search,
      phase: 'Planning Phase',
      output: 'Signed Requirement Brief & SLA Matrix',
    },
    {
      num: '02',
      title: 'Requirement Planning',
      short: 'Sourcing plan, timelines and ownership',
      desc: 'A dedicated Lead Account Partner is assigned. We establish sourcing milestones, interview committee calendars, candidate pipeline targets, and statutory classification (contractual vs permanent).',
      icon: FileSpreadsheet,
      phase: 'Planning Phase',
      output: 'Talent Sourcing Blueprint & Timeline',
    },
    {
      num: '03',
      title: 'Candidate Sourcing',
      short: 'Databases, job portals, referrals and networks',
      desc: 'Leveraging our proprietary database of 150,000+ Indian professionals, active executive headhunting, industry referrals, and targeted outreach across commercial hubs.',
      icon: Network,
      phase: 'Sourcing Phase',
      output: 'Talent Longlist & Market Intel',
    },
    {
      num: '04',
      title: 'Screening & Shortlisting',
      short: 'Profile checks and relevance assessment',
      desc: 'Every candidate undergoes preliminary competency interviews, notice period verification, current compensation benchmarking, and cultural compatibility screening by UNIVA recruiters.',
      icon: UserCheck2,
      phase: 'Sourcing Phase',
      output: 'Vetted Candidate Dossiers & Shortlist',
    },
    {
      num: '05',
      title: 'Client Interview & Selection',
      short: 'Interviews coordinated with your team',
      desc: 'We manage all interview schedules, brief candidates beforehand, facilitate technical and behavioral rounds, and collect objective feedback to drive swift consensus.',
      icon: CalendarCheck,
      phase: 'Selection Phase',
      output: 'Final Candidate Selection & Offer Decision',
    },
    {
      num: '06',
      title: 'Documentation & Verification',
      short: 'Document collection and background checks',
      desc: 'Collection of educational credentials, past employment service certificates, Form 16s, Aadhaar/PAN, and thorough address and criminal background verification.',
      icon: ShieldAlert,
      phase: 'Compliance Phase',
      output: 'Clear BGV Dossier & Statutory Records',
    },
    {
      num: '07',
      title: 'Employee Onboarding',
      short: 'Offer, joining formalities and induction',
      desc: 'Issuance of offer and appointment letters on UNIVA HIRE TECH letterhead (for contract staffing), generation of UAN/ESIC numbers, and digital orientation.',
      icon: FileCheck,
      phase: 'Onboarding Phase',
      output: 'Executed Contract & Statutory Enrollment',
    },
    {
      num: '08',
      title: 'Workforce Deployment',
      short: 'Placement at site with clear reporting lines',
      desc: 'Physical or virtual deployment at your work location. Alignment of client reporting lines, access badges, tool allocation, and day-one orientation.',
      icon: Building,
      phase: 'Deployment Phase',
      output: 'Successful Day-1 Integration & Attendance',
    },
    {
      num: '09',
      title: 'Performance Monitoring',
      short: 'Regular reviews and feedback loops',
      desc: 'Structured monthly and quarterly reviews with your team leaders. We track attendance, productivity, SLA metrics, and address performance interventions promptly.',
      icon: Activity,
      phase: 'Governance Phase',
      output: 'Monthly Performance & Governance Reports',
    },
    {
      num: '10',
      title: 'Continuous Client Support',
      short: 'A dedicated coordinator, always reachable',
      desc: 'Ongoing payroll processing, leave administration, statutory filings, employee welfare management, and swift replacement assistance whenever required.',
      icon: Headphones,
      phase: 'Governance Phase',
      output: 'Zero-Grievance SLA & Continuous Partnership',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-[#1B1A4E] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs uppercase tracking-[0.25em] text-[#0E9F80] font-bold">
            Methodology & Governance
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Our Business Approach
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            A proven ten-step delivery process, from first requirement conversation to continuous employee support and compliance governance.
          </p>
        </div>
      </section>

      {/* 10-Step Visual Stepper */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-[#DCDDEE] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B1A4E]">
              10-Step Lifecycle Stepper
            </h2>
            <p className="text-xs text-[#55587A]">
              Designed for predictability, speed, and 100% compliance adherence.
            </p>
          </div>
          <div className="text-xs text-[#0E9F80] font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Average executive placement SLA: 14–21 business days</span>
          </div>
        </div>

        <div className="relative border-l-2 border-[#3B2FBF]/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="relative group">
                {/* Stepper Bullet */}
                <div className="absolute -left-[37px] sm:-left-[53px] top-0 w-8 h-8 rounded-full bg-[#3B2FBF] text-white flex items-center justify-center text-xs font-extrabold border-4 border-white shadow-sm group-hover:scale-110 transition-transform">
                  {s.num}
                </div>

                <div className="bg-white rounded-xl border border-[#DCDDEE] p-6 sm:p-8 hover:shadow-md hover:border-[#3B2FBF] transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#3B2FBF]/10 text-[#3B2FBF] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0E9F80]">
                          {s.phase}
                        </span>
                        <h3 className="text-lg font-bold text-[#1B1A4E]">
                          {s.title}
                        </h3>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-[#55587A] italic">
                      &ldquo;{s.short}&rdquo;
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#55587A] leading-relaxed mb-4">
                    {s.desc}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[#1B1A4E] font-medium">
                      <span className="text-[#3B2FBF] font-bold">Milestone Deliverable:</span>
                      <span className="bg-slate-100 px-2.5 py-0.5 rounded text-[11px] font-semibold text-[#1B1A4E]">
                        {s.output}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-400">
                      Step {index + 1} of 10
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stepper CTA */}
        <div className="bg-[#1B1A4E] text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl font-bold">
              Ready to initiate your requirement planning?
            </h3>
            <p className="text-xs text-slate-300">
              Share your role description and volume requirements with our executive delivery team today.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 bg-[#0E9F80] hover:bg-[#0c886d] text-white font-bold text-xs rounded-lg transition-colors whitespace-nowrap"
          >
            Schedule Scoping Call &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};
