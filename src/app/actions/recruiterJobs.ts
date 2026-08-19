'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createJob(formData: FormData) {
  const supabase = await createClient();
  
  const { data: authData } = await supabase.auth.getUser();
  if (!authData?.user) {
    return { error: 'Unauthorized' };
  }

  // Get recruiter id
  const { data: recruiter } = await supabase
    .from('recruiters')
    .select('recruiter_id')
    .eq('user_id', authData.user.id)
    .single();

  if (!recruiter) {
    return { error: 'Recruiter profile not found' };
  }

  const role_title = formData.get('role_title') as string;
  const job_description = formData.get('job_description') as string;
  const min_gpa_req = parseFloat(formData.get('min_gpa_req') as string);
  const vacancies = parseInt(formData.get('vacancies') as string);
  const salary_package = formData.get('salary_package') as string;
  const application_deadline = formData.get('application_deadline') as string;
  
  // Eligible departments will be sent as a comma separated string
  const eligibleDeptsStr = formData.get('eligible_departments') as string;
  const eligible_departments = eligibleDeptsStr.split(',').map(d => d.trim()).filter(Boolean);

  const { data, error } = await supabase
    .from('jobs')
    .insert([
      {
        recruiter_id: recruiter.recruiter_id,
        role_title,
        job_description,
        min_gpa_req,
        eligible_departments,
        vacancies,
        salary_package,
        application_deadline,
        status: 'OPEN'
      }
    ])
    .select('job_id')
    .single();

  if (error) {
    console.error('Job creation error:', error);
    return { error: 'Failed to create job. Please check the inputs.' };
  }

  revalidatePath('/recruiter/dashboard');
  revalidatePath('/recruiter/jobs');
  
  redirect('/recruiter/jobs');
}

export async function updateApplicationStatus(appId: string, newStatus: 'SHORTLISTED' | 'INTERVIEWING' | 'SELECTED' | 'REJECTED' | 'PENDING', jobId: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('applications')
    .update({ app_status: newStatus })
    .eq('app_id', appId);

  if (error) {
    console.error('Update status error:', error);
    return { error: 'Failed to update candidate status' };
  }

  revalidatePath(`/recruiter/jobs/${jobId}/applicants`);
  return { success: true };
}
