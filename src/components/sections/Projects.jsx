import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";
import { PROJECTS } from "../../data/site";

gsap.registerPlugin(ScrollTrigger);

const SPANS = [
  "lg:row-span-2",
  "",
  "",
  "lg:row-span-2",
  "",
  "",
  "lg:row-span-2",
  "",
];

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-tile", {
        opacity: 0,
        y: 50,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative bg-charcoal/20 py-28 md:py-36">
      <div className="container-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5">Our Portfolio</p>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">Featured Projects</h2>
        </div>

        <div className="mt-16 grid auto-rows-[220px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              data-cursor="hover"
              className={`project-tile group relative overflow-hidden rounded-2xl ${SPANS[i] || ""}`}
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-all duration-500 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-xs uppercase tracking-widest text-gold">{project.category}</p>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold">{project.title}</h3>
                  <FiArrowUpRight className="shrink-0 text-xl text-gold" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
