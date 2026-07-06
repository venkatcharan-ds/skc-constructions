import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FiHome, FiLayers, FiTool, FiKey, FiTarget } from "react-icons/fi";
import { GiFactory } from "react-icons/gi";
import { SERVICES } from "../../data/site";

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  home: FiHome,
  building: FiLayers,
  factory: GiFactory,
  hammer: FiTool,
  key: FiKey,
  ruler: FiTarget,
};

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  const Icon = ICONS[service.icon];

  const handleMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(card, {
      rotateY: (x / rect.width) * 18,
      rotateX: -(y / rect.height) * 18,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 700,
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="hover"
      className="service-card glass-panel group relative overflow-hidden rounded-2xl p-8 transition-colors hover:border-gold/40"
      style={{ transformStyle: "preserve-3d" }}
    >
      <span className="absolute right-6 top-6 font-display text-5xl font-semibold text-white/5">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="mb-6 grid h-14 w-14 place-items-center rounded-xl bg-gold/10 text-2xl text-gold transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
        <Icon />
      </div>
      <h3 className="font-display text-xl font-semibold">{service.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{service.description}</p>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative bg-charcoal/20 py-28 md:py-36">
      <div className="container-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5">What We Do</p>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">
            Comprehensive Construction Services
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
