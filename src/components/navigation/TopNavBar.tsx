"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Opportunities", href: "/student/jobs" },
  { label: "Students", href: "/student/dashboard" },
  { label: "Recruiters", href: "/recruiter/dashboard" },
];

export default function TopNavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main Bar */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-surface/90 backdrop-blur-2xl shadow-[0_2px_20px_rgba(53,37,205,0.08)] border-b border-outline-variant/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 h-16 flex items-center justify-between gap-8">
          {/* Brand */}
          <Link
            href="/"
            className="font-display text-2xl text-primary shrink-0 hover:opacity-80 transition-opacity"
          >
            CIPTS
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full font-sans text-sm font-semibold transition-all duration-200 ${
                  pathname === link.href
                    ? "text-primary bg-primary/8"
                    : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              href="/auth/login"
              className="font-sans text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors px-4 py-2"
            >
              Log In
            </Link>
            <Link
              href="/auth/register"
              className="bg-primary text-on-primary font-sans text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary/90 active:scale-95 transition-all duration-200 shadow-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-xl hover:bg-primary/5 transition-colors group"
          >
            <span
              className={`block w-5 h-0.5 bg-on-surface transition-all duration-300 origin-center ${
                mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-on-surface transition-all duration-300 ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-on-surface transition-all duration-300 origin-center ${
                mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-surface/95 backdrop-blur-2xl border-b border-outline-variant/30 shadow-lg px-5 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-3 rounded-xl font-sans text-sm font-semibold transition-all ${
                pathname === link.href
                  ? "text-primary bg-primary/8"
                  : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-outline-variant/30">
            <Link
              href="/auth/login"
              className="text-center px-4 py-3 rounded-xl font-sans text-sm font-semibold text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all"
            >
              Log In
            </Link>
            <Link
              href="/auth/register"
              className="text-center bg-primary text-on-primary font-sans text-sm font-semibold px-4 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
