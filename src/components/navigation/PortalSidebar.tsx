"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { logout } from "@/app/actions/auth";
import { motion, AnimatePresence } from "framer-motion";

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
  student: "text-primary bg-primary/10 border border-primary/20",
  recruiter: "text-secondary bg-secondary-container/50 border border-secondary/20",
  officer: "text-tertiary bg-tertiary-container/50 border border-tertiary/20",
};

const roleLabels: Record<string, string> = {
  student: "Student Portal",
  recruiter: "Recruiter Portal",
  officer: "Officer Portal",
};

export default function PortalSidebar({ role, userName, userEmail }: PortalSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isPendingLogout, startLogoutTransition] = useTransition();
  const navItems = navConfig[role] || [];

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    startLogoutTransition(async () => {
      await logout();
    });
  };

  const SidebarContent = () => (
    <>
      {/* Brand + Role Badge */}
      <div className="p-6 border-b border-outline-variant/20">
        <Link 
          href="/" 
          className="font-display text-2xl text-primary block mb-2 hover:opacity-80 transition-opacity active:scale-98"
        >
          CIPTS
        </Link>
        <span className={`inline-block font-sans text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${roleColors[role]}`}>
          {roleLabels[role]}
        </span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 overflow-y-auto space-y-1">
        <ul className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== `/${role}/dashboard` && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-semibold transition-all duration-200 active:scale-95 ${
                    isActive
                      ? "text-primary bg-primary/10 shadow-sm border border-primary/15 font-bold"
                      : "text-on-surface-variant hover:text-primary hover:bg-primary/5 hover:translate-x-1"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] transition-transform ${isActive ? "scale-110" : ""}`}
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-outline-variant/20 space-y-3">
        {(userName || userEmail) && (
          <div className="px-4 py-3 rounded-xl bg-surface-container/50 border border-outline-variant/20">
            {userName && (
              <p className="font-sans text-sm font-bold text-on-surface truncate">{userName}</p>
            )}
            {userEmail && (
              <p className="font-sans text-xs text-on-surface-variant truncate font-mono mt-0.5">{userEmail}</p>
            )}
          </div>
        )}
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            disabled={isPendingLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-semibold text-on-surface-variant hover:text-error hover:bg-error-container/20 border border-transparent hover:border-error/20 transition-all duration-200 active:scale-95 disabled:opacity-60 cursor-pointer"
          >
            {isPendingLogout ? (
              <>
                <svg className="animate-spin w-4 h-4 text-error" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="text-error font-medium">Signing Out...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">logout</span>
                Sign Out
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 min-h-screen bg-surface/90 backdrop-blur-xl border-r border-outline-variant/30 sticky top-0 self-start h-screen z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-surface/95 backdrop-blur-xl border-b border-outline-variant/30 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-display text-xl text-primary active:scale-95 transition-transform">CIPTS</Link>
          <span className={`font-sans text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${roleColors[role]}`}>
            {role}
          </span>
        </div>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="w-10 h-10 flex flex-col justify-center items-center gap-[5px] rounded-xl hover:bg-primary/5 active:scale-90 transition-all cursor-pointer"
        >
          <span className={`block w-5 h-0.5 bg-on-surface transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block w-5 h-0.5 bg-on-surface transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-on-surface transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <aside className={`lg:hidden fixed top-0 left-0 z-50 h-full w-72 bg-surface/95 backdrop-blur-2xl flex flex-col shadow-2xl transition-transform duration-300 border-r border-outline-variant/30 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarContent />
      </aside>
    </>
  );
}
