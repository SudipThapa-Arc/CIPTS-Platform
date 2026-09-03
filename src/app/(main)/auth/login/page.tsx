"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { login } from "@/app/actions/auth";
import { Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<"STUDENT" | "RECRUITER" | "OFFICER">("STUDENT");
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="mb-8 text-center md:text-left">
        <h1 className="font-display text-4xl text-primary mb-2">CIPTS</h1>
        <p className="font-sans text-sm text-on-surface-variant">Sign in to your institutional account</p>
      </div>

      {/* Registration Success Banner */}
      {registered === "true" && (
        <div className="mb-6 p-4 bg-success-container rounded-xl border border-success/20 flex items-start gap-3">
          <span className="material-symbols-outlined text-success text-xl mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <div>
            <p className="font-sans text-sm font-semibold text-success">Account Created Successfully!</p>
            <p className="font-sans text-xs text-success/80 mt-0.5">Please sign in with your new credentials below.</p>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="mb-4 p-4 bg-error-container/30 text-error rounded-xl text-sm border border-error/20 flex items-start gap-2">
          <span className="material-symbols-outlined text-error text-lg mt-0.5">error</span>
          <span>{error}</span>
        </div>
      )}

      <form action={handleSubmit} className="flex flex-col gap-5">
        {/* Role Selector */}
        <div className="flex gap-1 p-1 bg-surface-container rounded-lg mb-2">
          {(["STUDENT", "RECRUITER", "OFFICER"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-md py-2 font-sans text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-white shadow-sm text-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <div>
          <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="alex.rivera@university.edu"
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
        </div>

        <div>
          <label className="block font-sans text-sm font-semibold text-on-surface mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 pr-12 font-sans text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-outline-variant accent-primary" />
            <span className="font-sans text-sm text-on-surface-variant">Remember me</span>
          </label>
          <button type="button" className="font-sans text-sm font-semibold text-primary hover:underline underline-offset-4">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-on-primary font-sans text-base font-semibold py-3.5 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 mt-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <p className="mt-6 text-center font-sans text-sm text-on-surface-variant">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="font-semibold text-primary hover:underline underline-offset-4">
          Register here
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="flex-grow flex items-center justify-center w-full px-5 md:px-16 py-12">
      <div className="w-full max-w-6xl glass-panel rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-primary/20 min-h-[700px]">
        {/* Left Editorial Side */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-secondary-container/50 to-primary/5 p-10 md:p-12 flex flex-col justify-between relative">
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl text-on-surface leading-tight mb-6">
              Empowering the next generation of{" "}
              <span className="text-primary italic">visionaries</span>.
            </h2>
            <p className="font-sans text-lg text-on-surface-variant max-w-md">
              Access your personalized placement pipeline and take the next step in your professional journey.
            </p>
          </div>
          <div className="relative w-full h-64 md:h-80 mt-10 rounded-2xl overflow-hidden shadow-lg border border-white/40">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
              alt="Campus life"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right Authentication Side */}
        <div className="w-full md:w-1/2 bg-surface p-10 md:p-16 flex flex-col justify-center">
          <Suspense fallback={
            <div className="flex items-center justify-center py-20">
              <svg className="animate-spin w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          }>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
