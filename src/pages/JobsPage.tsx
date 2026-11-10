import React, { useState, useMemo } from 'react';
import { PageHeroCarousel } from '../components/PageHeroCarousel';
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Building,
  CheckCircle2,
  Upload,
  FileText,
  X,
  AlertCircle,
  Filter,
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles,
} from 'lucide-react';
import { Job, Application } from '../types';
import { apiFetch } from '../lib/api';

const normalizeIndustry = (industry: string) =>
  industry === 'Healthcare' ? 'Pharmaceuticals & Healthcare' : industry;

interface JobsPageProps {
  jobs: Job[];
  onNavigate: (page: string) => void;
  selectedJobForDetail?: Job | null;
  onClearSelectedJob?: () => void;
}

export const JobsPage: React.FC<JobsPageProps> = ({
  jobs,
  onNavigate,
  selectedJobForDetail,
  onClearSelectedJob,
}) => {
  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSeniority, setSelectedSeniority] = useState('all');

  // Active Job Detail modal
  const [activeJob, setActiveJob] = useState<Job | null>(selectedJobForDetail || null);

  // Application Modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [designation, setDesignation] = useState('');
  const [totalExperience, setTotalExperience] = useState('');
  const [currentCtc, setCurrentCtc] = useState('');
  const [expectedCtc, setExpectedCtc] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('30 Days');
  const [location, setLocation] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedApplication, setSubmittedApplication] = useState<{
    referenceId: string;
    jobTitle: string;
    candidateName: string;
  } | null>(null);

  // Sync selectedJobForDetail prop if changed externally
  React.useEffect(() => {
    if (selectedJobForDetail) {
      setActiveJob(selectedJobForDetail);
    }
  }, [selectedJobForDetail]);

  // Derived filter options
  const locations = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      // Split location by slash or take full
      const parts = j.location.split('/');
      set.add(parts[0].trim());
    });
    return Array.from(set);
  }, [jobs]);

  const industries = useMemo(() => {
    const standardIndustries = [
      'IT & Software',
      'Manufacturing',
      'Construction & Infrastructure',
      'Banking & Financial Services (BFSI)',
      'Pharmaceuticals & Healthcare',
      'Retail & E-commerce',
      'Logistics & Supply Chain',
      'FMCG & Consumer Goods',
      'Telecom',
      'Food & Beverage',
      'Oil, Gas & Energy',
      'Corporate & Professional Services',
    ];

    // Keep any legacy or custom industry values already used by published jobs.
    return Array.from(new Set([...standardIndustries, ...jobs.map((job) => normalizeIndustry(job.industry)).filter(Boolean)]));
  }, [jobs]);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (job.status !== 'Open') return false;

      const matchesSearch =
        searchTerm === '' ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        selectedLocation === 'all' ||
        job.location.toLowerCase().includes(selectedLocation.toLowerCase());

      const matchesIndustry =
        selectedIndustry === 'all' || normalizeIndustry(job.industry) === selectedIndustry;

      const matchesType =
        selectedType === 'all' || job.employment_type === selectedType;

      const matchesSeniority =
        selectedSeniority === 'all' || job.seniority === selectedSeniority;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesIndustry &&
        matchesType &&
        matchesSeniority
      );
    });
  }, [jobs, searchTerm, selectedLocation, selectedIndustry, selectedType, selectedSeniority]);

  const handleOpenApply = (job: Job | null) => {
    setApplyingJob(job);
    setSubmitError(null);
    setSubmittedApplication(null);
    setIsApplyModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        setSubmitError('Only PDF resume files are accepted.');
        setResumeFile(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError('Resume file size must be less than 5 MB.');
        setResumeFile(null);
        return;
      }
      setSubmitError(null);
      setResumeFile(file);
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      setSubmitError('Full name, email, and mobile number are mandatory.');
      return;
    }

    if (!consentGiven) {
      setSubmitError('You must agree to the DPDP Act consent to submit your application.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      if (applyingJob) {
        formData.append('job_id', applyingJob.id);
        formData.append('job_title', applyingJob.title);
      } else {
        formData.append('job_title', 'General Executive Talent Pool');
      }

      formData.append('full_name', fullName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('current_company', currentCompany || 'Confidential / Individual');
      formData.append('designation', designation || 'Senior Professional');
      formData.append('total_experience', totalExperience || '0');
      formData.append('current_ctc', currentCtc || 'Not Disclosed');
      formData.append('expected_ctc', expectedCtc || 'Negotiable');
      formData.append('notice_period', noticePeriod);
      formData.append('location', location || 'India');
      formData.append('consent_given', 'true');

      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      const res = await apiFetch('/api/applications', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmittedApplication({
        referenceId: data.reference_id || 'UHT-2026-CONFIRMED',
        jobTitle: applyingJob ? applyingJob.title : 'General Executive Talent Pool',
        candidateName: fullName,
      });

      // Clear fields
      setFullName('');
      setEmail('');
      setPhone('');
      setCurrentCompany('');
      setDesignation('');
      setTotalExperience('');
      setCurrentCtc('');
      setExpectedCtc('');
      setNoticePeriod('30 Days');
      setLocation('');
      setResumeFile(null);
      setConsentGiven(false);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || 'Error occurred while submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <PageHeroCarousel page="jobs" className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs uppercase tracking-[0.25em] text-[#B8E9DF] font-bold">
            Executive & Senior Opportunities
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Careers & Strategic Openings
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Discover verified leadership, technical, and executive roles on UNIVA HIRE TECH&apos;s payroll and with our esteemed corporate client partners across India.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleOpenApply(null)}
              className="px-5 py-2.5 bg-[#0E9F80] hover:bg-[#0c886d] text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Submit General Resume to Executive Pool</span>
            </button>
            <span className="text-xs text-slate-300">
              Direct confidentiality guarantee & DPDP Act compliance.
            </span>
          </div>
        </div>
      </PageHeroCarousel>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl border border-[#DCDDEE] p-6 shadow-sm space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by role title, technology, location, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-[#DCDDEE] rounded-lg text-sm text-[#1B1A4E] placeholder:text-slate-400 focus:outline-none focus:border-[#3B2FBF] focus:bg-white transition-all"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#55587A] mb-1">
                Industry Sector
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs font-medium text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF]"
              >
                <option value="all">All Industries</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#55587A] mb-1">
                Location Hub
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs font-medium text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF]"
              >
                <option value="all">All Indian Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#55587A] mb-1">
                Employment Model
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs font-medium text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF]"
              >
                <option value="all">All Types (Permanent & Contract)</option>
                <option value="Permanent">Permanent Placement</option>
                <option value="Contract">Contract (on UNIVA Payroll)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#55587A] mb-1">
                Seniority Level
              </label>
              <select
                value={selectedSeniority}
                onChange={(e) => setSelectedSeniority(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs font-medium text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF]"
              >
                <option value="all">All Seniority Levels</option>
                <option value="Executive">Executive / CXO / VP</option>
                <option value="Senior">Senior Leadership / Lead</option>
                <option value="Mid-Senior">Mid-Senior</option>
              </select>
            </div>
          </div>

          {/* Active Filter summary */}
          <div className="flex items-center justify-between pt-2 text-xs text-[#55587A] border-t border-slate-100">
            <span>
              Showing <strong className="text-[#1B1A4E]">{filteredJobs.length}</strong> active openings
            </span>
            {(searchTerm ||
              selectedIndustry !== 'all' ||
              selectedLocation !== 'all' ||
              selectedType !== 'all' ||
              selectedSeniority !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedIndustry('all');
                  setSelectedLocation('all');
                  setSelectedType('all');
                  setSelectedSeniority('all');
                }}
                className="text-xs text-[#3B2FBF] hover:underline font-semibold"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Jobs List Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#DCDDEE] p-12 text-center space-y-4">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-[#1B1A4E]">
              No active job openings match your current search criteria
            </h3>
            <p className="text-xs text-[#55587A] max-w-md mx-auto">
              Try adjusting your search terms, or submit your resume directly to our Executive Talent Pool. We frequently hire for unadvertised confidential leadership roles.
            </p>
            <button
              onClick={() => handleOpenApply(null)}
              className="px-5 py-2.5 bg-[#3B2FBF] text-white text-xs font-bold rounded-lg hover:bg-[#3227a8] transition-colors"
            >
              Submit Resume to General Talent Pool
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-[#DCDDEE] p-6 hover:shadow-md hover:border-[#3B2FBF] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#3B2FBF]">
                        <span>{normalizeIndustry(job.industry)}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#55587A] font-normal">{job.department}</span>
                      </div>
                      <h3
                        onClick={() => setActiveJob(job)}
                        className="text-lg font-bold text-[#1B1A4E] group-hover:text-[#3B2FBF] transition-colors cursor-pointer mt-1 leading-snug"
                      >
                        {job.title}
                      </h3>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded shrink-0 ${
                        job.employment_type === 'Contract'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {job.employment_type === 'Contract'
                        ? 'Contract (UNIVA Payroll)'
                        : 'Permanent Role'}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-[#55587A] line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Meta Specs */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-[#55587A] border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#3B2FBF] shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#3B2FBF] shrink-0" />
                      <span>{job.experience_min}–{job.experience_max} Yrs Exp</span>
                    </div>
                  </div>

                  {job.show_salary && (
                    <div className="text-xs font-bold text-[#0E9F80] bg-teal-50/60 px-3 py-1.5 rounded flex items-center justify-between">
                      <span>Compensation Bracket:</span>
                      <span className="font-mono">{job.salary_range}</span>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveJob(job)}
                    className="text-xs font-bold text-[#3B2FBF] hover:underline cursor-pointer"
                  >
                    View Description & Requirements &rarr;
                  </button>

                  <button
                    onClick={() => handleOpenApply(job)}
                    className="px-4 py-2 bg-[#1B1A4E] hover:bg-[#3B2FBF] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* JOB DETAIL DRAWER / MODAL */}
      {activeJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#DCDDEE] p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#DCDDEE] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#3B2FBF]">
                  <span>{normalizeIndustry(activeJob.industry)}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#55587A]">{activeJob.department}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#0E9F80]">{activeJob.seniority}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#1B1A4E] mt-1">
                  {activeJob.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#55587A] mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#3B2FBF]" />
                    <span>{activeJob.location}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#3B2FBF]" />
                    <span>{activeJob.experience_min}–{activeJob.experience_max} Years Experience</span>
                  </span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded font-semibold text-[#1B1A4E]">
                    {activeJob.employment_type}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveJob(null);
                  if (onClearSelectedJob) onClearSelectedJob();
                }}
                className="p-1.5 text-slate-400 hover:text-[#1B1A4E] rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Compensation Tag */}
            {activeJob.show_salary && (
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between text-xs text-teal-900">
                <span className="font-bold">Indicative CTC Package:</span>
                <span className="text-sm font-extrabold font-mono text-[#0E9F80]">
                  {activeJob.salary_range}
                </span>
              </div>
            )}

            {/* Description */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#1B1A4E]">
                Role Overview
              </h4>
              <p className="text-xs sm:text-sm text-[#55587A] leading-relaxed">
                {activeJob.description}
              </p>
            </div>

            {/* Responsibilities */}
            {activeJob.responsibilities && activeJob.responsibilities.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#1B1A4E]">
                  Key Responsibilities
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#55587A]">
                  {activeJob.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0E9F80] shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {activeJob.requirements && activeJob.requirements.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#1B1A4E]">
                  Candidate Requirements & Competencies
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#55587A]">
                  {activeJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3B2FBF] shrink-0 mt-1.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-6 border-t border-[#DCDDEE] flex items-center justify-between">
              <button
                onClick={() => {
                  setActiveJob(null);
                  if (onClearSelectedJob) onClearSelectedJob();
                }}
                className="px-5 py-2.5 text-xs font-semibold text-[#55587A] hover:bg-slate-100 rounded-lg transition-colors"
              >
                Close Window
              </button>

              <button
                onClick={() => {
                  const targetJob = activeJob;
                  setActiveJob(null);
                  handleOpenApply(targetJob);
                }}
                className="px-7 py-3 bg-[#3B2FBF] hover:bg-[#3227a8] text-white text-xs font-bold rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Apply for this Position</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* APPLICATION MODAL WITH PDF UPLOAD & DPDP CONSENT */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#DCDDEE] p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#DCDDEE] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#3B2FBF]">
                  {applyingJob ? 'Job Application Form' : 'General Resume Submission'}
                </span>
                <h3 className="text-xl font-extrabold text-[#1B1A4E] mt-1">
                  {applyingJob ? applyingJob.title : 'Executive Talent Pool Submission'}
                </h3>
                {applyingJob && (
                  <p className="text-xs text-[#55587A] mt-0.5">
                    {applyingJob.location} · {applyingJob.employment_type}
                  </p>
                )}
              </div>

              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-[#1B1A4E] rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Submission Success Screen */}
            {submittedApplication ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0E9F80] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#1B1A4E]">
                  Application Submitted Successfully
                </h3>
                <p className="text-xs sm:text-sm text-[#55587A] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#1B1A4E]">{submittedApplication.candidateName}</strong>. Your profile has been received by UNIVA HIRE TECH for <strong>{submittedApplication.jobTitle}</strong>.
                </p>

                <div className="bg-slate-50 border border-[#DCDDEE] p-4 rounded-xl max-w-sm mx-auto text-center space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#55587A]">
                    Official Application Reference ID
                  </span>
                  <div className="text-lg font-mono font-extrabold text-[#3B2FBF]">
                    {submittedApplication.referenceId}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Quote this reference number in all candidate communications.
                  </span>
                </div>

                <p className="text-xs text-slate-500">
                  Our Executive Talent Acquisition team will review your profile against client requirements and contact you within 3–5 business days.
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsApplyModalOpen(false);
                      setSubmittedApplication(null);
                    }}
                    className="px-6 py-2.5 bg-[#1B1A4E] hover:bg-[#3B2FBF] text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Close & Continue Browsing
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                {submitError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Form Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                      Full Legal Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh.c@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                      Current Location (City/State)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru / Pune"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                      Current Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Larsen & Toubro"
                      value={currentCompany}
                      onChange={(e) => setCurrentCompany(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                      Current Designation
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Project Manager"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                      Total Experience (Years)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="45"
                      step="0.5"
                      placeholder="e.g. 12"
                      value={totalExperience}
                      onChange={(e) => setTotalExperience(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                      Notice Period
                    </label>
                    <select
                      value={noticePeriod}
                      onChange={(e) => setNoticePeriod(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
                    >
                      <option value="Immediate / Serving Notice">Immediate / Serving Notice</option>
                      <option value="15 Days">15 Days</option>
                      <option value="30 Days">30 Days</option>
                      <option value="45 Days">45 Days</option>
                      <option value="60 Days">60 Days</option>
                      <option value="90 Days">90 Days</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                      Current Fixed CTC (Annual)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹28 LPA"
                      value={currentCtc}
                      onChange={(e) => setCurrentCtc(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                      Expected CTC (Annual)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹36 LPA"
                      value={expectedCtc}
                      onChange={(e) => setExpectedCtc(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
                    />
                  </div>
                </div>

                {/* PDF Resume Upload Dropzone */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                    Upload Resume PDF <span className="text-slate-400 font-normal">(PDF only, max 5 MB)</span>
                  </label>
                  <div className="border-2 border-dashed border-[#DCDDEE] hover:border-[#3B2FBF] rounded-xl p-4 text-center bg-slate-50 hover:bg-white transition-all cursor-pointer relative">
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {resumeFile ? (
                      <div className="flex items-center justify-center gap-2 text-xs text-[#3B2FBF] font-semibold">
                        <FileText className="w-5 h-5 text-[#0E9F80]" />
                        <span>{resumeFile.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                        <p className="text-xs text-[#1B1A4E] font-medium">
                          Click to browse or drag and drop your executive CV here
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Strictly PDF files up to 5 MB. Client and server validated.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mandatory DPDP Act Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 p-3 bg-slate-50 border border-[#DCDDEE] rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-[#3B2FBF] focus:ring-[#3B2FBF] h-4 w-4 shrink-0"
                    />
                    <span className="text-[11px] text-[#55587A] leading-relaxed">
                      <strong className="text-[#1B1A4E]">Statutory Data Consent: </strong>
                      &ldquo;I agree to UNIVA HIRE TECH storing my resume and personal data for recruitment purposes&rdquo; in compliance with India&apos;s Digital Personal Data Protection (DPDP) Act 2023. Read our{' '}
                      <button
                        type="button"
                        onClick={(ev) => {
                          ev.stopPropagation();
                          onNavigate('privacy');
                        }}
                        className="text-[#3B2FBF] underline font-semibold"
                      >
                        Privacy Policy
                      </button>.
                    </span>
                  </label>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#DCDDEE] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#55587A] hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-[#3B2FBF] hover:bg-[#3227a8] disabled:opacity-60 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin text-sm">●</span>
                        <span>Encrypting & Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Executive Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
