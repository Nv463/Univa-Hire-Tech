import express from 'express';
import multer from 'multer';
import JSZip from 'jszip';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = Number(process.env.PORT || 3000);

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://kkezdyjyossagyfviudp.supabase.co';
const SUPABASE_PUBLISHABLE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_xW6jyKSprtpJjNbkP3nDZQ_kKQeaOD3';

const publicClient = () => createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});

const clientForToken = (token: string) => createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  global: { headers: { Authorization: 'Bearer ' + token } },
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF resumes are supported.'));
    }
  },
});

const sendError = (res: express.Response, error: any, status = 500) => {
  console.error('UNIVA API error:', error);
  return res.status(status).json({ error: error?.message || 'An unexpected server error occurred.' });
};

const staffAuth = async (req: any, res: any, next: any) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (!token) return res.status(401).json({ error: 'Please sign in to continue.' });

    const supabase = clientForToken(token);
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !authData.user) return res.status(401).json({ error: 'Your session has expired. Please sign in again.' });

    const { data: profile, error: profileError } = await supabase
      .from('staff_profiles')
      .select('id,email,full_name,role')
      .eq('id', authData.user.id)
      .maybeSingle();

    if (profileError || !profile || !['Admin', 'Recruiter'].includes(profile.role)) {
      return res.status(403).json({ error: 'This account does not have UNIVA staff access.' });
    }

    req.supabase = supabase;
    req.staff = profile;
    req.authUser = authData.user;
    next();
  } catch (error) {
    return sendError(res, error);
  }
};

const requireAdmin = (req: any, res: any, next: any) => {
  if (req.staff?.role !== 'Admin') return res.status(403).json({ error: 'Administrator access is required.' });
  next();
};

const getDataRows = (rows: any[]) => (rows || []).map((row) => row.data);
const safeName = (name: string) => (name || 'resume.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');

app.post('/api/auth/login', async (req, res) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

    const supabase = publicClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user || !data.session) return res.status(401).json({ error: 'Invalid corporate email or password.' });

    const staffClient = clientForToken(data.session.access_token);
    const { data: profile, error: profileError } = await staffClient
      .from('staff_profiles')
      .select('id,email,full_name,role')
      .eq('id', data.user.id)
      .maybeSingle();

    if (profileError || !profile || !['Admin', 'Recruiter'].includes(profile.role)) {
      await supabase.auth.signOut();
      return res.status(403).json({ error: 'This account is not registered as UNIVA staff. Contact your administrator.' });
    }

    return res.json({
      user: {
        id: profile.id,
        name: profile.full_name || profile.email,
        email: profile.email,
        role: profile.role,
        designation: profile.role === 'Admin' ? 'Administrator' : 'Recruiter',
      },
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at,
    });
  } catch (error) {
    return sendError(res, error);
  }
});

app.post('/api/auth/refresh', async (req, res) => {
  try {
    const refresh_token = String(req.body?.refresh_token || '');
    if (!refresh_token) return res.status(400).json({ error: 'Refresh token is required.' });

    const supabase = publicClient();
    const { data, error } = await supabase.auth.refreshSession({ refresh_token });
    if (error || !data.user || !data.session) return res.status(401).json({ error: 'Session expired. Please sign in again.' });

    const staffClient = clientForToken(data.session.access_token);
    const { data: profile } = await staffClient.from('staff_profiles')
      .select('id,email,full_name,role').eq('id', data.user.id).maybeSingle();

    if (!profile) return res.status(403).json({ error: 'UNIVA staff profile not found.' });

    return res.json({
      user: {
        id: profile.id,
        name: profile.full_name || profile.email,
        email: profile.email,
        role: profile.role,
        designation: profile.role === 'Admin' ? 'Administrator' : 'Recruiter',
      },
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at,
    });
  } catch (error) {
    return sendError(res, error);
  }
});

