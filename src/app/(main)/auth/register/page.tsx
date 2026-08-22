"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { register } from "@/app/actions/auth";

export default function RegisterPage() {
  const [role, setRole] = useState<'STUDENT' | 'RECRUITER'>('STUDENT');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    formData.append('role', role);
    // Combine First Name and Last Name if Student
    if (role === 'STUDENT') {
      const fn = formData.get('firstName') as string;
      const ln = formData.get('lastName') as string;
      formData.set('fullName', `${fn} ${ln}`);
    }
    
    const result = await register(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <main className="flex-grow flex items-center justify-center w-full px-5 md:px-16 py-12">
      <div className="w-full max-w-6xl glass-panel rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-primary/20 min-h-[700px]">
        {/* Left Editorial Side */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-secondary-container/50 to-primary/5 p-12 flex flex-col justify-between relative">
          <div className="relative z-10">
            <h2 className="font-display text-5xl text-on-surface leading-tight mb-6">
              Join the smarter <span className="text-primary italic">recruitment</span> ecosystem.
            </h2>
            <p className="font-sans text-lg text-on-surface-variant max-w-md">
              Create your institutional account to match with verified opportunities or find top-tier candidates.
            </p>
          </div>
          
          <div className="relative w-full h-80 mt-12 rounded-2xl overflow-hidden shadow-lg border border-white/40">
            <Image 
              src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&q=80" 
              alt="Campus recruitment" 
              fill 
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Authentication Side */}
        <div className="w-full md:w-1/2 bg-surface p-12 md:p-16 flex flex-col justify-center max-h-[800px] overflow-y-auto">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-8 text-center md:text-left">
              <h1 className="font-display text-4xl text-primary mb-2">CIPTS</h1>
              <p className="font-sans text-sm text-on-surface-variant">Create your institutional account</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
                {error}
              </div>
            )}

            <form action={handleSubmit} className="flex flex-col gap-5">
              {/* Account Path Selector */}
              <div className="flex gap-2 p-1 bg-surface-container rounded-lg mb-2">
                <button 
                  type="button" 
                  onClick={() => setRole('STUDENT')}
                  className={`flex-1 rounded-md py-2 font-sans text-sm font-semibold transition-all ${role === 'STUDENT' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  Student
                </button>
                <button 
                  type="button" 
                  onClick={() => setRole('RECRUITER')}
                  className={`flex-1 rounded-md py-2 font-sans text-sm font-semibold transition-all ${role === 'RECRUITER' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  Recruiter
                </button>
              </div>

              {role === 'STUDENT' ? (
                <>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block font-sans text-sm font-semibold text-on-surface mb-2">First Name</label>
                      <input type="text" name="firstName" required className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
                    </div>
                    <div className="flex-1">
                      <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Last Name</label>
                      <input type="text" name="lastName" required className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Institutional Roll Number</label>
                    <input type="text" name="rollNumber" required placeholder="e.g. 21CS045" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Department</label>
                      <select name="department" required className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
                        <option value="Computer Science">Computer Science</option>
                        <option value="Information Tech">Information Tech</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Graduation</label>
                      <input type="number" name="graduationYear" required placeholder="2025" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Company Name</label>
                      <input type="text" name="companyName" required placeholder="Acme Corp" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
                    </div>
                    <div className="flex-1">
                      <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Industry Sector</label>
                      <input type="text" name="industrySector" required placeholder="Software" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Contact Person</label>
                      <input type="text" name="contactPerson" required placeholder="Jane Doe" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
                    </div>
                    <div className="flex-1">
                      <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Company Website</label>
                      <input type="url" name="companyWebsite" placeholder="https://acme.com" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Email Address</label>
                <input type="email" name="email" required placeholder="name@domain.com" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
              </div>

              <div>
                <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Password</label>
                <input type="password" name="password" required placeholder="••••••••" className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
              </div>

              <button type="submit" className="w-full bg-primary text-on-primary font-sans text-base font-semibold py-3 rounded-lg hover:bg-primary/90 transition-transform active:scale-[0.98] mt-4 shadow-sm">
                Create Account
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
