import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FiInfo } from "react-icons/fi";
import { COMPANY_INFO } from "../../data/site";

gsap.registerPlugin(ScrollTrigger);

export default function CompanyInfo() {
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".info-card", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-5">Registered Business Details</p>
        <h2 className="font-display text-4xl font-semibold md:text-5xl">Company Information</h2>
      </div>

      <div ref={gridRef} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COMPANY_INFO.map((item) => (
          <div
            key={item.label}
            className="info-card glass-panel flex items-start gap-3 rounded-xl p-5"
          >
            <FiInfo className="mt-0.5 shrink-0 text-gold" />
            <div>
              <p className="text-[11px] uppercase tracking-widest text-white/45">{item.label}</p>
              <p className="mt-1 font-display text-sm font-medium leading-snug text-white/90">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
