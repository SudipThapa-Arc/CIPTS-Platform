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

export async function updateAcademicInfo(studentId: string, gpa: number, rollNumber: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('students')
    .update({ gpa, roll_number: rollNumber })
    .eq('student_id', studentId);
    
  if (error) {
    console.error('Update academic info error:', error);
    return { error: 'Failed to update academic info' };
  }
  
  revalidatePath('/student/profile');
  return { success: true };
}

export async function uploadResumeFile(studentId: string, formData: FormData) {
  const file = formData.get('resume') as File;
  if (!file) return { error: 'No file provided' };

  const supabase = await createClient();
  
  const fileExt = file.name.split('.').pop();
  const filePath = `${studentId}/resume_${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('resumes')
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    console.error('Resume upload error:', uploadError);
    return { error: 'Failed to upload resume to storage. Please ensure the "resumes" bucket exists.' };
  }

  const { data } = supabase.storage
    .from('resumes')
    .getPublicUrl(filePath);

  if (data?.publicUrl) {
    await updateResumeUrl(studentId, data.publicUrl);
    return { success: true, url: data.publicUrl };
  }
  
  return { error: 'Failed to generate public URL' };
}
