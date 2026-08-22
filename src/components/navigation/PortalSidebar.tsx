"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logout } from "@/app/actions/auth";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

interface PortalSidebarProps {
  role: "student" | "recruiter" | "officer";
  userName?: string;
  userEmail?: string;
}

const navConfig: Record<string, NavItem[]> = {
  student: [
    { label: "Dashboard", href: "/student/dashboard", icon: "dashboard" },
    { label: "Browse Jobs", href: "/student/jobs", icon: "work" },
    { label: "Applications", href: "/student/applications", icon: "send" },
    { label: "My Profile", href: "/student/profile", icon: "person" },
  ],
  recruiter: [
    { label: "Dashboard", href: "/recruiter/dashboard", icon: "dashboard" },
    { label: "Job Postings", href: "/recruiter/jobs", icon: "work_history" },
  ],
  officer: [
    { label: "Dashboard", href: "/officer/dashboard", icon: "dashboard" },
    { label: "Students", href: "/officer/students", icon: "group" },
    { label: "Analytics", href: "/officer/analytics", icon: "bar_chart" },
    { label: "Reports", href: "/officer/reports", icon: "description" },
    { label: "Settings", href: "/officer/settings", icon: "settings" },
  ],
};

const roleColors: Record<string, string> = {
  student: "text-primary bg-primary/10",
  recruiter: "text-secondary bg-secondary-container/50",
  officer: "text-tertiary bg-tertiary-container/50",
};

const roleLabels: Record<string, string> = {
  student: "Student Portal",
  recruiter: "Recruiter Portal",
  officer: "Officer Portal",
};

export default function PortalSidebar({ role, userName, userEmail }: PortalSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = navConfig[role] || [];

  const SidebarContent = () => (
    <>
      {/* Brand + Role Badge */}
      <div className="p-6 border-b border-outline-variant/20">
        <Link href="/" className="font-display text-xl text-primary block mb-2 hover:opacity-80 transition-opacity">
          CIPTS
        </Link>
        <span className={`inline-block font-sans text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${roleColors[role]}`}>
          {roleLabels[role]}
        </span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-outline-variant/20">
        {(userName || userEmail) && (
          <div className="px-4 py-3 mb-2 rounded-xl bg-surface-container/50">
            {userName && (
              <p className="font-sans text-sm font-semibold text-on-surface truncate">{userName}</p>
            )}
            {userEmail && (
              <p className="font-sans text-xs text-on-surface-variant truncate">{userEmail}</p>
            )}
          </div>
        )}
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-semibold text-on-surface-variant hover:text-error hover:bg-error-container/30 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Sign Out
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 min-h-screen bg-surface border-r border-outline-variant/30 sticky top-0 self-start h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-surface/95 backdrop-blur-xl border-b border-outline-variant/30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-display text-lg text-primary">CIPTS</Link>
          <span className={`font-sans text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${roleColors[role]}`}>
            {role}
          </span>
        </div>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="w-9 h-9 flex flex-col justify-center items-center gap-[5px] rounded-lg hover:bg-primary/5"
        >
          <span className={`block w-5 h-0.5 bg-on-surface transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block w-5 h-0.5 bg-on-surface transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-on-surface transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside className={`lg:hidden fixed top-0 left-0 z-40 h-full w-72 bg-surface flex flex-col shadow-2xl transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarContent />
      </aside>
    </>
  );
}
