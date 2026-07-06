import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { NAV_LINKS, SITE, whatsappLink } from "../../data/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink pt-20">
      <div className="container-shell grid gap-12 pb-14 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <img src="/brand/logo-mark.webp" alt="SKC Construction" className="h-12 w-auto" />
            <span className="font-display text-xl font-semibold">
              SKC <span className="text-gold">Construction</span>
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/60">{SITE.tagline}</p>
          <div className="mt-6 flex gap-3">
            {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a
                key={i}
                href="#top"
                data-cursor="hover"
                aria-label="Social link"
                className="glass-panel grid h-10 w-10 place-items-center rounded-full text-sm text-white/70 hover:text-gold"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-display text-sm uppercase tracking-[0.25em] text-gold">
            Navigate
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-white/60">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} data-cursor="hover" className="hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-display text-sm uppercase tracking-[0.25em] text-gold">
            Services
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-white/60">
            <li>Residential Construction</li>
            <li>Commercial Construction</li>
            <li>Industrial Construction</li>
            <li>Civil Engineering</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-display text-sm uppercase tracking-[0.25em] text-gold">
            Contact
          </h3>
          <ul className="flex flex-col gap-4 text-sm text-white/60">
            {SITE.phones.map((p) => (
              <li key={p.tel} className="flex items-center gap-3">
                <FiPhone className="text-gold" />
                <a href={`tel:${p.tel}`} data-cursor="hover" className="hover:text-gold">
                  {p.display}
                </a>
                <a
                  href={whatsappLink(p.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  aria-label="Chat on WhatsApp"
                  className="text-[#25D366] hover:opacity-80"
                >
                  <FaWhatsapp />
                </a>
              </li>
            ))}
            <li className="flex items-center gap-3">
              <FiMail className="text-gold" />
              <a href={`mailto:${SITE.email}`} data-cursor="hover" className="hover:text-gold break-all">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FiMapPin className="text-gold" />
              <span>India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="container-shell text-center text-xs text-white/40">
          © {new Date().getFullYear()} SKC Construction. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
