'use client';

import { useState } from 'react';
import { updateApplicationStatus } from '@/app/actions/recruiterJobs';
import { Search, User, Filter, ChevronRight, X, ExternalLink, ShieldCheck, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Student = {
  full_name: string;
  roll_number: string;
  department: string;
  gpa: number;
  resume_url: string | null;
  skills: string[] | null;
};

type Application = {
  app_id: string;
  job_id: string;
  app_status: string | null;
  applied_date: string;
  students: Student;
};

export default function ApplicantsClient({ 
  applications, 
  jobId 
}: { 
  applications: Application[], 
  jobId: string 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const filteredApps = applications.filter(app => 
    app.students.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.students.roll_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status counters for the funnel
  const stats = {
    total: applications.length,
    shortlisted: applications.filter(a => a.app_status && ['SHORTLISTED', 'INTERVIEWING', 'SELECTED'].includes(a.app_status)).length,
    interviewing: applications.filter(a => a.app_status && ['INTERVIEWING', 'SELECTED'].includes(a.app_status)).length,
    selected: applications.filter(a => a.app_status === 'SELECTED').length,
  };

  const handleStatusUpdate = async (newStatus: "INTERVIEWING" | "PENDING" | "SHORTLISTED" | "REJECTED" | "SELECTED") => {
    if (!selectedApp || isUpdating) return;
    setIsUpdating(true);
    await updateApplicationStatus(selectedApp.app_id, newStatus, jobId);
    
    // Optimistic local update
    selectedApp.app_status = newStatus;
    setSelectedApp({ ...selectedApp });
    
    setIsUpdating(false);
  };

  const getStatusColor = (status: string | null) => {
    switch(status) {
      case 'SELECTED': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'REJECTED': return 'bg-red-50 text-red-700 border-red-200';
      case 'INTERVIEWING': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'SHORTLISTED': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-surface-container text-on-surface-variant border-outline-variant';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Funnel Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Applied', val: stats.total, color: 'text-on-surface' },
          { label: 'Shortlisted', val: stats.shortlisted, color: 'text-primary' },
          { label: 'Interviewing', val: stats.interviewing, color: 'text-amber-600' },
          { label: 'Selected', val: stats.selected, color: 'text-emerald-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface glass-panel p-6 rounded-2xl border border-outline-variant/50 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">{stat.label}</span>
            <span className={`font-display text-4xl ${stat.color}`}>{stat.val}</span>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-surface p-4 rounded-2xl flex flex-col md:flex-row gap-4 border border-outline-variant shadow-sm">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 bg-surface-container/50 rounded-xl border border-outline-variant focus:border-primary outline-none font-sans text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-surface border border-outline-variant text-on-surface hover:border-primary/50 transition-all font-sans text-sm font-semibold">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Main Table Area */}
      <div className="bg-surface rounded-3xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-surface-container/30 border-b border-outline-variant text-on-surface-variant font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Candidate</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">GPA</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                    No candidates found.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.app_id} className="hover:bg-surface-container/20 transition-colors group cursor-pointer" onClick={() => setSelectedApp(app)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {app.students.full_name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-on-surface">{app.students.full_name}</div>
                          <div className="font-mono text-xs text-on-surface-variant">{app.students.roll_number}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-on-surface-variant">{app.students.department}</td>
                    <td className="px-6 py-4 font-mono font-semibold text-on-surface">{app.students.gpa.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(app.app_status)}`}>
                        {app.app_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side Drawer for Candidate Details */}
      <AnimatePresence>
        {selectedApp && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApp(null)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-lg bg-surface shadow-2xl z-50 border-l border-outline-variant flex flex-col"
            >
              <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container/30">
                <h3 className="font-display text-xl text-on-surface">Candidate Profile</h3>
                <button onClick={() => setSelectedApp(null)} className="p-2 bg-surface border border-outline-variant rounded-full hover:bg-surface-container transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-6 flex-grow overflow-y-auto space-y-8">
                
                {/* Header Profile */}
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-display text-3xl shadow-md">
                    {selectedApp.students.full_name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-on-surface">{selectedApp.students.full_name}</h2>
                    <p className="font-mono text-sm text-on-surface-variant">{selectedApp.students.roll_number}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container/50 p-4 rounded-xl border border-outline-variant/50">
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Department</span>
                    <span className="font-sans font-medium text-lg">{selectedApp.students.department}</span>
                  </div>
                  <div className="bg-surface-container/50 p-4 rounded-xl border border-outline-variant/50">
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1">CGPA</span>
                    <span className="font-mono font-medium text-lg text-primary">{selectedApp.students.gpa.toFixed(2)}</span>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-3">Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {(!selectedApp.students.skills || selectedApp.students.skills.length === 0) ? (
                      <span className="text-sm text-on-surface-variant italic">No skills listed</span>
                    ) : (
                      selectedApp.students.skills.map((s, i) => (
                        <span key={i} className="px-3 py-1 bg-surface-container text-on-surface border border-outline-variant rounded-md text-xs font-mono font-medium">{s}</span>
                      ))
                    )}
                  </div>
                </div>

                {/* Resume Link */}
                {selectedApp.students.resume_url && (
                  <a href={selectedApp.students.resume_url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors group">
                    <div className="flex items-center gap-3 text-primary">
                      <ShieldCheck className="w-5 h-5" />
                      <span className="font-semibold text-sm">Verified Resume Document</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-primary opacity-50 group-hover:opacity-100" />
                  </a>
                )}
                
              </div>

              {/* Action Buttons */}
              <div className="p-6 border-t border-outline-variant bg-surface flex flex-col gap-3">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Update Status</span>
                
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleStatusUpdate('SHORTLISTED')}
                    disabled={isUpdating || selectedApp.app_status === 'SHORTLISTED'}
                    className="py-3 rounded-lg border border-primary/30 text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                  >
                    Shortlist
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate('INTERVIEWING')}
                    disabled={isUpdating || selectedApp.app_status === 'INTERVIEWING'}
                    className="py-3 rounded-lg border border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-500 hover:text-white font-semibold text-sm transition-all disabled:opacity-50"
                  >
                    Interview
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate('SELECTED')}
                    disabled={isUpdating || selectedApp.app_status === 'SELECTED'}
                    className="py-3 rounded-lg border border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white font-semibold text-sm transition-all disabled:opacity-50 col-span-2"
                  >
                    Mark as Selected
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate('REJECTED')}
                    disabled={isUpdating || selectedApp.app_status === 'REJECTED'}
                    className="py-3 rounded-lg border border-red-200 text-red-700 bg-red-50 hover:bg-red-500 hover:text-white font-semibold text-sm transition-all disabled:opacity-50 col-span-2"
                  >
                    Reject Candidate
                  </button>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
