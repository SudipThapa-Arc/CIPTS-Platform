'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function submitApplication(jobId: string, studentId: string) {
  const supabase = await createClient();

  // First, verify the job is still open
  const { data: job, error: jobError } = await supabase
    .from('jobs')
    .select('status')
    .eq('job_id', jobId)
    .single();

  if (jobError || job?.status !== 'OPEN') {
    return { error: 'This job is no longer accepting applications.' };
  }

  // Insert application
  const { error } = await supabase
    .from('applications')
    .insert([
      {
        job_id: jobId,
        student_id: studentId,
        app_status: 'PENDING'
      }
    ]);

  if (error) {
    if (error.code === '23505') { // Unique violation
      return { error: 'You have already applied for this job.' };
    }
    console.error('Submit application error:', error);
    return { error: 'Failed to submit application. Please try again.' };
  }

  // Revalidate paths to update UI instantly
  revalidatePath('/student/jobs');
  revalidatePath(`/student/jobs/${jobId}`);
  revalidatePath('/student/applications');
  revalidatePath('/student/dashboard');

  return { success: true };
}
