'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateStudentSkills(studentId: string, skills: string[]) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('students')
    .update({ skills })
    .eq('student_id', studentId);
    
  if (error) {
    console.error('Update skills error:', error);
    return { error: 'Failed to update skills' };
  }
  
  revalidatePath('/student/profile');
  return { success: true };
}

export async function updateResumeUrl(studentId: string, resumeUrl: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('students')
    .update({ resume_url: resumeUrl })
    .eq('student_id', studentId);
    
  if (error) {
    console.error('Update resume error:', error);
    return { error: 'Failed to update resume' };
  }
  
  revalidatePath('/student/profile');
  return { success: true };
}
