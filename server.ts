import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import JSZip from 'jszip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Ensure data directories exist
const DATA_DIR = process.env.VERCEL ? path.join('/tmp', 'univa-data') : path.join(__dirname, 'data');
const RESUMES_DIR = path.join(DATA_DIR, 'resumes');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(RESUMES_DIR)) fs.mkdirSync(RESUMES_DIR, { recursive: true });

const DB_FILE = path.join(DATA_DIR, 'db.json');

// Configure multer for PDF resume uploads (Max 5MB, PDF only)
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, RESUMES_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${uniqueSuffix}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF resumes are supported.'));
    }
  },
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initial seed data
const initialData = {
  users: [
    {
      id: 'usr-1',
      name: 'Rajesh Sharma',
      email: 'admin@univahiretech.com',
      password: 'admin123',
      role: 'Admin',
      designation: 'Director of Talent Solutions',
      createdAt: '2026-01-10T10:00:00Z',
    },
    {
      id: 'usr-2',
      name: 'Priyanka Desai',
      email: 'recruiter@univahiretech.com',
      password: 'recruiter123',
      role: 'Recruiter',
      designation: 'Lead Executive Search Partner',
      createdAt: '2026-01-15T10:00:00Z',
    },
  ],
  jobs: [
    {
      id: 'job-101',
      title: 'VP – Plant Operations & Manufacturing Excellence',
      slug: 'vp-plant-operations-manufacturing-excellence',
      department: 'Operations',
      industry: 'Manufacturing',
      location: 'Pune / Chakan Auto Cluster',
      employment_type: 'Permanent',
      seniority: 'Executive',
      experience_min: 15,
      experience_max: 22,
      salary_range: '₹45 – 60 LPA',
      show_salary: true,
      description: 'UNIVA HIRE TECH is leading the confidential executive search for a premier multinational manufacturing enterprise. We seek a seasoned Vice President to lead end-to-end plant operations, lean manufacturing, safety governance, and capacity expansion across multi-site facilities.',
      responsibilities: [
        'Drive multi-site plant productivity, OEE optimization, and ISO/OHSAS safety compliance.',
        'Oversee workforce planning, contractual labor management, and union-free employee relations.',
        'Implement Industry 4.0 automation, smart supply chains, and annual capital expenditure budgets.',
        'Lead cross-functional teams across engineering, procurement, and quality assurance.',
      ],
      requirements: [
        'B.Tech / B.E in Mechanical or Production Engineering; MBA/PGDM from a premier institute preferred.',
        '15+ years of progressive manufacturing leadership experience in automotive or heavy machinery.',
        'Demonstrated track record of TPM, Six Sigma Black Belt methodologies, and regulatory audits.',
        'Exceptional stakeholder management and executive presence.',
      ],
      status: 'Open',
      closing_date: '2026-12-15',
      created_by: 'Rajesh Sharma',
      created_at: '2026-10-28T09:30:00Z',
    },
    {
      id: 'job-102',
      title: 'Director – Enterprise Cloud Architecture & Engineering',
      slug: 'director-enterprise-cloud-architecture',
      department: 'Technology',
      industry: 'IT & Software',
      location: 'Bengaluru / Hybrid',
      employment_type: 'Permanent',
      seniority: 'Executive',
      experience_min: 14,
      experience_max: 20,
      salary_range: '₹55 – 75 LPA',
      show_salary: true,
      description: 'Partnering with a Global Capability Center (GCC) in Bengaluru, UNIVA HIRE TECH is sourcing a visionary Director of Cloud Architecture to drive digital transformation, distributed microservices, and AI platform infrastructure.',
      responsibilities: [
        'Define the strategic cloud roadmap across AWS, Azure, and private cloud data fabrics.',
        'Lead an elite team of 40+ Principal Architects and Senior Staff Engineers.',
        'Ensure enterprise-grade resilience, SOC2/ISO 27001 compliance, and cost governance (FinOps).',
        'Partner with C-suite stakeholders to translate business goals into scalable software platforms.',
      ],
      requirements: [
        'B.Tech / M.Tech in Computer Science or related quantitative field.',
        '14+ years in software engineering with 6+ years in high-level architectural leadership.',
        'Deep mastery of distributed systems, Kubernetes orchestration, zero-trust security, and modern DevOps.',
        'Prior experience in high-scale enterprise SaaS or Fortune 500 GCCs.',
      ],
      status: 'Open',
      closing_date: '2026-12-20',
      created_by: 'Priyanka Desai',
      created_at: '2026-10-30T11:15:00Z',
    },
    {
      id: 'job-103',
      title: 'Head of Talent Acquisition & Workforce Planning',
      slug: 'head-of-talent-acquisition-workforce-planning',
      department: 'Human Resources',
      industry: 'Corporate & Professional Services',
      location: 'Gurugram / NCR',
      employment_type: 'Permanent',
      seniority: 'Senior',
      experience_min: 10,
      experience_max: 16,
      salary_range: '₹30 – 42 LPA',
      show_salary: true,
      description: 'A rapid-growth management consulting and professional services firm has engaged UNIVA HIRE TECH to appoint their Head of TA. You will architect executive talent pipelines, campus programs, and strategic contractor workforce models.',
      responsibilities: [
        'Own lateral, leadership, and contractual hiring strategies across Pan-India delivery hubs.',
        'Optimize recruitment turnaround times, agency partnerships, and candidate experience.',
        'Lead employer branding campaigns and diversity & inclusion initiatives.',
        'Oversee recruitment analytics, ATS automation, and statutory recruitment compliance.',
      ],
      requirements: [
        'MBA in HR / Personnel Management from a recognized business school (XLRI, TISS, SCMHRD, etc.).',
        '10+ years in talent acquisition with leadership experience handling 300+ annual lateral/executive hires.',
        'Experience managing third-party staffing vendors and contract-to-hire frameworks.',
        'Strong consultative approach and data-driven decision making.',
      ],
      status: 'Open',
      closing_date: '2026-12-10',
      created_by: 'Rajesh Sharma',
      created_at: '2026-11-01T08:00:00Z',
    },
    {
      id: 'job-104',
      title: 'Senior Contract Project Manager – Metro Rail Civil Infrastructure',
      slug: 'senior-project-manager-metro-rail',
      department: 'Projects & Engineering',
      industry: 'Construction & Infrastructure',
      location: 'Mumbai / On-site',
      employment_type: 'Contract',
      seniority: 'Senior',
      experience_min: 12,
      experience_max: 18,
      salary_range: '₹28 – 38 LPA (on UNIVA Payroll)',
      show_salary: true,
      description: 'Deployed directly on UNIVA HIRE TECH’s payroll for a 24-month high-profile infrastructure project with a leading Indian construction conglomerate. Full statutory benefits (EPF, ESIC, insurance) and seamless HR support provided.',
      responsibilities: [
        'Oversee civil construction packages, elevated viaducts, and station works for urban metro lines.',
        'Enforce contractor safety compliance, QA/QC standards, and milestone delivery.',
        'Coordinate with government authorities, utility agencies, and design consultants.',
        'Manage contract workforce safety protocols and statutory site labor documentation.',
      ],
      requirements: [
        'B.E / B.Tech in Civil Engineering; PMP or NICMAR qualification strongly preferred.',
        '12+ years in large-scale infrastructure, metro rail, highway bridges, or viaduct construction.',
        'Robust understanding of FIDIC contracts, site safety regulations, and labor compliance.',
        'Willingness to commit to a 24-month fixed assignment with high renewal probability.',
      ],
      status: 'Open',
      closing_date: '2026-12-05',
      created_by: 'Priyanka Desai',
      created_at: '2026-11-02T14:20:00Z',
    },
    {
      id: 'job-105',
      title: 'Senior Financial Controller & Statutory Audit Lead',
      slug: 'senior-financial-controller-statutory-audit',
      department: 'Finance & Accounts',
      industry: 'Banking & Financial Services (BFSI)',
      location: 'Hyderabad / Financial District',
      employment_type: 'Permanent',
      seniority: 'Senior',
      experience_min: 9,
      experience_max: 14,
      salary_range: '₹26 – 35 LPA',
      show_salary: true,
      description: 'Representing a leading non-banking financial institution (NBFC), UNIVA HIRE TECH is recruiting a Senior Financial Controller to head regulatory reporting, direct/indirect taxation, and corporate governance.',
      responsibilities: [
        'Supervise quarterly financial reporting, IND-AS compliance, and statutory external audits.',
        'Manage corporate taxation, GST reconciliations, TDS filings, and RBI compliance requirements.',
        'Lead financial planning, cost control, and treasury cash-flow forecasting.',
        'Ensure rigorous internal financial controls and risk governance.',
      ],
      requirements: [
        'Qualified Chartered Accountant (CA) with 9+ years of post-qualification experience.',
        'Proven expertise in BFSI, NBFC, or Big 4 audit practice.',
        'Thorough knowledge of Indian tax legislation, Companies Act, and statutory filing norms.',
        'Strong leadership skills with experience managing teams of 8+ finance professionals.',
      ],
      status: 'Open',
      closing_date: '2026-12-18',
      created_by: 'Rajesh Sharma',
      created_at: '2026-11-03T10:45:00Z',
    },
    {
      id: 'job-106',
      title: 'Senior Supply Chain & Logistics Operations Manager',
      slug: 'senior-supply-chain-logistics-operations-manager',
      department: 'Supply Chain',
      industry: 'Logistics & Supply Chain',
      location: 'Chennai / Sriperumbudur Hub',
      employment_type: 'Contract',
      seniority: 'Senior',
      experience_min: 8,
      experience_max: 14,
      salary_range: '₹22 – 30 LPA (on UNIVA Payroll)',
      show_salary: true,
      description: 'Long-term contractual engagement managed on UNIVA HIRE TECH payroll for a top e-commerce and retail supply chain giant. Lead fulfillment center logistics, third-party fleet management, and dispatch operations.',
      responsibilities: [
        'Direct 250,000+ sq. ft. automated fulfillment hub operations, cross-docking, and last-mile dispatch.',
        'Oversee contractual warehouse staffing rosters, vendor performance, and safety drills.',
        'Drive SLA adherence, inventory accuracy (99.8%+), and cost-per-unit reductions.',
        'Manage EHS safety standards, workplace audit readiness, and employee welfare.',
      ],
      requirements: [
        'Degree in Supply Chain, Engineering, or Logistics Management.',
        '8+ years in multi-client warehouse operations, 3PL/4PL logistics, or large retail distribution.',
        'Familiarity with WMS (SAP/Manhattan), automated sorting, and labor laws governing contract workers.',
        'Demonstrated leadership in fast-paced operational shifts.',
      ],
      status: 'Open',
      closing_date: '2026-12-25',
      created_by: 'Priyanka Desai',
      created_at: '2026-11-04T12:00:00Z',
    },
    {
      id: 'job-107',
      title: 'Clinical Operations & Hospital Quality Assurance Head',
      slug: 'clinical-operations-hospital-qa-head',
      department: 'Healthcare Operations',
      industry: 'Healthcare',
      location: 'Bengaluru / Whitefield',
      employment_type: 'Permanent',
      seniority: 'Executive',
      experience_min: 11,
      experience_max: 17,
      salary_range: '₹32 – 44 LPA',
      show_salary: true,
      description: 'Exclusive mandate for a multi-specialty tertiary care hospital chain. Oversee clinical administration, NABH/JCI accreditation, medical staff workflows, and patient care standards.',
      responsibilities: [
        'Lead hospital accreditation (NABH 5th Edition), clinical governance, and infection control audits.',
        'Streamline outpatient/inpatient workflows and medical records documentation.',
        'Coordinate statutory healthcare compliance, biomedical waste management, and emergency response.',
      ],
      requirements: [
        'MBBS with MHA / MBA in Hospital Administration, or equivalent.',
        '11+ years in hospital quality systems, patient operations, and senior medical administration.',
      ],
      status: 'Open',
      closing_date: '2026-12-30',
      created_by: 'Rajesh Sharma',
      created_at: '2026-11-04T16:00:00Z',
    },
    {
      id: 'job-108',
      title: 'Senior Retail Store Operations & Expansion Lead',
      slug: 'senior-retail-store-operations-lead',
      department: 'Retail Operations',
      industry: 'Retail & E-commerce',
      location: 'Delhi NCR / Regional',
      employment_type: 'Permanent',
      seniority: 'Senior',
      experience_min: 9,
      experience_max: 15,
      salary_range: '₹24 – 32 LPA',
      show_salary: true,
      description: 'Lead Pan-India flagship store operations, retail front-line workforce training, and regional rollouts for a premium lifestyle retail brand.',
      responsibilities: [
        'Manage P&L, footfalls, conversion ratios, and visual merchandising standards across 45+ stores.',
        'Supervise store manager recruitment, incentives, and compliant contractor staffing.',
      ],
      requirements: [
        'Postgraduate degree in Retail Management, Marketing, or Business.',
        '9+ years in apparel/lifestyle multi-store operational leadership.',
      ],
      status: 'Open',
      closing_date: '2026-12-28',
      created_by: 'Priyanka Desai',
      created_at: '2026-11-05T09:00:00Z',
    },
  ],
  applications: [
    {
      id: 'app-901',
      job_id: 'job-101',
      job_title: 'VP – Plant Operations & Manufacturing Excellence',
      full_name: 'Anand Kulkarni',
      email: 'anand.kulkarni78@example.com',
      phone: '+91 98230 45678',
      current_company: 'Tata Motors Component Group',
      designation: 'Associate Vice President – Manufacturing',
      total_experience: 18,
      current_ctc: '₹48 LPA',
      expected_ctc: '₹58 LPA',
      notice_period: '60 Days',
      location: 'Pune, Maharashtra',
      resume_filename: 'Anand_Kulkarni_Executive_Resume.pdf',
      status: 'Interview',
      notes: [
        {
          id: 'note-1',
          author: 'Priyanka Desai',
          text: 'Conducted preliminary screening. Strong lean manufacturing background and 5-site operational experience. Forwarded to Client Director.',
          timestamp: '2026-11-01T14:30:00Z',
        },
      ],
      consent_given: true,
      created_at: '2026-10-31T10:15:00Z',
    },
    {
      id: 'app-902',
      job_id: 'job-102',
      job_title: 'Director – Enterprise Cloud Architecture & Engineering',
      full_name: 'Sneha Venkatesh',
      email: 'sneha.cloud.lead@example.com',
      phone: '+91 98450 12390',
      current_company: 'Infosys Finacle Digital',
      designation: 'Principal Cloud Architect',
      total_experience: 15,
      current_ctc: '₹54 LPA',
      expected_ctc: '₹68 LPA',
      notice_period: '30 Days (Negotiable)',
      location: 'Bengaluru, Karnataka',
      resume_filename: 'Sneha_Venkatesh_CloudArchitect_CV.pdf',
      status: 'Shortlisted',
      notes: [
        {
          id: 'note-2',
          author: 'Rajesh Sharma',
          text: 'Outstanding AWS & Azure certifications. Handled ₹120 Cr annual cloud infrastructure spend. Client panel interview scheduled for next Tuesday.',
          timestamp: '2026-11-03T11:00:00Z',
        },
      ],
      consent_given: true,
      created_at: '2026-11-02T16:20:00Z',
    },
    {
      id: 'app-903',
      job_id: 'job-104',
      job_title: 'Senior Contract Project Manager – Metro Rail Civil Infrastructure',
      full_name: 'Virendra Singh Rawat',
      email: 'virendra.rawat.civil@example.com',
      phone: '+91 97110 88231',
      current_company: 'L&T Heavy Civil Infra',
      designation: 'Senior Project Manager – Elevated Viaducts',
      total_experience: 14,
      current_ctc: '₹27 LPA',
      expected_ctc: '₹34 LPA',
      notice_period: 'Immediate / 15 Days',
      location: 'Navi Mumbai',
      resume_filename: 'Virendra_Rawat_Metro_Project_CV.pdf',
      status: 'Offered',
      notes: [
        {
          id: 'note-3',
          author: 'Priyanka Desai',
          text: 'Client approved after second round interview with Project Director. Offer letter issued for 24-month deployment on UNIVA payroll.',
          timestamp: '2026-11-04T15:45:00Z',
        },
      ],
      consent_given: true,
      created_at: '2026-11-03T09:10:00Z',
    },
    {
      id: 'app-904',
      job_id: 'job-103',
      job_title: 'Head of Talent Acquisition & Workforce Planning',
      full_name: 'Meenakshi Sundaram',
      email: 'meenakshi.hrlead@example.com',
      phone: '+91 98840 99120',
      current_company: 'KPMG India',
      designation: 'Associate Director – Lateral Recruitment',
      total_experience: 12,
      current_ctc: '₹32 LPA',
      expected_ctc: '₹40 LPA',
      notice_period: '90 Days',
      location: 'Gurugram, Haryana',
      resume_filename: 'Meenakshi_Sundaram_TA_Head.pdf',
      status: 'Screening',
      notes: [
        {
          id: 'note-4',
          author: 'Rajesh Sharma',
          text: 'Reviewing compensation breakdown and notice period buyout flexibility.',
          timestamp: '2026-11-04T12:00:00Z',
        },
      ],
      consent_given: true,
      created_at: '2026-11-04T11:45:00Z',
    },
    {
      id: 'app-905',
      job_id: null,
      job_title: 'General Executive Talent Pool',
      full_name: 'Deepak Nair',
      email: 'deepak.nair.ops@example.com',
      phone: '+91 94470 65432',
      current_company: 'Adani Ports & SEZ',
      designation: 'General Manager – Logistics',
      total_experience: 16,
      current_ctc: '₹38 LPA',
      expected_ctc: '₹48 LPA',
      notice_period: '45 Days',
      location: 'Kochi / Relocatable Pan-India',
      resume_filename: 'Deepak_Nair_Logistics_Leadership.pdf',
      status: 'New',
      notes: [],
      consent_given: true,
      created_at: '2026-11-05T08:30:00Z',
    },
  ],
  enquiries: [
    {
      id: 'enq-301',
      company: 'Bharat Precision Dynamics Ltd.',
      contact_person: 'Vikramaditya Sengupta',
      designation: 'Chief Operating Officer',
      email: 'v.sengupta@bharatprecision.in',
      phone: '+91 98300 23412',
      requirement_type: 'Contract Staffing (150+ Technical Roles)',
      estimated_headcount: '150-200 Personnel',
      message: 'We are expanding our EV component manufacturing plant near Hosur and require end-to-end contractual staffing on UNIVA payroll, including complete EPF, ESIC, and factory safety compliance support.',
      status: 'In Discussion',
      created_at: '2026-11-02T13:40:00Z',
    },
    {
      id: 'enq-302',
      company: 'Apex Fintech Solutions India',
      contact_person: 'Ananya Roy',
      designation: 'VP of People & Culture',
      email: 'ananya.roy@apexfintech.com',
      phone: '+91 99000 54321',
      requirement_type: 'Executive Search & Lateral Hiring',
      estimated_headcount: '12 Leadership Hires',
      message: 'Looking for a specialized recruitment partner to build out our Mumbai engineering & risk management leadership team. Need confidential executive search capabilities.',
      status: 'New',
      created_at: '2026-11-04T17:10:00Z',
    },
    {
      id: 'enq-303',
      company: 'Sterling Global Logistics',
      contact_person: 'Rameshwar Reddy',
      designation: 'Head of Administration',
      email: 'r.reddy@sterlinglogistic.com',
      phone: '+91 94400 12890',
      requirement_type: 'Workplace Safety & HR Compliance Audit',
      estimated_headcount: '6 Distribution Centers',
      message: 'Need safety compliance audits and contract labor documentation audits for our distribution warehouses across Maharashtra and Gujarat.',
      status: 'Contacted',
      created_at: '2026-11-03T10:05:00Z',
    },
  ],
};

