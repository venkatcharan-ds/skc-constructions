import { useState } from "react";
import { motion } from "framer-motion";
import TrustBadges from "../certifications/TrustBadges";
import CertificateCard from "../certifications/CertificateCard";
import CompanyInfo from "../certifications/CompanyInfo";
import RegistrationTimeline from "../certifications/RegistrationTimeline";
import DocumentShowcase from "../certifications/DocumentShowcase";
import CertificateLightbox from "../ui/CertificateLightbox";
import { CERTIFICATES } from "../../data/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Certifications() {
  const [activeCertificate, setActiveCertificate] = useState(null);

  return (
    <section id="certifications" className="relative overflow-hidden bg-ink py-28 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="container-shell flex flex-col gap-28">
        <TrustBadges />

        <div>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-5">Government Verified</p>
            <h2 className="font-display text-4xl font-semibold md:text-5xl">
              Trust &amp; Certifications
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              SKC Construction is fully registered and compliant with the Government of India and
              the Government of Telangana. Every certificate below is authentic and verifiable.
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-14 grid gap-6 lg:grid-cols-3"
          >
            {CERTIFICATES.map((certificate, i) => (
              <motion.div key={certificate.id} variants={card}>
                <CertificateCard
                  certificate={certificate}
                  index={i}
                  onView={setActiveCertificate}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <CompanyInfo />

        <RegistrationTimeline />

        <DocumentShowcase onView={setActiveCertificate} />
      </div>

      <CertificateLightbox certificate={activeCertificate} onClose={() => setActiveCertificate(null)} />
    </section>
  );
}
