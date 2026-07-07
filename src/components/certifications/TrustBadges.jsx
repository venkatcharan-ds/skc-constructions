import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FiCheckCircle } from "react-icons/fi";
import { TRUST_BADGES } from "../../data/site";

gsap.registerPlugin(ScrollTrigger);

export default function TrustBadges() {
  const rowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".trust-badge", {
        opacity: 0,
        y: 24,
        scale: 0.85,
        duration: 0.7,
        stagger: 0.08,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: rowRef.current, start: "top 85%" },
      });
    }, rowRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="text-center">
      <p className="eyebrow mb-4">Why Clients Trust Us</p>
      <h2 className="font-display text-4xl font-semibold md:text-5xl">
        Why Clients Trust SKC Construction
      </h2>

      <div ref={rowRef} className="mt-10 flex flex-wrap justify-center gap-4">
        {TRUST_BADGES.map((badge) => (
          <span
            key={badge}
            data-cursor="hover"
            className="trust-badge glass-panel inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-medium uppercase tracking-widest text-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:text-gold"
          >
            <FiCheckCircle className="text-gold" />
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
