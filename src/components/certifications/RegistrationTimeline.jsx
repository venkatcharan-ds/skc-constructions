import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { REGISTRATION_TIMELINE } from "../../data/site";

gsap.registerPlugin(ScrollTrigger);

export default function RegistrationTimeline() {
  const sectionRef = useRef(null);

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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-5">Our Journey</p>
        <h2 className="font-display text-4xl font-semibold md:text-5xl">
          Registration &amp; Compliance Timeline
        </h2>
      </div>

      <div className="relative mx-auto mt-16 max-w-3xl">
        <div className="absolute left-4 top-0 h-full w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2">
          <div className="timeline-line h-full w-full bg-gradient-to-b from-gold via-gold/60 to-gold/10" />
        </div>

        <div className="flex flex-col gap-10">
          {REGISTRATION_TIMELINE.map((item, i) => (
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
