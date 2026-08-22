import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AnalyticsClient from './AnalyticsClient';

export default async function OfficerAnalyticsPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) {
    redirect('/auth/login');
  }

  // Verify OFFICER role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .single();

  if (profile?.role !== 'OFFICER') {
    redirect('/student/dashboard');
  }

  // 1. Fetch Students to calculate departmental placements
  const { data: students } = await supabase
    .from('students')
    .select('department, placement_status');

  // 2. Fetch Selected Applications for Recruiter Leaderboard and Salary Tiers
  // Since we don't have actual salary parsers, we will randomly assign tiers based on string length/presence for demo, 
  // or fetch jobs directly.
  const { data: selectedApps } = await supabase
    .from('applications')
    .select(`
      students ( gpa ),
      jobs (
        salary_package,
        recruiters ( company_name )
      )
    `)
    .eq('app_status', 'SELECTED');

  // Compute Department Stats
  const departmentStats: Record<string, { total: number, placed: number }> = {};
  const departmentsSet = new Set<string>();

  students?.forEach(student => {
    departmentsSet.add(student.department);
    if (!departmentStats[student.department]) {
      departmentStats[student.department] = { total: 0, placed: 0 };
    }
    departmentStats[student.department].total += 1;
    if (student.placement_status === 'PLACED') {
      departmentStats[student.department].placed += 1;
    }
  });

  // Compute Recruiter Leaderboard
  const recruiterStats: Record<string, { hires: number, totalGpa: number }> = {};
  const salaryTiers = { tier1: 0, tier2: 0, tier3: 0 };

  selectedApps?.forEach(app => {
    // Note: TypeScript might complain about nested relations if not cast properly, 
    // but standard supabase-js returns nested objects.
    const companyName = (app.jobs as any)?.recruiters?.company_name || 'Unknown';
    const gpa = (app.students as any)?.gpa || 0;
    const salaryStr = ((app.jobs as any)?.salary_package || '').toLowerCase();

    // Leaderboard
    if (!recruiterStats[companyName]) {
      recruiterStats[companyName] = { hires: 0, totalGpa: 0 };
    }
    recruiterStats[companyName].hires += 1;
    recruiterStats[companyName].totalGpa += gpa;

    // Simple heuristic for salary tiers
    if (salaryStr.includes('lpa') && parseInt(salaryStr) >= 15) {
      salaryTiers.tier1 += 1;
    } else if (salaryStr.includes('$100k') || salaryStr.includes('100,000')) {
      salaryTiers.tier1 += 1;
    } else if (salaryStr.includes('lpa') && parseInt(salaryStr) < 6) {
      salaryTiers.tier3 += 1;
    } else if (salaryStr.includes('lpa')) {
      salaryTiers.tier2 += 1;
    } else {
      // Default fallback
      salaryTiers.tier3 += 1;
    }
  });

  const recruiterLeaderboard = Object.entries(recruiterStats)
    .map(([company_name, stats]) => ({
      company_name,
      hires: stats.hires,
      avgGpa: stats.totalGpa / stats.hires
    }))
    .sort((a, b) => b.hires - a.hires);

  const analyticsData = {
    departments: Array.from(departmentsSet),
    departmentStats,
    recruiterLeaderboard,
    salaryTiers
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      <div className="mb-8">
        <h1 className="font-display text-4xl text-on-surface mb-2">Department Analytics</h1>
        <p className="text-on-surface-variant font-sans text-lg">
          Institutional intelligence and corporate performance metrics.
        </p>
      </div>

      <AnalyticsClient data={analyticsData} />

    </div>
  );
}
