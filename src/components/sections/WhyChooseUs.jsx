import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FiShield, FiUsers, FiClock } from "react-icons/fi";
import { GiDiamonds, GiReceiveMoney } from "react-icons/gi";
import { WHY_CHOOSE_US } from "../../data/site";

gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  shield: FiShield,
  users: FiUsers,
  gem: GiDiamonds,
  clock: FiClock,
  receipt: GiReceiveMoney,
};

export default function WhyChooseUs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-card", {
        opacity: 0,
        scale: 0.85,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-ink py-28 md:py-36">
      <div className="container-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5">Why Choose Us</p>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">
            Precision You Can Trust
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <div
                key={item.title}
                data-cursor="hover"
                className="why-card glass-panel rounded-2xl p-7 text-center transition-transform duration-300 hover:-translate-y-2 hover:border-gold/40"
              >
                <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-gold/10 text-2xl text-gold">
                  <Icon />
                </div>
                <h3 className="font-display text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/55">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
