import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function StudentDashboardPage() {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) {
    redirect("/auth/login");
  }

  const { data: student } = await supabase
    .from("students")
    .select("*")
    .eq("user_id", authData.user.id)
    .single();

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 text-center gap-4">
        <span className="material-symbols-outlined text-5xl text-outline">person_off</span>
        <p className="text-on-surface-variant font-sans text-lg">Student profile not found.</p>
        <p className="text-on-surface-variant font-sans text-sm">Please contact your placement officer.</p>
      </div>
    );
  }

  // Fetch application counts
  const { data: applications } = await supabase
    .from("applications")
    .select("app_status")
    .eq("student_id", student.student_id);

  const appCounts = {
    total: applications?.length ?? 0,
    pending: applications?.filter((a) => a.app_status === "PENDING").length ?? 0,
    interviewing: applications?.filter((a) => a.app_status === "INTERVIEWING").length ?? 0,
    selected: applications?.filter((a) => a.app_status === "SELECTED").length ?? 0,
  };

  const firstName = student.full_name?.split(" ")[0] ?? "Student";

  const statusColors: Record<string, string> = {
    UNPLACED: "bg-surface-container text-on-surface-variant",
    APPLIED: "bg-secondary-container/50 text-on-secondary-container",
    INTERVIEWING: "bg-tertiary-container/50 text-on-tertiary-container",
    PLACED: "bg-success-container text-success",
  };

  const statusColor = statusColors[student.placement_status ?? "UNPLACED"] ?? statusColors.UNPLACED;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <p className="font-sans text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-2">{greeting}</p>
          <h1 className="font-display text-4xl md:text-5xl text-on-surface">{firstName}.</h1>
          <p className="font-sans text-lg text-on-surface-variant mt-2">Your placement journey at a glance.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/student/jobs"
            className="flex items-center gap-2 bg-primary text-on-primary font-sans text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 active:scale-95 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">work</span>
            Browse Jobs
          </Link>
          <Link
            href="/student/profile"
            className="flex items-center gap-2 bg-surface border border-outline-variant text-on-surface font-sans text-sm font-semibold px-5 py-2.5 rounded-xl hover:border-primary/40 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
            Profile
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-6 flex flex-col gap-1 col-span-2 md:col-span-1">
          <span className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-widest">GPA</span>
          <span className="font-display text-5xl text-primary">{student.gpa?.toFixed(2) ?? "—"}</span>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col gap-2">
          <span className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-widest">Status</span>
          <span className={`w-fit font-sans text-sm font-semibold px-3 py-1.5 rounded-full ${statusColor}`}>
            {(() => {
              const s = student.placement_status;
              if (!s) return "Unplaced";
              return s.charAt(0) + s.slice(1).toLowerCase();
            })()}
          </span>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col gap-1">
          <span className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-widest">Applications</span>
          <span className="font-display text-5xl text-primary">{appCounts.total}</span>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col gap-1">
          <span className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-widest">Interviews</span>
          <span className="font-display text-5xl text-primary">{appCounts.interviewing}</span>
        </div>
      </div>

      {/* Application Pipeline */}
      <div className="glass-panel rounded-2xl p-8">
        <h2 className="font-display text-2xl text-on-surface mb-8">Application Pipeline</h2>
        <div className="relative flex justify-between items-center before:content-[''] before:absolute before:top-5 before:left-5 before:right-5 before:h-0.5 before:bg-outline-variant/30">
          {[
            { label: "Applied", count: appCounts.total, icon: "send", done: appCounts.total > 0 },
            { label: "Shortlisted", count: null, icon: "check_circle", done: appCounts.interviewing > 0 || appCounts.selected > 0 },
            { label: "Interviewing", count: appCounts.interviewing, icon: "forum", done: appCounts.interviewing > 0, active: appCounts.interviewing > 0 },
            { label: "Offer", count: appCounts.selected, icon: "handshake", done: appCounts.selected > 0 },
          ].map((step) => (
            <div key={step.label} className="flex flex-col items-center z-10 bg-surface px-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  step.active
                    ? "bg-primary text-on-primary shadow-[0_0_20px_rgba(53,37,205,0.3)] scale-110"
                    : step.done
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "bg-surface-container border border-outline-variant text-outline"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: step.done ? "'FILL' 1" : "'FILL' 0" }}>
                  {step.icon}
                </span>
              </div>
              <span className={`font-sans text-xs font-bold uppercase tracking-wide ${step.active ? "text-primary" : step.done ? "text-on-surface" : "text-outline"}`}>
                {step.label}
              </span>
              {step.count !== null && step.count > 0 && (
                <span className="font-sans text-xs text-on-surface-variant mt-0.5">{step.count}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/student/jobs" className="glass-panel rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
          </div>
          <div>
            <p className="font-sans font-semibold text-on-surface text-sm">Browse Jobs</p>
            <p className="font-sans text-xs text-on-surface-variant">Find new opportunities</p>
          </div>
          <span className="material-symbols-outlined text-outline ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
        </Link>

        <Link href="/student/applications" className="glass-panel rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-secondary-container/50 flex items-center justify-center shrink-0 group-hover:bg-secondary-container transition-colors">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
          </div>
          <div>
            <p className="font-sans font-semibold text-on-surface text-sm">My Applications</p>
            <p className="font-sans text-xs text-on-surface-variant">{appCounts.total} submitted</p>
          </div>
          <span className="material-symbols-outlined text-outline ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
        </Link>

        <Link href="/student/profile" className="glass-panel rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-tertiary-container/50 flex items-center justify-center shrink-0 group-hover:bg-tertiary-container transition-colors">
            <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
          </div>
          <div>
            <p className="font-sans font-semibold text-on-surface text-sm">My Profile</p>
            <p className="font-sans text-xs text-on-surface-variant">Update skills &amp; resume</p>
          </div>
          <span className="material-symbols-outlined text-outline ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
        </Link>
      </div>

      {/* Academic Info */}
      <div className="glass-panel rounded-2xl p-8">
        <h2 className="font-display text-2xl text-on-surface mb-6">Academic Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Department", value: student.department },
            { label: "Roll Number", value: student.roll_number, mono: true },
            { label: "Graduation Year", value: String(student.graduation_year) },
            { label: "GPA", value: student.gpa?.toFixed(2) ?? "—", mono: true },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-wider">{item.label}</span>
              <span className={`font-sans text-base font-semibold text-on-surface ${item.mono ? "font-mono" : ""}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
