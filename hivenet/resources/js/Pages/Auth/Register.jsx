import { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import BackgroundFX from '@/Components/BackgroundFX'; // Import BackgroundFX

export default function Register() { 
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        studentId: "", // Added Student ID
        role: "student", // Default role set to student
        year: "",
        semester: "",
        department: "CSE", // Default department
        password: "",
        password_confirmation: "",
        specialKey: "",  // Special Key for Club Admin role
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showPrivateKey, setShowPrivateKey] = useState(false);  // State for Private Key visibility
    const [isAdmin, setIsAdmin] = useState(false);

    const toggleRole = () => {
        setIsAdmin(!isAdmin);
        setData("role", isAdmin ? "student" : "club_admin");
        setData("specialKey", ""); // Reset special key when switching roles
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-white" style={{ fontFamily: "Sora, ui-sans-serif, system-ui" }}>
            <BackgroundFX />
            <GuestLayout>
                <Head title="Register" />

                {/* Hero Section without Background */}
                <section className="relative w-full h-[30vh] flex justify-center items-center">
                    <div className="text-center text-white relative z-10">
                        <h1 className="text-5xl font-semibold">Join Us Today</h1>
                         <br></br>
            <p className="text-white/70 text-xs sm:text-sm mt-2 animate-fadein">
              Join us today and stay connected with your campus community!
            </p>
                    </div>
                </section>

                {/* Registration Form */}
                <form onSubmit={submit} className="relative z-20 w-full max-w-4xl mx-auto mt-6 p-8 bg-white/10 backdrop-blur-[20px] backdrop-brightness-75 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.3)]">
                    
                    {/* Role Toggle Switch */}
                    <div className="flex items-center justify-start mb-4">
                        <label className="flex items-center gap-2 text-white/[0.85]">
                            <span className=" text-sm">Switch to Club Admin</span>
                            <input
                                type="checkbox"
                                checked={isAdmin}
                                onChange={toggleRole}
                                className="toggle-switch"
                            />
                        </label>
                    </div>

                    {/* Status Banner */}
                    {errors.email || errors.password ? (
                        <div role="alert" className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                            {errors.email || errors.password}
                        </div>
                    ) : null}

                    <div className="space-y-6">
                        {/* Name */}
                        <div>
                            <InputLabel htmlFor="name" value="Name" className="text-white/[0.85]" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full text-black"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData("name", e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        {/* Email */}
                        <div>
                            <InputLabel htmlFor="email" value="Email" className="text-white/[0.85]" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full text-black"
                                autoComplete="username"
                                onChange={(e) => setData("email", e.target.value)}
                                required
                                placeholder="hivenet@example.com"
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Student ID */}
                        <div>
                            <InputLabel htmlFor="studentId" value="Student ID" className="text-white/[0.85]" />
                            <TextInput
                                id="studentId"
                                name="studentId"
                                value={data.studentId}
                                className="mt-1 block w-full text-black"
                                onChange={(e) => setData("studentId", e.target.value)}
                                required
                            />
                            <InputError message={errors.studentId} className="mt-2" />
                        </div>

                        {/* Year and Semester in the Same Row */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* Year */}
                            <div>
                                <InputLabel htmlFor="year" value="Year" className="text-white/[0.85]" />
                                <TextInput
                                    id="year"
                                    name="year"
                                    value={data.year}
                                    className="mt-1 block w-full text-black"
                                    autoComplete="year"
                                    onChange={(e) => setData("year", e.target.value)}
                                    required
                                />
                                <InputError message={errors.year} className="mt-2" />
                            </div>

                            {/* Semester */}
                            <div>
                                <InputLabel htmlFor="semester" value="Semester" className="text-white/[0.85]" />
                                <TextInput
                                    id="semester"
                                    name="semester"
                                    value={data.semester}
                                    className="mt-1 block w-full text-black"
                                    autoComplete="semester"
                                    onChange={(e) => setData("semester", e.target.value)}
                                    required
                                />
                                <InputError message={errors.semester} className="mt-2" />
                            </div>
                        </div>

                        {/* Department Dropdown */}
                        <div>
                            <InputLabel htmlFor="department" value="Department" className="text-white/[0.85]" />
                            <select
                                id="department"
                                name="department"
                                value={data.department}
                                className="mt-1 text-gray-500 block w-full bg-white/100 backdrop-blur-[20px] border border-gray-500 rounded-lg p-2"
                                onChange={(e) => setData("department", e.target.value)}
                            >
                                <option value="CSE">CSE</option>
                                <option value="EEE">EEE</option>
                                <option value="CE">CE</option>
                                <option value="ME">ME</option>
                                <option value="IPE">IPE</option>
                                <option value="TEXTILE">TEXTILE</option>
                                <option value="ARCHI">ARCHI</option>
                                <option value="SOB">SOB</option>
                            </select>
                            <InputError message={errors.department} className="mt-2" />
                        </div>

                        {/* Password */}
                        <div>
                            <InputLabel htmlFor="password" value="Password" className="text-white/[0.85]" />
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full text-black pr-12"
                                    autoComplete="new-password"
                                    onChange={(e) => setData("password", e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-black/80 hover:bg-white/10"
                                >
                                    <Eye open={showPassword} />
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-white/[0.85]" />
                            <div className="relative">
                                <TextInput
                                    id="password_confirmation"
                                    type={showConfirm ? "text" : "password"}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full text-black"
                                    autoComplete="new-password"
                                    onChange={(e) => setData("password_confirmation", e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-black/80 hover:bg-white/10"
                                >
                                    <Eye open={showConfirm} />
                                </button>
                            </div>
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        {/* Private Key (only if Club Admin) */}
                        {isAdmin && (
                            <div>
                                <InputLabel htmlFor="specialKey" value="Private Key" className="text-white/[0.85]" />
                                <div className="relative">
                                  <TextInput
                                    id="specialKey"
                                    name="specialKey"
                                    value={data.specialKey}
                                    className="mt-1 block w-full text-black"
                                    onChange={(e) => setData("specialKey", e.target.value)}
                                    placeholder="Enter your private key"
                                    required
                                  />
                                  <button
                                    type="button"
                                    aria-label={showPrivateKey ? "Hide private key" : "Show private key"}
                                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-black/80 hover:bg-white/10"
                                  >
                                    <Eye open={showPrivateKey} />
                                  </button>
                                </div>
                                <InputError message={errors.specialKey} className="mt-2" />
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="mt-4">
                            <PrimaryButton
                                className="w-full select-none justify-center rounded-xl bg-gradient-to-r from-[#3fc3b1] to-[#7d9dd2] h-12 px-6 font-semibold shadow-[0_0_22px_rgba(63,195,177,0.45)] hover:shadow-[0_0_34px_rgba(63,195,177,0.6)] hover:-translate-y-0.5 transition-all"
                                disabled={processing}
                            >
                                {processing ? "Signing up…" : "Sign Up"}
                            </PrimaryButton>
                        </div>

                        {/* Already have an account link */}
                        <p className="mt-8 text-center text-sm text-white/70">
                            Already have an account?{" "}
                            <Link
                                href={route("login")}
                                className="font-semibold text-[#7d9dd2] hover:text-[#3fc3b1] transition-colors"
                            >
                                Sign In
                            </Link>
                        </p>
                        <p className="mt-8 text-center text-sm text-white/70">
                                      Already have an account?{" "}
                                      <Link
                                        href={route("login")}
                                        className="font-semibold text-[#7d9dd2] hover:text-[#3fc3b1] transition-colors"
                                      >
                                        ign in
                                      </Link>
                                    </p>
                    </div>
                </form>
            </GuestLayout> 
        </main>
        
    );
}

// Eye function for toggling password visibility
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