app.post('/api/auth/logout', staffAuth, async (req: any, res) => {
  try {
    await req.supabase.auth.signOut();
    return res.json({ message: 'Signed out successfully.' });
  } catch (error) {
    return sendError(res, error);
  }
});

// Public visitors can see open jobs; staff can request all statuses.
app.get('/api/jobs', async (req: any, res) => {
  try {
    const status = String(req.query.status || 'Open');
    let supabase = publicClient();

    if (status === 'all') {
      const header = req.headers.authorization || '';
      const token = header.startsWith('Bearer ') ? header.slice(7) : '';
      if (!token) return res.status(401).json({ error: 'Please sign in to view internal job listings.' });
      supabase = clientForToken(token);
      const { data: authData, error: authError } = await supabase.auth.getUser(token);
      if (authError || !authData.user) return res.status(401).json({ error: 'Please sign in again.' });
      const { data: profile } = await supabase.from('staff_profiles').select('role').eq('id', authData.user.id).maybeSingle();
      if (!profile) return res.status(403).json({ error: 'UNIVA staff access required.' });
    }

    let query = supabase.from('jobs').select('data').order('created_at', { ascending: false });
    if (status !== 'all') query = query.eq('status', status);
    const { data, error } = await query;
    if (error) throw error;

    let jobs = getDataRows(data || []);
    const industry = String(req.query.industry || '');
    const type = String(req.query.type || '');
    const search = String(req.query.search || '').toLowerCase();
    if (industry) jobs = jobs.filter((job: any) => job.industry === industry);
    if (type && type !== 'all') jobs = jobs.filter((job: any) => job.employment_type === type);
    if (search) jobs = jobs.filter((job: any) =>
      [job.title, job.department, job.location, job.description].some((v) => String(v || '').toLowerCase().includes(search))
    );

    return res.json({ jobs, count: jobs.length });
  } catch (error) {
    return sendError(res, error);
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const supabase = publicClient();
    let { data, error } = await supabase.from('jobs').select('data').eq('id', req.params.id).maybeSingle();
    if (!data && !error) {
      const result = await supabase.from('jobs').select('data').eq('slug', req.params.id).maybeSingle();
      data = result.data;
      error = result.error;
    }
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Job opening not found.' });
    return res.json({ job: data.data });
  } catch (error) {
    return sendError(res, error);
  }
});

