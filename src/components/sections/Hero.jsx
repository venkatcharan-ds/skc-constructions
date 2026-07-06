import { Suspense, lazy, useEffect, useRef } from "react";
import gsap from "gsap";
import MagneticButton from "../ui/MagneticButton";
import AnimatedCounter from "../ui/AnimatedCounter";

const HeroScene = lazy(() => import("../three/HeroScene"));

const STATS = [
  { value: 12, suffix: "+", label: "Years" },
  { value: 250, suffix: "+", label: "Projects" },
  { value: 98, suffix: "%", label: "Satisfaction" },
];

export default function Hero() {
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
    tl.from(headlineRef.current.children, {
      yPercent: 130,
      opacity: 0,
      duration: 1.2,
      stagger: 0.12,
    })
      .from(subRef.current, { opacity: 0, y: 20, duration: 0.9 }, "-=0.6")
      .from(ctaRef.current.children, { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 }, "-=0.5")
      .from(statsRef.current.children, { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 }, "-=0.5");

    const onMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      gsap.to(sectionRef.current, { rotateY: x * 0.1, rotateX: -y * 0.1, duration: 0.6 });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      tl.kill();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink"
      style={{ perspective: "1200px" }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-ink/80" />

      <div className="absolute inset-0 opacity-70">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="container-shell relative z-10">
        <p className="eyebrow mb-6">Government Registered Construction Company</p>

        <h1
          ref={headlineRef}
          className="max-w-4xl font-display text-5xl font-semibold uppercase leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          <span className="block overflow-hidden">Building Tomorrow</span>
          <span className="block overflow-hidden text-gold">With Strength &amp; Precision</span>
        </h1>

        <p ref={subRef} className="mt-8 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
          Delivering premium Residential, Commercial, Industrial and Infrastructure Construction
          Solutions with uncompromising quality and engineering precision.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-wrap gap-5">
          <MagneticButton as="a" href="#contact" className="btn-gold">
            Get Free Quote
          </MagneticButton>
          <MagneticButton as="a" href="#projects" className="btn-outline">
            View Projects
          </MagneticButton>
        </div>

        <div ref={statsRef} className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <AnimatedCounter
                value={s.value}
                suffix={s.suffix}
                className="font-display text-3xl font-semibold text-gold md:text-4xl"
              />
              <p className="mt-1 text-xs uppercase tracking-widest text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-float text-xs uppercase tracking-[0.3em] text-white/40">
        Scroll
      </div>
    </section>
  );
}
