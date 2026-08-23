'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Briefcase, MapPin, DollarSign, Clock, CheckCircle, XCircle, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Job = {
  job_id: string;
  role_title: string;
  vacancies: number;
  salary_package: string | null;
  min_gpa_req: number | null;
  eligible_departments: string[];
  application_deadline: string;
  created_at: string;
  recruiters: {
    company_name: string;
    industry_sector: string | null;
  } | null;
};

export default function JobExplorerClient({
  initialJobs,
  studentGpa,
  studentDepartment
}: {
  initialJobs: Job[];
  studentGpa: number;
  studentDepartment: string;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEligibleOnly, setShowEligibleOnly] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [selectedDept, setSelectedDept] = useState<string>('ALL');

  // Extract departments from jobs
  const allDepts = ['ALL', ...Array.from(new Set(initialJobs.flatMap(j => j.eligible_departments || [])))];

  // Determine eligibility
  const checkEligibility = (job: Job) => {
    const minGpa = job.min_gpa_req ?? 0;
    return studentGpa >= minGpa && (job.eligible_departments?.includes(studentDepartment) ?? true);
  };

  // Filter jobs based on state
  const filteredJobs = initialJobs.filter((job) => {
    const companyName = job.recruiters?.company_name || 'Unknown Company';
    const matchesSearch = 
      job.role_title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      companyName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDept = selectedDept === 'ALL' || (job.eligible_departments?.includes(selectedDept));
    const isEligible = checkEligibility(job);

    if (showEligibleOnly && !isEligible) return false;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Meta */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-on-surface mb-2">Opportunity Explorer</h1>
          <p className="text-on-surface-variant font-sans text-lg">
            Discover and apply to verified corporate placement partners.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-on-surface-variant bg-surface-container py-2.5 px-5 rounded-full border border-outline-variant/50 shadow-sm">
          <span className="font-bold text-primary font-mono">{filteredJobs.length}</span> positions available
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-surface glass-panel p-4 rounded-3xl flex flex-col md:flex-row gap-4 border border-primary/10 shadow-sm">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Search by role or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-container/50 rounded-2xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-sans text-sm"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowEligibleOnly(!showEligibleOnly)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all font-sans text-sm font-semibold cursor-pointer active:scale-95
              ${showEligibleOnly 
                ? 'bg-primary text-white border-primary shadow-md' 
                : 'bg-surface border-outline-variant/60 text-on-surface hover:border-primary/50'
              }`}
          >
            <CheckCircle className="w-4 h-4" />
            Eligible Only
          </button>

          <button 
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all font-sans text-sm font-semibold cursor-pointer active:scale-95 ${
              selectedDept !== 'ALL' || showFilterDrawer
                ? 'bg-primary/10 border-primary/40 text-primary'
                : 'bg-surface border-outline-variant/60 text-on-surface hover:border-primary/50'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
            {selectedDept !== 'ALL' && (
              <span className="w-2 h-2 rounded-full bg-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Expandable Filter Drawer */}
      <AnimatePresence>
        {showFilterDrawer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-surface glass-panel p-6 rounded-3xl border border-outline-variant/40 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30">
                <span className="font-sans text-sm font-bold uppercase tracking-wider text-on-surface">Filter by Department</span>
                {selectedDept !== 'ALL' && (
                  <button 
                    onClick={() => setSelectedDept('ALL')}
                    className="text-xs text-primary font-semibold hover:underline"
                  >
                    Reset Department
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {allDepts.map(dept => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedDept === dept
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-surface-container/60 text-on-surface-variant hover:border-primary/30 border border-outline-variant/40'
                    }`}
                  >
                    {dept === 'ALL' ? 'All Departments' : dept}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full py-20 text-center glass-panel rounded-3xl p-12">
            <span className="material-symbols-outlined text-5xl text-outline mb-3 block">search_off</span>
            <h3 className="font-display text-2xl text-on-surface mb-2">No matching opportunities</h3>
            <p className="text-on-surface-variant text-sm max-w-md mx-auto">
              Try adjusting your search criteria or clearing department filters.
            </p>
          </div>
        ) : (
          filteredJobs.map((job, idx) => {
            const isEligible = checkEligibility(job);
            const companyName = job.recruiters?.company_name || 'Unknown Company';
            const sector = job.recruiters?.industry_sector || 'General';

            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.04, 0.4), duration: 0.3 }}
                whileHover={{ y: -4 }}
                key={job.job_id}
              >
                <Link href={`/student/jobs/${job.job_id}`} className="block h-full group">
                  <div className="h-full bg-surface glass-panel rounded-3xl p-6 border border-primary/10 hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer relative overflow-hidden">
                    
                    {/* Eligibility Banner */}
                    <div className={`absolute top-0 left-0 w-full h-1.5 ${isEligible ? 'bg-emerald-500' : 'bg-red-400'}`} />
                    
                    <div className="flex justify-between items-start mb-4 mt-1">
                      <div>
                        <h3 className="font-display text-xl text-on-surface group-hover:text-primary transition-colors line-clamp-1">{job.role_title}</h3>
                        <p className="font-sans text-sm text-on-surface-variant font-medium">{companyName}</p>
                      </div>
                      <div className="bg-surface-container p-2.5 rounded-xl shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                    </div>

                    <div className="space-y-2.5 mb-6 flex-grow">
                      <div className="flex items-center gap-2.5 text-sm text-on-surface-variant">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span className="font-mono font-semibold text-on-surface">{job.salary_package || 'Competitive'}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-on-surface-variant">
                        <MapPin className="w-4 h-4 text-secondary" />
                        <span className="font-sans">{sector}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-on-surface-variant">
                        <Clock className="w-4 h-4 text-outline" />
                        <span className="font-sans">Due {new Date(job.application_deadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                      <div>
                        {isEligible ? (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Eligible
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                            <XCircle className="w-3.5 h-3.5" />
                            Criteria Not Met
                          </div>
                        )}
                      </div>
                      
                      <span className="text-primary font-sans text-sm font-semibold opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 flex items-center gap-1">
                        View Role →
                      </span>
                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })
        )}
      </div>

    </div>
  );
}
