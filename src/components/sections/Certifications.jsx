import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TrustBadges from "../certifications/TrustBadges";
import CertificateCard from "../certifications/CertificateCard";
import CompanyInfo from "../certifications/CompanyInfo";
import RegistrationTimeline from "../certifications/RegistrationTimeline";
import DocumentShowcase from "../certifications/DocumentShowcase";
import DownloadDocuments from "../certifications/DownloadDocuments";
import CertificateLightbox from "../ui/CertificateLightbox";
import { CERTIFICATES } from "../../data/site";

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const cardsRef = useRef(null);
  const [activeCertificate, setActiveCertificate] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".certificate-card", {
        opacity: 0,
        y: 50,
        scale: 0.92,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 75%" },
      });
    }, cardsRef);
    return () => ctx.revert();
  }, []);

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

          <div ref={cardsRef} className="mt-14 grid gap-6 lg:grid-cols-3">
            {CERTIFICATES.map((certificate, i) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                index={i}
                onView={setActiveCertificate}
              />
            ))}
          </div>
        </div>

        <CompanyInfo />

        <RegistrationTimeline />

        <DocumentShowcase onView={setActiveCertificate} />

        <DownloadDocuments />
      </div>

      <CertificateLightbox certificate={activeCertificate} onClose={() => setActiveCertificate(null)} />
    </section>
  );
}
