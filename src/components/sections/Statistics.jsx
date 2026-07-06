import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AnimatedCounter from "../ui/AnimatedCounter";
import { STATISTICS } from "../../data/site";

gsap.registerPlugin(ScrollTrigger);

export default function Statistics() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,180,0,0.08),transparent_60%)]" />
      <div className="container-shell relative grid grid-cols-2 gap-6 md:grid-cols-4">
        {STATISTICS.map((stat) => (
          <div
            key={stat.label}
            className="stat-card glass-panel rounded-2xl px-6 py-10 text-center"
          >
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              className="font-display text-4xl font-semibold text-gold md:text-5xl"
            />
            <p className="mt-3 text-xs uppercase tracking-widest text-white/55">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
