import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Web fonts swapping in (and React.lazy chunks mounting) reflow the page
    // after ScrollTrigger has already measured it, leaving later triggers
    // positioned against a shorter/differently-wrapped document — which is
    // why sections further down can get stuck mid-reveal. Resync once each
    // signal fires; none of these overlap with a tween actively playing
    // since they all resolve well before the user can scroll that far.
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };
    document.fonts?.ready?.then(refresh);
    window.addEventListener("load", refresh);
    const fallbackTimeout = setTimeout(refresh, 2000);

    return () => {
      cancelled = true;
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      window.removeEventListener("load", refresh);
      clearTimeout(fallbackTimeout);
    };
  }, []);
}
