"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  ChevronDown, 
  Sparkles, 
  Send, 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight,
  Check
} from "lucide-react";

const corporatePartners = [
  { name: "Google Cloud", tag: "Tech & Cloud", hires: "45+ Hires" },
  { name: "Microsoft", tag: "Enterprise Software", hires: "60+ Hires" },
  { name: "Amazon", tag: "E-Commerce & AWS", hires: "80+ Hires" },
  { name: "Deloitte", tag: "Consulting & Audit", hires: "50+ Hires" },
  { name: "TechNova", tag: "AI & Innovation", hires: "30+ Hires" },
  { name: "McKinsey & Co", tag: "Strategy Consulting", hires: "25+ Hires" },
  { name: "Adobe", tag: "Creative Tech", hires: "35+ Hires" },
  { name: "Goldman Sachs", tag: "Quantitative Finance", hires: "20+ Hires" },
];

const lifecycleSteps = [
  {
    step: "01",
    title: "Verified Student Profile",
    desc: "Students build a verified profile with real-time academic records, cumulative GPA, and verified technical skill matrices.",
    icon: "school",
    highlight: "Zero false GPA claims"
  },
  {
    step: "02",
    title: "Instant Eligibility Matching",
    desc: "Our matching engine verifies department eligibility and GPA criteria in 0ms before an application can be submitted.",
    icon: "filter_alt",
    highlight: "100% criteria compliance"
  },
  {
    step: "03",
    title: "Direct Multi-Stage Pipeline",
    desc: "Recruiters manage candidate review, shortlisting, technical evaluations, and interview stages with instant live notifications.",
    icon: "view_kanban",
    highlight: "Real-time candidate tracker"
  },
  {
    step: "04",
    title: "Verified Offer Extension",
    desc: "Extend formal placement offers with official institutional confirmation and immutable audit trails for compliance.",
    icon: "verified",
    highlight: "Instant institutional record"
  }
];

const testimonials = [
  {
    quote: "CIPTS completely transformed our on-campus recruitment season. The instant criteria matching saved us hundreds of manual review hours.",
    author: "Elena Rostova",
    role: "Director of University Talent, TechNova",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    badge: "Corporate Partner"
  },
  {
    quote: "I could see exactly where my application stood at every interview stage. Having full transparency gave me the confidence to prepare effectively.",
    author: "Marcus Chen",
    role: "Placed at Google Cloud (Software Engineer, '25)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    badge: "Student Success"
  },
  {
    quote: "The real-time placement dashboards and automated audit logs make accreditation and institutional reporting effortless for our placement cell.",
    author: "Dr. Arvind Sharma",
    role: "Chief Placement Officer, Apex Institute",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    badge: "Placement Officer"
  }
];

