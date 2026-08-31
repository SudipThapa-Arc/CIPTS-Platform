import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import OfficerDashboardClient from './OfficerDashboardClient';

export default async function OfficerDashboardPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) {
    redirect('/auth/login');
  }

  // RBAC: Only officers may access this page
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .single();

  if (!profile) {
    redirect('/auth/login');
  }

  if (profile.role === 'STUDENT') {
    redirect('/student/dashboard');
  } else if (profile.role === 'RECRUITER') {
    redirect('/recruiter/dashboard');
  } else if (profile.role !== 'OFFICER') {
    redirect('/auth/login');
  }

  return <OfficerDashboardClient />;
}

