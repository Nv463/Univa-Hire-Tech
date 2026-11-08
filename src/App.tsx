import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { HowWeWorkPage } from './pages/HowWeWorkPage';
import { JobsPage } from './pages/JobsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPortal } from './pages/AdminPortal';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { Job, User } from './types';
import { apiFetch } from './lib/api';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<Job | null>(null);
  const [prefilledServiceEnquiry, setPrefilledServiceEnquiry] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('univa_user');
      const user = stored ? JSON.parse(stored) : null;
      return user?.access_token ? user : null;
    } catch {
      return null;
    }
  });

  // Keep the internal staff portal available only at /recruiter
  useEffect(() => {
    const handleUrlSync = () => {
      const path = window.location.pathname.replace(/^\//, '');
      const hash = window.location.hash.replace(/^#/, '');

      if (path === 'admin' || hash === 'admin') {
        window.history.replaceState(null, '', '/');
        setActivePage('home');
      } else if (path === 'recruiter' || path === 'recruiter/reset-password') {
        setActivePage('admin');
      } else if (path === 'jobs' || hash === 'jobs') {
        setActivePage('jobs');
      } else if (path === 'contact' || hash === 'contact') {
        setActivePage('contact');
      } else if (path === 'services' || hash === 'services') {
        setActivePage('services');
      } else if (path === 'about' || hash === 'about') {
        setActivePage('about');
      } else if (path === 'industries' || hash === 'industries') {
        setActivePage('industries');
      } else if (path === 'how-we-work' || hash === 'how-we-work') {
        setActivePage('how-we-work');
      } else if (path === 'privacy' || hash === 'privacy') {
        setActivePage('privacy');
      }
    };

    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    return () => window.removeEventListener('popstate', handleUrlSync);
  }, []);

  // Fetch open jobs
  const fetchOpenJobs = async () => {
    try {
      const res = await apiFetch('/api/jobs?status=Open');
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  useEffect(() => {
    fetchOpenJobs();
  }, []);

  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.history.pushState(null, '', `/${page === 'home' ? '' : page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectJob = (job: Job) => {
    setSelectedJobForDetail(job);
    setActivePage('jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceForEnquiry = (serviceName: string) => {
    setPrefilledServiceEnquiry(serviceName);
    setActivePage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('univa_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    apiFetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined);
    setCurrentUser(null);
    try {
      localStorage.removeItem('univa_user');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6FB] text-[#1B1A4E] selection:bg-[#3B2FBF]/15 selection:text-[#1B1A4E]">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            jobs={jobs}
            onSelectJob={handleSelectJob}
          />
        )}

        {activePage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {activePage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onSelectServiceForEnquiry={handleSelectServiceForEnquiry}
          />
        )}

        {activePage === 'industries' && (
          <IndustriesPage onNavigate={handleNavigate} />
        )}

        {activePage === 'how-we-work' && (
          <HowWeWorkPage onNavigate={handleNavigate} />
        )}

        {activePage === 'jobs' && (
          <JobsPage
            jobs={jobs}
            onNavigate={handleNavigate}
            selectedJobForDetail={selectedJobForDetail}
            onClearSelectedJob={() => setSelectedJobForDetail(null)}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage prefilledRequirement={prefilledServiceEnquiry} />
        )}

        {activePage === 'privacy' && (
          <PrivacyPolicyPage onNavigate={handleNavigate} />
        )}

        {activePage === 'admin' && (
          <AdminPortal
            onNavigateHome={() => handleNavigate('home')}
            currentUser={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
