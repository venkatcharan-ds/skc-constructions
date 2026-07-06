import { useState } from "react";
import { FiPhone, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import MagneticButton from "../ui/MagneticButton";
import { SITE, whatsappLink } from "../../data/site";

export default function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sent");
  };

  return (
    <section id="contact" className="relative bg-charcoal/20 py-28 md:py-36">
      <div className="container-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5">Get In Touch</p>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">
            Let&rsquo;s Build Something Remarkable
          </h2>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="glass-panel flex flex-col gap-6 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold/10 text-xl text-gold">
                <FiPhone />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">Call Us</p>
                {SITE.phones.map((p) => (
                  <a
                    key={p.tel}
                    href={`tel:${p.tel}`}
                    data-cursor="hover"
                    className="mt-1 block font-display text-lg hover:text-gold"
                  >
                    {p.display}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold/10 text-xl text-gold">
                <FiMail />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">Email Us</p>
                <a
                  href={`mailto:${SITE.email}`}
                  data-cursor="hover"
                  className="mt-1 block break-all font-display text-lg hover:text-gold"
                >
                  {SITE.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold/10 text-xl text-gold">
                <FiMapPin />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">Location</p>
                <p className="mt-1 font-display text-lg">Serving Clients Across India</p>
              </div>
            </div>

            <div className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-6">
              <p className="text-xs uppercase tracking-widest text-white/50">Chat on WhatsApp</p>
              <div className="flex flex-wrap gap-3">
                {SITE.phones.map((p) => (
                  <a
                    key={p.whatsapp}
                    href={whatsappLink(p.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/15 px-4 py-2 text-sm font-medium text-[#25D366] hover:bg-[#25D366]/25"
                  >
                    <FaWhatsapp /> {p.display}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-2 overflow-hidden rounded-xl border border-white/10">
              <iframe
                title="SKC Construction Location Map"
                src="https://www.google.com/maps?q=India&output=embed"
                width="100%"
                height="220"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-panel flex flex-col gap-5 rounded-2xl p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-widest text-white/50">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none focus:border-gold"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-xs uppercase tracking-widest text-white/50">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none focus:border-gold"
                  placeholder="Your phone"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-widest text-white/50">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none focus:border-gold"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-widest text-white/50">
                Project Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none focus:border-gold"
                placeholder="Tell us about your project"
              />
            </div>

            <MagneticButton type="submit" className="btn-gold w-full">
              <FiSend /> {status === "sent" ? "Message Sent" : "Send Message"}
            </MagneticButton>
            {status === "sent" && (
              <p className="text-center text-sm text-gold">
                Thank you! We will get back to you shortly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