// Initialize DB if not present
function getDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db.json, reinitializing:', err);
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

function saveDb(data: typeof initialData) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Create a dummy sample PDF resume for pre-seeded applications so download works out of the box
function createSamplePdfIfMissing(filename: string, applicantName: string, role: string) {
  const filePath = path.join(RESUMES_DIR, filename);
  if (!fs.existsSync(filePath)) {
    // Generate a minimal valid PDF format in binary
    const content = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >> endobj
4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj
5 0 obj << /Length 260 >> stream
BT
/F1 20 Tf
50 720 Td
(UNIVA HIRE TECH - CANDIDATE EXECUTIVE PROFILE) Tj
/F1 14 Tf
0 -40 Td
(Candidate Name: ${applicantName}) Tj
0 -25 Td
(Applied Role: ${role}) Tj
0 -25 Td
(Verified by UNIVA Executive Talent Assessment Team) Tj
0 -25 Td
(Statutory Consent: Agreed under India DPDP Act 2023) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000227 00000 n 
0000000305 00000 n 
trailer << /Size 6 /Root 1 0 R >>
startxref
618
%%EOF`;
    fs.writeFileSync(filePath, Buffer.from(content, 'utf-8'));
  }
}

// Seed initial PDFs
const initialDb = getDb();
initialDb.applications.forEach((app: any) => {
  if (app.resume_filename) {
    createSamplePdfIfMissing(app.resume_filename, app.full_name, app.job_title || 'Executive Sourcing');
  }
});

// ================= API ROUTES ================= //

// Auth Endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const db = getDb();
  const user = db.users.find(
    (u: any) => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid corporate email or password.' });
  }

  // Return clean user profile without password
  const { password: _, ...cleanUser } = user;
  const token = `token-${user.id}-${Date.now()}`;
  return res.json({ user: cleanUser, token });
});

// Jobs Endpoints
app.get('/api/jobs', (req, res) => {
  const db = getDb();
  const { status, search, location, industry, type, seniority } = req.query;

  let filtered = [...db.jobs];

  // Unless explicitly asking for all as admin, default public users to 'Open'
  if (status && typeof status === 'string') {
    if (status !== 'all') {
      filtered = filtered.filter((j) => j.status.toLowerCase() === status.toLowerCase());
    }
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.department.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.industry.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q)
    );
  }

  if (location && typeof location === 'string' && location !== 'all') {
    filtered = filtered.filter((j) => j.location.toLowerCase().includes(location.toLowerCase()));
  }

  if (industry && typeof industry === 'string' && industry !== 'all') {
    filtered = filtered.filter((j) => j.industry.toLowerCase().includes(industry.toLowerCase()));
  }

  if (type && typeof type === 'string' && type !== 'all') {
    filtered = filtered.filter((j) => j.employment_type.toLowerCase() === type.toLowerCase());
  }

  if (seniority && typeof seniority === 'string' && seniority !== 'all') {
    filtered = filtered.filter((j: any) => j.seniority.toLowerCase() === seniority.toLowerCase());
  }

  // Sort newest first
  filtered.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  res.json({ jobs: filtered, count: filtered.length });
});

app.get('/api/jobs/:id', (req, res) => {
  const db = getDb();
  const job = db.jobs.find((j: any) => j.id === req.params.id || j.slug === req.params.id);
  if (!job) {
    return res.status(404).json({ error: 'Job opening not found' });
  }
  res.json({ job });
});

app.post('/api/jobs', (req, res) => {
  const {
    title,
    department,
    industry,
    location,
    employment_type,
    seniority,
    experience_min,
    experience_max,
    salary_range,
    show_salary,
    description,
    responsibilities,
    requirements,
    status,
    closing_date,
    created_by,
  } = req.body;

  if (!title || !industry || !location) {
    return res.status(400).json({ error: 'Title, industry, and location are required fields' });
  }

  const db = getDb();
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') + '-' + Math.floor(Math.random() * 1000);

  const newJob = {
    id: `job-${Date.now()}`,
    title,
    slug,
    department: department || 'General',
    industry,
    location,
    employment_type: employment_type || 'Permanent',
    seniority: seniority || 'Senior',
    experience_min: Number(experience_min) || 5,
    experience_max: Number(experience_max) || 12,
    salary_range: salary_range || 'Competitive Compensation',
    show_salary: show_salary !== false,
    description: description || '',
    responsibilities: Array.isArray(responsibilities)
      ? responsibilities
      : typeof responsibilities === 'string'
      ? responsibilities.split('\n').filter(Boolean)
      : [],
    requirements: Array.isArray(requirements)
      ? requirements
      : typeof requirements === 'string'
      ? requirements.split('\n').filter(Boolean)
      : [],
    status: status || 'Open',
    closing_date: closing_date || new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
    created_by: created_by || 'Admin',
    created_at: new Date().toISOString(),
  };

  db.jobs.unshift(newJob);
  saveDb(db);

  res.status(201).json({ job: newJob, message: 'Job posting created successfully' });
});

app.put('/api/jobs/:id', (req, res) => {
  const db = getDb();
  const index = db.jobs.findIndex((j: any) => j.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Job opening not found' });
  }

  const existing = db.jobs[index];
  const updated = {
    ...existing,
    ...req.body,
    responsibilities: Array.isArray(req.body.responsibilities)
      ? req.body.responsibilities
      : typeof req.body.responsibilities === 'string'
      ? req.body.responsibilities.split('\n').filter(Boolean)
      : existing.responsibilities,
    requirements: Array.isArray(req.body.requirements)
      ? req.body.requirements
      : typeof req.body.requirements === 'string'
      ? req.body.requirements.split('\n').filter(Boolean)
      : existing.requirements,
  };

  db.jobs[index] = updated;
  saveDb(db);

  res.json({ job: updated, message: 'Job posting updated successfully' });
});

app.delete('/api/jobs/:id', (req, res) => {
  const db = getDb();
  const index = db.jobs.findIndex((j: any) => j.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Job opening not found' });
  }

  db.jobs.splice(index, 1);
  saveDb(db);

  res.json({ message: 'Job opening deleted successfully' });
});

// Applications Endpoints
app.get('/api/applications', (req, res) => {
  const db = getDb();
  const { job_id, status, search } = req.query;

  let filtered = [...db.applications];

  if (job_id && typeof job_id === 'string' && job_id !== 'all') {
    filtered = filtered.filter((a: any) => a.job_id === job_id);
  }

  if (status && typeof status === 'string' && status !== 'all') {
    filtered = filtered.filter((a: any) => a.status.toLowerCase() === status.toLowerCase());
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (a: any) =>
        a.full_name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.phone.includes(q) ||
        (a.current_company && a.current_company.toLowerCase().includes(q)) ||
        (a.designation && a.designation.toLowerCase().includes(q))
    );
  }

  filtered.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  res.json({ applications: filtered, count: filtered.length });
});

// Submit Application (Handles PDF file upload + multipart data)
app.post('/api/applications', upload.single('resume'), (req, res) => {
  try {
    const {
      job_id,
      job_title,
      full_name,
      email,
      phone,
      current_company,
      designation,
      total_experience,
      current_ctc,
      expected_ctc,
      notice_period,
      location,
      consent_given,
    } = req.body;

    if (!full_name || !email || !phone) {
      return res.status(400).json({ error: 'Full name, email, and phone number are mandatory.' });
    }

    if (consent_given !== 'true' && consent_given !== true) {
      return res.status(400).json({
        error: 'Statutory consent under India DPDP Act is required to submit your application.',
      });
    }

    let resumeFilename = '';
    if (req.file) {
      resumeFilename = req.file.filename;
    } else {
      // If user submitted without file, create synthetic placeholder profile PDF
      const generatedName = `Candidate_${full_name.replace(/\s+/g, '_')}_Resume.pdf`;
      createSamplePdfIfMissing(generatedName, full_name, job_title || 'General Talent Pool');
      resumeFilename = generatedName;
    }

    const db = getDb();
    const referenceId = `UHT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newApplication = {
      id: `app-${Date.now()}`,
      reference_id: referenceId,
      job_id: job_id || null,
      job_title: job_title || 'General Executive Talent Pool',
      full_name,
      email,
      phone,
      current_company: current_company || 'Not Specified',
      designation: designation || 'Professional',
      total_experience: Number(total_experience) || 0,
      current_ctc: current_ctc || 'Negotiable',
      expected_ctc: expected_ctc || 'Negotiable',
      notice_period: notice_period || 'Immediate',
      location: location || 'India',
      resume_filename: resumeFilename,
      status: 'New',
      notes: [],
      consent_given: true,
      created_at: new Date().toISOString(),
    };

    db.applications.unshift(newApplication);
    saveDb(db);

    return res.status(201).json({
      message: 'Application submitted successfully to UNIVA HIRE TECH',
      application: newApplication,
      reference_id: referenceId,
    });
  } catch (err: any) {
    console.error('Application submit error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error while processing application' });
  }
});

