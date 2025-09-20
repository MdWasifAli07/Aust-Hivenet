import { useState } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [ok, setOk] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setOk("");

    post(route("login"), {
      onSuccess: () => {
        setOk("Logged in! Redirecting…");
      },
      onFinish: () => reset("password"),
    });
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-neutral-950 text-white"
      style={{ fontFamily: "Sora, ui-sans-serif, system-ui" }}
    >
      <Head title="Log in" />

      <GuestLayout>
        {/* Hero Section with Instructions */}
        <section className="relative z-10 mx-auto flex min-h-screen w-full items-center justify-center py-6">
          <div className="absolute top-10 max-w-full text-center">
            <h1 className="text-5xl md:text-5xl font-bold bg-white bg-clip-text w-full text-transparent animate-appear">
              Welcome back!
            </h1> <br></br>
            <p className="text-white/70 text-xs sm:text-sm mt-2 animate-fadein">
              Want to sign in? Please enter your details.
            </p>
          </div>

          {/* Glassmorphism Container (Floating) */}
          <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-[20px] backdrop-brightness-75 rounded-xl p-8 shadow-[0_15px_40px_rgba(0,0,0,0.3)] transform transition-all hover:scale-105 relative z-20 mt-40">
            <div>
              {/* Status banners */}
              {status ? (
                <div
                  role="status"
                  className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200"
                >
                  {status}
                </div>
              ) : null}
              {ok ? (
                <div
                  role="status"
                  className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200"
                >
                  {ok}
                </div>
              ) : null}
              {errors.email || errors.password ? (
                <div
                  role="alert"
                  className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
                >
                  {errors.email || errors.password}
                </div>
              ) : null}

              {/* Form */}
              <form className="space-y-6" onSubmit={submit} noValidate>
                {/* Email */}
                <div className="space-y-2">
                  <InputLabel
                    htmlFor="email"
                    value="Email"
                    className="text-white/[0.85]"
                  />
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full h-12 text-black"
                    autoComplete="username"
                    isFocused={true}
                    onChange={(e) => setData("email", e.target.value)}
                    placeholder="hivenet@example.com"
                  />
                  <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <InputLabel
                    htmlFor="password"
                    value="Password"
                    className="text-white/[0.85]"
                  />
                  <div className="relative">
                    <TextInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={data.password}
                      className="mt-1 block w-full h-12 text-black pr-12" // Ensure text is black
                      autoComplete="current-password"
                      onChange={(e) => setData("password", e.target.value)}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-black/80 hover:bg-white/10"
                    >
                      <Eye open={showPassword} />
                    </button>
                  </div>
                  <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Remember */}
                <div className="mt-2 flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <Checkbox
                      name="remember"
                      checked={data.remember}
                      onChange={(e) => setData("remember", e.target.checked)}
                    />
                    <span className="text-sm text-white/80">Remember me</span>
                  </label>

                  {/* Forgot Password */}
                  {canResetPassword && (
                    <Link
                      href={route("password.request")}
                      className="text-xs text-[#7d9dd2] hover:text-[#3fc3b1] transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      forgot password?
                    </Link>
                  )}
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                  <PrimaryButton
                    className="w-full select-none justify-center rounded-xl bg-gradient-to-r from-[#3fc3b1] to-[#7d9dd2] h-12 px-6 font-semibold shadow-[0_0_22px_rgba(63,195,177,0.45)] hover:shadow-[0_0_34px_rgba(63,195,177,0.6)] hover:-translate-y-0.5 transition-all"
                    disabled={processing}
                  >
                    {processing ? "Signing in…" : "Sign in"}
                  </PrimaryButton>
                </div>
              </form>
            </div>

            {/* Footer */}
            <p className="mt-8 text-center text-sm text-white/70">
              Don’t have an account?{" "}
              <Link
                href={route("register")}
                className="font-semibold text-[#7d9dd2] hover:text-[#3fc3b1] transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div> <br></br>
        </section><br></br><br></br><br></br>
      </GuestLayout>

      {/* animations */}
      <style jsx="true" global="true">{`
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
