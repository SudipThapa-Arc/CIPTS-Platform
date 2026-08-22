import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function RecruiterDashboardPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) redirect("/auth/login");

  const { data: recruiter } = await supabase
    .from("recruiters")
    .select("recruiter_id, company_name, industry_sector, is_verified")
    .eq("user_id", authData.user.id)
    .single();

  if (!recruiter) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 text-center gap-4">
        <span className="material-symbols-outlined text-5xl text-outline">business_off</span>
        <p className="text-on-surface-variant font-sans">Recruiter profile not found. Please contact support.</p>
      </div>
    );
  }

  // Fetch jobs with application counts
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*, applications(count)")
    .eq("recruiter_id", recruiter.recruiter_id)
    .order("created_at", { ascending: false });

  const openJobs = jobs?.filter((j) => j.status === "OPEN") ?? [];
  const totalApplicants = jobs?.reduce((sum, j) => sum + ((j.applications as any[])?.[0]?.count ?? 0), 0) ?? 0;
  const recentJobs = jobs?.slice(0, 3) ?? [];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <p className="font-sans text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-2">Recruiter Dashboard</p>
          <h1 className="font-display text-4xl md:text-5xl text-on-surface">{recruiter.company_name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <p className="font-sans text-lg text-on-surface-variant">{recruiter.industry_sector}</p>
            {recruiter.is_verified && (
              <span className="flex items-center gap-1 bg-success-container text-success font-sans text-xs font-bold px-2.5 py-1 rounded-full">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                Verified
              </span>
            )}
          </div>
        </div>
        <Link
          href="/recruiter/jobs/new"
          className="flex items-center gap-2 bg-primary text-on-primary font-sans text-sm font-semibold px-5 py-3 rounded-xl hover:bg-primary/90 active:scale-95 transition-all shadow-sm shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Job Posting
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Postings", value: openJobs.length, icon: "work", color: "text-primary" },
          { label: "Total Applicants", value: totalApplicants, icon: "groups", color: "text-secondary" },
          { label: "Total Drives", value: jobs?.length ?? 0, icon: "business_center", color: "text-tertiary" },
          { label: "Closed Drives", value: (jobs?.length ?? 0) - openJobs.length, icon: "task_alt", color: "text-outline" },
        ].map((metric) => (
          <div key={metric.label} className="glass-panel rounded-2xl p-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-wider">{metric.label}</span>
              <span className={`material-symbols-outlined ${metric.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{metric.icon}</span>
            </div>
            <span className="font-display text-4xl text-on-surface">{metric.value}</span>
          </div>
        ))}
      </div>

      {/* Recent Drives */}
      <div className="glass-panel rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl text-on-surface">Recent Recruitment Drives</h2>
          <Link href="/recruiter/jobs" className="font-sans text-sm font-semibold text-primary hover:underline underline-offset-4">
            View All →
          </Link>
        </div>

        {recentJobs.length === 0 ? (
          <div className="text-center py-12 bg-surface-container/30 rounded-2xl border border-dashed border-outline-variant">
            <span className="material-symbols-outlined text-5xl text-outline mb-4 block">work_off</span>
            <p className="text-on-surface-variant font-sans mb-4">No drives yet.</p>
            <Link href="/recruiter/jobs/new" className="text-primary font-semibold hover:underline">
              Start your first recruitment drive →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-outline-variant/20">
            {recentJobs.map((job) => {
              const appCount = (job.applications as any[])?.[0]?.count ?? 0;
              return (
                <div key={job.job_id} className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-[20px]">business_center</span>
                    </div>
                    <div>
                      <h3 className="font-sans font-semibold text-on-surface leading-tight">{job.role_title}</h3>
                      <p className="font-sans text-sm text-on-surface-variant">
                        {appCount} applicant{appCount !== 1 ? "s" : ""} · Due {new Date(job.application_deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-14 md:ml-0">
                    <span className={`font-sans text-xs font-bold px-2.5 py-1 rounded-full ${job.status === "OPEN" ? "bg-success-container text-success" : "bg-surface-container text-on-surface-variant"}`}>
                      {job.status}
                    </span>
                    <Link
                      href={`/recruiter/jobs/${job.job_id}/applicants`}
                      className="flex items-center gap-1 font-sans text-sm font-semibold text-primary hover:underline underline-offset-4 group-hover:gap-2 transition-all"
                    >
                      View Pipeline
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Action Required */}
      <div className="glass-panel rounded-2xl p-8">
        <h2 className="font-sans text-xl font-semibold text-error flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined">warning</span>
          Action Required
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {openJobs.slice(0, 2).map((job) => (
            <div key={job.job_id} className="p-5 rounded-xl bg-error-container/10 border border-error/15 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs font-bold text-error uppercase tracking-wider">Deadline Approaching</span>
                <span className="material-symbols-outlined text-error text-sm">timer</span>
              </div>
              <h4 className="font-sans text-sm font-semibold text-on-surface">{job.role_title}</h4>
              <p className="font-sans text-xs text-on-surface-variant">{new Date(job.application_deadline).toLocaleDateString()}</p>
              <Link href={`/recruiter/jobs/${job.job_id}/applicants`} className="font-sans text-xs font-bold text-primary hover:underline mt-1">
                Review Applicants →
              </Link>
            </div>
          ))}
          {openJobs.length === 0 && (
            <div className="col-span-2 py-8 text-center text-on-surface-variant font-sans text-sm">
              No urgent actions required.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