// Update Application Pipeline Status
app.patch('/api/applications/:id/status', (req, res) => {
  const { status } = req.body;
  const validStatuses = ['New', 'Screening', 'Shortlisted', 'Interview', 'Offered', 'Hired', 'Rejected'];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
  }

  const db = getDb();
  const appItem = db.applications.find((a: any) => a.id === req.params.id);
  if (!appItem) {
    return res.status(404).json({ error: 'Application not found' });
  }

  appItem.status = status;
  saveDb(db);

  res.json({ message: `Applicant pipeline status updated to ${status}`, application: appItem });
});

// Add Internal Recruiter Note
app.post('/api/applications/:id/notes', (req, res) => {
  const { text, author } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Note text cannot be empty' });
  }

  const db = getDb();
  const appItem = db.applications.find((a: any) => a.id === req.params.id);
  if (!appItem) {
    return res.status(404).json({ error: 'Application not found' });
  }

  if (!Array.isArray(appItem.notes)) {
    appItem.notes = [];
  }

  const newNote = {
    id: `note-${Date.now()}`,
    author: author || 'Recruiter',
    text: text.trim(),
    timestamp: new Date().toISOString(),
  };

  appItem.notes.unshift(newNote);
  saveDb(db);

  res.status(201).json({ message: 'Internal note added', note: newNote });
});

