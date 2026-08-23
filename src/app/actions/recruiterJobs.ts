'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createJob(formData: FormData) {
  const supabase = await createClient();
  
  const { data: authData } = await supabase.auth.getUser();
  if (!authData?.user) {
    return { error: 'Unauthorized. Please sign in.' };
  }

  // Get recruiter id
  const { data: recruiter } = await supabase
    .from('recruiters')
    .select('recruiter_id')
    .eq('user_id', authData.user.id)
    .single();

  if (!recruiter) {
    return { error: 'Recruiter profile not found. Access denied.' };
  }

  const role_title = (formData.get('role_title') as string)?.trim();
  const job_description = (formData.get('job_description') as string)?.trim();
  const min_gpa_raw = formData.get('min_gpa_req') as string;
  const vacancies_raw = formData.get('vacancies') as string;
  const salary_package = (formData.get('salary_package') as string)?.trim();
  const application_deadline = (formData.get('application_deadline') as string)?.trim();
  
  // Eligible departments
  const eligibleDeptsStr = (formData.get('eligible_departments') as string) || '';
  const eligible_departments = eligibleDeptsStr.split(',').map(d => d.trim()).filter(Boolean);

  // Validation checks
  if (!role_title || role_title.length < 3) {
    return { error: 'Role title must be at least 3 characters long.' };
  }

  if (!job_description || job_description.length < 10) {
    return { error: 'Please provide a detailed job description (minimum 10 characters).' };
  }

  const min_gpa_req = parseFloat(min_gpa_raw);
  if (isNaN(min_gpa_req) || min_gpa_req < 0 || min_gpa_req > 4.0) {
    return { error: 'Minimum GPA requirement must be between 0.00 and 4.00.' };
  }

  const vacancies = parseInt(vacancies_raw, 10);
  if (isNaN(vacancies) || vacancies < 1) {
    return { error: 'Vacancies must be at least 1.' };
  }

  if (!salary_package) {
    return { error: 'Please specify the compensation package.' };
  }

  if (!application_deadline) {
    return { error: 'Please specify an application deadline date.' };
  }

  const deadlineDate = new Date(application_deadline);
  if (isNaN(deadlineDate.getTime())) {
    return { error: 'Invalid application deadline date.' };
  }

  if (eligible_departments.length === 0) {
    return { error: 'Please select at least one eligible department.' };
  }

  const { error } = await supabase
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
    return { error: 'Failed to create job drive: ' + error.message };
  }

  revalidatePath('/recruiter/dashboard');
  revalidatePath('/recruiter/jobs');
  
  redirect('/recruiter/jobs');
}

export async function updateApplicationStatus(
  appId: string, 
  newStatus: 'SHORTLISTED' | 'INTERVIEWING' | 'SELECTED' | 'REJECTED' | 'PENDING', 
  jobId: string
) {
  if (!appId || !newStatus) {
    return { error: 'Invalid parameters provided' };
  }

  const validStatuses = ['SHORTLISTED', 'INTERVIEWING', 'SELECTED', 'REJECTED', 'PENDING'];
  if (!validStatuses.includes(newStatus)) {
    return { error: 'Invalid application status' };
  }

  const supabase = await createClient();
  
  const { error } = await supabase
    .from('applications')
    .update({ app_status: newStatus })
    .eq('app_id', appId);

  if (error) {
    console.error('Update status error:', error);
    return { error: 'Failed to update candidate status: ' + error.message };
  }

  revalidatePath(`/recruiter/jobs/${jobId}/applicants`);
  return { success: true };
}
