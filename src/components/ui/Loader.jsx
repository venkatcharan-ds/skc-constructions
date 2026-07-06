import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const PARTICLE_COUNT = 28;

export default function Loader({ onComplete }) {
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const countRef = useRef(null);
  const [particles] = useState(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
      size: 2 + Math.random() * 3,
    }))
  );

  useEffect(() => {
    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(rootRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          delay: 0.2,
          onComplete,
        });
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 2.4,
      ease: "power2.inOut",
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = String(Math.floor(counter.value)).padStart(3, "0");
        }
        if (barRef.current) {
          barRef.current.style.width = `${counter.value}%`;
        }
      },
    });

    tl.from(
      ".loader-mark",
      { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" },
      0
    );

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-ink"
      role="status"
      aria-label="Loading SKC Construction"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-gold/70 shadow-[0_0_8px_2px_rgba(245,180,0,0.6)]"
            style={{
              left: `${p.left}%`,
              bottom: "-10px",
              width: p.size,
              height: p.size,
              animation: `spark ${p.duration}s ease-in ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="loader-mark relative flex flex-col items-center gap-6">
        <img
          src="/brand/logo-mark.webp"
          alt="SKC Construction"
          className="h-24 w-auto drop-shadow-[0_0_25px_rgba(245,180,0,0.35)]"
        />
        <div className="flex items-baseline gap-3 font-display">
          <span ref={countRef} className="text-4xl font-semibold text-gold">
            000
          </span>
          <span className="text-sm uppercase tracking-[0.4em] text-white/50">Loading</span>
        </div>
        <div className="h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
          <div ref={barRef} className="h-full w-0 bg-gradient-to-r from-gold-soft to-gold" />
        </div>
      </div>

      <style>{`
        @keyframes spark {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
