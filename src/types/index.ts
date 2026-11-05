export type JobStatus = 'Open' | 'Draft' | 'Closed';
export type EmploymentType = 'Permanent' | 'Contract';
export type SeniorityLevel = 'Mid-Senior' | 'Senior' | 'Executive' | 'Leadership';

export interface Job {
  id: string;
  title: string;
  slug: string;
  department: string;
  industry: string;
  location: string;
  employment_type: EmploymentType;
  seniority: SeniorityLevel;
  experience_min: number;
  experience_max: number;
  salary_range: string;
  show_salary: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  status: JobStatus;
  closing_date: string;
  created_by: string;
  created_at: string;
}

export type ApplicationStatus =
  | 'New'
  | 'Screening'
  | 'Shortlisted'
  | 'Interview'
  | 'Offered'
  | 'Hired'
  | 'Rejected';

export interface RecruiterNote {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface Application {
  id: string;
  reference_id?: string;
  job_id: string | null;
  job_title: string;
  full_name: string;
  email: string;
  phone: string;
  current_company: string;
  designation: string;
  total_experience: number;
  current_ctc: string;
  expected_ctc: string;
  notice_period: string;
  location: string;
  resume_filename: string;
  status: ApplicationStatus;
  notes: RecruiterNote[];
  consent_given: boolean;
  created_at: string;
}

export type EnquiryStatus = 'New' | 'Contacted' | 'In Discussion' | 'Closed';

export interface ClientEnquiry {
  id: string;
  company: string;
  contact_person: string;
  designation?: string;
  email: string;
  phone: string;
  requirement_type: string;
  estimated_headcount?: string;
  message: string;
  status: EnquiryStatus;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Recruiter';
  designation: string;
}

export interface DashboardStats {
  openJobs: number;
  totalApplicants: number;
  newApplicantsThisWeek: number;
  clientEnquiries: number;
  pendingEnquiries: number;
  statusBreakdown: Record<string, number>;
}
