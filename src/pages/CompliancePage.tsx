import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  BadgePercent,
  Coins,
  Scale,
  Building,
  HardHat,
  Lock,
  Download,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

interface CompliancePageProps {
  onNavigate: (page: string) => void;
}

export const CompliancePage: React.FC<CompliancePageProps> = ({ onNavigate }) => {
  const complianceAreas = [
    {
      title: 'EPF Compliance',
      act: 'Employees’ Provident Funds and Miscellaneous Provisions Act, 1952',
      desc: 'Seamless employee enrolment, UAN mapping, accurate monthly employer/employee contributions (12%), and on-time electronic challan return (ECR) filings without exception.',
      points: [
        'Electronic monthly ECR filing with traceable challan receipts',
        'Universal Account Number (UAN) verification and seamless transfer',
        'Transparent member passbook access for all contractual staff',
        'Zero-liability documentation provided to client finance teams',
      ],
      icon: Coins,
    },
    {
      title: 'ESIC Compliance',
      act: 'Employees’ State Insurance Act, 1948',
      desc: 'Timely registration of eligible employees, distribution of digital Pehchan identity cards, and monthly medical insurance contributions ensuring complete healthcare coverage.',
      points: [
        'Registration of eligible staff earning ≤ ₹21,000 / month',
        'Immediate medical cover and maternity benefit facilitation',
        'Monthly return filing and payment challan generation',
        'Assistance during medical claims and dispensary services',
      ],
      icon: ShieldCheck,
    },
    {
      title: 'Applicable Minimum Wages',
      act: 'Code on Wages / State Minimum Wages Notifications',
      desc: 'Strict alignment with state-specific minimum wage notifications across Unskilled, Semi-Skilled, Skilled, and Highly-Skilled categories, including Variable DA updates.',
      points: [
        'Continuous monitoring of bi-annual State VDA revisions',
        'Zero non-compliance risk against state labor enforcement',
        'Transparent salary breakups: Basic, DA, HRA, and allowances',
        'Direct bank transfers (NEFT/RTGS) with digital salary slips',
      ],
      icon: Scale,
    },
    {
      title: 'Contract Labour Regulations',
      act: 'Contract Labour (Regulation and Abolition) Act, 1970',
      desc: 'Operations strictly structured around applicable contract labour regulations, maintaining statutory registers, principal employer Form V coordination, and labor licensing.',
      points: [
        'Assistance with Form V issuance and Contractor License renewals',
        'Maintenance of Form XII, Form XIII, and Form XIV registers',
        'Adherence to working hour caps, rest intervals, and overtime norms',
        'Transparent half-yearly and annual statutory returns',
      ],
      icon: Building,
    },
    {
      title: 'Professional Tax (PT)',
      act: 'State-Specific Tax on Professions, Trades, Callings and Employments',
      desc: 'Accurate deduction and timely remittance of state professional tax wherever applicable, adhering to respective state slabs and payment deadlines across India.',
      points: [
        'State-specific slab compliance across Maharashtra, Karnataka, Telangana, etc.',
        'Timely treasury deposits with monthly/annual returns',
        'Seamless multi-state workforce payroll administration',
      ],
      icon: BadgePercent,
    },
    {
      title: 'TDS & Applicable Taxes',
      act: 'Income Tax Act, 1961',
      desc: 'Precise Tax Deducted at Source (TDS) calculations on executive and senior contractual salaries, quarterly Form 24Q filings, and timely Form 16 Part A/B issuance.',
      points: [
        'Verification of investment declarations & tax regime selection',
        'Quarterly 24Q filing and NSDL validation',
        'Automated digital Form 16 generation for all payroll personnel',
        'GST compliance on corporate staffing invoicing with input tax credit',
      ],
      icon: FileText,
    },
    {
      title: 'Employee Documentation',
      act: 'Statutory Record Keeping & DPDP Act 2023',
      desc: 'Verified, organized, and confidential personnel records with strict document integrity (Aadhaar, PAN, educational degrees, and employment release letters).',
      points: [
        '100% digital personnel dossiers with role-based access control',
        'Background verification (criminal, address, previous employer)',
        'Prompt final settlement, PF transfer guidance, and service certificates',
      ],
      icon: FileCheck,
    },
    {
      title: 'Workplace Health & Safety',
      act: 'Factories Act, 1948 & National EHS Guidelines',
      desc: 'Active safety awareness, hazard reviews, PPE enforcement, and preventive health checks for deployed technical and industrial personnel.',
      points: [
        'Pre-deployment workplace safety induction',
        'Safety committee compliance and hazard identification (HIRA)',
        'Workmen compensation policy and group personal accident coverage',
      ],
      icon: HardHat,
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-[#1B1A4E] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs uppercase tracking-[0.25em] text-[#0E9F80] font-bold">
            Statutory Assurance & Risk Mitigation
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Compliance Built Into Delivery
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Our unwavering commitment to applicable Indian employment and statutory requirements. We insulate your enterprise from regulatory liabilities while safeguarding workforce dignity.
          </p>

          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-400/40 rounded-lg text-xs font-semibold text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-[#0E9F80]" />
              <span>Full compliance with India&apos;s Digital Personal Data Protection (DPDP) Act 2023</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Statutory Note Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 border-l-4 border-[#3B2FBF] p-6 rounded-r-xl shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-[#1B1A4E]">
            <AlertCircle className="w-5 h-5 text-[#3B2FBF]" />
            <span>Important Compliance Governance Note</span>
          </div>
          <p className="text-xs sm:text-sm text-[#1B1A4E] italic font-medium leading-relaxed">
            &ldquo;Compliance support is delivered as applicable to the scope, location and nature of each engagement.&rdquo;
          </p>
          <p className="text-xs text-[#55587A]">
            UNIVA HIRE TECH reviews statutory parameters prior to onboarding to ensure all state-specific notifications and client workplace policies are meticulously observed.
          </p>
        </div>
      </section>

      {/* 8 Compliance Blocks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {complianceAreas.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#DCDDEE] p-8 shadow-sm hover:shadow-md hover:border-[#3B2FBF] transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#3B2FBF]/10 text-[#3B2FBF] flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1B1A4E]">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-[#0E9F80] font-semibold mt-0.5">
                        {item.act}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#55587A] leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="pt-2 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B1A4E] mb-2">
                      Key Compliance Controls
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[#55587A]">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0E9F80] shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#3B2FBF] font-semibold">
                  <span>Audited Monthly</span>
                  <span>100% On-Time Record</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DPDP Act 2023 Candidate Privacy Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1B1A4E] text-white rounded-2xl p-8 sm:p-10 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <Lock className="w-7 h-7 text-[#0E9F80]" />
            <div>
              <h3 className="text-xl font-bold">
                India DPDP Act 2023 & Candidate Privacy Governance
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Protecting candidate resumes, identity documents, and personal recruitment data.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-200">
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-2">
              <h4 className="font-bold text-white text-sm">Explicit Consent</h4>
              <p className="text-slate-300 leading-relaxed">
                Every applicant explicitly consents to resume storage and processing for recruitment purposes prior to submission.
              </p>
            </div>
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-2">
              <h4 className="font-bold text-white text-sm">Secure Resume Vault</h4>
              <p className="text-slate-300 leading-relaxed">
                Candidate PDFs are protected in restricted server storage with short-lived authenticated access tokens. Resumes are never publicly indexed.
              </p>
            </div>
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-2">
              <h4 className="font-bold text-white text-sm">Right to Erasure</h4>
              <p className="text-slate-300 leading-relaxed">
                Candidates maintain full rights to review or request deletion of their stored resume and application records upon notice.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-700 text-xs text-slate-400">
            <span>Need an HR compliance audit for your existing third-party staff?</span>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 bg-[#0E9F80] hover:bg-[#0c886d] text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
            >
              Request Compliance Audit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
