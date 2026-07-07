import { FiShield, FiEye, FiDownload } from "react-icons/fi";

export default function CertificateCard({ certificate, index, onView }) {
  return (
    <div
      data-cursor="hover"
      className="certificate-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-gold/50"
      style={{ animationDelay: `${index * 0.4}s` }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(245,180,0,0.16),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:linear-gradient(115deg,transparent_20%,rgba(245,180,0,0.4)_50%,transparent_80%)] [background-size:250%_250%] group-hover:animate-[shimmer_2.5s_linear_infinite]" />

      <div className="relative">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-gold">
          <FiShield /> Government Verified
        </div>

        <h3 className="font-display text-xl font-semibold leading-snug">{certificate.name}</h3>
        <p className="mt-2 text-xs uppercase tracking-widest text-white/40">
          {certificate.authority}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/60">{certificate.description}</p>

        <div className="mt-5 flex flex-col gap-1 border-t border-white/10 pt-4 text-xs text-white/50">
          <span>
            <span className="text-white/70">Reg. Number:</span> {certificate.number}
          </span>
          <span>
            <span className="text-white/70">Issued:</span> {certificate.date}
          </span>
        </div>

        <div className="mt-7 flex gap-3">
          <button
            type="button"
            data-cursor="hover"
            onClick={() => onView(certificate)}
            className="btn-gold flex-1 !px-4 !py-3 text-xs"
          >
            <FiEye /> View Certificate
          </button>
          <a
            href={certificate.file}
            download={certificate.fileName}
            data-cursor="hover"
            className="btn-outline flex-1 !px-4 !py-3 text-xs"
          >
            <FiDownload /> Download
          </a>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
}
