import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface dark:bg-surface-container-lowest w-full pt-section-gap pb-stack-lg border-t border-outline-variant/30 mt-auto">
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-6 font-sans text-base text-secondary dark:text-secondary-fixed reveal-on-scroll">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="font-display text-3xl text-primary dark:text-primary-fixed mb-4">CIPTS</h3>
          <p className="font-sans text-sm text-on-surface-variant opacity-80 hover:opacity-100 transition-opacity">
            © {new Date().getFullYear()} CIPTS Institutional. All rights reserved.
          </p>
        </div>
        
        {/* Links Column */}
        <div className="col-span-1 md:col-span-3 flex flex-wrap gap-8 md:justify-end items-center">
          <Link href="/privacy" className="font-sans text-sm text-on-surface-variant hover:text-primary underline decoration-primary/30 underline-offset-4 transition-all opacity-80 hover:opacity-100">
            Privacy Policy
          </Link>
          <Link href="/terms" className="font-sans text-sm text-on-surface-variant hover:text-primary underline decoration-primary/30 underline-offset-4 transition-all opacity-80 hover:opacity-100">
            Terms of Service
          </Link>
          <Link href="/map" className="font-sans text-sm text-on-surface-variant hover:text-primary underline decoration-primary/30 underline-offset-4 transition-all opacity-80 hover:opacity-100">
            Campus Map
          </Link>
          <Link href="/support" className="font-sans text-sm text-on-surface-variant hover:text-primary underline decoration-primary/30 underline-offset-4 transition-all opacity-80 hover:opacity-100">
            Contact Support
          </Link>
          <Link href="/recruiter/dashboard" className="font-sans text-sm text-on-surface-variant hover:text-primary underline decoration-primary/30 underline-offset-4 transition-all opacity-80 hover:opacity-100">
            Recruiter Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
