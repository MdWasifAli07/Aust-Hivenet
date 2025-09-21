import React, { useEffect } from "react";
import { Head, router } from "@inertiajs/react";

export default function Events() {
  useEffect(() => {
    // Always redirect to login
    router.visit("/login", { replace: true });
  }, []);

  // Fallback UI for slow/no-JS environments
  return (
    <main className="min-h-screen grid place-items-center bg-neutral-950 text-white">
      <Head title="Events" />
      <div className="text-center">
        <p className="text-lg">Redirecting to login…</p>
        <a
          href="/login"
          className="mt-3 inline-block rounded-md bg-indigo-600 px-4 py-2 font-medium hover:brightness-110 transition"
        >
          Go to Login
        </a>
      </div>
    </main>
  );
}
