import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FiHome, FiLayers, FiKey } from "react-icons/fi";
import { GiFactory, GiRoad, GiBrickWall, GiWaterTower, GiTowerBridge } from "react-icons/gi";
import { SERVICES } from "../../data/site";

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  home: FiHome,
  building: FiLayers,
  factory: GiFactory,
  road: GiRoad,
  wall: GiBrickWall,
  tank: GiWaterTower,
  bridge: GiTowerBridge,
  key: FiKey,
};

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  const numberRef = useRef(null);
  const Icon = ICONS[service.icon];

  useEffect(() => {
    const counter = { value: 0 };
    const st = ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          value: index + 1,
          duration: 1.2,
          delay: index * 0.12,
          ease: "power2.out",
          onUpdate: () => {
            if (numberRef.current) {
              numberRef.current.textContent = String(Math.floor(counter.value)).padStart(2, "0");
            }
          },
        });
      },
    });
    return () => st.kill();
  }, [index]);

  const handleMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(card, {
      rotateY: (x / rect.width) * 18,
      rotateX: -(y / rect.height) * 18,
      y: -8,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 700,
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, y: 0, duration: 0.6, ease: "power3.out" });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="hover"
      className="service-card glass-panel group relative overflow-hidden rounded-2xl p-8 shadow-none transition-shadow duration-500 hover:border-gold/40 hover:shadow-[0_25px_60px_-15px_rgba(245,180,0,0.35)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(245,180,0,0.18),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <span
        ref={numberRef}
        className="absolute right-6 top-6 font-display text-5xl font-semibold text-white/5"
      >
        00
      </span>
      <div className="relative mb-6 grid h-14 w-14 place-items-center rounded-xl bg-gold/10 text-2xl text-gold transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
        <Icon />
      </div>
      <h3 className="relative font-display text-xl font-semibold">{service.title}</h3>
      <p className="relative mt-3 text-sm leading-relaxed text-white/60">{service.description}</p>
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

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
