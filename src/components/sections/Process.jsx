import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PROCESS_STEPS } from "../../data/site";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 21;
const framePath = (i) => `/frames/frame-${String(i).padStart(3, "0")}.webp`;

export default function Process() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const imagesRef = useRef([]);

  useEffect(() => {
    let loaded = 0;
    const images = [];
    for (let i = 1; i <= FRAME_COUNT; i += 1) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        loaded += 1;
        if (loaded === 1) draw(0);
      };
      images.push(img);
    }
    imagesRef.current = images;

    function draw(index) {
      const canvas = canvasRef.current;
      const img = imagesRef.current[index];
      if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
      const ctx = canvas.getContext("2d");
      const { width, height } = canvas;
      const scale = Math.max(width / img.width, height / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h);
    }

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      draw(Math.round(state.frame));
    };

    const state = { frame: 0 };

    const ctx2 = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=250%",
        scrub: 0.6,
        pin: true,
        onUpdate: (self) => {
          state.frame = self.progress * (FRAME_COUNT - 1);
          draw(Math.round(state.frame));
          setActiveStep(Math.min(PROCESS_STEPS.length - 1, Math.floor(self.progress * PROCESS_STEPS.length)));
        },
      });

      window.addEventListener("resize", resize);
      resize();

      return () => {
        st.kill();
        window.removeEventListener("resize", resize);
      };
    }, sectionRef);

    return () => ctx2.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative h-screen overflow-hidden bg-ink">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

      <div className="container-shell relative z-10 flex h-full flex-col justify-center">
        <p className="eyebrow mb-5">Our Process</p>
        <h2 className="mb-12 max-w-xl font-display text-4xl font-semibold md:text-5xl">
          From Blueprint to Handover
        </h2>

        <div className="flex flex-col gap-1 md:max-w-md">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.title}
              className={`flex items-start gap-5 border-l-2 py-4 pl-6 transition-all duration-500 ${
                activeStep === i ? "border-gold opacity-100" : "border-white/15 opacity-40"
              }`}
            >
              <span className="font-display text-2xl font-semibold text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-white/60">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
