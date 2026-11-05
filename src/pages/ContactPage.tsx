import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Building,
  CheckCircle2,
  Send,
  AlertCircle,
  Clock,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ContactPageProps {
  prefilledRequirement?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  prefilledRequirement,
}) => {
  const [company, setCompany] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requirementType, setRequirementType] = useState(
    prefilledRequirement || 'Contract Staffing'
  );
  const [headcount, setHeadcount] = useState('10-50 Personnel');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // FAQ open state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does contract staffing on UNIVA HIRE TECH’s payroll work?',
      a: 'We hire, onboard, and maintain the selected professionals directly on UNIVA HIRE TECH’s legal payroll. We manage salary disbursement, PF/ESIC deductions, statutory filings, and insurance, while the personnel report directly to your team for daily operational deliverables.',
    },
    {
      q: 'What is the typical turnaround time for executive-to-senior mandates?',
      a: 'For lateral and senior roles, vetted shortlists are typically presented within 5 to 7 business days. For bulk contractual staffing, phased deployments of 50–200 workers can be mobilized within 14 to 21 business days.',
    },
    {
      q: 'How do you ensure statutory compliance and insulate our enterprise from liabilities?',
      a: 'We provide monthly proof of statutory filings (EPF ECR receipts, ESIC challans, and wage register sign-offs) alongside our corporate invoices. Our internal compliance officers audit all state-specific minimum wage notifications and labor laws regularly.',
    },
    {
      q: 'What happens if a deployed candidate leaves or underperforms?',
      a: 'We provide a structured replacement guarantee within our Master Services Agreement (MSA), mobilizing replacement candidates promptly with zero additional sourcing fees.',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !contactPerson || !email || !phone) {
      setErrorMessage('Company, Contact Person, Email, and Phone are mandatory fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company,
          contact_person: contactPerson,
          designation,
          email,
          phone,
          requirement_type: requirementType,
          estimated_headcount: headcount,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSuccessMessage(
        data.message ||
          'Your requirement has been recorded. A UNIVA Senior Partner will contact you within 4 business hours.'
      );
      setCompany('');
      setContactPerson('');
      setDesignation('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred while saving enquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-[#1B1A4E] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs uppercase tracking-[0.25em] text-[#0E9F80] font-bold">
            Corporate Client Inquiries
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Let&apos;s Build Your Team Together
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Partner with UNIVA HIRE TECH for dependable, compliant, and cost-effective manpower solutions. Connect directly with our Senior Talent Solutions team.
          </p>
        </div>
      </section>

      {/* Main Grid: Form & Corporate Coordinates */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DCDDEE] p-8 sm:p-10 shadow-sm space-y-6">
            <div className="border-b border-[#DCDDEE] pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3B2FBF]">
                Manpower Requirement Requisition
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1B1A4E] mt-1">
                Corporate Hiring & Support Enquiry
              </h2>
              <p className="text-xs text-[#55587A] mt-1">
                Fill out the details below, and our specialized industry partner will reach out with a tailored commercial and delivery plan.
              </p>
            </div>

            {successMessage && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0E9F80]">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Enquiry Received Successfully</span>
                </div>
                <p>{successMessage}</p>
              </div>
            )}

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                    Company / Organization Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Technologies India"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                    Contact Person Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sandeep Varma"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                    Designation / Department
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. VP Human Resources"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                    Corporate Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sandeep.v@acme.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                    Direct Phone / Mobile <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98100 23456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                    Requirement Type
                  </label>
                  <select
                    value={requirementType}
                    onChange={(e) => setRequirementType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs font-medium text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF]"
                  >
                    <option value="Contract Staffing">Contract Staffing (on UNIVA Payroll)</option>
                    <option value="Permanent Recruitment">Permanent Recruitment & Lateral</option>
                    <option value="Executive Search">Executive Search / CXO Mandates</option>
                    <option value="Audit Services">Safety & HR Compliance Audit</option>
                    <option value="Corporate Event Management">Corporate Event Management</option>
                    <option value="Training & Skill Development">Training & Skill Development</option>
                    <option value="Workplace Safety Training">Workplace Safety Training & Support</option>
                    <option value="Onboarding & HR Support">Onboarding & HR Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                  Estimated Headcount Volume
                </label>
                <select
                  value={headcount}
                  onChange={(e) => setHeadcount(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs font-medium text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF]"
                >
                  <option value="1-5 Leadership Hires">1–5 Leadership Hires</option>
                  <option value="6-20 Personnel">6–20 Personnel</option>
                  <option value="21-50 Personnel">21–50 Personnel</option>
                  <option value="51-100 Personnel">51–100 Personnel</option>
                  <option value="100+ Enterprise Scale">100+ Enterprise Scale</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                  Requirement Details & Project Context
                </label>
                <textarea
                  rows={4}
                  placeholder="Outline key roles, locations, expected deployment timelines, technical skills, or special compliance specifications..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#3B2FBF] hover:bg-[#3227a8] disabled:opacity-60 text-white text-xs font-bold rounded-lg shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Requirement to UNIVA Partners</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Corporate Coordinates (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Contact Card */}
            <div className="bg-[#1B1A4E] text-white rounded-2xl p-8 space-y-6 shadow-sm">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0E9F80]">
                  Corporate Office
                </span>
                <h3 className="text-xl font-bold">
                  UNIVA HIRE TECH
                </h3>
                <p className="text-xs text-slate-300">
                  Third-Party Staffing · Recruitment · Training · Audit · Corporate Events
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-200">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#0E9F80] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold">Headquarters & Tech Hub</strong>
                    <span>Level 8, UB City Tower / Outer Ring Road Hub</span><br />
                    <span>Bengaluru, Karnataka – 560001, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#0E9F80] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold">Boardline & Sourcing Desk</strong>
                    <a href="tel:+918049208000" className="hover:text-white">
                      +91 80 4920 8000 / +91 98800 12345
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#0E9F80] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold">Corporate Inquiries</strong>
                    <a href="mailto:contact@univahiretech.com" className="hover:text-white">
                      contact@univahiretech.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-[#0E9F80] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold">Official Website</strong>
                    <span>www.univahiretech.com</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/80">
                <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Pan-India Operational Hubs
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div>· Bengaluru (Karnataka)</div>
                  <div>· Mumbai (Maharashtra)</div>
                  <div>· Gurugram (NCR/Delhi)</div>
                  <div>· Pune (Auto Cluster)</div>
                  <div>· Hyderabad (Telangana)</div>
                  <div>· Chennai (Tamil Nadu)</div>
                </div>
              </div>
            </div>

            {/* Quick SLA Assurance */}
            <div className="bg-slate-50 border border-[#DCDDEE] rounded-xl p-6 space-y-3 text-xs text-[#55587A]">
              <div className="flex items-center gap-2 font-bold text-[#1B1A4E] text-sm">
                <Clock className="w-4 h-4 text-[#3B2FBF]" />
                <span>Our Corporate Response Guarantee</span>
              </div>
              <p>
                Every enterprise requirement submitted through this portal is routed directly to a designated Senior Client Partner. We respond within <strong className="text-[#1B1A4E]">4 business hours</strong> with initial sourcing feasibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate FAQs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-[#DCDDEE] pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3B2FBF]">
            Frequently Asked Questions
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1B1A4E] mt-1">
            Enterprise Client Questions Answered
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-[#DCDDEE] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-[#1B1A4E] hover:bg-slate-50 transition-colors"
                >
                  <span>{f.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#3B2FBF] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 text-xs sm:text-sm text-[#55587A] leading-relaxed border-t border-slate-100 pt-3">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
