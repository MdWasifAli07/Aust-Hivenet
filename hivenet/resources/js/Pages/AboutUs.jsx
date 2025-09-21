import React from 'react';
import { LayoutTextFlip } from "@/Components/LayoutTextFlip";
import Navbar from "@/Components/floating-navbar-demo";
import Footer from "@/Components/Footer";
import BackgroundFX from "@/Components/BackgroundFX";
import { motion } from 'framer-motion';
import Particles from "react-tsparticles";

export default function AboutUs() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-neutral-950 text-white"
      style={{ fontFamily: "Sora, ui-sans-serif, system-ui" }}
    >
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        options={{
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
            size: { value: 4, random: true, anim: { enable: true, speed: 20, size_min: 0.1 } },
            links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: true, straight: false, outModes: { default: "out", bottom: "out" } },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* BackgroundFX */}
      <BackgroundFX />

      {/* ⛔ Removed the dark overlay div */}

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative z-10 mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
        {/* Decorative gradients */}
        <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80">
          <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        </div>
        <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80">
          <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80">
          <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </div>

        <div className="px-4 py-10 md:py-20">
          <h1
            className="relative z-10 mx-auto max-w-10xl text-center text-6xl font-bold text-indigo-500 md:text-4xl lg:text-7xl transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
            title="AUST HiveNet"
          >
            <LayoutTextFlip
              text="AUST HiveNet "
              words={["is your platform", "connects clubs", "connects societies", "gives a compact solution"]}
            />
          </h1> <br></br><br></br>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-400"
          >
            We are AUST HiveNet—your platform for managing departments and fostering connections between students,
            clubs, and societies. Explore more below.
          </motion.p>
        </div>
      </div>

      <br /><br /><br /><br></br>
      {/* End Hero */}

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 mx-auto max-w-5xl px-4 pb-16 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-semibold text-white text-center">Frequently Asked Questions</h2>
        <br />
        <p className="mt-2 text-center text-neutral-400">Everything you need to know about AUST HiveNet.</p>
        <br /><br /><br />

        <div className="mt-8 space-y-4">
          <details className="group rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/60 hover:bg-neutral-900/80 hover:shadow-xl hover:shadow-indigo-500/10">
            <summary className="cursor-pointer list-none text-lg font-medium text-white transition-colors duration-200 hover:text-indigo-400">
              What is AUST HiveNet?
            </summary>
            <p className="mt-2 text-neutral-300">
              AUST HiveNet is a unified portal that connects departments, clubs, and societies—streamlining
              membership, events, and announcements for students.
            </p>
          </details>

          <details className="group rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/60 hover:bg-neutral-900/80 hover:shadow-xl hover:shadow-indigo-500/10">
            <summary className="cursor-pointer list-none text-lg font-medium text-white transition-colors duration-200 hover:text-indigo-400">
              Who can use HiveNet?
            </summary>
            <p className="mt-2 text-neutral-300">
              All AUST students, faculty advisors, and club/society organizers can access features according to
              their roles.
            </p>
          </details>

          <details className="group rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/60 hover:bg-neutral-900/80 hover:shadow-xl hover:shadow-indigo-500/10">
            <summary className="cursor-pointer list-none text-lg font-medium text-white transition-colors duration-200 hover:text-indigo-400">
              How do I sign in?
            </summary>
            <p className="mt-2 text-neutral-300">
              Use your registered email and password provided during onboarding or self-registration. If you face
              issues, contact your department moderator.
            </p>
          </details>

          <details className="group rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/60 hover:bg-neutral-900/80 hover:shadow-xl hover:shadow-indigo-500/10">
            <summary className="cursor-pointer list-none text-lg font-medium text-white transition-colors duration-200 hover:text-indigo-400">
              Can clubs and societies manage events here?
            </summary>
            <p className="mt-2 text-neutral-300">
              Yes. Organizers can publish events, manage RSVPs, and share updates that reach relevant students.
            </p>
          </details>

          <details className="group rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/60 hover:bg-neutral-900/80 hover:shadow-xl hover:shadow-indigo-500/10">
            <summary className="cursor-pointer list-none text-lg font-medium text-white transition-colors duration-200 hover:text-indigo-400">
              Is my data secure?
            </summary>
            <p className="mt-2 text-neutral-300">
              We follow role-based access and standard security practices. Only authorized personnel can access
              sensitive information.
            </p>
          </details>

          <details className="group rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/60 hover:bg-neutral-900/80 hover:shadow-xl hover:shadow-indigo-500/10">
            <summary className="cursor-pointer list-none text-lg font-medium text-white transition-colors duration-200 hover:text-indigo-400">
              How do I get support?
            </summary>
            <p className="mt-2 text-neutral-300">
              Reach out to your department moderator or the HiveNet support team via the Contact page.
            </p>
          </details>
        </div>
      </section>

      <br />

      {/* Developers Section */}
      <section id="developers" className="relative z-10 mx-auto max-w-6xl px-4 pb-24">
        <h2 className="text-3xl md:text-4xl font-semibold text-white text-center">Developers</h2>
        <br />
        <p className="mt-2 text-center text-neutral-400">The team behind AUST HiveNet.</p>
        <br /><br />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 shadow-lg text-center transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/15">
            <h3 className="text-xl font-semibold">Md. Wasif Ali</h3>
            <dl className="mt-3 space-y-2 text-neutral-300">
              <div><dt className="inline text-neutral-400">ID:</dt> <dd className="inline">20220204054</dd></div>
              <div><dt className="inline text-neutral-400">Year/Sem:</dt> <dd className="inline">3/1</dd></div>
              <div><dt className="inline text-neutral-400">Department:</dt> <dd className="inline">CSE</dd></div>
            </dl>
          </article>

          <article className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 shadow-lg text-center transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/15">
            <h3 className="text-xl font-semibold">Hasibuzzaman Khan Rafi</h3>
            <dl className="mt-3 space-y-2 text-neutral-300">
              <div><dt className="inline text-neutral-400">ID:</dt> <dd className="inline">20220204055</dd></div>
              <div><dt className="inline text-neutral-400">Year/Sem:</dt> <dd className="inline">3/1</dd></div>
              <div><dt className="inline text-neutral-400">Department:</dt> <dd className="inline">CSE</dd></div>
            </dl>
          </article>

          <article className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 shadow-lg text-center transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/15">
            <h3 className="text-xl font-semibold">Hridoy Saha</h3>
            <dl className="mt-3 space-y-2 text-neutral-300">
              <div><dt className="inline text-neutral-400">ID:</dt> <dd className="inline">20220204059</dd></div>
              <div><dt className="inline text-neutral-400">Year/Sem:</dt> <dd className="inline">3/1</dd></div>
              <div><dt className="inline text-neutral-400">Department:</dt> <dd className="inline">CSE</dd></div>
            </dl>
          </article>

          <article className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 shadow-lg text-center transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/15">
            <h3 className="text-xl font-semibold">Ma-Huan Sheikh Meem</h3>
            <dl className="mt-3 space-y-2 text-neutral-300">
              <div><dt className="inline text-neutral-400">ID:</dt> <dd className="inline">20220204070</dd></div>
              <div><dt className="inline text-neutral-400">Year/Sem:</dt> <dd className="inline">3/1</dd></div>
              <div><dt className="inline text-neutral-400">Department:</dt> <dd className="inline">CSE</dd></div>
            </dl>
          </article>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Optional animations (styled-jsx) */}
      <style jsx global>{`
        @keyframes appear {
          0% { opacity: 0; transform: translateY(-10px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadein {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-appear { animation: appear 0.8s ease-out forwards; }
        .animate-fadein { animation: fadein 1s ease-out forwards; }
      `}</style>
    </main>
  );
}
