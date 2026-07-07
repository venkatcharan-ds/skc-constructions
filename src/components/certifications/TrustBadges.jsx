import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { TRUST_BADGES } from "../../data/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const badge = {
  hidden: { opacity: 0, y: 24, scale: 0.85 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
};

export default function TrustBadges() {
  return (
    <div className="text-center">
      <p className="eyebrow mb-4">Why Clients Trust Us</p>
      <h2 className="font-display text-4xl font-semibold md:text-5xl">
        Why Clients Trust SKC Construction
      </h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
        {TRUST_BADGES.map((label) => (
          <motion.span
            key={label}
            variants={badge}
            data-cursor="hover"
            className="glass-panel inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-medium uppercase tracking-widest text-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:text-gold"
          >
            <FiCheckCircle className="text-gold" />
            {label}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
