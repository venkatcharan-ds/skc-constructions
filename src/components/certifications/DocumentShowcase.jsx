import { motion } from "framer-motion";
import { FiFileText, FiEye } from "react-icons/fi";
import { CERTIFICATES } from "../../data/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function DocumentShowcase({ onView }) {
  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-5">Proof Of Legitimacy</p>
        <h2 className="font-display text-4xl font-semibold md:text-5xl">
          Verified Government Documents
        </h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
        style={{ perspective: "1200px" }}
      >
        {CERTIFICATES.map((cert, i) => (
          <motion.div key={cert.id} variants={item}>
            <div
              data-cursor="hover"
              onClick={() => onView(cert)}
              className="showcase-card group relative cursor-pointer animate-float"
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              <div className="relative aspect-[1/1.3] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] shadow-[0_20px_45px_-15px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_25px_60px_-10px_rgba(245,180,0,0.35)]">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-gold/10 text-3xl text-gold">
                    <FiFileText />
                  </span>
                  <p className="font-display text-sm font-semibold leading-snug">{cert.name}</p>
                  <p className="text-[11px] uppercase tracking-widest text-white/40">{cert.date}</p>
                </div>

                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(245,180,0,0.22),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-gold py-3 font-display text-xs font-semibold uppercase tracking-widest text-ink transition-transform duration-400 group-hover:translate-y-0">
                  <FiEye /> View Document
                </div>
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-full h-1/2 origin-top scale-y-[-1] overflow-hidden rounded-xl opacity-15 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.5),transparent)]"
              >
                <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-gold/10 text-3xl text-gold">
                    <FiFileText />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
