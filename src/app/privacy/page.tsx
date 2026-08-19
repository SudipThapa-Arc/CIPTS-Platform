"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/navigation/Footer";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("information-collection");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const navItemClass = (id: string) =>
    `font-sans text-sm ${
      activeSection === id
        ? "text-primary font-semibold border-l-2 -ml-[18px] pl-4 border-primary"
        : "text-on-surface-variant hover:text-primary font-medium"
    } transition-colors`;

  return (
    <>
      <main className="flex-grow pt-section-gap pb-section-gap px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="mb-24 md:w-3/4 lg:w-2/3">
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-sans text-sm font-semibold mb-8 hover:underline">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Return to Home
          </Link>
          <p className="font-sans text-xs font-bold text-primary uppercase tracking-widest mb-4">Legal &amp; Compliance</p>
          <h1 className="font-display text-5xl md:text-7xl text-on-surface mb-6 md:mb-8 leading-tight">Privacy Policy</h1>
          <p className="font-sans text-lg text-on-surface-variant max-w-2xl">
            At CIPTS, we treat your data with the same level of academic rigor and institutional excellence as our programs. This document outlines our transparent approach to data collection, utilization, and protection.
          </p>
        </header>

        {/* Content Layout: Asymmetric Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          
          {/* Sticky Navigation for Policy Sections */}
          <aside className="md:col-span-3 hidden md:block sticky top-32">
            <nav className="flex flex-col gap-4 border-l-2 border-outline-variant/30 pl-4">
              <a className={navItemClass("information-collection")} href="#information-collection">Information Collection</a>
              <a className={navItemClass("data-usage")} href="#data-usage">Data Usage</a>
              <a className={navItemClass("student-privacy")} href="#student-privacy">Student Privacy</a>
              <a className={navItemClass("third-party-sharing")} href="#third-party-sharing">Third-Party Sharing</a>
            </nav>
          </aside>

          {/* Policy Content Sections */}
          <div className="md:col-span-9 flex flex-col gap-16 md:gap-24">
            
            {/* Information Collection */}
            <section className="scroll-mt-32" id="information-collection">
              <div className="glass-panel shadow-[0_20px_40px_rgba(79,70,229,0.05)] rounded-3xl p-8 md:p-12">
                <h2 className="font-display text-3xl md:text-4xl text-on-surface mb-6">Information Collection</h2>
                <div className="space-y-6 font-sans text-base text-on-surface-variant">
                  <p>We collect information to provide a tailored, effective placement experience. This includes both directly provided data and automatically gathered metrics.</p>
                  
                  <h3 className="font-sans text-[22px] font-semibold text-on-surface mt-8 mb-4">Directly Provided Information</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Academic Records:</strong> Transcripts, coursework, and institutional performance metrics provided during onboarding.</li>
                    <li><strong>Professional Assets:</strong> Resumes, portfolios, cover letters, and project links uploaded to your profile.</li>
                    <li><strong>Communication Data:</strong> Records of interactions with recruiters and platform support.</li>
                  </ul>
                  
                  <h3 className="font-sans text-[22px] font-semibold text-on-surface mt-8 mb-4">Automated Metrics</h3>
                  <p>To enhance platform functionality, we passively collect interaction data, such as login frequency, feature utilization, and device specifications, prioritizing minimal intrusion and maximum utility.</p>
                </div>
              </div>
            </section>

            {/* Data Usage */}
            <section className="scroll-mt-32" id="data-usage">
              <div className="glass-panel shadow-[0_20px_40px_rgba(79,70,229,0.05)] rounded-3xl p-8 md:p-12 relative overflow-hidden">
                {/* Decorative element breaking grid */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary-fixed-dim/20 rounded-full blur-3xl pointer-events-none"></div>
                
                <h2 className="font-display text-3xl md:text-4xl text-on-surface mb-6 relative z-10">Data Usage</h2>
                <div className="space-y-6 font-sans text-base text-on-surface-variant relative z-10">
                  <p>Your data serves as the foundation for our matching algorithms and platform improvements. We utilize this information explicitly to:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                    <div className="bg-surface-container-lowest/50 p-6 rounded-2xl border border-outline-variant/20">
                      <span className="material-symbols-outlined text-primary mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
                      <h4 className="font-sans text-[22px] font-semibold text-on-surface mb-2">Facilitate Placements</h4>
                      <p className="text-sm">Connecting academic profiles with relevant industry opportunities seamlessly.</p>
                    </div>
                    <div className="bg-surface-container-lowest/50 p-6 rounded-2xl border border-outline-variant/20">
                      <span className="material-symbols-outlined text-primary mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
                      <h4 className="font-sans text-[22px] font-semibold text-on-surface mb-2">Platform Enhancement</h4>
                      <p className="text-sm">Analyzing aggregated usage patterns to refine user experience and feature offerings.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Student Privacy */}
            <section className="scroll-mt-32" id="student-privacy">
              <div className="glass-panel shadow-[0_20px_40px_rgba(79,70,229,0.05)] rounded-3xl p-8 md:p-12 border-l-4 border-l-primary">
                <h2 className="font-display text-3xl md:text-4xl text-on-surface mb-6">Student Privacy Commitment</h2>
                <div className="space-y-6 font-sans text-base text-on-surface-variant">
                  <p className="font-sans text-lg text-on-surface">We recognize the sensitive nature of academic and early-career data.</p>
                  <p>CIPTS adheres to stringent academic privacy standards (including FERPA guidelines where applicable). Student profiles remain confidential and are only visible to vetted recruiters when explicit consent is granted or within the parameters of specific placement programs.</p>
                  
                  <div className="bg-primary/5 p-6 rounded-2xl mt-6">
                    <p className="font-sans text-sm font-semibold text-primary"><strong>Control &amp; Access:</strong> Students maintain the right to review, update, or obscure their academic data from external partners at any time via their profile settings.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Third-Party Sharing */}
            <section className="scroll-mt-32" id="third-party-sharing">
              <div className="glass-panel shadow-[0_20px_40px_rgba(79,70,229,0.05)] rounded-3xl p-8 md:p-12">
                <h2 className="font-display text-3xl md:text-4xl text-on-surface mb-6">Third-Party Sharing</h2>
                <div className="space-y-6 font-sans text-base text-on-surface-variant">
                  <p>We do not sell personal data. Information is shared strictly to facilitate the placement process.</p>
                  
                  <h3 className="font-sans text-[22px] font-semibold text-on-surface mt-8 mb-4">Authorized Partners</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary mt-1">corporate_fare</span>
                      <div>
                        <strong>Verified Recruiting Partners:</strong> Access is granted only to organizations formally partnered with CIPTS for the purpose of recruitment and internship placement.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary mt-1">dns</span>
                      <div>
                        <strong>Infrastructure Providers:</strong> Essential service providers (e.g., secure hosting, communication platforms) process data under strict confidentiality agreements.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
