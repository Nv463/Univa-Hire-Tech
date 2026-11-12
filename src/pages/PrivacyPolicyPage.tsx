import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2, Mail, Phone } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (page: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="space-y-3 border-b border-[#DCDDEE] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-md border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-[#0E9F80]" />
          <span>India DPDP Act 2023 Aligned Policy</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#1B1A4E]">
          Privacy Policy & Candidate Data Protection Notice
        </h1>
        <p className="text-xs text-[#55587A]">
          Effective Date: January 1, 2026 · UNIVA HIRE TECH Pvt. Ltd., India
        </p>
      </div>

      <div className="prose prose-sm max-w-none text-xs sm:text-sm text-[#55587A] space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1B1A4E]">
            1. Purpose and Scope
          </h2>
          <p>
            UNIVA HIRE TECH (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting the privacy, confidentiality, and security of personal data entrusted to us by job seekers, candidates, contractual employees, and corporate clients. This Privacy Policy outlines how we collect, process, store, and safeguard candidate resumes and personal information in accordance with India&apos;s Digital Personal Data Protection (DPDP) Act, 2023, and applicable statutory guidelines.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1B1A4E]">
            2. Personal Data We Collect
          </h2>
          <p>When you apply for a job or submit your resume to our Executive Talent Pool, we collect:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Identification details: Full name, email address, mobile number, current city/state.</li>
            <li>Professional profile: Current and past employers, designations, total experience, educational qualifications, certifications, current and expected compensation (CTC), and notice period.</li>
            <li>Candidate Resume / CV: Uploaded PDF documents detailing career history.</li>
            <li>Statutory details (post-selection only): Aadhaar, PAN, Universal Account Number (UAN), ESIC number, and bank account details for payroll disbursement and statutory filings.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1B1A4E]">
            3. Legal Grounds & Explicit Consent
          </h2>
          <p>
            We process your personal data on the basis of your explicit consent provided during application submission via the mandatory consent checkbox: <em>&ldquo;I agree to UNIVA HIRE TECH storing my resume and personal data for recruitment purposes.&rdquo;</em> You have the right to withdraw this consent at any time.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1B1A4E]">
            4. Purpose of Data Processing
          </h2>
          <p>Your data is used solely for legitimate recruitment and workforce administration purposes, including:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Evaluating suitability for executive, senior, and contractual openings.</li>
            <li>Presenting redacted or verified candidate profiles to prospective corporate clients for interview shortlisting.</li>
            <li>Facilitating onboarding, background verification (BGV), and statutory enrollment (EPF, ESIC, Professional Tax, TDS) upon selection.</li>
            <li>Notifying you of relevant executive career openings matching your qualifications.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1B1A4E]">
            5. Security & Storage Architecture
          </h2>
          <p>
            All uploaded resumes and records are stored securely in restricted access environments with AES-256 encryption. Resumes are served to internal recruiters through short-lived access controls and are never indexed publicly by search engines or shared with unauthorized third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1B1A4E]">
            6. Your Rights Under the DPDP Act 2023
          </h2>
          <p>As a Data Principal in India, you are entitled to:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Right to Access:</strong> Request a summary of your personal data processed by us.</li>
            <li><strong>Right to Correction:</strong> Request updates or corrections to any outdated resume or contact information.</li>
            <li><strong>Right to Erasure:</strong> Request the deletion of your resume and application profile from our talent pool.</li>
            <li><strong>Right to Grievance Redressal:</strong> Reach our designated Data Protection & Grievance Officer.</li>
          </ul>
        </section>

        <section className="space-y-2 bg-slate-50 p-4 rounded-xl border border-[#DCDDEE]">
          <h3 className="text-sm font-bold text-[#1B1A4E]">
            7. Grievance Redressal & Contact Officer
          </h3>
          <p className="text-xs">
            For any questions, consent withdrawals, or data erasure requests, please contact our Data Protection Officer:
          </p>
          <div className="text-xs space-y-1 text-[#1B1A4E] font-medium pt-1">
            <div>Data Grievance Officer, UNIVA HIRE TECH</div>
            <div>Email: <a href="mailto:privacy@univahiretech.com" className="text-[#3B2FBF] underline">privacy@univahiretech.com</a></div>
          </div>
        </section>
      </div>

      <div className="pt-4 border-t border-[#DCDDEE] flex justify-between items-center">
        <button
          onClick={() => onNavigate('home')}
          className="text-xs font-bold text-[#3B2FBF] hover:underline"
        >
          &larr; Back to Home
        </button>
        <button
          onClick={() => onNavigate('jobs')}
          className="px-4 py-2 bg-[#1B1A4E] text-white text-xs font-semibold rounded-lg hover:bg-[#3B2FBF] transition-colors"
        >
          View Open Jobs
        </button>
      </div>
    </div>
  );
};
