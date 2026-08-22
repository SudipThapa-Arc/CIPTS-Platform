import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import JobExplorerClient from './JobExplorerClient';

export default async function JobsPage() {
  const supabase = await createClient();
  
  const { data: authData, error: authError } = await supabase.auth.getUser();
  
  if (authError || !authData?.user) {
    redirect('/auth/login');
  }

  // Fetch the current student's data for eligibility checks
  const { data: student, error: studentError } = await supabase
    .from('students')
    .select('gpa, department')
    .eq('user_id', authData.user.id)
    .single();

  if (studentError || !student) {
    return (
      <div className="flex items-center justify-center h-64 text-on-surface-variant">
        Error loading student profile data. Please ensure your profile is complete.
      </div>
    );
  }

  // Fetch open jobs along with the company details
  const { data: jobs, error: jobsError } = await supabase
    .from('jobs')
    .select(`
      *,
      recruiters (
        company_name,
        industry_sector
      )
    `)
    .eq('status', 'OPEN')
    .order('created_at', { ascending: false });

  if (jobsError) {
    console.error('Error fetching jobs:', jobsError);
  }

  return (
    <div className="w-full">
      <JobExplorerClient 
        initialJobs={jobs || []} 
        studentGpa={student.gpa} 
        studentDepartment={student.department} 
      />
    </div>
  );
}
