import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import StudentsClient from './StudentsClient';

export default async function OfficerStudentsPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) {
    redirect('/auth/login');
  }

  // Ensure they are an officer
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .single();

  if (profile?.role !== 'OFFICER') {
    redirect('/student/dashboard'); // Or wherever appropriate
  }

  // Fetch all students
  const { data: students, error } = await supabase
    .from('students')
    .select('*')
    .order('full_name', { ascending: true });

  if (error) {
    console.error('Error fetching students:', error);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      <div className="mb-8">
        <h1 className="font-display text-4xl text-on-surface mb-2">Master Student Directory</h1>
        <p className="text-on-surface-variant font-sans text-lg">
          Search, filter, and administer overrides for the entire academic cohort.
        </p>
      </div>

      <StudentsClient students={students || []} />

    </div>
  );
}
