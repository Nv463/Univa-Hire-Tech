import React, { useState, useEffect } from 'react';
import { apiFetch } from '../lib/api';
import { supabase } from '../lib/supabase';
import {
  Users,
  Briefcase,
  FileText,
  Mail,
  Plus,
  Search,
  Filter,
  Download,
  FileArchive,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Lock,
  LogOut,
  ChevronDown,
  Building,
  MapPin,
  Send,
  MessageSquare,
  ShieldCheck,
  RefreshCw,
  X,
  ExternalLink,
} from 'lucide-react';
import {
  Job,
  Application,
  ClientEnquiry,
  User,
  DashboardStats,
  ApplicationStatus,
  JobStatus,
  RecruiterNote,
} from '../types';


const readApiJson = async (response: Response) => {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error('The UNIVA API is unavailable or returned an unexpected page. Please wait for the latest deployment and try again.');
  }
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'The request could not be completed.');
  }
  return data;
};

interface AdminPortalProps {
  onNavigateHome: () => void;
  currentUser: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  onNavigateHome,
  currentUser,
  onLogin,
  onLogout,
}) => {
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(() => window.location.pathname === '/recruiter/reset-password');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordResetError, setPasswordResetError] = useState<string | null>(null);
  const [passwordResetMessage, setPasswordResetMessage] = useState<string | null>(null);
  const [isRequestingPasswordReset, setIsRequestingPasswordReset] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'jobs' | 'applicants' | 'enquiries'>('dashboard');

  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [enquiries, setEnquiries] = useState<ClientEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filters
  const [applicantJobFilter, setApplicantJobFilter] = useState('all');
  const [applicantStatusFilter, setApplicantStatusFilter] = useState('all');
  const [applicantSearch, setApplicantSearch] = useState('');

  // Selected Applicant for Detail Drawer
  const [selectedApplicant, setSelectedApplicant] = useState<Application | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Job Modal (Create or Edit)
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Job Form fields
  const [jobTitle, setJobTitle] = useState('');
  const [jobDept, setJobDept] = useState('');
  const [jobIndustry, setJobIndustry] = useState('IT & Software');
  const [jobLocation, setJobLocation] = useState('');
  const [jobType, setJobType] = useState<'Permanent' | 'Contract'>('Permanent');
  const [jobSeniority, setJobSeniority] = useState<any>('Senior');
  const [jobExpMin, setJobExpMin] = useState(8);
  const [jobExpMax, setJobExpMax] = useState(15);
  const [jobSalary, setJobSalary] = useState('');
  const [jobShowSalary, setJobShowSalary] = useState(true);
  const [jobDesc, setJobDesc] = useState('');
  const [jobResponsibilities, setJobResponsibilities] = useState('');
  const [jobRequirements, setJobRequirements] = useState('');
  const [jobStatus, setJobStatus] = useState<JobStatus>('Open');
  const [jobClosingDate, setJobClosingDate] = useState('');
  const [jobFormError, setJobFormError] = useState<string | null>(null);
  const [isSavingJob, setIsSavingJob] = useState(false);

  // Fetch all admin data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, jobsRes, appsRes, enqRes] = await Promise.all([
        apiFetch('/api/stats'),
        apiFetch('/api/jobs?status=all'),
        apiFetch('/api/applications'),
        apiFetch('/api/enquiries'),
      ]);

      const [statsData, jobsData, appsData, enqData] = await Promise.all([
        readApiJson(statsRes),
        readApiJson(jobsRes),
        readApiJson(appsRes),
        readApiJson(enqRes),
      ]);

      setStats(statsData);
      setJobs(jobsData.jobs || []);
      setApplications(appsData.applications || []);
      setEnquiries(enqData.enquiries || []);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsPasswordRecovery(true);
        setPasswordResetError(null);
      }
    });

    if (window.location.pathname === '/recruiter/reset-password') {
      supabase.auth.getSession().then(({ data, error }) => {
        if (error || !data.session) {
          setIsPasswordRecovery(false);
          setPasswordResetError('This reset link is invalid or expired. Request a new one from the staff sign-in page.');
        }
      });
    }

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await readApiJson(res);

      onLogin({ ...data.user, access_token: data.access_token, refresh_token: data.refresh_token });
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };


  const handlePasswordResetRequest = async () => {
    const email = (currentUser?.email || loginEmail).trim().toLowerCase();
    setPasswordResetError(null);
    setPasswordResetMessage(null);
    if (!email) {
      setPasswordResetError('Enter your corporate email to receive a password reset link.');
      return;
    }

    setIsRequestingPasswordReset(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://univa-hire-tech.vercel.app/recruiter/reset-password',
      });
      if (error) throw error;
      setPasswordResetMessage('If this account exists, a password reset link has been sent to its email address.');
    } catch (error: any) {
      setPasswordResetError(error.message || 'Unable to send a password reset link.');
    } finally {
      setIsRequestingPasswordReset(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordResetError(null);
    setPasswordResetMessage(null);
    if (newPassword.length < 8) {
      setPasswordResetError('Use a password with at least 8 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordResetError('The passwords do not match.');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      await supabase.auth.signOut();
      setIsPasswordRecovery(false);
      setNewPassword('');
      setConfirmNewPassword('');
      window.history.replaceState(null, '', '/recruiter');
      onLogout();
      setPasswordResetMessage('Password updated. Sign in with your new password.');
    } catch (error: any) {
      setPasswordResetError(error.message || 'Unable to update the password. Request a fresh reset link and try again.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const downloadProtectedFile = async (url: string, filename: string, openInNewTab = false) => {
    try {
      const response = await apiFetch(url);
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Unable to download this file.');
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      if (openInNewTab) {
        window.open(objectUrl, '_blank', 'noopener,noreferrer');
      } else {
        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
    } catch (error: any) {
      setLoginError(error.message || 'Unable to download this file.');
    }
  };

  // Open Create Job Modal
  const handleOpenCreateJob = () => {
    setEditingJob(null);
    setJobTitle('');
    setJobDept('Operations');
    setJobIndustry('Manufacturing');
    setJobLocation('Bengaluru / Hybrid');
    setJobType('Permanent');
    setJobSeniority('Senior');
    setJobExpMin(8);
    setJobExpMax(15);
    setJobSalary('₹28 – 38 LPA');
    setJobShowSalary(true);
    setJobDesc('');
    setJobResponsibilities('');
    setJobRequirements('');
    setJobStatus('Open');
    setJobClosingDate(new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0]);
    setJobFormError(null);
    setIsJobModalOpen(true);
  };

  // Open Edit Job Modal
  const handleOpenEditJob = (job: Job) => {
    setEditingJob(job);
    setJobTitle(job.title);
    setJobDept(job.department);
    setJobIndustry(job.industry);
    setJobLocation(job.location);
    setJobType(job.employment_type);
    setJobSeniority(job.seniority);
    setJobExpMin(job.experience_min);
    setJobExpMax(job.experience_max);
    setJobSalary(job.salary_range);
    setJobShowSalary(job.show_salary);
    setJobDesc(job.description);
    setJobResponsibilities(job.responsibilities ? job.responsibilities.join('\n') : '');
    setJobRequirements(job.requirements ? job.requirements.join('\n') : '');
    setJobStatus(job.status);
    setJobClosingDate(job.closing_date || '');
    setJobFormError(null);
    setIsJobModalOpen(true);
  };

  // Save Job (Create or Update)
  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !jobIndustry || !jobLocation) {
      setJobFormError('Title, industry, and location are required.');
      return;
    }

    setIsSavingJob(true);
    setJobFormError(null);

    const payload = {
      title: jobTitle,
      department: jobDept,
      industry: jobIndustry,
      location: jobLocation,
      employment_type: jobType,
      seniority: jobSeniority,
      experience_min: Number(jobExpMin),
      experience_max: Number(jobExpMax),
      salary_range: jobSalary,
      show_salary: jobShowSalary,
      description: jobDesc,
      responsibilities: jobResponsibilities.split('\n').filter(Boolean),
      requirements: jobRequirements.split('\n').filter(Boolean),
      status: jobStatus,
      closing_date: jobClosingDate,
      created_by: currentUser?.name || 'Admin',
    };

    try {
      let res;
      if (editingJob) {
        res = await apiFetch(`/api/jobs/${editingJob.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await apiFetch('/api/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save job');
      }

      setIsJobModalOpen(false);
      fetchData();
    } catch (err: any) {
      setJobFormError(err.message);
    } finally {
      setIsSavingJob(false);
    }
  };

  // Toggle Job Status (Open / Closed)
  const handleToggleJobStatus = async (job: Job) => {
    const nextStatus = job.status === 'Open' ? 'Closed' : 'Open';
    try {
      await apiFetch(`/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Job
  const handleDeleteJob = async (jobId: string) => {
    if (!window.confirm('Are you sure you want to delete this job opening? This cannot be undone.')) {
      return;
    }
    try {
      await apiFetch(`/api/jobs/${jobId}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Update Applicant Status
  const handleUpdateApplicantStatus = async (appId: string, newStatus: ApplicationStatus) => {
    try {
      const res = await apiFetch(`/api/applications/${appId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
      );

      if (selectedApplicant && selectedApplicant.id === appId) {
        setSelectedApplicant({ ...selectedApplicant, status: newStatus });
      }

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Add Internal Note to Applicant
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApplicant || !newNoteText.trim()) return;

    setIsAddingNote(true);
    try {
      const res = await apiFetch(`/api/applications/${selectedApplicant.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: newNoteText,
          author: currentUser?.name || 'Recruiter',
        }),
      });

      const data = await res.json();
      if (res.ok) {
        const updatedNotes = [data.note, ...(selectedApplicant.notes || [])];
        const updatedApp = { ...selectedApplicant, notes: updatedNotes };
        setSelectedApplicant(updatedApp);
        setApplications((prev) =>
          prev.map((a) => (a.id === selectedApplicant.id ? updatedApp : a))
        );
        setNewNoteText('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAddingNote(false);
    }
  };

  // Update Enquiry Status
  const handleUpdateEnquiryStatus = async (enqId: string, status: any) => {
    try {
      await apiFetch(`/api/enquiries/${enqId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enqId ? { ...e, status } : e))
      );
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered applicants
  const filteredApplicants = applications.filter((app) => {
    const matchesJob = applicantJobFilter === 'all' || app.job_id === applicantJobFilter;
    const matchesStatus = applicantStatusFilter === 'all' || app.status === applicantStatusFilter;
    const q = applicantSearch.toLowerCase();
    const matchesSearch =
      applicantSearch === '' ||
      app.full_name.toLowerCase().includes(q) ||
      app.email.toLowerCase().includes(q) ||
      app.phone.includes(q) ||
      app.current_company.toLowerCase().includes(q) ||
      app.designation.toLowerCase().includes(q);

    return matchesJob && matchesStatus && matchesSearch;
  });

  // If not logged in, show login card
  if (isPasswordRecovery) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl border border-[#DCDDEE] shadow-xl max-w-md w-full p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#1B1A4E] text-[#0E9F80] flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#1B1A4E]">Update Staff Password</h2>
            <p className="text-xs text-[#55587A]">Choose a new password for your UNIVA staff account.</p>
          </div>

          {passwordResetError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700" role="alert">
              {passwordResetError}
            </div>
          )}

          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1B1A4E] mb-1">New Password</label>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#1B1A4E] mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={isUpdatingPassword}
              className="w-full py-2.5 bg-[#3B2FBF] hover:bg-[#3227a8] disabled:opacity-60 text-white text-xs font-bold rounded-lg shadow transition-all"
            >
              {isUpdatingPassword ? 'Updating Password…' : 'Update Password'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setIsPasswordRecovery(false);
              window.history.replaceState(null, '', '/recruiter');
            }}
            className="w-full text-xs text-[#55587A] hover:underline"
          >
            Return to staff sign-in
          </button>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl border border-[#DCDDEE] shadow-xl max-w-md w-full p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#1B1A4E] text-[#0E9F80] flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#1B1A4E]">
              Staff & Recruiter Portal
            </h2>
            <p className="text-xs text-[#55587A]">
              UNIVA HIRE TECH Internal Applicant Tracking & Client Management
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{loginError}</span>
            </div>
          )}

          {passwordResetError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700" role="alert">{passwordResetError}</div>
          )}
          {passwordResetMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800" role="status">{passwordResetMessage}</div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                Corporate Staff Email
              </label>
              <input
                type="email"
                required
                autoComplete="username"
                placeholder="name@company.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                Security Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white"
              />
            </div>

            <button
              type="button"
              onClick={handlePasswordResetRequest}
              disabled={isRequestingPasswordReset}
              className="w-full text-right text-xs font-semibold text-[#3B2FBF] hover:underline disabled:opacity-60"
            >
              {isRequestingPasswordReset ? 'Sending reset link…' : 'Forgot or update password?'}
            </button>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2.5 bg-[#3B2FBF] hover:bg-[#3227a8] disabled:opacity-60 text-white text-xs font-bold rounded-lg shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoggingIn ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <span>Authenticate & Access Portal</span>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={onNavigateHome}
              className="text-xs text-[#55587A] hover:underline"
            >
              &larr; Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Top Bar */}
      <div className="bg-white rounded-2xl border border-[#DCDDEE] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#1B1A4E] text-[#0E9F80] flex items-center justify-center font-bold text-lg">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#1B1A4E]">
                {currentUser.name}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-[#3B2FBF] border border-indigo-200">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-[#55587A]">
              {currentUser.designation} · {currentUser.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={isLoading}
            className="p-2 text-[#55587A] hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenCreateJob}
            className="px-4 py-2 bg-[#3B2FBF] hover:bg-[#3227a8] text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Job</span>
          </button>
          {currentUser.role === 'Admin' && (
            <button
              onClick={handlePasswordResetRequest}
              disabled={isRequestingPasswordReset}
              className="px-3.5 py-2 text-xs font-semibold text-[#3B2FBF] hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1.5 border border-indigo-200 disabled:opacity-60"
            >
              <Lock className="w-4 h-4" />
              <span>{isRequestingPasswordReset ? 'Sending Link…' : 'Change Password'}</span>
            </button>
          )}
          <button
            onClick={onLogout}
            className="px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1.5 border border-rose-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {passwordResetError && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700" role="alert">{passwordResetError}</div>
      )}
      {passwordResetMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800" role="status">{passwordResetMessage}</div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#DCDDEE] overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'dashboard'
              ? 'bg-[#1B1A4E] text-white'
              : 'text-[#55587A] hover:bg-slate-100'
          }`}
        >
          Dashboard Overview
        </button>

        <button
          onClick={() => setActiveTab('applicants')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'applicants'
              ? 'bg-[#1B1A4E] text-white'
              : 'text-[#55587A] hover:bg-slate-100'
          }`}
        >
          <span>Applicants Pipeline</span>
          <span className="bg-[#3B2FBF] text-white text-[10px] px-1.5 py-0.2 rounded-full">
            {applications.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'jobs'
              ? 'bg-[#1B1A4E] text-white'
              : 'text-[#55587A] hover:bg-slate-100'
          }`}
        >
          <span>Job Postings</span>
          <span className="bg-slate-200 text-[#1B1A4E] text-[10px] px-1.5 py-0.2 rounded-full">
            {jobs.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'enquiries'
              ? 'bg-[#1B1A4E] text-white'
              : 'text-[#55587A] hover:bg-slate-100'
          }`}
        >
          <span>Client Enquiries</span>
          {stats && stats.pendingEnquiries > 0 && (
            <span className="bg-[#0E9F80] text-white text-[10px] px-1.5 py-0.2 rounded-full">
              {stats.pendingEnquiries} New
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: DASHBOARD */}
      {activeTab === 'dashboard' && stats && (
        <div className="space-y-8 animate-in fade-in">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#DCDDEE] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#55587A]">
                  Active Open Jobs
                </span>
                <div className="text-3xl font-extrabold text-[#1B1A4E] mt-1 tabular-nums">
                  {stats.openJobs}
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Out of {jobs.length} total postings
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-[#3B2FBF] flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#DCDDEE] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#55587A]">
                  Total Candidate Profiles
                </span>
                <div className="text-3xl font-extrabold text-[#1B1A4E] mt-1 tabular-nums">
                  {stats.totalApplicants}
                </div>
                <span className="text-[11px] text-[#0E9F80] mt-1 block font-semibold">
                  100% DPDP Verified Consent
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0E9F80] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#DCDDEE] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#55587A]">
                  New Applicants (7 Days)
                </span>
                <div className="text-3xl font-extrabold text-[#3B2FBF] mt-1 tabular-nums">
                  {stats.newApplicantsThisWeek}
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Active recruitment velocity
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-[#3B2FBF] flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#DCDDEE] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#55587A]">
                  Corporate Enquiries
                </span>
                <div className="text-3xl font-extrabold text-[#1B1A4E] mt-1 tabular-nums">
                  {stats.clientEnquiries}
                </div>
                <span className="text-[11px] text-amber-600 mt-1 block font-semibold">
                  {stats.pendingEnquiries} awaiting initial response
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Building className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Pipeline Stage Bar */}
          <div className="bg-white rounded-xl border border-[#DCDDEE] p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#1B1A4E] uppercase tracking-wider">
              Talent Pipeline Distribution
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {Object.entries(stats.statusBreakdown).map(([statusName, count]) => (
                <div
                  key={statusName}
                  onClick={() => {
                    setApplicantStatusFilter(statusName);
                    setActiveTab('applicants');
                  }}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-[#3B2FBF] cursor-pointer transition-colors"
                >
                  <span className="text-[11px] font-semibold text-[#55587A] block">
                    {statusName}
                  </span>
                  <span className="text-xl font-bold text-[#1B1A4E] tabular-nums">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Applications Feed */}
          <div className="bg-white rounded-xl border border-[#DCDDEE] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1B1A4E]">
                Latest Candidate Applications
              </h3>
              <button
                onClick={() => setActiveTab('applicants')}
                className="text-xs font-bold text-[#3B2FBF] hover:underline"
              >
                View Complete Pipeline &rarr;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-[#55587A] font-semibold">
                    <th className="pb-3">Candidate</th>
                    <th className="pb-3">Applied Mandate</th>
                    <th className="pb-3">Current Company</th>
                    <th className="pb-3">Experience</th>
                    <th className="pb-3">Expected CTC</th>
                    <th className="pb-3">Pipeline Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.slice(0, 5).map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="py-3">
                        <span className="font-bold text-[#1B1A4E] block">
                          {app.full_name}
                        </span>
                        <span className="text-[11px] text-slate-400">{app.email}</span>
                      </td>
                      <td className="py-3 max-w-[200px] truncate text-[#1B1A4E] font-medium">
                        {app.job_title}
                      </td>
                      <td className="py-3 text-[#55587A]">{app.current_company}</td>
                      <td className="py-3 font-mono">{app.total_experience} Yrs</td>
                      <td className="py-3 font-mono">{app.expected_ctc}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-[#1B1A4E]">
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedApplicant(app);
                            setActiveTab('applicants');
                          }}
                          className="text-xs font-bold text-[#3B2FBF] hover:underline"
                        >
                          Review &rarr;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: APPLICANTS PIPELINE */}
      {activeTab === 'applicants' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Controls & Export Strip */}
          <div className="bg-white rounded-xl border border-[#DCDDEE] p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search applicant name, email, company..."
                  value={applicantSearch}
                  onChange={(e) => setApplicantSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs focus:outline-none focus:border-[#3B2FBF]"
                />
              </div>

              {/* Job Filter */}
              <select
                value={applicantJobFilter}
                onChange={(e) => setApplicantJobFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs font-medium text-[#1B1A4E]"
              >
                <option value="all">All Jobs & Talent Pool</option>
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={applicantStatusFilter}
                onChange={(e) => setApplicantStatusFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs font-medium text-[#1B1A4E]"
              >
                <option value="all">All Pipeline Stages</option>
                <option value="New">New</option>
                <option value="Screening">Screening</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview">Interview</option>
                <option value="Offered">Offered</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Export Actions */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <button
                type="button"
                onClick={() => downloadProtectedFile('/api/applications/export/csv?job_id=' + applicantJobFilter, 'UNIVA_Applicants.csv')}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#1B1A4E] text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              <button
                type="button"
                onClick={() => downloadProtectedFile('/api/applications/export/resumes-zip?job_id=' + applicantJobFilter, 'UNIVA_Resumes.zip')}
                className="px-3.5 py-1.5 bg-[#1B1A4E] hover:bg-[#3B2FBF] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <FileArchive className="w-3.5 h-3.5" />
                <span>Download Resumes (ZIP)</span>
              </button>
            </div>
          </div>

          {/* Applicants Table */}
          <div className="bg-white rounded-xl border border-[#DCDDEE] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-[#DCDDEE] text-[#55587A] font-bold">
                  <tr>
                    <th className="py-3 px-4">Candidate Profile</th>
                    <th className="py-3 px-4">Applied Opening</th>
                    <th className="py-3 px-4">Current Role & Firm</th>
                    <th className="py-3 px-4">Experience</th>
                    <th className="py-3 px-4">Current / Expected CTC</th>
                    <th className="py-3 px-4">Notice Period</th>
                    <th className="py-3 px-4">Pipeline Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApplicants.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400">
                        No applicants found matching this filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredApplicants.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => setSelectedApplicant(app)}
                            className="font-bold text-[#1B1A4E] hover:text-[#3B2FBF] text-left block text-xs"
                          >
                            {app.full_name}
                          </button>
                          <div className="text-[11px] text-slate-400">
                            {app.email} · {app.phone}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 max-w-[180px] truncate text-[#1B1A4E] font-medium">
                          {app.job_title}
                        </td>

                        <td className="py-3.5 px-4 text-[#55587A]">
                          <span className="block font-medium text-[#1B1A4E]">
                            {app.designation}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {app.current_company}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-mono">
                          {app.total_experience} Yrs
                        </td>

                        <td className="py-3.5 px-4 font-mono text-[11px]">
                          <div>{app.current_ctc}</div>
                          <div className="text-[#0E9F80] font-semibold">Exp: {app.expected_ctc}</div>
                        </td>

                        <td className="py-3.5 px-4 text-[#55587A]">
                          {app.notice_period}
                        </td>

                        {/* Interactive Status Changer */}
                        <td className="py-3.5 px-4">
                          <select
                            value={app.status}
                            onChange={(e) =>
                              handleUpdateApplicantStatus(app.id, e.target.value as ApplicationStatus)
                            }
                            className={`px-2 py-1 rounded text-[11px] font-bold border focus:outline-none ${
                              app.status === 'Offered' || app.status === 'Hired'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : app.status === 'Interview'
                                ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                                : app.status === 'Shortlisted'
                                ? 'bg-teal-50 text-teal-800 border-teal-200'
                                : app.status === 'Rejected'
                                ? 'bg-rose-50 text-rose-800 border-rose-200'
                                : 'bg-slate-100 text-slate-800 border-slate-200'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Screening">Screening</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Interview">Interview</option>
                            <option value="Offered">Offered</option>
                            <option value="Hired">Hired</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>

                        {/* Action buttons */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {app.resume_path ? (
                              <button
                                type="button"
                                onClick={() => downloadProtectedFile('/api/applications/' + app.id + '/resume', app.resume_filename || 'resume.pdf', true)}
                                title="Download / View PDF Resume"
                                className="p-1.5 text-[#3B2FBF] hover:bg-indigo-50 rounded"
                              >
                                <FileText className="w-4 h-4" />
                              </button>
                            ) : (
                              <span className="px-2 text-[10px] text-slate-400">No resume</span>
                            )}
                            <button
                              onClick={() => setSelectedApplicant(app)}
                              className="px-2.5 py-1 text-xs font-bold text-[#1B1A4E] hover:bg-slate-100 rounded border border-slate-200"
                            >
                              Notes ({app.notes?.length || 0})
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* APPLICANT DETAIL & NOTES DRAWER */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-end">
          <div className="bg-white w-full max-w-xl h-full shadow-2xl p-6 sm:p-8 space-y-6 overflow-y-auto animate-in slide-in-from-right">
            {/* Drawer Header */}
            <div className="flex items-start justify-between border-b border-[#DCDDEE] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0E9F80]">
                  Application ID: {selectedApplicant.id}
                </span>
                <h2 className="text-xl font-extrabold text-[#1B1A4E] mt-0.5">
                  {selectedApplicant.full_name}
                </h2>
                <p className="text-xs text-[#55587A]">
                  Applied for: <strong className="text-[#1B1A4E]">{selectedApplicant.job_title}</strong>
                </p>
              </div>

              <button
                onClick={() => setSelectedApplicant(null)}
                className="p-1.5 text-slate-400 hover:text-[#1B1A4E] rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Candidate Specs Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-[#DCDDEE]">
              <div>
                <span className="text-[#55587A] block">Email</span>
                <span className="font-semibold text-[#1B1A4E]">{selectedApplicant.email}</span>
              </div>
              <div>
                <span className="text-[#55587A] block">Mobile</span>
                <span className="font-semibold text-[#1B1A4E]">{selectedApplicant.phone}</span>
              </div>
              <div>
                <span className="text-[#55587A] block">Current Organization</span>
                <span className="font-semibold text-[#1B1A4E]">{selectedApplicant.current_company}</span>
              </div>
              <div>
                <span className="text-[#55587A] block">Current Designation</span>
                <span className="font-semibold text-[#1B1A4E]">{selectedApplicant.designation}</span>
              </div>
              <div>
                <span className="text-[#55587A] block">Total Experience</span>
                <span className="font-semibold text-[#1B1A4E] font-mono">{selectedApplicant.total_experience} Years</span>
              </div>
              <div>
                <span className="text-[#55587A] block">Location</span>
                <span className="font-semibold text-[#1B1A4E]">{selectedApplicant.location}</span>
              </div>
              <div>
                <span className="text-[#55587A] block">Current Fixed CTC</span>
                <span className="font-semibold text-[#1B1A4E] font-mono">{selectedApplicant.current_ctc}</span>
              </div>
              <div>
                <span className="text-[#55587A] block">Expected CTC</span>
                <span className="font-semibold text-[#0E9F80] font-mono font-bold">{selectedApplicant.expected_ctc}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[#55587A] block">Notice Period</span>
                <span className="font-semibold text-[#1B1A4E]">{selectedApplicant.notice_period}</span>
              </div>
            </div>

            {/* Resume Action */}
            <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#3B2FBF]" />
                <div>
                  <span className="text-xs font-bold text-[#1B1A4E] block">
                    {selectedApplicant.resume_filename || 'Candidate_Resume.pdf'}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Protected Server Storage (PDF Verified)
                  </span>
                </div>
              </div>

              {selectedApplicant.resume_path ? (
                <button
                  type="button"
                  onClick={() => downloadProtectedFile('/api/applications/' + selectedApplicant.id + '/resume', selectedApplicant.resume_filename || 'resume.pdf', true)}
                  className="px-3.5 py-1.5 bg-[#3B2FBF] hover:bg-[#3227a8] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>View PDF</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-xs text-slate-500">No resume file uploaded</span>
              )}
            </div>

            {/* Pipeline Stage Select */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1B1A4E]">
                Update Candidate Status
              </label>
              <select
                value={selectedApplicant.status}
                onChange={(e) =>
                  handleUpdateApplicantStatus(selectedApplicant.id, e.target.value as ApplicationStatus)
                }
                className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs font-bold text-[#1B1A4E]"
              >
                <option value="New">New</option>
                <option value="Screening">Screening</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview">Interview</option>
                <option value="Offered">Offered</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Internal Recruiter Notes */}
            <div className="space-y-4 pt-4 border-t border-[#DCDDEE]">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B1A4E] flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#3B2FBF]" />
                  <span>Internal Recruiter Notes ({selectedApplicant.notes?.length || 0})</span>
                </h4>
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  rows={2}
                  placeholder="Add evaluation note, screening feedback, or interview feedback..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF] focus:bg-white resize-none"
                />
                <button
                  type="submit"
                  disabled={isAddingNote || !newNoteText.trim()}
                  className="px-4 py-1.5 bg-[#1B1A4E] hover:bg-[#3B2FBF] disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors float-right"
                >
                  {isAddingNote ? 'Saving...' : 'Add Internal Note'}
                </button>
              </form>

              <div className="clear-both" />

              {/* Notes List */}
              <div className="space-y-3 pt-2">
                {(!selectedApplicant.notes || selectedApplicant.notes.length === 0) ? (
                  <p className="text-xs text-slate-400 italic">
                    No recruiter notes recorded for this candidate yet.
                  </p>
                ) : (
                  selectedApplicant.notes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px] text-[#55587A]">
                        <span className="font-bold text-[#1B1A4E]">{note.author}</span>
                        <span>{new Date(note.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p className="text-[#1B1A4E] leading-relaxed">{note.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: JOBS MANAGEMENT */}
      {activeTab === 'jobs' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#1B1A4E]">
                Executive Job Postings
              </h3>
              <p className="text-xs text-[#55587A]">
                Create, update, toggle open/close status, or archive openings.
              </p>
            </div>
            <button
              onClick={handleOpenCreateJob}
              className="px-4 py-2 bg-[#3B2FBF] hover:bg-[#3227a8] text-white text-xs font-bold rounded-lg shadow transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Posting</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-[#DCDDEE] p-6 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#3B2FBF]">{job.industry}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        job.status === 'Open'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : job.status === 'Closed'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#1B1A4E] leading-snug">
                    {job.title}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-[#55587A]">
                    <span>{job.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{job.employment_type}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{job.experience_min}–{job.experience_max} Yrs</span>
                  </div>

                  <p className="text-xs text-[#55587A] line-clamp-2">
                    {job.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleJobStatus(job)}
                      className="px-2.5 py-1 text-xs font-semibold rounded border border-slate-200 hover:bg-slate-100 transition-colors"
                    >
                      {job.status === 'Open' ? 'Close Job' : 'Reopen Job'}
                    </button>
                    <button
                      onClick={() => handleOpenEditJob(job)}
                      className="p-1.5 text-slate-600 hover:text-[#3B2FBF] rounded"
                      title="Edit Job"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>

                  {currentUser.role === 'Admin' && (
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 rounded"
                      title="Delete Job"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE / EDIT JOB MODAL */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#DCDDEE] p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between border-b border-[#DCDDEE] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#3B2FBF]">
                  {editingJob ? 'Modify Existing Opening' : 'Post New Opening'}
                </span>
                <h3 className="text-xl font-extrabold text-[#1B1A4E] mt-0.5">
                  {editingJob ? editingJob.title : 'New Strategic Job Mandate'}
                </h3>
              </div>
              <button
                onClick={() => setIsJobModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-[#1B1A4E] rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {jobFormError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
                {jobFormError}
              </div>
            )}

            <form onSubmit={handleSaveJob} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                    Job Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior VP – Automotive Manufacturing Operations"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E] focus:outline-none focus:border-[#3B2FBF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                    Industry Sector <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={jobIndustry}
                    onChange={(e) => setJobIndustry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E]"
                  >
                    <option value="IT & Software">IT & Software</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Construction & Infrastructure">Construction & Infrastructure</option>
                    <option value="Banking & Financial Services (BFSI)">Banking & Financial Services (BFSI)</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Retail & E-commerce">Retail & E-commerce</option>
                    <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                    <option value="Corporate & Professional Services">Corporate & Professional Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Operations / Technology"
                    value={jobDept}
                    onChange={(e) => setJobDept(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                    Location Hub <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bengaluru / Hybrid"
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                    Employment Type
                  </label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E]"
                  >
                    <option value="Permanent">Permanent Placement</option>
                    <option value="Contract">Contract (on UNIVA Payroll)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                    Seniority Level
                  </label>
                  <select
                    value={jobSeniority}
                    onChange={(e) => setJobSeniority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E]"
                  >
                    <option value="Mid-Senior">Mid-Senior</option>
                    <option value="Senior">Senior</option>
                    <option value="Executive">Executive</option>
                    <option value="Leadership">Leadership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                    Experience Range (Min – Max Yrs)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={jobExpMin}
                      onChange={(e) => setJobExpMin(Number(e.target.value))}
                      className="w-1/2 px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs"
                    />
                    <span>to</span>
                    <input
                      type="number"
                      value={jobExpMax}
                      onChange={(e) => setJobExpMax(Number(e.target.value))}
                      className="w-1/2 px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                    Indicative Compensation Package
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹35 – 50 LPA"
                    value={jobSalary}
                    onChange={(e) => setJobSalary(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                    Status & Visibility
                  </label>
                  <select
                    value={jobStatus}
                    onChange={(e) => setJobStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs text-[#1B1A4E]"
                  >
                    <option value="Open">Open (Active on Public Portal)</option>
                    <option value="Draft">Draft (Internal Only)</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                  Job Description & Context
                </label>
                <textarea
                  rows={3}
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  placeholder="Comprehensive description of the opening..."
                  className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                  Key Responsibilities (One per line)
                </label>
                <textarea
                  rows={3}
                  value={jobResponsibilities}
                  onChange={(e) => setJobResponsibilities(e.target.value)}
                  placeholder="Oversee plant operations...&#10;Implement ISO 45001 safety norms..."
                  className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B1A4E] mb-1">
                  Candidate Requirements (One per line)
                </label>
                <textarea
                  rows={3}
                  value={jobRequirements}
                  onChange={(e) => setJobRequirements(e.target.value)}
                  placeholder="B.Tech in Mechanical Engineering...&#10;12+ years of manufacturing leadership..."
                  className="w-full px-3 py-2 bg-slate-50 border border-[#DCDDEE] rounded-lg text-xs resize-none"
                />
              </div>

              <div className="pt-4 border-t border-[#DCDDEE] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#55587A] hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingJob}
                  className="px-6 py-2.5 bg-[#3B2FBF] hover:bg-[#3227a8] text-white text-xs font-bold rounded-lg transition-all"
                >
                  {isSavingJob ? 'Saving Job...' : editingJob ? 'Update Job' : 'Publish Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: CLIENT ENQUIRIES */}
      {activeTab === 'enquiries' && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h3 className="text-base font-bold text-[#1B1A4E]">
              Corporate Client Enquiries Inbox
            </h3>
            <p className="text-xs text-[#55587A]">
              Review enterprise hiring requisitions submitted via public portal.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {enquiries.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#DCDDEE] p-12 text-center text-slate-400">
                No client enquiries recorded yet.
              </div>
            ) : (
              enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="bg-white rounded-xl border border-[#DCDDEE] p-6 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#3B2FBF]">
                        {enq.requirement_type}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-xs text-slate-400 font-mono">
                        {new Date(enq.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#1B1A4E]">
                      {enq.company}
                    </h4>

                    <div className="text-xs text-[#55587A] space-x-3">
                      <span><strong>Contact:</strong> {enq.contact_person} ({enq.designation || 'Lead'})</span>
                      <span><strong>Email:</strong> {enq.email}</span>
                      <span><strong>Phone:</strong> {enq.phone}</span>
                    </div>

                    {enq.estimated_headcount && (
                      <div className="text-xs text-[#0E9F80] font-semibold">
                        Estimated Headcount: {enq.estimated_headcount}
                      </div>
                    )}

                    <p className="text-xs text-[#1B1A4E] bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2 leading-relaxed">
                      {enq.message || 'No additional message text provided.'}
                    </p>
                  </div>

                  {/* Status Dropdown */}
                  <div className="shrink-0 flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#55587A]">
                      Enquiry Status
                    </label>
                    <select
                      value={enq.status}
                      onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none ${
                        enq.status === 'New'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : enq.status === 'In Discussion'
                          ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                          : enq.status === 'Contacted'
                          ? 'bg-teal-50 text-teal-800 border-teal-200'
                          : 'bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