// Download / View PDF Resume
app.get('/api/applications/:id/resume', (req, res) => {
  const db = getDb();
  const appItem = db.applications.find((a: any) => a.id === req.params.id);
  if (!appItem || !appItem.resume_filename) {
    return res.status(404).send('Resume file not found');
  }

  const filePath = path.join(RESUMES_DIR, appItem.resume_filename);
  if (!fs.existsSync(filePath)) {
    // Generate sample PDF on the fly if needed
    createSamplePdfIfMissing(appItem.resume_filename, appItem.full_name, appItem.job_title || 'Executive');
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${appItem.resume_filename}"`);
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

// Export Applicants to CSV
app.get('/api/applications/export/csv', (req, res) => {
  const db = getDb();
  const { job_id } = req.query;
  let list = db.applications;
  if (job_id && job_id !== 'all') {
    list = list.filter((a: any) => a.job_id === job_id);
  }

  const headers = [
    'ID',
    'Full Name',
    'Email',
    'Phone',
    'Job Title',
    'Current Company',
    'Designation',
    'Experience (Yrs)',
    'Current CTC',
    'Expected CTC',
    'Notice Period',
    'Location',
    'Pipeline Status',
    'DPDP Consent',
    'Applied Date',
  ];

  const escapeCsv = (val: any) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = list.map((a: any) => [
    escapeCsv(a.id),
    escapeCsv(a.full_name),
    escapeCsv(a.email),
    escapeCsv(a.phone),
    escapeCsv(a.job_title),
    escapeCsv(a.current_company),
    escapeCsv(a.designation),
    escapeCsv(a.total_experience),
    escapeCsv(a.current_ctc),
    escapeCsv(a.expected_ctc),
    escapeCsv(a.notice_period),
    escapeCsv(a.location),
    escapeCsv(a.status),
    escapeCsv(a.consent_given ? 'Yes' : 'No'),
    escapeCsv(a.created_at),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r: any) => r.join(','))].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="UNIVA_Applicants_${Date.now()}.csv"`);
  res.send(csvContent);
});

// Download All Resumes as ZIP
app.get('/api/applications/export/resumes-zip', async (req, res) => {
  try {
    const db = getDb();
    const { job_id } = req.query;
    let list = db.applications;
    if (job_id && job_id !== 'all') {
      list = list.filter((a: any) => a.job_id === job_id);
    }

    const zip = new JSZip();

    for (const applicant of list as any[]) {
      if (applicant.resume_filename) {
        const filePath = path.join(RESUMES_DIR, applicant.resume_filename);
        if (fs.existsSync(filePath)) {
          const fileData = fs.readFileSync(filePath);
          zip.file(applicant.resume_filename, fileData);
        } else {
          // Create and add
          createSamplePdfIfMissing(applicant.resume_filename, applicant.full_name, applicant.job_title);
          const fileData = fs.readFileSync(filePath);
          zip.file(applicant.resume_filename, fileData);
        }
      }
    }

    const zipContent = await zip.generateAsync({ type: 'nodebuffer' });
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="UNIVA_Resumes_${Date.now()}.zip"`);
    res.send(zipContent);
  } catch (err: any) {
    console.error('ZIP generation error:', err);
    res.status(500).json({ error: 'Failed to generate resumes archive' });
  }
});

