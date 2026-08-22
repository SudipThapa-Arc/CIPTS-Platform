'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Briefcase, MapPin, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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

  // Determine eligibility
  const checkEligibility = (job: Job) => {
    const minGpa = job.min_gpa_req ?? 0;
    return studentGpa >= minGpa && job.eligible_departments.includes(studentDepartment);
  };

  // Filter jobs based on state
  const filteredJobs = initialJobs.filter((job) => {
    const companyName = job.recruiters?.company_name || 'Unknown Company';
    const matchesSearch = 
      job.role_title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      companyName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (showEligibleOnly) {
      return matchesSearch && checkEligibility(job);
    }
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Meta */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-display text-4xl text-on-surface mb-2">Opportunity Explorer</h1>
          <p className="text-on-surface-variant font-sans text-lg">
            Discover and apply to verified corporate partners.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-on-surface-variant bg-surface-container py-2 px-4 rounded-full border border-outline-variant">
          <span className="font-semibold text-primary">{filteredJobs.length}</span> positions available
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-surface glass-panel p-4 rounded-2xl flex flex-col md:flex-row gap-4 border border-primary/10 shadow-sm">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Search by role or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-container/50 rounded-xl border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans text-sm"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowEligibleOnly(!showEligibleOnly)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all font-sans text-sm font-semibold
              ${showEligibleOnly 
                ? 'bg-primary/10 border-primary text-primary' 
                : 'bg-surface border-outline-variant text-on-surface hover:border-primary/50'
              }`}
          >
            <CheckCircle className="w-4 h-4" />
            Eligible Only
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surface border border-outline-variant text-on-surface hover:border-primary/50 transition-all font-sans text-sm font-semibold">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full py-20 text-center text-on-surface-variant">
            No opportunities found matching your criteria.
          </div>
        ) : (
          filteredJobs.map((job, idx) => {
            const isEligible = checkEligibility(job);
            const companyName = job.recruiters?.company_name || 'Unknown Company';
            const sector = job.recruiters?.industry_sector || 'General';

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={job.job_id}
              >
                <Link href={`/student/jobs/${job.job_id}`} className="block h-full group">
                  <div className="h-full bg-surface glass-panel rounded-2xl p-6 border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1 relative overflow-hidden">
                    
                    {/* Eligibility Banner */}
                    <div className={`absolute top-0 left-0 w-full h-1 ${isEligible ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-display text-xl text-on-surface group-hover:text-primary transition-colors line-clamp-1">{job.role_title}</h3>
                        <p className="font-sans text-sm text-on-surface-variant font-medium">{companyName}</p>
                      </div>
                      <div className="bg-surface-container p-2 rounded-lg shrink-0">
                        <Briefcase className="w-5 h-5 text-primary/70" />
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 flex-grow">
                      <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-mono">{job.salary_package}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                        <MapPin className="w-4 h-4" />
                        <span className="font-sans">{sector}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                        <Clock className="w-4 h-4" />
                        <span className="font-sans">Apply by {new Date(job.application_deadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {isEligible ? (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Eligible
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-red-700 bg-red-50 px-2 py-1 rounded-md">
                            <XCircle className="w-3.5 h-3.5" />
                            GPA Not Met
                          </div>
                        )}
                      </div>
                      
                      <span className="text-primary font-sans text-sm font-semibold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1">
                        View Details →
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
