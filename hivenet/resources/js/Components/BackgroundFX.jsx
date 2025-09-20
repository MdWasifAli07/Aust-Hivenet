import React from 'react';

function BackgroundFX() {
  return (
    <>
      {/* Base gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-[#000000] opacity-100" />

      {/* Soft moving blobs with blue colors */}
      <div className="pointer-events-none absolute -top-[40%] -left-[30%] h-[150vh] w-[150vh] rounded-full bg-[#4f9cd2]/25 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -top-[30%] -right-[30%] h-[130vh] w-[130vh] rounded-full bg-[#0d74a0]/25 blur-3xl animate-float-slower" />
      <div className="pointer-events-none absolute -top-[30%] -left-[30%] h-[130vh] w-[130vh] rounded-full bg-[#1e88e5]/25 blur-3xl animate-float-slower" />
      <div className="pointer-events-none absolute -bottom-[40%] -right-[40%] h-[150vh] w-[150vh] rounded-full bg-[#4f9cd2]/25 blur-3xl animate-float-slow" />

      {/* Rotating conic sheen */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.22]">
        <div className="absolute left-1/2 top-1/2 h-[300vmax] w-[300vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,rgba(75,120,210,0.25),transparent_30%,rgba(63,120,190,0.25),transparent_70%)] animate-rotate-slower" />
      </div>

      {/* Subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.2] mix-blend-screen [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:36px_36px]" />

      {/* Animated vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_20%,transparent,rgba(0,0,0,0.65))]" />

      <style jsx global>{`
        /* Apply background-attachment: fixed to lock the background */
        .fixed-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1; /* Ensure it stays behind other content */
          background-attachment: fixed;
        }

        @keyframes float-slow {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -10px) scale(1.05);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes float-slower {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-16px, 12px) scale(1.07);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes rotate-slower {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .animate-float-slow {
          animation: float-slow 14s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 22s ease-in-out infinite;
        }

        .animate-rotate-slower {
          animation: rotate-slower 36s linear infinite;
        }
      `}</style>
    </>
  );
}

export default BackgroundFX;
