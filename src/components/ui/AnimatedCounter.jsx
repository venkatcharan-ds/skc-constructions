import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedCounter({ value, suffix = "", className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const counter = { value: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          value,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.floor(counter.value)}${suffix}`;
          },
        });
      },
    });

    return () => st.kill();
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
