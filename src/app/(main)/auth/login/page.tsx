"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await login(formData);
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
              Empowering the next generation of <span className="text-primary italic">visionaries</span>.
            </h2>
            <p className="font-sans text-lg text-on-surface-variant max-w-md">
              Access your personalized placement pipeline and take the next step in your professional journey.
            </p>
          </div>
          
          <div className="relative w-full h-80 mt-12 rounded-2xl overflow-hidden shadow-lg border border-white/40">
            <Image 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" 
              alt="Campus life" 
              fill 
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Authentication Side */}
        <div className="w-full md:w-1/2 bg-surface p-12 md:p-20 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-10 text-center md:text-left">
              <h1 className="font-display text-4xl text-primary mb-2">CIPTS</h1>
              <p className="font-sans text-sm text-on-surface-variant">Sign in to your institutional account</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
                {error}
              </div>
            )}

            <form action={handleSubmit} className="flex flex-col gap-6">
              {/* Role Selector Mock - Auth handles true role routing */}
              <div className="flex gap-2 p-1 bg-surface-container rounded-lg mb-4">
                <button type="button" className="flex-1 bg-white shadow-sm rounded-md py-2 font-sans text-sm font-semibold text-primary transition-all">Student</button>
                <button type="button" className="flex-1 text-on-surface-variant py-2 font-sans text-sm font-semibold hover:text-primary transition-all">Recruiter</button>
                <button type="button" className="flex-1 text-on-surface-variant py-2 font-sans text-sm font-semibold hover:text-primary transition-all">Officer</button>
              </div>

              <div>
                <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="alex.rivera@university.edu"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Password</label>
                <input 
                  type="password" 
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>

              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                  <span className="font-sans text-sm text-on-surface-variant">Remember me</span>
                </label>
                <a href="#" className="font-sans text-sm font-semibold text-primary hover:underline underline-offset-4">Forgot password?</a>
              </div>

              <button type="submit" className="w-full bg-primary text-on-primary font-sans text-base font-semibold py-3 rounded-lg hover:bg-primary/90 transition-transform active:scale-[0.98] mt-4 shadow-sm">
                Sign In
              </button>
            </form>

            <p className="mt-8 text-center font-sans text-sm text-on-surface-variant">
              Don't have an account?{' '}
              <Link href="/auth/register" className="font-semibold text-primary hover:underline underline-offset-4">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
