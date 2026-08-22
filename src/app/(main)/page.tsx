"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <main className="flex-grow flex flex-col items-center w-full px-5 md:px-16">
      {/* Hero Section */}
      <section className="w-full max-w-[1280px] pt-20 md:pt-32 pb-8 flex flex-col items-center text-center relative z-10">
        <span className="font-sans text-xs tracking-widest uppercase mb-6 bg-secondary-container/50 px-4 py-1.5 rounded-full border border-secondary/10 reveal-on-scroll">
          COLLEGE CAREER &amp; PLACEMENT PLATFORM
        </span>
        <h1
          className="font-display text-5xl md:text-6xl lg:text-7xl text-on-surface max-w-4xl mb-6 leading-tight reveal-on-scroll"
          style={{ transitionDelay: "100ms" }}
        >
          Build better careers through{" "}
          <span className="text-primary italic">smarter placement</span>
        </h1>
        <p
          className="font-sans text-lg text-on-surface-variant max-w-2xl mb-10 reveal-on-scroll"
          style={{ transitionDelay: "200ms" }}
        >
          An airy, intuitive ecosystem connecting visionary students with premier
          opportunities, transforming the recruitment lifecycle into a seamless journey.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 mb-16 md:mb-24 reveal-on-scroll"
          style={{ transitionDelay: "300ms" }}
        >
          <Link
            href="/auth/register"
            className="bg-primary text-on-primary font-sans text-base font-semibold px-8 py-4 rounded-full hover:bg-primary/90 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20"
          >
            Get Started — It&apos;s Free
          </Link>
          <Link
            href="/auth/login"
            className="bg-surface/80 backdrop-blur text-on-surface font-sans text-base font-semibold px-8 py-4 rounded-full border border-outline-variant hover:border-primary/40 hover:bg-white/90 active:scale-95 transition-all duration-200"
          >
            Sign In
          </Link>
        </div>

        {/* Visual: Central Recruitment Interface Bento */}
        <div
          className="relative w-full max-w-5xl mb-24 md:mb-32 reveal-on-scroll"
          style={{ transitionDelay: "400ms" }}
        >
          {/* Main App Window */}
          <div className="absolute inset-0 glass-panel rounded-2xl overflow-hidden flex flex-col">
            <div className="h-10 border-b border-outline-variant/30 flex items-center px-5 gap-2 bg-surface/50">
              <div className="w-3 h-3 rounded-full bg-error/30" />
              <div className="w-3 h-3 rounded-full bg-warning/30" />
              <div className="w-3 h-3 rounded-full bg-success/30" />
            </div>
            <div className="flex-grow p-6 md:p-8 flex flex-col md:flex-row gap-6 bg-surface-container-lowest/30">
              {/* Student Profile Mockup */}
              <div className="w-full md:w-1/3 glass-panel rounded-xl p-5 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-surface mb-3 shadow-sm relative">
                  <Image
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80"
                    alt="Student Profile"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-sans text-lg font-semibold text-on-surface mb-0.5">Alex Rivera</h3>
                <p className="font-sans text-sm font-semibold text-primary mb-3">Computer Science, &apos;25</p>
                <div className="w-full bg-surface-container-low rounded-full h-1.5 mb-1.5">
                  <div className="bg-primary h-full rounded-full w-3/4" />
                </div>
                <span className="font-sans text-xs font-semibold text-on-surface-variant">Profile 75% Complete</span>
              </div>

              {/* Opportunity Cards */}
              <div className="w-full md:w-2/3 flex flex-col gap-3">
                <div className="glass-panel rounded-xl p-5 flex justify-between items-center bg-white/60 hover:shadow-lg transition-shadow">
                  <div>
                    <h4 className="font-sans text-base font-semibold text-on-surface mb-0.5">Product Design Intern</h4>
                    <p className="font-sans text-sm font-semibold text-secondary">TechNova Solutions • San Francisco</p>
                  </div>
                  <span className="bg-secondary-container text-on-secondary-container font-sans text-xs font-semibold px-3 py-1 rounded-full shrink-0 ml-3">
                    Match: 95%
                  </span>
                </div>
                <div className="glass-panel rounded-xl p-5 flex justify-between items-center bg-white/60 opacity-80 hover:opacity-100 hover:shadow-lg transition-all">
                  <div>
                    <h4 className="font-sans text-base font-semibold text-on-surface mb-0.5">Software Engineering Role</h4>
                    <p className="font-sans text-sm font-semibold text-secondary">Global Data Inc • Remote</p>
                  </div>
                  <span className="bg-surface-container text-on-surface-variant font-sans text-xs font-semibold px-3 py-1 rounded-full shrink-0 ml-3">
                    Match: 88%
                  </span>
                </div>
                <div className="glass-panel rounded-xl p-5 flex justify-between items-center bg-white/60 opacity-60 hover:opacity-80 hover:shadow-lg transition-all">
                  <div>
                    <h4 className="font-sans text-base font-semibold text-on-surface mb-0.5">Data Analyst Position</h4>
                    <p className="font-sans text-sm font-semibold text-secondary">FinTech Corp • Hybrid</p>
                  </div>
                  <span className="bg-surface-container text-on-surface-variant font-sans text-xs font-semibold px-3 py-1 rounded-full shrink-0 ml-3">
                    Match: 82%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Badge */}
          <div
            className="absolute -right-4 md:-right-12 top-16 glass-panel rounded-xl p-3 flex items-center gap-3 animate-bounce shadow-lg"
            style={{ animationDuration: "3s" }}
          >
            <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-success text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-on-surface leading-tight">Eligibility Confirmed</p>
              <p className="font-sans text-xs text-on-surface-variant">Ready to apply</p>
            </div>
          </div>

          {/* Invisible spacer to give height to absolute inner */}
          <div className="h-[500px] md:h-[420px]" />
        </div>
      </section>

      {/* Stats Row */}
      <section className="w-full max-w-[1280px] py-12 md:py-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-b border-outline-variant/20 mb-24 md:mb-32">
        {[
          { value: "92%", label: "Placement Rate" },
          { value: "15k+", label: "Active Opportunities" },
          { value: "500+", label: "Partner Companies" },
          { value: "50k+", label: "Students Placed" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col items-center text-center reveal-on-scroll"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <span className="font-display text-4xl md:text-5xl text-primary block mb-1">{stat.value}</span>
            <span className="font-sans text-sm font-semibold text-on-surface-variant uppercase tracking-wide">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Institutional Trust Section */}
      <section className="w-full max-w-[1280px] pb-24 md:pb-32 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <div className="w-full md:w-1/2">
          <span className="font-sans text-xs tracking-widest uppercase text-secondary font-bold mb-4 block reveal-on-scroll">
            For Institutions
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-on-surface mb-5 reveal-on-scroll">
            Elevating Institutional Visibility
          </h2>
          <p
            className="font-sans text-lg text-on-surface-variant mb-8 reveal-on-scroll"
            style={{ transitionDelay: "100ms" }}
          >
            Transforming complex data into clear, actionable insights. Our platform ensures
            that every opportunity is seen and every candidate is positioned for success.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-sans text-sm font-semibold px-6 py-3 rounded-full hover:bg-primary/90 active:scale-95 transition-all duration-200 reveal-on-scroll"
            style={{ transitionDelay: "200ms" }}
          >
            Join the Platform
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
        <div
          className="w-full md:w-1/2 reveal-on-scroll"
          style={{ transitionDelay: "300ms" }}
        >
          <div className="glass-panel p-2 rounded-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500 relative h-72 md:h-80 shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
              alt="Students collaborating"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Role Cards CTA Section */}
      <section className="w-full max-w-[1280px] pb-24 md:pb-32">
        <h2 className="font-display text-4xl md:text-5xl text-on-surface text-center mb-4 reveal-on-scroll">
          Built for everyone in the placement ecosystem
        </h2>
        <p className="font-sans text-lg text-on-surface-variant text-center max-w-2xl mx-auto mb-12 reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
          Whether you&apos;re a student, a recruiter, or a placement officer — CIPTS has a dedicated experience for you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "school",
              title: "Students",
              desc: "Track applications, browse verified opportunities, and manage your professional portfolio.",
              href: "/auth/register",
              cta: "Join as Student",
              delay: "0ms",
            },
            {
              icon: "business",
              title: "Recruiters",
              desc: "Post drives, filter candidates by GPA and department, and manage your entire hiring pipeline.",
              href: "/auth/register",
              cta: "Join as Recruiter",
              delay: "100ms",
            },
            {
              icon: "account_balance",
              title: "Officers",
              desc: "Monitor placements, generate reports, verify recruiters, and ensure compliance.",
              href: "/auth/login",
              cta: "Officer Portal",
              delay: "200ms",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="glass-panel rounded-2xl p-8 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 reveal-on-scroll"
              style={{ transitionDelay: card.delay }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {card.icon}
                </span>
              </div>
              <h3 className="font-display text-2xl text-on-surface mb-3">{card.title}</h3>
              <p className="font-sans text-sm text-on-surface-variant flex-grow mb-6">{card.desc}</p>
              <Link
                href={card.href}
                className="inline-flex items-center gap-2 text-primary font-sans text-sm font-semibold hover:gap-3 transition-all duration-200"
              >
                {card.cta}
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
