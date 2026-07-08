import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import AnimatedCounter from "../ui/AnimatedCounter";
import { FOUNDED_YEAR, YEARS_OF_EXPERIENCE, REGISTRATION_TIMELINE } from "../../data/site";

gsap.registerPlugin(ScrollTrigger);

const PARTICLE_COUNT = 18;

export default function RegistrationTimeline() {
  const sectionRef = useRef(null);
  const particlesRef = useRef(null);

  const [milestone, ...rest] = REGISTRATION_TIMELINE;

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 8 + Math.random() * 8,
        delay: Math.random() * 6,
      })),
    []
  );

  useEffect(() => {
    // Scrub-linked, so it self-corrects every frame against the live scroll
    // position instead of depending on a start/end measured once — safe even
    // if this lazy-loaded section shifts the page height after mounting.
    const ctx = gsap.context(() => {
      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 0.6,
        },
      });

      gsap.to(particlesRef.current, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      <div
        ref={particlesRef}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -inset-y-20 overflow-hidden"
      >
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-gold/60 shadow-[0_0_8px_2px_rgba(245,180,0,0.5)]"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              animation: `timeline-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-5">Our Journey</p>
        <h2 className="font-display text-4xl font-semibold md:text-5xl">30+ Years of Excellence</h2>
        <p className="mt-4 text-sm text-white/60 md:text-base">
          A legacy of quality construction since 1995.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-5 py-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold shadow-[0_0_25px_rgba(245,180,0,0.35)]">
            <FiAward /> Since {FOUNDED_YEAR}
          </span>
          <span className="flex items-baseline gap-2">
            <AnimatedCounter
              value={YEARS_OF_EXPERIENCE}
              suffix="+"
              className="font-display text-3xl font-bold text-gold"
            />
            <span className="text-xs uppercase tracking-widest text-white/50">
              Years Of Experience
            </span>
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mx-auto mt-16 max-w-2xl overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-b from-gold/[0.08] to-transparent p-8 text-center shadow-[0_30px_80px_-25px_rgba(245,180,0,0.3)] sm:p-12"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,180,0,0.25),transparent_65%)]" />
        <div className="relative mx-auto grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-gold-soft via-gold to-amber-700 shadow-[0_0_50px_10px_rgba(245,180,0,0.45)] sm:h-32 sm:w-32">
          <span className="font-display text-2xl font-bold text-ink sm:text-3xl">{milestone.year}</span>
        </div>
        <h3 className="relative mt-8 font-display text-2xl font-semibold uppercase tracking-wide text-gold sm:text-3xl">
          {milestone.title}
        </h3>
        <p className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
          {milestone.description}
        </p>
      </motion.div>

      <div className="relative mx-auto mt-20 max-w-3xl">
        <div className="absolute left-4 top-0 h-full w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2">
          <div className="timeline-line h-full w-full bg-gradient-to-b from-gold via-gold/60 to-gold/10 shadow-[0_0_20px_2px_rgba(245,180,0,0.4)]" />
        </div>

        <div className="flex flex-col gap-10">
          {rest.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`relative flex flex-col gap-3 pl-12 sm:w-1/2 sm:pl-0 ${
                i % 2 === 0
                  ? "sm:mr-auto sm:pr-12 sm:text-right"
                  : "sm:ml-auto sm:pl-12"
              }`}
            >
              <span
                className={`absolute left-[10px] top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_12px_3px_rgba(245,180,0,0.6)] ${
                  i % 2 === 0
                    ? "sm:left-auto sm:right-0 sm:translate-x-1/2"
                    : "sm:left-0 sm:-translate-x-1/2"
                }`}
              />
              {item.year && (
                <span className="font-display text-3xl font-bold text-gold/80">{item.year}</span>
              )}
              <h3 className="font-display text-lg font-semibold">{item.title}</h3>
              <p className="text-xs uppercase tracking-widest text-white/40">{item.date}</p>
              <p className="text-sm leading-relaxed text-white/60">{item.description}</p>
              {item.counter && (
                <span
                  className={`mt-1 inline-flex items-baseline gap-1.5 ${
                    i % 2 === 0 ? "sm:justify-end" : ""
                  }`}
                >
                  <AnimatedCounter
                    value={YEARS_OF_EXPERIENCE}
                    suffix="+"
                    className="font-display text-2xl font-bold text-gold"
                  />
                  <span className="text-xs uppercase tracking-widest text-white/40">years</span>
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes timeline-drift {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.35; }
          50% { transform: translateY(-24px) translateX(10px); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
