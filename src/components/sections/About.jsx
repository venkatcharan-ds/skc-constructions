import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const POINTS = [
  "Government registered construction company",
  "End-to-end project management under one roof",
  "Engineering-first approach to every build",
];

export default function About() {
  const sectionRef = useRef(null);
  const imgWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: { trigger: imgWrapRef.current, start: "top 75%" },
      });

      gsap.to(".about-parallax", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(".about-fade", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-ink py-28 md:py-36">
      <div className="container-shell grid items-center gap-16 lg:grid-cols-2">
        <div ref={imgWrapRef} className="about-reveal relative aspect-[4/5] overflow-hidden rounded-2xl">
          <img
            src="/images/download2.webp"
            alt="SKC Construction project under construction"
            className="about-parallax h-[112%] w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <div className="glass-panel absolute bottom-6 left-6 right-6 rounded-xl p-5">
            <p className="font-display text-3xl font-semibold text-gold">25+</p>
            <p className="text-xs uppercase tracking-widest text-white/60">Years Building Excellence</p>
          </div>
        </div>

        <div>
          <p className="about-fade eyebrow mb-5">About SKC Construction</p>
          <h2 className="about-fade max-w-lg font-display text-4xl font-semibold leading-tight md:text-5xl">
            Engineering ambition into permanent structures.
          </h2>
          <p className="about-fade mt-6 max-w-lg leading-relaxed text-white/65">
            SKC Construction is a government registered construction company delivering
            residential, commercial, industrial and infrastructure projects across the region.
            We combine disciplined engineering with a relentless focus on quality, precision and
            on-time delivery — turning ambitious blueprints into lasting landmarks.
          </p>

          <ul className="mt-8 flex flex-col gap-4">
            {POINTS.map((point) => (
              <li key={point} className="about-fade flex items-center gap-4 text-sm text-white/75">
                <span className="h-2 w-2 shrink-0 rounded-full bg-gold" />
                {point}
              </li>
            ))}
          </ul>

          <a href="#services" data-cursor="hover" className="about-fade btn-outline mt-10 inline-flex">
            Explore Our Services
          </a>
        </div>
      </div>
    </section>
  );
}