// Corporate Client Enquiries
app.get('/api/enquiries', (_req, res) => {
  const db = getDb();
  res.json({ enquiries: db.enquiries, count: db.enquiries.length });
});

app.post('/api/enquiries', (req, res) => {
  const { company, contact_person, designation, email, phone, requirement_type, estimated_headcount, message } =
    req.body;

  if (!company || !contact_person || !email || !phone) {
    return res.status(400).json({ error: 'Company, contact person, email, and phone are mandatory.' });
  }

  const db = getDb();
  const newEnquiry = {
    id: `enq-${Date.now()}`,
    company,
    contact_person,
    designation: designation || 'Corporate Stakeholder',
    email,
    phone,
    requirement_type: requirement_type || 'Contract Staffing',
    estimated_headcount: estimated_headcount || 'Not Specified',
    message: message || '',
    status: 'New',
    created_at: new Date().toISOString(),
  };

  db.enquiries.unshift(newEnquiry);
  saveDb(db);

  res.status(201).json({
    message: 'Corporate requirement received. A UNIVA Senior Partner will contact you within 4 business hours.',
    enquiry: newEnquiry,
  });
});

app.patch('/api/enquiries/:id/status', (req, res) => {
  const { status } = req.body;
  const db = getDb();
  const enq = db.enquiries.find((e: any) => e.id === req.params.id);
  if (!enq) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }

  enq.status = status || 'Contacted';
  saveDb(db);

  res.json({ message: `Enquiry status updated to ${enq.status}`, enquiry: enq });
});

