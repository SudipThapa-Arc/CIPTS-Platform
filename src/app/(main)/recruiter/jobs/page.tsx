import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Plus, Building2, Users, Clock, ArrowRight } from 'lucide-react';

export default async function RecruiterJobsPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) {
    redirect('/auth/login');
  }

  // Get recruiter profile
  const { data: recruiter } = await supabase
    .from('recruiters')
    .select('recruiter_id, company_name')
    .eq('user_id', authData.user.id)
    .single();

  if (!recruiter) {
    return <div>Error loading recruiter profile.</div>;
  }

  // Fetch jobs and their application counts
  const { data: jobs, error } = await supabase
    .from('jobs')
    .select(`
      *,
      applications (count)
    `)
    .eq('recruiter_id', recruiter.recruiter_id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching recruiter jobs:', error);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-display text-4xl text-on-surface mb-2">Recruitment Drives</h1>
          <p className="text-on-surface-variant font-sans text-lg">
            Manage your active postings and candidate pipelines.
          </p>
        </div>
        <Link 
          href="/recruiter/jobs/new"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create New Job
        </Link>
      </div>

      <div className="bg-surface glass-panel rounded-3xl p-8 border border-outline-variant shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Building2 className="w-64 h-64" />
        </div>

        <div className="relative z-10">
          <h2 className="font-display text-2xl text-on-surface mb-6">Your Opportunities</h2>
          
          {(!jobs || jobs.length === 0) ? (
            <div className="text-center py-16 bg-surface-container/30 rounded-2xl border border-dashed border-outline-variant">
              <p className="text-on-surface-variant font-medium mb-4">No recruitment drives created yet.</p>
              <Link href="/recruiter/jobs/new" className="text-primary font-semibold hover:underline">
                Start your first recruitment drive →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div key={job.job_id} className="bg-surface-container/50 border border-outline-variant/30 rounded-2xl p-6 flex flex-col hover:border-primary/40 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-display text-xl text-on-surface leading-tight mb-1">{job.role_title}</h3>
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        job.status === 'OPEN' ? 'bg-emerald-50 text-emerald-700' : 'bg-surface-container text-on-surface-variant'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant flex items-center gap-1.5"><Users className="w-4 h-4"/> Applicants</span>
                      <span className="font-semibold text-primary">{job.applications[0].count}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant flex items-center gap-1.5"><Clock className="w-4 h-4"/> Deadline</span>
                      <span className="font-medium text-on-surface">{new Date(job.application_deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/recruiter/jobs/${job.job_id}/applicants`}
                    className="w-full flex justify-center items-center gap-2 py-3 bg-white border border-outline-variant rounded-xl text-sm font-semibold text-on-surface hover:text-primary hover:border-primary/50 transition-colors group"
                  >
                    View Pipeline <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
