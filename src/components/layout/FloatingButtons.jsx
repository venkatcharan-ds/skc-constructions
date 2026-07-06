import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPhone, FiArrowUp, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { SITE, whatsappLink } from "../../data/site";

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [callOpen, setCallOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowTop(y > 500);
      setVisible(y < lastY.current || y < 200);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4"
        >
          <AnimatePresence>
            {showTop && (
              <motion.button
                type="button"
                data-cursor="hover"
                aria-label="Scroll to top"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                onClick={scrollTop}
                className="glass-panel grid h-12 w-12 place-items-center rounded-full text-lg text-white/80 hover:text-gold"
              >
                <FiArrowUp />
              </motion.button>
            )}
          </AnimatePresence>

          <div className="relative">
            <AnimatePresence>
              {callOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="glass-panel absolute bottom-16 right-0 w-56 rounded-2xl p-4"
                >
                  <p className="mb-2 text-xs uppercase tracking-widest text-white/50">Call us</p>
                  <div className="flex flex-col gap-2">
                    {SITE.phones.map((p) => (
                      <a
                        key={p.tel}
                        href={`tel:${p.tel}`}
                        data-cursor="hover"
                        className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white/90 hover:text-gold"
                      >
                        {p.display}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              type="button"
              data-cursor="hover"
              aria-label="Call SKC Construction"
              onClick={() => setCallOpen((v) => !v)}
              className="glass-panel grid h-14 w-14 place-items-center rounded-full text-xl text-white/80 hover:text-gold"
            >
              {callOpen ? <FiX /> : <FiPhone />}
            </button>
          </div>

          <a
            href={whatsappLink(SITE.phones[0].whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            aria-label="Chat on WhatsApp"
            className="grid h-14 w-14 animate-float place-items-center rounded-full bg-[#25D366] text-2xl text-ink shadow-[0_0_25px_rgba(37,211,102,0.5)]"
          >
            <FaWhatsapp />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
