import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface w-full pt-16 pb-10 border-t border-outline-variant/30 mt-auto">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-display text-3xl text-primary block mb-3">
              CIPTS
            </Link>
            <p className="font-sans text-sm text-on-surface-variant max-w-xs leading-relaxed">
              An airy, intuitive ecosystem connecting visionary students with premier
              opportunities, transforming the recruitment lifecycle into a seamless journey.
            </p>
          </div>

          {/* Portals Column */}
          <div>
            <h3 className="font-sans text-xs font-bold text-on-surface uppercase tracking-widest mb-4">
              Portals
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Student Dashboard", href: "/student/dashboard" },
                { label: "Browse Jobs", href: "/student/jobs" },
                { label: "Recruiter Portal", href: "/recruiter/dashboard" },
                { label: "Officer View", href: "/officer/dashboard" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Column */}
          <div>
            <h3 className="font-sans text-xs font-bold text-on-surface uppercase tracking-widest mb-4">
              Account
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Sign In", href: "/auth/login" },
                { label: "Create Account", href: "/auth/register" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-on-surface-variant">
            © {new Date().getFullYear()} CIPTS Institutional. All rights reserved.
          </p>
          <p className="font-sans text-xs text-on-surface-variant">
            Built with care for students & recruiters.
          </p>
        </div>
      </div>
    </footer>
  );
}
