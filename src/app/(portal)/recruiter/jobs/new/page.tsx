import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import JobCreationForm from './JobCreationForm';

export default async function NewJobPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) {
    redirect('/auth/login');
  }

  // Ensure they are a recruiter
  const { data: recruiter } = await supabase
    .from('recruiters')
    .select('recruiter_id')
    .eq('user_id', authData.user.id)
    .single();

  if (!recruiter) {
    redirect('/student/dashboard');
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/recruiter/jobs" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-sans text-sm font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to Recruitment Drives
      </Link>

      <div className="mb-8">
        <h1 className="font-display text-4xl text-on-surface mb-2">Create Recruitment Drive</h1>
        <p className="text-on-surface-variant font-sans text-lg">
          Define role specifications and automated candidate eligibility rules.
        </p>
      </div>

      <JobCreationForm />
    </div>
  );
}
