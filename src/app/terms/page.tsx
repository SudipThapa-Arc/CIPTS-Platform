"use client";

import Link from "next/link";
import Footer from "@/components/navigation/Footer";
import { useRouter } from "next/navigation";

export default function TermsOfServicePage() {
  const router = useRouter();

  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-start pt-24 pb-section-gap px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto relative z-10">
        
        {/* Background Gradient Overlay */}
        <div className="fixed inset-0 pointer-events-none -z-10" style={{ background: "radial-gradient(at 0% 0%, rgba(216, 238, 244, 0.4) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(216, 238, 244, 0.4) 0px, transparent 50%)" }}></div>

        <header className="w-full max-w-3xl mb-stack-lg text-center md:text-left pt-12 md:pt-24">
          <h1 className="font-display text-5xl md:text-7xl text-primary mb-stack-sm">Terms of Service</h1>
          <p className="font-sans text-lg text-on-surface-variant">Last updated: October 24, 2024</p>
        </header>

        <article className="w-full max-w-3xl glass-panel shadow-[0_20px_40px_rgba(79,70,229,0.05)] rounded-3xl p-6 md:p-12">
          <div className="space-y-stack-lg">
            
            <section>
              <p className="font-sans text-lg leading-relaxed mb-6">
                Welcome to CIPTS Institutional Excellence. These Terms of Service govern your access to and use of our platform. Please read them carefully. By accessing our services, you agree to be bound by these terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl text-primary mb-stack-md flex items-center gap-3">
                <span aria-hidden="true" className="material-symbols-outlined text-primary">gavel</span>
                1. User Responsibilities
              </h2>
              <ul className="list-decimal list-outside ml-6 space-y-4 font-sans text-base text-on-surface-variant marker:text-primary marker:font-bold">
                <li className="pl-2">You must provide accurate and complete information when creating an account.</li>
                <li className="pl-2">You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li className="pl-2">You agree not to use the platform for any illegal or unauthorized purpose.</li>
                <li className="pl-2">You must respect the privacy and data of other users on the platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-3xl text-primary mb-stack-md flex items-center gap-3">
                <span aria-hidden="true" className="material-symbols-outlined text-primary">verified_user</span>
                2. Eligibility Verification
              </h2>
              <p className="mb-4 font-sans text-base text-on-surface-variant">To access student features, you must be a currently enrolled student or recent alumni of a verified institution.</p>
              <ul className="list-decimal list-outside ml-6 space-y-4 font-sans text-base text-on-surface-variant marker:text-primary marker:font-bold">
                <li className="pl-2">We reserve the right to verify your academic status using institutional email addresses or official documentation.</li>
                <li className="pl-2">Falsifying eligibility information will result in immediate account termination.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-3xl text-primary mb-stack-md flex items-center gap-3">
                <span aria-hidden="true" className="material-symbols-outlined text-primary">handshake</span>
                3. Recruiter Conduct
              </h2>
              <p className="mb-4 font-sans text-base text-on-surface-variant">Recruiters using CIPTS must adhere to professional standards.</p>
              <ul className="list-decimal list-outside ml-6 space-y-4 font-sans text-base text-on-surface-variant marker:text-primary marker:font-bold">
                <li className="pl-2">Opportunities posted must be legitimate, active, and accurately described.</li>
                <li className="pl-2">Communication with students must remain professional and relevant to career opportunities.</li>
                <li className="pl-2">Discriminatory practices in hiring or communication are strictly prohibited.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-3xl text-primary mb-stack-md flex items-center gap-3">
                <span aria-hidden="true" className="material-symbols-outlined text-primary">copyright</span>
                4. Intellectual Property
              </h2>
              <ul className="list-decimal list-outside ml-6 space-y-4 font-sans text-base text-on-surface-variant marker:text-primary marker:font-bold">
                <li className="pl-2">All content, features, and functionality on the platform are owned by CIPTS or its licensors.</li>
                <li className="pl-2">You may not copy, modify, distribute, or create derivative works without explicit permission.</li>
                <li className="pl-2">By submitting content (e.g., resumes, portfolios), you grant CIPTS a non-exclusive license to display it for the purpose of the platform's services.</li>
              </ul>
            </section>

            <div className="mt-12 pt-8 border-t border-outline-variant/30 flex justify-center">
              <button 
                onClick={() => router.back()}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/20 backdrop-blur-md border border-primary text-primary rounded-full hover:bg-white/40 transition-all font-sans text-sm font-semibold"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-[18px]">arrow_back</span>
                Return to Previous Page
              </button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
