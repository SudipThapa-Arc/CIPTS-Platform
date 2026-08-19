import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ApplicantsClient from './ApplicantsClient';

export default async function ApplicantsPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) {
    redirect('/auth/login');
  }

  // Ensure they are a recruiter and own this job
  const { data: recruiter } = await supabase
    .from('recruiters')
    .select('recruiter_id')
    .eq('user_id', authData.user.id)
    .single();

  if (!recruiter) {
    redirect('/student/dashboard');
  }

  const { data: job, error: jobError } = await supabase
    .from('jobs')
    .select('role_title, status')
    .eq('job_id', params.id)
    .eq('recruiter_id', recruiter.recruiter_id)
    .single();

  if (jobError || !job) {
    notFound();
  }

  // Fetch applications
  const { data: applications, error: appsError } = await supabase
    .from('applications')
    .select(`
      app_id,
      job_id,
      app_status,
      applied_date,
      students (
        full_name,
        roll_number,
        department,
        gpa,
        resume_url,
        skills
      )
    `)
    .eq('job_id', params.id)
    .order('applied_date', { ascending: true });

  if (appsError) {
    console.error('Error fetching applicants:', appsError);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
        <div>
          <Link href="/recruiter/jobs" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-sans text-sm font-medium mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Recruitment Drives
          </Link>
          <h1 className="font-display text-4xl text-on-surface mb-2">{job.role_title} Pipeline</h1>
          <p className="text-on-surface-variant font-sans text-lg">
            Review candidates and manage recruitment stages.
          </p>
        </div>
        <div className="bg-surface-container/50 text-on-surface-variant px-4 py-2 rounded-xl text-sm font-semibold border border-outline-variant/30 flex items-center gap-2">
          Status: <span className={`uppercase tracking-wider ${job.status === 'OPEN' ? 'text-emerald-600' : 'text-on-surface'}`}>{job.status}</span>
        </div>
      </div>

      <ApplicantsClient applications={applications || []} jobId={params.id} />

    </div>
  );
}