// Admin Dashboard Overview Stats
app.get('/api/stats', (_req, res) => {
  const db = getDb();
  const openJobs = db.jobs.filter((j: any) => j.status === 'Open').length;
  const totalApplicants = db.applications.length;
  
  // Calculate applicants in last 7 days
  const sevenDaysAgo = Date.now() - 7 * 24 * 3600 * 1000;
  const newApplicantsThisWeek = db.applications.filter(
    (a: any) => new Date(a.created_at).getTime() >= sevenDaysAgo
  ).length;

  const clientEnquiries = db.enquiries.length;
  const pendingEnquiries = db.enquiries.filter((e: any) => e.status === 'New').length;

  const statusBreakdown = {
    New: db.applications.filter((a: any) => a.status === 'New').length,
    Screening: db.applications.filter((a: any) => a.status === 'Screening').length,
    Shortlisted: db.applications.filter((a: any) => a.status === 'Shortlisted').length,
    Interview: db.applications.filter((a: any) => a.status === 'Interview').length,
    Offered: db.applications.filter((a: any) => a.status === 'Offered').length,
    Hired: db.applications.filter((a: any) => a.status === 'Hired').length,
    Rejected: db.applications.filter((a: any) => a.status === 'Rejected').length,
  };

  res.json({
    openJobs,
    totalApplicants,
    newApplicantsThisWeek,
    clientEnquiries,
    pendingEnquiries,
    statusBreakdown,
  });
});

// Vercel serves the SPA for direct links such as /admin and /jobs.
// API misses always return JSON rather than the SPA HTML document.
if (process.env.VERCEL) {
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'API endpoint not found.' });
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next();
    }
    res.sendFile(path.join(__dirname, 'public', 'index.html'), (error) => {
      if (error) next(error);
    });
  });
}

// Vite middleware is used for local development. On Vercel, the exported
// Express app is the serverless backend and Vercel serves public assets.
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'public')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`UNIVA HIRE TECH server operational at http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
