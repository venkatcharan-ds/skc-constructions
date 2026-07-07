import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiZoomIn, FiZoomOut, FiRotateCcw, FiDownload } from "react-icons/fi";

const MIN_ZOOM = 0.6;
const MAX_ZOOM = 2.2;
const ZOOM_STEP = 0.2;

export default function CertificateLightbox({ certificate, onClose }) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!certificate) return undefined;
    setZoom(1);
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [certificate, onClose]);

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[1100] flex flex-col bg-ink/90 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
          aria-label={`${certificate.name} preview`}
        >
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="container-shell flex flex-wrap items-center justify-between gap-4 py-6"
          >
            <div>
              <p className="eyebrow">{certificate.authority}</p>
              <h3 className="mt-1 font-display text-lg font-semibold sm:text-xl">
                {certificate.name}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <div className="glass-panel flex items-center gap-1 rounded-full p-1">
                <button
                  type="button"
                  data-cursor="hover"
                  aria-label="Zoom out"
                  onClick={() => setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)))}
                  className="grid h-10 w-10 place-items-center rounded-full text-white/80 hover:text-gold"
                >
                  <FiZoomOut />
                </button>
                <span className="min-w-[3.5rem] text-center font-display text-xs text-white/70">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  data-cursor="hover"
                  aria-label="Zoom in"
                  onClick={() => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)))}
                  className="grid h-10 w-10 place-items-center rounded-full text-white/80 hover:text-gold"
                >
                  <FiZoomIn />
                </button>
                <button
                  type="button"
                  data-cursor="hover"
                  aria-label="Reset zoom"
                  onClick={() => setZoom(1)}
                  className="grid h-10 w-10 place-items-center rounded-full text-white/80 hover:text-gold"
                >
                  <FiRotateCcw />
                </button>
              </div>

              <a
                href={certificate.file}
                download={certificate.fileName}
                data-cursor="hover"
                aria-label="Download certificate"
                className="glass-panel grid h-12 w-12 place-items-center rounded-full text-lg text-white/80 hover:text-gold"
              >
                <FiDownload />
              </a>

              <button
                type="button"
                data-cursor="hover"
                aria-label="Close preview"
                onClick={onClose}
                className="glass-panel grid h-12 w-12 place-items-center rounded-full text-xl text-white/80 hover:text-gold"
              >
                <FiX />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="relative mx-4 mb-6 flex-1 overflow-auto rounded-2xl border border-white/10 bg-charcoal/40 sm:mx-8 sm:mb-8"
          >
            <div
              className="mx-auto my-6 aspect-[1/1.414] w-full max-w-3xl origin-top transition-transform duration-300"
              style={{ transform: `scale(${zoom})` }}
            >
              <iframe
                title={certificate.name}
                src={`${certificate.file}#toolbar=0&navpanes=0`}
                className="h-full w-full rounded-lg bg-white"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
