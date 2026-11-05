import React from 'react';
import {
  Code2,
  Factory,
  HardHat,
  Landmark,
  HeartPulse,
  ShoppingBag,
  Truck,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface IndustriesPageProps {
  onNavigate: (page: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigate }) => {
  const industries = [
    {
      id: 'it-software',
      name: 'IT & Software',
      tagline: 'Technical, support and IT operations',
      icon: Code2,
      roles: [
        'Cloud Architects & DevOps Leads',
        'Senior Full-Stack & Backend Engineers',
        'QA Automation & SRE Leads',
        'Technical Product & Project Managers',
        'GCC Operational Leaders',
      ],
      complianceFocus:
        'IP protection clauses, non-disclosure agreements (NDAs), DPDP Act 2023 compliance, remote workforce tracking.',
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      tagline: 'Plant, production, quality and maintenance',
      icon: Factory,
      roles: [
        'VP / General Managers – Plant Operations',
        'Lean Manufacturing & Six Sigma Experts',
        'Quality Assurance (QA/QC) Managers',
        'Maintenance & Reliability Engineers',
        'EHS & Industrial Safety Officers',
      ],
      complianceFocus:
        'Factories Act 1948, OHSAS/ISO 45001 safety compliance, Contract Labour (R&A) Act, biometric attendance registers.',
    },
    {
      id: 'construction-infra',
      name: 'Construction & Infrastructure',
      tagline: 'Site, project and skilled trades',
      icon: HardHat,
      roles: [
        'Senior Project Managers (Metro / Highways / Ports)',
        'Civil & Structural Engineers',
        'Planning & Billing Engineers (Primavera/MS Project)',
        'MEP Coordinators & Surveyors',
        'Site Safety Stewards & Supervisors',
      ],
      complianceFocus:
        'BOCW Act (Building and Other Construction Workers), Workmen Compensation Insurance, hazardous duty safety training.',
    },
    {
      id: 'bfsi',
      name: 'Banking & Financial Services (BFSI)',
      tagline: 'Sales, operations and back office',
      icon: Landmark,
      roles: [
        'Financial Controllers & Taxation Heads',
        'Risk & Regulatory Compliance Managers',
        'Credit Underwriting & Audit Leads',
        'Branch Operations Managers',
        'Wealth & Commercial Banking Executives',
      ],
      complianceFocus:
        'RBI background verification guidelines, SEBI regulatory mandates, data integrity, strict criminal background checks.',
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Life Sciences',
      tagline: 'Clinical support, admin and facilities',
      icon: HeartPulse,
      roles: [
        'Hospital Administrators & Medical Superintendents',
        'NABH/JCI Quality Assurance Leads',
        'Clinical Operations & Nursing Supervisors',
        'Biomedical Waste & Facility Managers',
        'Pharmaceutical QA & Regulatory Associates',
      ],
      complianceFocus:
        'NABH standard documentation, Clinical Establishments Act, professional indemnity, biological safety training.',
    },
    {
      id: 'retail',
      name: 'Retail & E-commerce',
      tagline: 'Store, fulfilment and customer service',
      icon: ShoppingBag,
      roles: [
        'Regional Store Operations Managers',
        'Visual Merchandising Leaders',
        'E-Commerce Category Managers',
        'Customer Support Shift Leaders',
        'Store Inventory & Loss Prevention Leads',
      ],
      complianceFocus:
        'Shops and Commercial Establishments Act, shift allowance norms, overtime regulations, minimum wage compliance.',
    },
    {
      id: 'logistics',
      name: 'Logistics & Supply Chain',
      tagline: 'Warehouse, transport and distribution',
      icon: Truck,
      roles: [
        'Fulfillment Center Operations Managers',
        '3PL/4PL Vendor Management Heads',
        'Supply Chain & S&OP Planners',
        'Fleet Operations & Dispatch Leads',
        'Warehouse Inventory Controllers',
      ],
      complianceFocus:
        'Warehouse safety norms, Motor Vehicles Act norms for logistics, overtime tracking, ESIC coverage for material handlers.',
    },
    {
      id: 'corporate-services',
      name: 'Corporate & Professional Services',
      tagline: 'Corporate, admin and support teams',
      icon: Building2,
      roles: [
        'Heads of Human Resources & Talent Acquisition',
        'Chief Financial Officers & Controllers',
        'Legal Counsel & Corporate Secretarial Leads',
        'Corporate Facilities & Real Estate Managers',
        'Executive Assistants & Office Administrators',
      ],
      complianceFocus:
        'POSH Act (Internal Complaints Committee), Professional Tax, TDS compliance, gratuity trust governance.',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-[#1B1A4E] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs uppercase tracking-[0.25em] text-[#0E9F80] font-bold">
            Industry Specialization
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Sectors We Serve
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Our workforce solutions are specifically customized to support a wide range of industries, balancing technical role requirements with regional statutory compliance.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.id}
                className="bg-white rounded-2xl border border-[#DCDDEE] p-8 shadow-sm hover:shadow-md hover:border-[#3B2FBF] transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#3B2FBF]/10 text-[#3B2FBF] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1B1A4E]">
                        {ind.name}
                      </h3>
                      <p className="text-xs text-[#0E9F80] font-semibold">
                        {ind.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Typical Roles Hired */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#55587A] mb-2.5">
                      Key Positions & Mandates
                    </h4>
                    <ul className="space-y-2 text-xs text-[#1B1A4E]">
                      {ind.roles.map((r, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0E9F80] shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Compliance Focus */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex items-start gap-2 text-xs text-[#55587A]">
                      <ShieldCheck className="w-4 h-4 text-[#3B2FBF] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1B1A4E]">Statutory Nuances: </strong>
                        <span>{ind.complianceFocus}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('contact')}
                    className="text-xs font-bold text-[#3B2FBF] hover:text-[#1B1A4E] flex items-center gap-1.5"
                  >
                    <span>Request {ind.name} Manpower</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onNavigate('jobs')}
                    className="text-xs font-semibold text-[#55587A] hover:underline"
                  >
                    View Open Roles
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicative Disclaimer Note */}
        <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-center text-[#55587A]">
          <span className="font-semibold text-[#1B1A4E]">Note: </span>
          Indicative service coverage. Scope is tailored to each client&apos;s requirement.
        </div>
      </section>
    </div>
  );
};
