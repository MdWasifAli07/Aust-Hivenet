import React, { useMemo } from 'react';

function BackgroundFX() {
  // Generate once per mount (performance-friendly)
  const blobs = useMemo(() => {
    const arr = [];
    const COUNT = 28; // fewer blobs = smoother
    for (let i = 0; i < COUNT; i++) {
      const size = Math.random() * 160 + 120; // 120–280px
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = (Math.random() * 12).toFixed(2);
      const slower = Math.random() > 0.5;
      arr.push({
        key: i,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          top: `${y}%`,
          left: `${x}%`,
          backgroundColor: '#0d1f2d',
          animation: `${slower ? 'float-slower' : 'float-slow'} 18s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        },
      });
    }
    return arr;
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base wash (subtle, not pitch black) */}
      <div className="absolute inset-0 bg-[#05070b] opacity-95" />

      {/* Blobs */}
      {blobs.map((b) => (
        <div key={b.key} className="absolute rounded-full blur-3xl" style={b.style} />
      ))}

      {/* Conic sheen */}
      <div className="absolute inset-0 opacity-[0.18]">
        <div className="absolute left-1/2 top-1/2 h-[300vmax] w-[300vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,rgba(75,120,210,0.25),transparent_30%,rgba(63,120,190,0.25),transparent_70%)] animate-rotate-slower" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.12] mix-blend-screen [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:36px_36px]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_20%,transparent,rgba(0,0,0,0.45))]" />

      <style jsx global>{`
        @keyframes float-slow {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -10px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes float-slower {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-16px, 12px) scale(1.07); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes rotate-slower {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-rotate-slower { animation: rotate-slower 36s linear infinite; }
      `}</style>
    </div>
  );
}

export default BackgroundFX;
