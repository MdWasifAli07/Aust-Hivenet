import React from 'react';
import Navbar from "@/Components/floating-navbar-demo"; // Importing Navbar
import Footer from "@/Components/Footer"; // Importing Footer
import BackgroundFX from "@/Components/BackgroundFX"; // Importing BackgroundFX
import { motion } from 'framer-motion'; // Correct import for framer-motion
import Particles from "react-tsparticles"; // Importing the Particles library for futuristic background
import OurClubsSocietiesCarousel from '@/Components/OurClubsSocietiesCarousel';

// Import WorldMapDemo component
import WorldMapDemo from "@/Components/world-map-demo"; // Adjust path if needed

export default function Welcome() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-neutral-950 text-white"
      style={{ fontFamily: "Sora, ui-sans-serif, system-ui" }}
    >
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "transparent", // Ensures the background is transparent
            },
          },
          particles: {
            number: {
              value: 100, // Number of particles
              density: {
                enable: true,
                value_area: 800, // Area density of particles
              },
            },
            color: {
              value: "#ffffff", // Particle color
            },
            shape: {
              type: "circle", // Shape of particles
            },
            opacity: {
              value: 0.2, // Reduced opacity to make the particles less intrusive
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
              },
            },
            size: {
              value: 4, // Size of particles
              random: true,
              anim: {
                enable: true,
                speed: 20,
                size_min: 0.1,
              },
            },
            links: {
              enable: true,
              distance: 150, // Distance between connected particles
              color: "#ffffff", // Color of the links
              opacity: 0.4,
              width: 1, // Link width
            },
            move: {
              enable: true,
              speed: 6, // Particle movement speed
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
                bottom: "out",
              },
            },
          },
        }}
        className="absolute inset-0 z-0" // Ensure particles are behind the hero section
      />

      {/* BackgroundFX */}
      <BackgroundFX />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section - Start */}
      <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center z-20">
        {/* Left and right side gradients */}
        <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80">
          <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        </div>
        <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80">
          <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80">
          <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </div>
        
        <div className="px-4 py-10 md:py-20 z-30">
          {/* Hero Text Animation */}
          <h1 className="relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold text-slate-400 md:text-4xl lg:text-7xl">
            {"Empowering Connections, Elevating Communities"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </h1>

          {/* Description Text */}
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 0.8,
            }}
            className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600"
          >
            Welcome to AUST HiveNet, where innovation meets collaboration. Unlock new possibilities with a platform built for students, clubs, and societies to thrive together.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 1,
            }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button className="w-60 transform rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800">
  <a href="/login">Join Now</a>
</button>
<button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100">
  <a href="/aboutus">Contact Support</a>
</button>
          </motion.div>
        </div>
      </div>
      {/* Hero Section - End */}

            <OurClubsSocietiesCarousel />
      {/* World Map Section */}
      <WorldMapDemo /> {/* This integrates the WorldMapDemo component */}
      
       {/* Spacer to ensure footer visibility */}

      {/* Footer */}
      <Footer className="z-30" /> {/* Ensure footer is clickable with z-30 */}

      {/* Animations */}
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
