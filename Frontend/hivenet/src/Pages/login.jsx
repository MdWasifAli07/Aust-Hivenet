"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  // Frontend-only demo handler (no backend calls)
  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setOk("");

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    if (!email || !password) {
      setErr("Please enter email and password.");
      return;
    }

    // Simulate client-side validation flow
    setLoading(true);
    setTimeout(() => {
      setOk("Looks good! (Demo only — no backend call)");
      setLoading(false);
    }, 700);
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-neutral-950 text-white"
      style={{ fontFamily: "Sora, ui-sans-serif, system-ui" }}
    >
      <BackgroundFX />
      <section className="relative z-10 mx-auto flex min-h-screen w-[min(560px,92%)] items-center justify-center py-6">
        <div className="w-full">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10">
            {/* Header */}
            <header className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#7d9dd2] to-[#3fc3b1] bg-clip-text text-transparent animate-appear">
                Sign in to HiveNet
              </h1>
              <p className="text-white/80 text-sm mt-3 animate-fadein">
                Welcome back! Please enter your details.
              </p>
            </header>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              {/* status banners */}
              {err && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
                  aria-live="polite"
                >
                  {err}
                </div>
              )}
              {ok && (
                <div
                  role="status"
                  className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200"
                  aria-live="polite"
                >
                  {ok}
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/[0.85]">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="h-12"
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/[0.85]">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="h-12 pr-12"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-white/80 hover:bg-white/10"
                  >
                    <Eye open={showPassword} />
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full select-none rounded-xl bg-gradient-to-r from-[#3fc3b1] to-[#7d9dd2] text-white font-semibold h-12 transition-all hover:-translate-y-0.5 shadow-[0_0_22px_rgba(63,195,177,0.45)] hover:shadow-[0_0_34px_rgba(63,195,177,0.6)] mt-2 disabled:opacity-60"
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>

              {/* Forgot password link */}
              <div className="text-right">
                <a
                  href="#forgot-password"
                  className="text-sm text-[#7d9dd2] hover:text-[#3fc3b1] transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </form>
          </div>

          {/* Footer text */}
          <p className="mt-8 text-center text-sm text-white/70">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="font-semibold text-[#7d9dd2] hover:text-[#3fc3b1] transition-colors"
            >
              Sign Up
            </a>
          </p>
        </div>
      </section>

      {/* animations */}
      <style jsx global>{`
        @keyframes appear {
          0% {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes fadein {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-appear {
          animation: appear 0.8s ease-out forwards;
        }
        .animate-fadein {
          animation: fadein 1s ease-out forwards;
        }
      `}</style>
    </main>
  );
}

/* ------- New Background (Aurora Ribbons + Starfield) ------- */
function BackgroundFX() {
  return (
    <>
      {/* Night wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(63,195,177,0.20),transparent_60%),radial-gradient(900px_500px_at_10%_10%,rgba(125,157,210,0.18),transparent_60%),radial-gradient(900px_500px_at_90%_0%,rgba(125,157,210,0.12),transparent_60%)]" />

      {/* Starfield */}
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(1px_1px_at_20px_20px,rgba(255,255,255,0.5)_1px,transparent_1.5px)] [background-size:40px_40px] animate-stars" />

      {/* Aurora ribbons */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 blur-3xl mix-blend-screen aurora aurora-a" />
      <div className="pointer-events-none absolute top-1/3 -left-24 h-[70vmax] w-[70vmax] blur-3xl mix-blend-screen aurora aurora-b" />
      <div className="pointer-events-none absolute -bottom-56 right-0 h-[60vmax] w-[60vmax] blur-3xl mix-blend-screen aurora aurora-c" />

      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_20%,transparent,rgba(0,0,0,0.65))]" />
    </>
  );
}

/* ------- tiny inline icon ------- */
function Eye({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2.3 12S5.5 5 12 5s9.7 7 9.7 7-3.2 7-9.7 7S2.3 12 2.3 12Z" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3l18 18" />
      <path d="M9.9 5.2A9.8 9.8 0 0 1 12 5c6.5 0 9.7 7 9.7 7a16 16 0 0 1-3.1 4.4M6.1 6.3A16 16 0 0 0 2.3 12S5.5 19 12 19c1.3 0 2.5-.2 3.6-.6" />
      <path d="M9.1 9.1A3.5 3.5 0 0 0 12 15.5c.5 0 .9-.1 1.3-.3" />
    </svg>
  );
}
