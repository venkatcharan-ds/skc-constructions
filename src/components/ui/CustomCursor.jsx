import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      gsap.to(dot, { x: pos.x, y: pos.y, duration: 0.1, ease: "power2.out" });
    };

    const ticker = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.15;
      ringPos.y += (pos.y - ringPos.y) * 0.15;
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
    };
    gsap.ticker.add(ticker);

    const interactive = "a, button, [data-cursor='hover']";
    const onEnter = () => {
      gsap.to(ring, { scale: 2.2, backgroundColor: "rgba(245,180,0,0.15)", duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };
    const onLeave = () => {
      gsap.to(ring, { scale: 1, backgroundColor: "rgba(245,180,0,0)", duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    // Delegated listeners so dynamically rendered elements (accordions, mobile menu) are covered too.
    const onOver = (e) => {
      if (e.target.closest(interactive)) onEnter();
    };
    const onOut = (e) => {
      if (e.target.closest(interactive)) onLeave();
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    document.body.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] hidden md:block" aria-hidden="true">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-10 w-10 rounded-full border border-gold/60 transition-colors"
      />
      <div ref={dotRef} className="fixed left-0 top-0 h-2 w-2 rounded-full bg-gold" />
    </div>
  );
}
