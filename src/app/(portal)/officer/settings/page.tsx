import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import SettingsClient from './SettingsClient';

export default async function OfficerSettingsPage() {
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

  // Fetch immutable audit logs
  const { data: auditLogs, error } = await supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching audit logs:', error);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      <div className="mb-8">
        <h1 className="font-display text-4xl text-on-surface mb-2">System Configuration & Security</h1>
        <p className="text-on-surface-variant font-sans text-lg">
          Manage platform access, lifecycle events, and review compliance logs.
        </p>
      </div>

      <SettingsClient auditLogs={auditLogs || []} />

    </div>
  );
}
