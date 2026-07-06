import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { FAQS } from "../../data/site";

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="glass-panel overflow-hidden rounded-2xl">
      <button
        type="button"
        data-cursor="hover"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-medium md:text-lg">{faq.question}</span>
        <FiPlus
          className={`shrink-0 text-xl text-gold transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-white/60">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative bg-ink py-28 md:py-36">
      <div className="container-shell mx-auto max-w-3xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5">Questions Answered</p>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-14 flex flex-col gap-4">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
