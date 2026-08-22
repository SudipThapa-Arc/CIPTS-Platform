import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ReportsClient from './ReportsClient';

export default async function OfficerReportsPage() {
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
    redirect('/student/dashboard');
  }

  // Fetch all students to power the reports table
  const { data: students, error } = await supabase
    .from('students')
    .select('roll_number, full_name, department, gpa, graduation_year, placement_status')
    .order('roll_number', { ascending: true });

  if (error) {
    console.error('Error fetching data for reports:', error);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      <div className="mb-8 print:hidden">
        <h1 className="font-display text-4xl text-on-surface mb-2">Management Reports</h1>
        <p className="text-on-surface-variant font-sans text-lg">
          Generate, preview, and export filtered cohort data for accreditation filings.
        </p>
      </div>

      <ReportsClient students={students || []} />

    </div>
  );
}
