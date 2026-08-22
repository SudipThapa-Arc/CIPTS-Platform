import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function StudentApplicationsPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) {
    redirect("/auth/login");
  }

  // Fetch student record
  const { data: student } = await supabase
    .from("students")
    .select("student_id, full_name")
    .eq("user_id", authData.user.id)
    .single();

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-64 text-on-surface-variant font-sans">
        Student profile not found.
      </div>
    );
  }

  // Fetch real applications
  const { data: applications, error: appError } = await supabase
    .from("applications")
    .select(`
      app_id,
      app_status,
      applied_date,
      jobs (
        job_id,
        role_title,
        salary_package,
        application_deadline,
        recruiters (
          company_name,
          industry_sector
        )
      )
    `)
    .eq("student_id", student.student_id)
    .order("applied_date", { ascending: false });

  if (appError) {
    console.error("Error fetching applications:", appError);
  }

  const statusBadge = (status: string) => {
    switch (status) {
      case "SELECTED":
        return <span className="px-3 py-1 bg-success-container text-success font-sans text-xs font-bold rounded-full">Selected / Offer</span>;
      case "INTERVIEWING":
        return <span className="px-3 py-1 bg-primary/10 text-primary font-sans text-xs font-bold rounded-full">Interviewing</span>;
      case "REJECTED":
        return <span className="px-3 py-1 bg-error-container/30 text-error font-sans text-xs font-bold rounded-full">Not Selected</span>;
      default:
        return <span className="px-3 py-1 bg-surface-container text-on-surface-variant font-sans text-xs font-bold rounded-full">Pending Review</span>;
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "SELECTED":
        return "task_alt";
      case "INTERVIEWING":
        return "forum";
      case "REJECTED":
        return "cancel";
      default:
        return "send";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-on-surface mb-2">Application Pipeline</h1>
          <p className="font-sans text-lg text-on-surface-variant">
            A chronological record of your placement journey, application milestones, and status updates.
          </p>
        </div>
        <Link
          href="/student/jobs"
          className="flex items-center gap-2 bg-primary text-on-primary font-sans text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 active:scale-95 transition-all shadow-sm shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">work</span>
          Browse More Jobs
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Timeline Column */}
        <div className="lg:col-span-8 space-y-6">
          {(!applications || applications.length === 0) ? (
            <div className="glass-panel rounded-3xl p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">inbox</span>
              </div>
              <h3 className="font-display text-2xl text-on-surface mb-2">No Applications Yet</h3>
              <p className="font-sans text-sm text-on-surface-variant max-w-md mb-6">
                You haven&apos;t applied to any positions yet. Explore active campus placement drives and apply with your verified profile.
              </p>
              <Link
                href="/student/jobs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-sans text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-sm"
              >
                Browse Campus Opportunities →
              </Link>
            </div>
          ) : (
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-7 before:h-full before:w-0.5 before:bg-primary/20">
              {applications.map((app) => {
                const job = app.jobs as any;
                const companyName = job?.recruiters?.company_name || "Company";
                const sector = job?.recruiters?.industry_sector || "Technology";

                return (
                  <div key={app.app_id} className="relative flex items-start gap-6 group">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-14 h-14 rounded-full glass-panel border border-primary/30 shrink-0 z-10 bg-surface shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {statusIcon(app.app_status ?? "PENDING")}
                      </span>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 glass-panel rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-outline-variant/30">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                          Applied {new Date(app.applied_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        {statusBadge(app.app_status ?? "PENDING")}
                      </div>

                      <h3 className="font-display text-2xl text-on-surface leading-tight mb-1">
                        {job?.role_title || "Untitled Role"}
                      </h3>
                      <p className="font-sans text-sm font-medium text-secondary mb-4">
                        {companyName} • {sector}
                      </p>

                      {job?.salary_package && (
                        <div className="inline-flex items-center gap-1 text-xs font-mono text-on-surface-variant bg-surface-container/60 px-3 py-1 rounded-lg">
                          <span className="material-symbols-outlined text-sm text-primary">payments</span>
                          Package: {job.salary_package}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar / Insights */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel rounded-3xl p-8 sticky top-6">
            <h3 className="font-display text-2xl text-primary mb-4">Placement Guidance</h3>
            <div className="w-full h-44 rounded-2xl overflow-hidden mb-5 relative group">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Students collaborating"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-6">
              Maintaining an updated skill matrix and timely application submissions boosts your interview conversion rate by up to 40%.
            </p>
            <Link
              href="/student/profile"
              className="block w-full text-center py-3 bg-surface border border-primary/30 text-primary font-sans text-sm font-semibold rounded-xl hover:bg-primary/5 transition-colors"
            >
              Update Career Portfolio →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