app.post('/api/jobs', staffAuth, async (req: any, res) => {
  try {
    const body = req.body || {};
    if (!body.title || !body.industry || !body.location) {
      return res.status(400).json({ error: 'Title, industry, and location are required.' });
    }
    const id = 'job-' + Date.now();
    const slug = String(body.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Math.floor(Math.random() * 1000);
    const job = {
      id, title: body.title, slug, department: body.department || 'General', industry: body.industry,
      location: body.location, employment_type: body.employment_type || 'Permanent',
      seniority: body.seniority || 'Senior', experience_min: Number(body.experience_min) || 5,
      experience_max: Number(body.experience_max) || 12, salary_range: body.salary_range || 'Competitive Compensation',
      show_salary: body.show_salary !== false, description: body.description || '',
      responsibilities: Array.isArray(body.responsibilities) ? body.responsibilities : [],
      requirements: Array.isArray(body.requirements) ? body.requirements : [],
      status: body.status || 'Open', closing_date: body.closing_date || '',
      created_by: req.staff.full_name || req.staff.email, created_at: new Date().toISOString(),
    };
    const { error } = await req.supabase.from('jobs').insert({
      id, slug, status: job.status, created_at: job.created_at, data: job,
    });
    if (error) throw error;
    return res.status(201).json({ job, message: 'Job posting created successfully.' });
  } catch (error) {
    return sendError(res, error);
  }
});

app.put('/api/jobs/:id', staffAuth, async (req: any, res) => {
  try {
    const { data: row, error } = await req.supabase.from('jobs').select('data').eq('id', req.params.id).single();
    if (error || !row) return res.status(404).json({ error: 'Job opening not found.' });
    const updated = { ...row.data, ...req.body, id: req.params.id };
    const { error: updateError } = await req.supabase.from('jobs').update({
      status: updated.status, data: updated,
    }).eq('id', req.params.id);
    if (updateError) throw updateError;
    return res.json({ job: updated, message: 'Job posting updated successfully.' });
  } catch (error) {
    return sendError(res, error);
  }
});

app.delete('/api/jobs/:id', staffAuth, requireAdmin, async (req: any, res) => {
  try {
    const { error } = await req.supabase.from('jobs').delete().eq('id', req.params.id);
    if (error) throw error;
    return res.json({ message: 'Job opening deleted successfully.' });
  } catch (error) {
    return sendError(res, error);
  }
});

app.get('/api/applications', staffAuth, async (req: any, res) => {
  try {
    const { data, error } = await req.supabase.from('applications').select('data,resume_path').order('created_at', { ascending: false });
    if (error) throw error;
    let applications = (data || []).map((row: any) => ({ ...row.data, resume_path: row.resume_path }));
    const jobId = String(req.query.job_id || 'all');
    const status = String(req.query.status || 'all');
    const search = String(req.query.search || '').toLowerCase();
    if (jobId !== 'all') applications = applications.filter((a: any) => a.job_id === jobId);
    if (status !== 'all') applications = applications.filter((a: any) => a.status === status);
    if (search) applications = applications.filter((a: any) =>
      [a.full_name, a.email, a.phone, a.current_company, a.designation].some((v) => String(v || '').toLowerCase().includes(search))
    );
    return res.json({ applications, count: applications.length });
  } catch (error) {
    return sendError(res, error);
  }
});

app.post('/api/applications', upload.single('resume'), async (req: any, res) => {
  try {
    const body = req.body || {};
    if (!body.full_name || !body.email || !body.phone) {
      return res.status(400).json({ error: 'Full name, email, and phone number are mandatory.' });
    }
    if (body.consent_given !== 'true' && body.consent_given !== true) {
      return res.status(400).json({ error: 'Consent is required before submitting an application.' });
    }

    const supabase = publicClient();
    let resumePath: string | null = null;
    let resumeFilename = '';
    if (req.file) {
      resumeFilename = safeName(req.file.originalname);
      resumePath = Date.now() + '-' + Math.random().toString(36).slice(2) + '-' + resumeFilename;
      const { error: storageError } = await supabase.storage.from('candidate-resumes').upload(resumePath, req.file.buffer, {
        contentType: 'application/pdf', upsert: false,
      });
      if (storageError) throw storageError;
    }

    const referenceId = 'UHT-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const application = {
      id: 'app-' + Date.now(), reference_id: referenceId,
      job_id: body.job_id || null, job_title: body.job_title || 'General Executive Talent Pool',
      full_name: body.full_name, email: body.email, phone: body.phone,
      current_company: body.current_company || 'Not Specified', designation: body.designation || 'Professional',
      total_experience: Number(body.total_experience) || 0, current_ctc: body.current_ctc || 'Negotiable',
      expected_ctc: body.expected_ctc || 'Negotiable', notice_period: body.notice_period || 'Immediate',
      location: body.location || 'India', resume_filename: resumeFilename, resume_path: resumePath,
      status: 'New', notes: [], consent_given: true, created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('applications').insert({
      id: application.id, job_id: application.job_id, status: application.status,
      created_at: application.created_at, resume_path: resumePath, data: application,
    });
    if (error) throw error;
    return res.status(201).json({
      message: 'Application submitted successfully to UNIVA HIRE TECH.',
      application, reference_id: referenceId,
    });
  } catch (error) {
    return sendError(res, error, 400);
  }
});

app.patch('/api/applications/:id/status', staffAuth, async (req: any, res) => {
  try {
    const valid = ['New', 'Screening', 'Shortlisted', 'Interview', 'Offered', 'Hired', 'Rejected'];
    const status = req.body?.status;
    if (!valid.includes(status)) return res.status(400).json({ error: 'Invalid applicant status.' });
    const { data: row, error } = await req.supabase.from('applications').select('data').eq('id', req.params.id).single();
    if (error || !row) return res.status(404).json({ error: 'Application not found.' });
    const application = { ...row.data, status };
    const { error: updateError } = await req.supabase.from('applications').update({ status, data: application }).eq('id', req.params.id);
    if (updateError) throw updateError;
    return res.json({ message: 'Applicant pipeline status updated.', application });
  } catch (error) {
    return sendError(res, error);
  }
});

app.post('/api/applications/:id/notes', staffAuth, async (req: any, res) => {
  try {
    const text = String(req.body?.text || '').trim();
    if (!text) return res.status(400).json({ error: 'Note text cannot be empty.' });
    const { data: row, error } = await req.supabase.from('applications').select('data').eq('id', req.params.id).single();
    if (error || !row) return res.status(404).json({ error: 'Application not found.' });
    const note = {
      id: 'note-' + Date.now(), author: req.staff.full_name || req.staff.email,
      text, timestamp: new Date().toISOString(),
    };
    const application = { ...row.data, notes: [note, ...(row.data.notes || [])] };
    const { error: updateError } = await req.supabase.from('applications').update({ data: application }).eq('id', req.params.id);
    if (updateError) throw updateError;
    return res.status(201).json({ message: 'Internal note added.', note });
  } catch (error) {
    return sendError(res, error);
  }
});

app.get('/api/applications/:id/resume', staffAuth, async (req: any, res) => {
  try {
    const { data: row, error } = await req.supabase.from('applications').select('resume_path,data').eq('id', req.params.id).single();
    if (error || !row || !row.resume_path) return res.status(404).json({ error: 'Resume file not found.' });
    const { data: file, error: downloadError } = await req.supabase.storage.from('candidate-resumes').download(row.resume_path);
    if (downloadError || !file) throw downloadError || new Error('Resume not found.');
    const buffer = Buffer.from(await file.arrayBuffer());
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="' + safeName(row.data.resume_filename || 'resume.pdf') + '"');
    return res.send(buffer);
  } catch (error) {
    return sendError(res, error);
  }
});

const csvEscape = (value: any) => '"' + String(value ?? '').replace(/"/g, '""') + '"';
app.get('/api/applications/export/csv', staffAuth, async (req: any, res) => {
  try {
    const { data, error } = await req.supabase.from('applications').select('data').order('created_at', { ascending: false });
    if (error) throw error;
    const rows = getDataRows(data || []);
    const headers = ['Reference ID','Full Name','Email','Phone','Job Title','Company','Designation','Experience','Status','Created At'];
    const keys = ['reference_id','full_name','email','phone','job_title','current_company','designation','total_experience','status','created_at'];
    const csv = [headers, ...rows.map((row: any) => keys.map((key) => row[key] ?? ''))]
      .map((row) => row.map(csvEscape).join(',')).join('\r\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="UNIVA_Applicants.csv"');
    return res.send('\uFEFF' + csv);
  } catch (error) {
    return sendError(res, error);
  }
});

app.get('/api/applications/export/resumes-zip', staffAuth, async (req: any, res) => {
  try {
    const { data, error } = await req.supabase.from('applications').select('resume_path,data');
    if (error) throw error;
    const zip = new JSZip();
    for (const row of data || []) {
      if (!row.resume_path) continue;
      const { data: file, error: fileError } = await req.supabase.storage.from('candidate-resumes').download(row.resume_path);
      if (fileError || !file) continue;
      zip.file(safeName(row.data.resume_filename || 'resume.pdf'), await file.arrayBuffer());
    }
    const buffer = await zip.generateAsync({ type: 'nodebuffer' });
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="UNIVA_Resumes.zip"');
    return res.send(buffer);
  } catch (error) {
    return sendError(res, error);
  }
});

app.get('/api/enquiries', staffAuth, async (req: any, res) => {
  try {
    const { data, error } = await req.supabase.from('enquiries').select('data').order('created_at', { ascending: false });
    if (error) throw error;
    const enquiries = getDataRows(data || []);
    return res.json({ enquiries, count: enquiries.length });
  } catch (error) {
    return sendError(res, error);
  }
});

app.post('/api/enquiries', async (req, res) => {
  try {
    const body = req.body || {};
    if (!body.company || !body.contact_person || !body.email || !body.phone) {
      return res.status(400).json({ error: 'Company, contact person, email, and phone are mandatory.' });
    }
    const enquiry = {
      id: 'enq-' + Date.now(), company: body.company, contact_person: body.contact_person,
      designation: body.designation || 'Corporate Stakeholder', email: body.email, phone: body.phone,
      requirement_type: body.requirement_type || 'Contract Staffing',
      estimated_headcount: body.estimated_headcount || 'Not Specified', message: body.message || '',
      status: 'New', created_at: new Date().toISOString(),
    };
    const { error } = await publicClient().from('enquiries').insert({
      id: enquiry.id, status: enquiry.status, created_at: enquiry.created_at, data: enquiry,
    });
    if (error) throw error;
    return res.status(201).json({
      message: 'Corporate requirement received. A UNIVA Senior Partner will contact you within 4 business hours.',
      enquiry,
    });
  } catch (error) {
    return sendError(res, error, 400);
  }
});

app.patch('/api/enquiries/:id/status', staffAuth, async (req: any, res) => {
  try {
    const { data: row, error } = await req.supabase.from('enquiries').select('data').eq('id', req.params.id).single();
    if (error || !row) return res.status(404).json({ error: 'Enquiry not found.' });
    const status = String(req.body?.status || 'Contacted');
    const enquiry = { ...row.data, status };
    const { error: updateError } = await req.supabase.from('enquiries').update({ status, data: enquiry }).eq('id', req.params.id);
    if (updateError) throw updateError;
    return res.json({ message: 'Enquiry status updated to ' + status, enquiry });
  } catch (error) {
    return sendError(res, error);
  }
});

app.get('/api/stats', staffAuth, async (req: any, res) => {
  try {
    const [jobsResult, appsResult, enquiriesResult] = await Promise.all([
      req.supabase.from('jobs').select('data'),
      req.supabase.from('applications').select('data'),
      req.supabase.from('enquiries').select('data'),
    ]);
    if (jobsResult.error) throw jobsResult.error;
    if (appsResult.error) throw appsResult.error;
    if (enquiriesResult.error) throw enquiriesResult.error;
    const jobs = getDataRows(jobsResult.data || []);
    const applications = getDataRows(appsResult.data || []);
    const enquiries = getDataRows(enquiriesResult.data || []);
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const statusBreakdown: Record<string, number> = {};
    ['New','Screening','Shortlisted','Interview','Offered','Hired','Rejected'].forEach((status) => {
      statusBreakdown[status] = applications.filter((a: any) => a.status === status).length;
    });
    return res.json({
      openJobs: jobs.filter((j: any) => j.status === 'Open').length,
      totalApplicants: applications.length,
      newApplicantsThisWeek: applications.filter((a: any) => new Date(a.created_at).getTime() >= weekAgo).length,
      clientEnquiries: enquiries.length,
      pendingEnquiries: enquiries.filter((e: any) => e.status === 'New').length,
      statusBreakdown,
    });
  } catch (error) {
    return sendError(res, error);
  }
});

// Convert upload/parser failures into JSON as well; API routes must never leak an HTML error page.
app.use((error: any, req: any, res: any, next: any) => {
  if (req.path.startsWith('/api/')) {
    console.error('UNIVA request error:', error);
    return res.status(error.status || 400).json({ error: error.message || 'The request could not be processed.' });
  }
  next(error);
});

// Unknown API routes return JSON (never the SPA HTML document).
app.use('/api', (_req, res) => res.status(404).json({ error: 'API endpoint not found.' }));


export default app;