const faqs = [
  {
    q: "How does CIPTS ensure student GPA and eligibility data is accurate?",
    a: "Student academic records and CGPA are directly linked to the institutional database and maintained under officer audit control, preventing unverified or modified grade submissions."
  },
  {
    q: "Can recruiters customize minimum criteria and multi-stage interview rounds?",
    a: "Yes. Recruiters can configure eligible departments, GPA cutoffs, vacancy limits, and progress candidates seamlessly through custom stages (Shortlisted, Interviewing, Selected, Rejected)."
  },
  {
    q: "Is student personal data protected and secure?",
    a: "All personal candidate information and transcripts are guarded with Row-Level Security (RLS) policies and encrypted database storage, accessible strictly to verified hiring partners and college officers."
  },
  {
    q: "What reporting tools are available to Placement Officers?",
    a: "Officers have access to real-time placement analytics, department-level comparison charts, average package calculations, and instant downloadable compliance reports."
  },
  {
    q: "How fast are application status updates reflected to candidates?",
    a: "Status updates are instantaneous. When a recruiter shortlists or selects a candidate, the change is reflected immediately across the student's live pipeline tracker."
  }
];

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [alertEmail, setAlertEmail] = useState("");

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail.trim()) return;
    setEmailSubscribed(true);
    setTimeout(() => {
      setAlertEmail("");
      setEmailSubscribed(false);
    }, 4000);
  };

  return (
    <main className="flex-grow flex flex-col items-center w-full px-5 md:px-16 overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="w-full max-w-[1280px] pt-16 md:pt-28 pb-8 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center gap-2 font-sans text-xs font-bold tracking-widest uppercase mb-6 bg-primary/10 text-primary px-4 py-1.5 rounded-full border border-primary/20 reveal-on-scroll">
          <Sparkles className="w-3.5 h-3.5" />
          Next-Gen Institutional Placement Platform
        </div>
        <h1
          className="font-display text-5xl md:text-6xl lg:text-7xl text-on-surface max-w-4xl mb-6 leading-tight reveal-on-scroll"
          style={{ transitionDelay: "100ms" }}
        >
          Build better careers through{" "}
          <span className="text-primary italic">smarter placement</span>
        </h1>
        <p
          className="font-sans text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 reveal-on-scroll"
          style={{ transitionDelay: "200ms" }}
        >
          An intuitive, verified ecosystem connecting high-caliber students with premier global recruiters, streamlining the entire campus hiring lifecycle.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 mb-16 md:mb-20 reveal-on-scroll"
          style={{ transitionDelay: "300ms" }}
        >
          <Link
            href="/auth/register"
            prefetch={true}
            className="bg-primary text-on-primary font-sans text-base font-semibold px-8 py-4 rounded-full hover:bg-primary/90 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/25 btn-tactile flex items-center justify-center gap-2"
          >
            Get Started — Register Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/auth/login"
            prefetch={true}
            className="bg-surface/90 backdrop-blur text-on-surface font-sans text-base font-semibold px-8 py-4 rounded-full border border-outline-variant hover:border-primary/40 hover:bg-white active:scale-95 transition-all duration-200 shadow-sm"
          >
            Sign In to Portal
          </Link>
        </div>

        {/* Central Recruitment Interface Bento Preview */}
        <div
          className="relative w-full max-w-5xl mb-20 md:mb-28 reveal-on-scroll"
          style={{ transitionDelay: "400ms" }}
        >
          <div className="glass-panel rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-primary/20">
            <div className="h-10 border-b border-outline-variant/30 flex items-center px-5 gap-2 bg-surface/80">
              <div className="w-3 h-3 rounded-full bg-error/40" />
              <div className="w-3 h-3 rounded-full bg-warning/40" />
              <div className="w-3 h-3 rounded-full bg-success/40" />
              <span className="font-mono text-xs text-on-surface-variant ml-4 font-semibold opacity-70">cipts.edu/portal/dashboard</span>
            </div>
            
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 bg-surface-container-lowest/40">
              {/* Student Profile Card Preview */}
              <div className="w-full md:w-1/3 glass-panel rounded-2xl p-6 flex flex-col items-center text-center bg-white/70">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30 mb-3 shadow-md relative">
                  <Image
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80"
                    alt="Student Profile"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-sans text-lg font-bold text-on-surface mb-0.5">Alex Rivera</h3>
                <p className="font-sans text-xs font-bold text-primary mb-3 uppercase tracking-wider">Computer Science • CGPA 3.85</p>
                <div className="w-full bg-surface-container rounded-full h-2 mb-2">
                  <div className="bg-primary h-full rounded-full w-4/5" />
                </div>
                <span className="font-sans text-xs font-semibold text-on-surface-variant flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success" /> Verified Institutional Record
                </span>
              </div>

              {/* Live Opportunity Feed */}
              <div className="w-full md:w-2/3 flex flex-col gap-3">
                <div className="glass-panel rounded-2xl p-4 md:p-5 flex justify-between items-center bg-white/80 hover:shadow-md transition-shadow border border-primary/10">
                  <div>
                    <h4 className="font-sans text-base font-bold text-on-surface mb-0.5">Cloud Solutions Engineer</h4>
                    <p className="font-sans text-xs font-semibold text-secondary">Google Cloud • $140k/yr • Full-Time</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-sans text-xs font-bold px-3 py-1 rounded-full shrink-0 ml-3 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Eligible
                  </span>
                </div>

                <div className="glass-panel rounded-2xl p-4 md:p-5 flex justify-between items-center bg-white/80 hover:shadow-md transition-shadow border border-primary/10">
                  <div>
                    <h4 className="font-sans text-base font-bold text-on-surface mb-0.5">Machine Learning Fellow</h4>
                    <p className="font-sans text-xs font-semibold text-secondary">TechNova AI • $135k/yr • Hybrid</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-sans text-xs font-bold px-3 py-1 rounded-full shrink-0 ml-3 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Eligible
                  </span>
                </div>

                <div className="glass-panel rounded-2xl p-4 md:p-5 flex justify-between items-center bg-white/80 hover:shadow-md transition-shadow border border-primary/10">
                  <div>
                    <h4 className="font-sans text-base font-bold text-on-surface mb-0.5">Quantitative Analyst</h4>
                    <p className="font-sans text-xs font-semibold text-secondary">Goldman Sachs • $150k/yr • New York</p>
                  </div>
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 font-sans text-xs font-bold px-3 py-1 rounded-full shrink-0 ml-3">
                    Interviewing Stage
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Live Badge */}
          <div className="absolute -right-3 md:-right-6 -bottom-6 glass-panel rounded-2xl p-4 flex items-center gap-3 shadow-xl bg-white/95 border border-success/30 floating-element">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-success" />
            </div>
            <div className="text-left">
              <p className="font-sans text-sm font-bold text-on-surface leading-tight">100% Verified Credentials</p>
              <p className="font-sans text-xs text-on-surface-variant font-medium">FERPA & GDPR Compliant</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Hiring Partner Marquee & Key Stats */}
      <section className="w-full max-w-[1280px] py-12 md:py-16 border-t border-b border-outline-variant/25 mb-24">
        <div className="text-center mb-10 reveal-on-scroll">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            Premier Corporate Placement Network
          </p>
          <h2 className="font-display text-2xl md:text-3xl text-on-surface">
            Trusted by top global enterprises &amp; institutions
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {corporatePartners.map((partner, i) => (
            <div
              key={partner.name}
              className="glass-panel p-5 rounded-2xl flex flex-col items-center justify-center text-center card-interactive bg-white/50 border border-outline-variant/30 reveal-on-scroll"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <Building2 className="w-6 h-6 text-primary mb-2 opacity-80" />
              <h3 className="font-sans font-bold text-sm text-on-surface">{partner.name}</h3>
              <p className="font-sans text-xs text-on-surface-variant mt-0.5">{partner.tag}</p>
              <span className="font-mono text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-2">
                {partner.hires}
              </span>
            </div>
          ))}
        </div>

        {/* Aggregate Placement Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-outline-variant/20">
          {[
            { value: "94.8%", label: "Placement Success Rate" },
            { value: "500+", label: "Verified Corporate Partners" },
            { value: "$118k", label: "Average CTC Package" },
            { value: "15,000+", label: "Successful Hires" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center reveal-on-scroll"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="font-display text-4xl md:text-5xl text-primary block mb-1 font-bold">{stat.value}</span>
              <span className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. "How CIPTS Works" - Interactive Placement Lifecycle */}
      <section className="w-full max-w-[1280px] pb-24 md:pb-32">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <span className="font-sans text-xs font-bold tracking-widest uppercase text-secondary mb-3 block">
            End-to-End Recruitment Engine
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-on-surface mb-4">
            How the placement lifecycle works
          </h2>
          <p className="font-sans text-lg text-on-surface-variant">
            From verified profile generation to multi-stage technical rounds and institutional offer letters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lifecycleSteps.map((item, idx) => (
            <div
              key={item.step}
              className="glass-panel rounded-3xl p-8 flex flex-col justify-between card-interactive relative bg-surface-container-lowest/60 border border-primary/15 reveal-on-scroll"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-display text-4xl font-bold text-primary/30">{item.step}</span>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {item.icon}
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-2xl text-on-surface mb-3">{item.title}</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-6">{item.desc}</p>
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                <span className="font-sans text-xs font-bold text-on-surface">{item.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Student & Recruiter Success Stories (Testimonials) */}
      <section className="w-full max-w-[1280px] pb-24 md:pb-32">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-on-scroll">
          <span className="font-sans text-xs font-bold tracking-widest uppercase text-primary mb-3 block">
            Institutional Impact
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-on-surface mb-4">
            Hear from our community
          </h2>
          <p className="font-sans text-lg text-on-surface-variant">
            Discover how candidates, recruiters, and placement officers achieve peak outcomes with CIPTS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={t.author}
              className="glass-panel rounded-3xl p-8 flex flex-col justify-between card-interactive bg-white/70 border border-outline-variant/30 reveal-on-scroll"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div>
                <span className="inline-block font-sans text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-6">
                  {t.badge}
                </span>
                <p className="font-sans text-base text-on-surface italic leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-outline-variant/30">
                <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0 border border-primary/20">
                  <Image src={t.avatar} alt={t.author} fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-on-surface">{t.author}</h4>
                  <p className="font-sans text-xs text-on-surface-variant leading-tight mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Role Portals CTA Grid */}
      <section className="w-full max-w-[1280px] pb-24 md:pb-32">
        <h2 className="font-display text-4xl md:text-5xl text-on-surface text-center mb-4 reveal-on-scroll">
          Dedicated portals tailored for every role
        </h2>
        <p className="font-sans text-lg text-on-surface-variant text-center max-w-2xl mx-auto mb-12 reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
          Whether you&apos;re a student, a recruiter, or a placement officer — CIPTS provides an optimized, role-specific workspace.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "school",
              title: "Student Portal",
              desc: "Track real-time applications, browse verified drives, evaluate eligibility, and manage career portfolios.",
              href: "/auth/register",
              cta: "Join as Student",
              delay: "0ms",
            },
            {
              icon: "business",
              title: "Recruiter Portal",
              desc: "Create recruitment drives, configure GPA/department filters, and advance applicants through interactive pipelines.",
              href: "/auth/register",
              cta: "Join as Recruiter",
              delay: "100ms",
            },
            {
              icon: "account_balance",
              title: "Officer Command Center",
              desc: "Monitor institute-wide metrics, review accreditation reports, override records with audit trails, and manage compliance.",
              href: "/auth/login",
              cta: "Officer Portal",
              delay: "200ms",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="glass-panel rounded-3xl p-8 flex flex-col justify-between card-interactive reveal-on-scroll border border-primary/15 bg-white/60"
              style={{ transitionDelay: card.delay }}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {card.icon}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-on-surface mb-3">{card.title}</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-6">{card.desc}</p>
              </div>

              <Link
                href={card.href}
                prefetch={true}
                className="inline-flex items-center gap-2 text-primary font-sans text-sm font-bold hover:gap-3 transition-all duration-200 group"
              >
                {card.cta}
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Interactive FAQ Accordion */}
      <section className="w-full max-w-4xl pb-24 md:pb-32">
        <div className="text-center mb-12 reveal-on-scroll">
          <span className="font-sans text-xs font-bold tracking-widest uppercase text-secondary mb-2 block">
            Got Questions?
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-on-surface mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-base text-on-surface-variant">
            Everything you need to know about the CIPTS ecosystem, security, and verification.
          </p>
        </div>

        <div className="space-y-4 reveal-on-scroll">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-outline-variant/30 overflow-hidden bg-white/80 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 cursor-pointer hover:bg-primary/5 transition-colors"
                >
                  <span className="font-sans font-bold text-base md:text-lg text-on-surface">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 font-sans text-sm md:text-base text-on-surface-variant leading-relaxed border-t border-outline-variant/15">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Campus Drive Alerts Subscription Banner */}
      <section className="w-full max-w-[1280px] pb-24 reveal-on-scroll">
        <div className="glass-panel rounded-3xl p-10 md:p-14 bg-gradient-to-br from-primary to-primary-container text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
          <div className="max-w-xl z-10">
            <span className="font-sans text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full mb-4 inline-block">
              Never Miss A Drive
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-white mb-4 leading-tight">
              Get real-time placement and drive alerts
            </h2>
            <p className="font-sans text-base text-white/80">
              Subscribe to instant notifications whenever verified hiring partners announce new eligible openings.
            </p>
          </div>

          <div className="w-full md:w-auto z-10 shrink-0">
            {emailSubscribed ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white text-primary font-bold px-6 py-4 rounded-2xl shadow-lg flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 text-success" />
                Alerts active for your email!
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your institutional email"
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                  className="px-5 py-3.5 rounded-2xl bg-white/15 border border-white/30 text-white placeholder:text-white/60 focus:bg-white focus:text-on-surface focus:outline-none font-sans text-sm min-w-[260px] transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-white text-primary font-bold text-sm hover:bg-white/90 active:scale-95 transition-all shadow-lg btn-tactile flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" /> Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
