import React from 'react';
import { PageHeroCarousel } from '../components/PageHeroCarousel';
import {
  Code2,
  Factory,
  HardHat,
  Landmark,
  HeartPulse,
  ShoppingBag,
  Radio,
  Utensils,
  Zap,
  Truck,
  Building2,
  CheckCircle2,
  ArrowRight,
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
    },
    {
      id: 'healthcare',
      name: 'Pharmaceuticals & Healthcare',
      tagline: 'Pharmaceutical, clinical, hospital and facility operations',
      icon: HeartPulse,
      roles: [
        'Hospital Administrators & Medical Superintendents',
        'NABH/JCI Quality Assurance Leads',
        'Clinical Operations & Nursing Supervisors',
        'Biomedical Waste & Facility Managers',
        'Pharmaceutical QA & Regulatory Associates',
        'Medical Affairs & Pharmacovigilance Specialists',
      ],
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
    },
    {
      id: 'fmcg-consumer-goods',
      name: 'FMCG & Consumer Goods',
      tagline: 'Consumer brands, product quality and distribution',
      icon: ShoppingBag,
      roles: [
        'Brand, Category & Trade Marketing Managers',
        'Demand Planning & Supply Chain Analysts',
        'Sales, Key Account & Distribution Leaders',
        'Product Quality & Packaging Specialists',
        'Warehouse & Route-to-Market Operations Leads',
      ],
    },
    {
      id: 'telecom',
      name: 'Telecom',
      tagline: 'Network, infrastructure and customer operations',
      icon: Radio,
      roles: [
        'Telecom Network & Radio Access Engineers',
        'Fiber, Broadband & Infrastructure Project Leads',
        'Network Operations Center (NOC) Specialists',
        'Service Assurance & Field Operations Managers',
        'Enterprise Sales & Customer Experience Leads',
      ],
    },
    {
      id: 'food-beverage',
      name: 'Food & Beverage',
      tagline: 'Food production, quality and supply chain',
      icon: Utensils,
      roles: [
        'Food Technologists & Product Development Specialists',
        'Food Safety, QA & Regulatory Managers',
        'Plant, Production & Packaging Supervisors',
        'Procurement & Cold-Chain Supply Chain Leads',
        'Hospitality & Food Service Operations Managers',
      ],
    },
    {
      id: 'oil-gas-energy',
      name: 'Oil, Gas & Energy',
      tagline: 'Energy production, infrastructure and safety',
      icon: Zap,
      roles: [
        'Energy Project & Operations Managers',
        'Process, Petroleum & Electrical Engineers',
        'Health, Safety & Environment (HSE) Specialists',
        'Plant Maintenance & Reliability Leaders',
        'Renewable Energy & Power Systems Professionals',
      ],
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
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <PageHeroCarousel page="industries" className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs uppercase tracking-[0.25em] text-[#B8E9DF] font-bold">
            Industry Specialization
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Sectors We Serve
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Our workforce solutions are tailored to the roles, skills and operating environments of a wide range of industries.
          </p>
        </div>
      </PageHeroCarousel>

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
