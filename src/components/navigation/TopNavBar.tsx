import Link from "next/link";

export default function TopNavBar() {
  return (
    <nav className="bg-surface/80 dark:bg-surface-container-low/80 backdrop-blur-xl rounded-full mt-6 mx-auto w-fit px-8 py-3 sticky top-0 z-50 border border-white/20 dark:border-outline/10 shadow-[0_20_40px_rgba(79,70,229,0.05)]">
      <div className="flex items-center gap-8 max-w-[1280px] mx-auto">
        {/* Brand */}
        <Link href="/" className="font-display text-2xl font-semibold tracking-tight text-primary dark:text-primary-fixed">
          CIPTS
        </Link>
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 font-sans text-sm font-semibold">
          <Link href="/" className="text-primary dark:text-primary-fixed-dim border-b-2 border-primary hover:text-primary transition-colors duration-300">
            Home
          </Link>
          <Link href="/student/jobs" className="text-on-surface-variant dark:text-on-surface-variant/70 hover:text-primary transition-colors duration-300">
            Opportunities
          </Link>
          <Link href="/student/dashboard" className="text-on-surface-variant dark:text-on-surface-variant/70 hover:text-primary transition-colors duration-300">
            Students
          </Link>
          <Link href="/recruiter/dashboard" className="text-on-surface-variant dark:text-on-surface-variant/70 hover:text-primary transition-colors duration-300">
            Recruiters
          </Link>
          <Link href="/about" className="text-on-surface-variant dark:text-on-surface-variant/70 hover:text-primary transition-colors duration-300">
            About
          </Link>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-4 ml-8">
          <Link href="/auth/login" className="font-sans text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">
            Log In
          </Link>
          <button className="bg-primary text-on-primary font-sans text-sm font-semibold px-6 py-2 rounded-full hover:bg-primary/90 scale-95 transition-transform duration-200 shadow-sm cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
