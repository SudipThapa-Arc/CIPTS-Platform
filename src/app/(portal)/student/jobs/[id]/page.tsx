import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Building2, MapPin, DollarSign, Clock, CheckCircle, GraduationCap } from 'lucide-react';
import ApplyButton from './ApplyButton';

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) {
    redirect('/auth/login');
  }

  // Fetch the job and company details
  const { data: job, error: jobError } = await supabase
    .from('jobs')
    .select(`
      *,
      recruiters (
        company_name,
        industry_sector,
        company_website
      )
    `)
    .eq('job_id', resolvedParams.id)
    .single();

  if (jobError || !job) {
    notFound();
  }

  // Fetch the student profile
  const { data: student } = await supabase
    .from('students')
    .select('student_id, gpa, department')
    .eq('user_id', authData.user.id)
    .single();

  if (!student) {
    return <div>Error loading student profile.</div>;
  }

  // Check if they've already applied
  const { data: existingApp } = await supabase
    .from('applications')
    .select('app_id')
    .eq('job_id', job.job_id)
    .eq('student_id', student.student_id)
    .single();

  const hasApplied = !!existingApp;
  
  // Eligibility logic
  const minGpaReq = job.min_gpa_req ?? 0;
  const isEligible = student.gpa >= minGpaReq && job.eligible_departments.includes(student.department);
  const companyName = job.recruiters?.company_name || 'Unknown Company';
  const sector = job.recruiters?.industry_sector || 'General Sector';

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Back Link */}
      <Link href="/student/jobs" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-sans text-sm font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to Opportunities
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Section */}
          <div className="bg-surface glass-panel rounded-3xl p-8 lg:p-10 border border-outline-variant shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Building2 className="w-40 h-40" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full font-sans text-xs font-bold tracking-widest uppercase">
                  {job.status}
                </div>
                {isEligible && !hasApplied && (
                  <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-sans text-xs font-bold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Eligible
                  </div>
                )}
              </div>
              
              <h1 className="font-display text-4xl lg:text-5xl text-on-surface leading-tight mb-4">{job.role_title}</h1>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-on-surface-variant font-sans text-lg mb-8">
                <span className="font-semibold text-primary">{companyName}</span>
                <span className="flex items-center gap-1.5 text-sm"><MapPin className="w-4 h-4" /> {sector}</span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="bg-surface-container py-3 px-5 rounded-xl border border-outline-variant/50">
                  <div className="text-xs text-on-surface-variant mb-1 uppercase tracking-wider font-semibold">Compensation</div>
                  <div className="flex items-center gap-2 font-mono text-lg text-on-surface">
                    <DollarSign className="w-5 h-5 text-primary" /> {job.salary_package}
                  </div>
                </div>
                <div className="bg-surface-container py-3 px-5 rounded-xl border border-outline-variant/50">
                  <div className="text-xs text-on-surface-variant mb-1 uppercase tracking-wider font-semibold">Vacancies</div>
                  <div className="flex items-center gap-2 font-mono text-lg text-on-surface">
                    {job.vacancies} Positions
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-surface glass-panel rounded-3xl p-8 lg:p-10 border border-outline-variant shadow-sm">
            <h2 className="font-display text-2xl mb-6 text-on-surface">Role Overview & Responsibilities</h2>
            <div className="prose prose-zinc max-w-none font-sans text-on-surface-variant leading-relaxed">
              {job.job_description.split('\n').map((paragraph: string, i: number) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar / Action Panel */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-surface glass-panel rounded-3xl p-6 border border-primary/20 shadow-md sticky top-6">
            <h3 className="font-display text-xl mb-6 text-on-surface">Application Terminal</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-outline-variant/50">
                <span className="text-sm text-on-surface-variant flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Deadline
                </span>
                <span className="font-sans font-semibold text-sm">
                  {new Date(job.application_deadline).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-outline-variant/50">
                <span className="text-sm text-on-surface-variant flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> Min. GPA
                </span>
                <span className={`font-mono font-semibold text-sm ${student.gpa >= minGpaReq ? 'text-emerald-600' : 'text-red-600'}`}>
                  {minGpaReq.toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col gap-2 py-3 border-b border-outline-variant/50">
                <span className="text-sm text-on-surface-variant flex items-center gap-2">
                  Eligible Departments
                </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {job.eligible_departments.map((dept: string) => (
                    <span 
                      key={dept} 
                      className={`text-xs font-mono px-2 py-1 rounded-md border ${
                        student.department === dept 
                          ? 'bg-primary/10 border-primary/30 text-primary' 
                          : 'bg-surface-container border-outline-variant text-on-surface-variant'
                      }`}
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Container */}
            <ApplyButton 
              jobId={job.job_id} 
              studentId={student.student_id} 
              isEligible={isEligible} 
              hasApplied={hasApplied} 
            />

            <div className="mt-6 text-xs text-center text-on-surface-variant leading-relaxed">
              By submitting an application, you agree to share your verified institutional academic records with the recruiting partner.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
