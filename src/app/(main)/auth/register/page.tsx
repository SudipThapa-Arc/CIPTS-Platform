"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { register } from "@/app/actions/auth";
import { VALID_DEPARTMENTS, VALID_SECTORS, VALID_GRAD_YEARS } from "@/lib/constants/formOptions";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterPage() {
  const [role, setRole] = useState<'STUDENT' | 'RECRUITER'>('STUDENT');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError(null);
    formData.append('role', role);
    if (role === 'STUDENT') {
      const fn = formData.get('firstName') as string;
      const ln = formData.get('lastName') as string;
      formData.set('fullName', `${fn || ''} ${ln || ''}`.trim());
    }
    
    startTransition(async () => {
      const result = await register(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <main className="flex-grow flex items-center justify-center w-full px-5 md:px-16 py-12">
      <div className="w-full max-w-6xl glass-panel rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-primary/20 min-h-[700px]">
        {/* Left Editorial Side */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-secondary-container/50 to-primary/5 p-10 md:p-12 flex flex-col justify-between relative">
          <div className="relative z-10">
            <span className="font-sans text-xs font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full inline-block mb-4">
              Institutional Onboarding
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-on-surface leading-tight mb-6">
              Join the smarter <span className="text-primary italic">recruitment</span> ecosystem.
            </h2>
            <p className="font-sans text-lg text-on-surface-variant max-w-md">
              Create your verified account to match with premier placement drives or recruit top-tier talent.
            </p>
          </div>
          
          <div className="relative w-full h-64 md:h-80 mt-10 rounded-2xl overflow-hidden shadow-lg border border-white/40 floating-element">
            <Image 
              src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&q=80" 
              alt="Campus recruitment" 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right Authentication Side */}
        <div className="w-full md:w-1/2 bg-surface p-10 md:p-16 flex flex-col justify-center max-h-[880px] overflow-y-auto">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-8 text-center md:text-left">
              <h1 className="font-display text-4xl text-primary mb-2">CIPTS</h1>
              <p className="font-sans text-sm text-on-surface-variant">Create your institutional placement account</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="mb-6 p-4 bg-error-container/30 text-error rounded-xl text-sm border border-error/20 flex items-start gap-2"
              >
                <span className="material-symbols-outlined text-error text-lg mt-0.5">error</span>
                <span className="font-medium">{error}</span>
              </motion.div>
            )}

            <form action={handleSubmit} className="flex flex-col gap-5">
              {/* Account Path Selector */}
              <div className="flex gap-1 p-1 bg-surface-container rounded-xl mb-2 border border-outline-variant/30">
                <button 
                  type="button" 
                  onClick={() => setRole('STUDENT')}
                  className={`flex-1 rounded-lg py-2.5 font-sans text-sm font-semibold transition-all cursor-pointer ${
                    role === 'STUDENT' 
                      ? 'bg-white shadow-sm text-primary font-bold' 
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  Student Account
                </button>
                <button 
                  type="button" 
                  onClick={() => setRole('RECRUITER')}
                  className={`flex-1 rounded-lg py-2.5 font-sans text-sm font-semibold transition-all cursor-pointer ${
                    role === 'RECRUITER' 
                      ? 'bg-white shadow-sm text-primary font-bold' 
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  Corporate Recruiter
                </button>
              </div>

              <AnimatePresence mode="wait">
                {role === 'STUDENT' ? (
                  <motion.div 
                    key="student"
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block font-sans text-sm font-semibold text-on-surface mb-2">First Name</label>
                        <input 
                          type="text" 
                          name="firstName" 
                          required 
                          maxLength={40}
                          placeholder="Alex"
                          pattern="^[A-Za-z\s.'-]+$"
                          title="Please enter valid alphabetic characters"
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" 
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Last Name</label>
                        <input 
                          type="text" 
                          name="lastName" 
                          required 
                          maxLength={40}
                          placeholder="Rivera"
                          pattern="^[A-Za-z\s.'-]+$"
                          title="Please enter valid alphabetic characters"
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Institutional Roll Number</label>
                      <input 
                        type="text" 
                        name="rollNumber" 
                        required 
                        maxLength={20}
                        placeholder="e.g. 21CS045" 
                        pattern="^[A-Za-z0-9-]+$"
                        title="Alphanumeric roll number (e.g. 21CS045)"
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-mono uppercase" 
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Academic Department</label>
                        <select 
                          name="department" 
                          required 
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all cursor-pointer"
                        >
                          {VALID_DEPARTMENTS.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                      <div className="w-full sm:w-40">
                        <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Graduation Year</label>
                        <select 
                          name="graduationYear" 
                          required 
                          defaultValue={2025}
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-mono cursor-pointer"
                        >
                          {VALID_GRAD_YEARS.map((yr) => (
                            <option key={yr} value={yr}>Class of {yr}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="recruiter"
                    initial={{ opacity: 0, x: 10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Company / Organization</label>
                        <input 
                          type="text" 
                          name="companyName" 
                          required 
                          maxLength={60}
                          placeholder="e.g. Acme Innovations" 
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" 
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Industry Sector</label>
                        <select 
                          name="industrySector" 
                          required 
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all cursor-pointer"
                        >
                          {VALID_SECTORS.map((sector) => (
                            <option key={sector} value={sector}>{sector}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block font-sans text-sm font-semibold text-on-surface mb-2">HR Contact Person</label>
                        <input 
                          type="text" 
                          name="contactPerson" 
                          required 
                          maxLength={50}
                          placeholder="Jane Doe (Talent Lead)" 
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" 
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Company Website</label>
                        <input 
                          type="url" 
                          name="companyWebsite" 
                          placeholder="https://acme.com" 
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" 
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder={role === 'STUDENT' ? "student@university.edu" : "talent@company.com"}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" 
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block font-sans text-sm font-semibold text-on-surface">Password</label>
                  <span className="text-xs text-on-surface-variant font-medium">Min. 6 characters</span>
                </div>
                <input 
                  type="password" 
                  name="password" 
                  required 
                  minLength={6}
                  placeholder="••••••••" 
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-primary text-on-primary font-sans text-base font-semibold py-3.5 rounded-xl hover:bg-primary/90 active:scale-98 transition-all duration-200 mt-2 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer btn-tactile"
              >
                {isPending ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <p className="mt-6 text-center font-sans text-sm text-on-surface-variant">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-semibold text-primary hover:underline underline-offset-4">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
