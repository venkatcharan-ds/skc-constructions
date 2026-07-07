import { motion } from "framer-motion";
import { FiInfo } from "react-icons/fi";
import { COMPANY_INFO } from "../../data/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function CompanyInfo() {
  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-5">Registered Business Details</p>
        <h2 className="font-display text-4xl font-semibold md:text-5xl">Company Information</h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {COMPANY_INFO.map((info) => (
          <motion.div
            key={info.label}
            variants={item}
            className="glass-panel flex items-start gap-3 rounded-xl p-5"
          >
            <FiInfo className="mt-0.5 shrink-0 text-gold" />
            <div>
              <p className="text-[11px] uppercase tracking-widest text-white/45">{info.label}</p>
              <p className="mt-1 font-display text-sm font-medium leading-snug text-white/90">
                {info.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
